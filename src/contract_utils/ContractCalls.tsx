import { GearApi, GearKeyring, ProgramMetadata } from "@gear-js/api";
import { Account, AlertContainerFactory } from "@gear-js/react-hooks/dist/esm/types";
import { SubmittableExtrinsic } from "@polkadot/api/types";
import { web3FromSource } from "@polkadot/extension-dapp";
import { AnyJson } from "@polkadot/types/types";

export class ContractCalls {

    private api: GearApi;

    private account: Account | null = null;

    private accounts: any;

    private adminSeed: `0x${string}`;

    private source: `0x${string}`;

    private ftSource: `0x${string}`;

    private metadata: ProgramMetadata;

    private ftMetadata: ProgramMetadata;

    private storeMetadata: ProgramMetadata;

    private alert: AlertContainerFactory;

    private alertStyle = { style: { color: "white" } }

    constructor(
        api: GearApi,
        account: Account,
        accounts: any,
        alert: AlertContainerFactory
    ) {
        this.api = api;
        this.source = process.env.REACT_PROGRAM_SOURCE as `0x${string}`;
        this.ftSource = process.env.REACT_FT_PROGRAM_SOURCE as `0x${string}`;
        this.metadata = ProgramMetadata.from(process.env.REACT_PROGRAM_METADATA as `0x${string}`);
        this.ftMetadata = ProgramMetadata.from(process.env.REACT_FT_PROGRAM_METADATA as `0x${string}`);
        this.storeMetadata = ProgramMetadata.from(process.env.REACT_STORE_METADATA as `0x${string}`);

        const { seed } = GearKeyring.generateSeed("glove large laugh school behind wear artist current analyst join media kind");
        this.adminSeed = seed;

        this.account = account;
        this.accounts = accounts;
        this.alert = alert;
    }

    public async stake(payload: AnyJson, inputValue: number, gassLimit: number) {
        const transferMessage = this.api.message.send({
            destination: "0xb693ba1484d8eed0dae1283fcbea1d4820234b23c76497d85d28973042e4200a", 
            payload: "0x",
            gasLimit: 0.06 * 1000000000000,
            value: inputValue * 1000000000000 + 0.06 * 1000000000000
        });
        const extrinsic = await this.messageExtrinsic(payload, 0, gassLimit) as any;
        const batch = this.api.tx.utility.batch([transferMessage, extrinsic]);

        await this.signer(batch, async () => { 
            const stakingExtrinsic = this.api.tx.staking.bondExtra(inputValue * 1000000000000);
            const proxyExtrinsic = this.api.tx.proxy.proxy(
                "0xb693ba1484d8eed0dae1283fcbea1d4820234b23c76497d85d28973042e4200a",
                null,
                stakingExtrinsic
            )

            await this.signWithProxy(proxyExtrinsic, () => { });
        })
    }

    public async unstake(payload: AnyJson, approvePayload: AnyJson, inputValue: number, approveLimit: number) {
        const approveExtrinsic = await this.ftAproveTokenExtrinsic(approvePayload, inputValue, approveLimit) as any;

        await this.signer(approveExtrinsic, async () => {
            const unestakeLimit = await this.gasLimit("staking", payload, inputValue);
            const extrinsic = await this.messageExtrinsic(payload, inputValue, unestakeLimit) as any;

            await this.signer(extrinsic, async () => {
                const unboundExtrinsic = this.api.tx.staking.unbond(inputValue * 1000000000000);
                const proxyExtrinsic = this.api.tx.proxy.proxy(
                    "0xb693ba1484d8eed0dae1283fcbea1d4820234b23c76497d85d28973042e4200a",
                    null,
                    unboundExtrinsic
                );

                await this.signWithProxy(proxyExtrinsic, () => {        
                    this.alert.success("Successful transaction", this.alertStyle); 
                });
            })
        });
    }

    public async withdraw(payload: AnyJson, inputValue: number, gassLimit: number) {
        const withdrawExtrinsic = await this.messageExtrinsic(payload, inputValue, gassLimit) as any;

        await this.signer(withdrawExtrinsic, async () => {
            const transferExtrinsic = this.api.tx.balances.transfer(this.account?.decodedAddress!, inputValue * 1000000000000);
            const proxyExtrinsic = this.api.tx.proxy.proxy(
                "0xb693ba1484d8eed0dae1283fcbea1d4820234b23c76497d85d28973042e4200a",
                null,
                transferExtrinsic
            );

            await this.signWithProxy(proxyExtrinsic, () => { 
                this.alert.success("Successful transaction", this.alertStyle);
            });
        });
    }

    public async gasLimit(type: string, payload: AnyJson, inputValue: number) {
        let gas = null;

        switch (type) {
            case "staking": {
                try {
                    gas = await this.api?.program.calculateGas.handle(
                        this.account?.decodedAddress as `0x${string}`,
                        this.source,
                        payload,
                        inputValue * 1000000000000,
                        false,
                        this.metadata
                    );
                } catch (err) {
                    if (!String(err).includes("ValueLessThanMinimal")) {
                        this.alert.error(String(err), this.alertStyle);
                    }
                }
                
                break;
            }
            case "ft": {
                try {
                    gas = await this.api?.program.calculateGas.handle(
                        this.account?.decodedAddress as `0x${string}`,
                        this.ftSource,
                        payload,
                        inputValue * 1000000000000,
                        false,
                        this.ftMetadata
                    );
                } catch (err) {
                    if (!String(err).includes("ValueLessThanMinimal")) {
                        this.alert.error(String(err), this.alertStyle);
                    }
                }

                break;
            }
            default: {
                break;
            }
        }

        return Number(gas?.toHuman().min_limit?.toString().replace(/,/g, ''))
    }

    public async getHistory() {
        const result = (await this.getState({ GetTransactionHistory: this.account?.decodedAddress }));
        return result === 0 ? 0 : result.transactionHistory;
    }

    public async getUnestakeHistory() {
        const result = (await this.getState({ GetUnestakeHistory: this.account?.decodedAddress }));
        return result === 0 ? 0 : result.unestakeHistory;
    }

    public async getLockedBalance() {
        const result = (await this.getState({ GetUserVaraLocked: this.account?.decodedAddress }));
        console.log(result);
        return result === 0 ? 0 : result.userVaraLocked;
    }

    private async getState(payload: AnyJson = {}) {
        const store = await this.api?.programState.read({
            programId: this.source,
            payload: {
                GetUserStore: this.account?.decodedAddress,
            },
        }, this.metadata);

        if ((store as any).isErr) {
            this.alert.error((store as any).asErr.asStoreNotAvailable, this.alertStyle);
            return 0;
        } 

        console.log(await this.api.balance.findOut("0x4a644276067790c0248f5a0edeed7226ebfaf08e972196e23c7f3d8bf6751985"))

        // console.log((store as any).toJSON());

        const state = await this.api?.programState.read({
            programId: (store as any).toJSON().ok.userStore,
            payload,
        }, this.storeMetadata);

        if ((state as any).isErr) {
            this.alert.error((state as any).asErr.asUserNotFound, this.alertStyle);
            return 0;
        } 

        return (state as any).toJSON().ok;
    }

    private async messageExtrinsic(payload: AnyJson, inputValue: number, gassLimit: number) {
        const message = {
            destination: this.source,
            payload,
            gasLimit: BigInt(gassLimit),
            value: inputValue * 1000000000000
        }

        if (this.validateAccount()) {
            return this.api.message.send(message, this.metadata);
        }

        return null;
    }

    private async ftAproveTokenExtrinsic(payload: AnyJson, inputValue: number, gassLimit: number) {
        const message = {
            destination: this.ftSource,
            payload,
            gasLimit: BigInt(gassLimit),
            value: inputValue * 1000000000000
        }

        if (this.validateAccount()) {
            return this.api.message.send(message, this.ftMetadata);
        }

        return null;
    }

    private async signer(messageExtrinsic: SubmittableExtrinsic<"promise">, continueWith: () => void) {
        const injector = await web3FromSource(this.accounts[0]?.meta.source as string);

        await messageExtrinsic.signAndSend(
            this.account?.address ?? this.alert.error("No account found", this.alertStyle),
            { signer: injector.signer },
            ({ status }) => {
                if (status.isInBlock) {
                    this.alert.success(status.asInBlock.toHuman()?.toString(), this.alertStyle);
                } else if (status.isFinalized) {
                    this.alert.success(status.type, this.alertStyle);
                    continueWith();
                }
            }
        )
    }

    private async signWithProxy(messageExtrinsic: SubmittableExtrinsic<"promise">, continueWith: () => void) {
        const kering = await GearKeyring.fromSeed(this.adminSeed);
    
        await messageExtrinsic.signAndSend(
            kering, 
            ({ status }) => {
                if (status.isInBlock) {
                    this.alert.success(status.asInBlock.toHuman()?.toString(), this.alertStyle);
                } else if (status.isFinalized) {
                    this.alert.success(status.type, this.alertStyle);
                    continueWith();
                }
            }
        )
    }

    private validateAccount(): boolean {
        const localAccount = this.account;
        return this.accounts.some(
            (vissibleAccount: Account) => vissibleAccount.address === localAccount?.address
        )
    }
}