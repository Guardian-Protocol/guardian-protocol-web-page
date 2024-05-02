import { GearApi, ProgramMetadata } from "@gear-js/api";
import { Account, AlertContainerFactory } from "@gear-js/react-hooks/dist/esm/types";
import { SubmittableExtrinsic } from "@polkadot/api/types";
import { web3FromSource } from "@polkadot/extension-dapp";
import { AnyJson } from "@polkadot/types/types";

export class ContractCalls {

    private api: GearApi;

    private account: Account | null = null;

    private accounts: any;

    private source: `0x${string}`;

    private ftSource: `0x${string}`;

    private metadata: ProgramMetadata;

    private ftMetadata: ProgramMetadata;

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

        this.account = account;
        this.accounts = accounts;
        this.alert = alert;
    }

    public async stake(payload: AnyJson, inputValue: number, gassLimit: number) {
        const extrinsic = await this.messageExtrinsic(payload, inputValue, gassLimit) as any;
        await this.signer(extrinsic, () => { })
    }

    public async unstake(payload: AnyJson, approvePayload: AnyJson, inputValue: number, approveLimit: number) {
        const approveExtrinsic = await this.ftAproveTokenExtrinsic(approvePayload, inputValue, approveLimit) as any;

        await this.signer(approveExtrinsic, async () => {
            const unestakeLimit = await this.gasLimit("staking", payload, inputValue);
            const extrinsic = await this.messageExtrinsic(payload, inputValue, unestakeLimit) as any;
            await this.signer(extrinsic, () => { })
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
                    this.alert.error(String(err), this.alertStyle);
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
                    this.alert.error(String(err), this.alertStyle)
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
        const state = await this.api?.programState.read({
            programId: this.source,
            payload: this.source,
        }, this.metadata);

        const data = state.toJSON() as { users: any[] };
        const users = data?.users;

        try {
            const usernew = users.find((user: any[]) => user[0] === this.account?.decodedAddress);
            const dataUser = usernew[1];
            return {
                unestakeHistory: dataUser.unestakeHistory,
                userTotalVaraStaked: dataUser.userTotalVaraStaked,
                transactionHistory: dataUser.transactionHistory,
            }
        }
        catch (error) {
            return "No history found";
        }
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

    private validateAccount(): boolean {
        const localAccount = this.account;
        return this.accounts.some(
            (vissibleAccount: Account) => vissibleAccount.address === localAccount?.address
        )
    }
}