import { GasInfo, GearApi, ProgramMetadata } from '@gear-js/api';
import { Account } from '@gear-js/react-hooks/dist/esm/types';
import { AnyJson, Codec } from '@polkadot/types/types';

export class ExtrinsicFactory {

    private api: GearApi | undefined;

    private accounts: any;

    private account: Account | undefined;

    private programId: `0x${string}`;

    private ftProgramId: `0x${string}`;

    private metadata: ProgramMetadata;

    private ftMetadata: ProgramMetadata | undefined;

    constructor(accounts: any, account: Account | undefined, api: GearApi) {
        this.api = api;
        this.accounts = accounts;
        this.account = account;
        this.programId = '0x695459bf5da755a36c36c78b8cb4d3bfcc7c6eaceabeb16a55d6655791345e72'
        this.ftProgramId = '0xb3f0d6d0d4b85a7b995647a8fa73656371d8360dce76e613fad91ada757b95f5'
        this.ftMetadata = ProgramMetadata.from('0x0002000100000000000103000000010700000000000000000108000000a90b3400081466745f696f28496e6974436f6e66696700000c01106e616d65040118537472696e6700011873796d626f6c040118537472696e67000120646563696d616c73080108753800000400000502000800000503000c081466745f696f204654416374696f6e000118104d696e74040010011075313238000000104275726e040010011075313238000100205472616e736665720c011066726f6d14011c4163746f724964000108746f14011c4163746f724964000118616d6f756e74100110753132380002001c417070726f7665080108746f14011c4163746f724964000118616d6f756e74100110753132380003002c546f74616c537570706c790004002442616c616e63654f66040014011c4163746f724964000500001000000507001410106773746418636f6d6d6f6e287072696d6974697665731c4163746f724964000004001801205b75383b2033325d0000180000032000000008001c081466745f696f1c46544576656e74000110205472616e736665720c011066726f6d14011c4163746f724964000108746f14011c4163746f724964000118616d6f756e74100110753132380000001c417070726f76650c011066726f6d14011c4163746f724964000108746f14011c4163746f724964000118616d6f756e74100110753132380001002c546f74616c537570706c790400100110753132380002001c42616c616e63650400100110753132380003000020081466745f696f3c496f46756e6769626c65546f6b656e00001801106e616d65040118537472696e6700011873796d626f6c040118537472696e67000130746f74616c5f737570706c791001107531323800012062616c616e6365732401505665633c284163746f7249642c2075313238293e000128616c6c6f77616e6365732c01905665633c284163746f7249642c205665633c284163746f7249642c2075313238293e293e000120646563696d616c730801087538000024000002280028000004081410002c00000230003000000408142400')
        this.metadata = ProgramMetadata.from('0x0002000100000000000104000000010700000000000000000109000000551348000808696f50496e69744c6971756964697479436f747261637400000c015867766172615f636f6e74726163745f6164647265737304011c4163746f72496400015473746173685f6163636f756e745f6164647265737304011c4163746f7249640001286d61737465725f6b657904011c4163746f72496400000410106773746418636f6d6d6f6e287072696d6974697665731c4163746f724964000004000801205b75383b2033325d000008000003200000000c000c0000050300100808696f444c69717569645374616b65416374696f6e00010c145374616b6504001401107531323800000020556e657374616b6504001401107531323800010038557064617465556e657374616b650c01107573657204011c4163746f72496400010c65726118010c4572610001286d61737465725f6b657904011c4163746f724964000200001400000507001800000506001c0808696f404c69717569645374616b654576656e740001181c53756363657373000000405375636365737366756c6c5374616b650001004c5375636365737366756c6c556e657374616b650002003053746173684d6573736167651001107573657204011c4163746f7249640001306d6573736167655f74797065200118537472696e67000118616d6f756e74140114477661726100011476616c75651401105661726100030048546f74616c4c6f636b657442616c616e6365040114746f74616c14011075313238000400285374616b654572726f7200050000200000050200240808696f404c69717569645374616b65537461746500002001146f776e657204011c4163746f72496400014c67766172615f746f6b656e5f6164647265737304011c4163746f72496400015876617261746f6b656e5f746f74616c5f7374616b656414011075313238000130696e697469616c5f74696d6518010c75363400014c746f74616c5f74696d655f70726f746f636f6c18010c7536340001606776617261746f6b656e735f7265776172645f746f74616c14011075313238000144646973747269627574696f6e5f74696d6518010c753634000114757365727328017c5665633c284163746f7249642c2055736572496e666f726d6174696f6e293e0000280000022c002c00000408043000300808696f3c55736572496e666f726d6174696f6e0000100158757365725f746f74616c5f766172615f7374616b656414011075313238000148686973746f72795f69645f636f756e74657214011075313238000140756e657374616b655f686973746f72793401345665633c556e657374616b653e00014c7472616e73616374696f6e5f686973746f727940015c5665633c5472616e73616374696f6e486973746f72793e0000340000023800380808696f20556e657374616b6500000c0118616d6f756e7414011447766172610001386c696265726174696f6e5f65726118010c75363400013c6c696265726174696f6e5f646179733c010c75333200003c0000050500400000024400440808696f485472616e73616374696f6e486973746f727900001001387472616e73616374696f6e5f6964140110753132380001407472616e73616374696f6e5f74797065200118537472696e670001487472616e73616374696f6e5f616d6f756e74140110566172610001407472616e73616374696f6e5f74696d6518010c7536340000')
    }

    public async messageExtrinsic(payload: AnyJson, inputValue: number) {
        console.log(inputValue, payload);

        const gas = await this.calculateGasLimit(payload, this.metadata, this.programId, inputValue);
        console.log('Hola soy el gas :', Number(gas?.toHuman().min_limit?.toString().replace(/,/g, '') as string) / 1000000000000);

        const message: any = {
            destination: this.programId,
            payload,
            gasLimit: BigInt(gas?.toHuman().min_limit?.toString().replace(/,/g, '') as string),
            value: inputValue * 1000000000000,
        }



        if (this.validateAccount()) {
            return {
                message: this.api?.message.send(message, this.metadata),
                gasLimit: Number(gas?.toHuman().min_limit?.toString().replace(/,/g, '') as string) / 1000000000000
            }
        }

        return null;
    }

    public async ftAproveTokenExtrinsic(amount: number) {
        const payload = {
            "Approve": {
                "to": this.programId,
                "amount": amount
            },
        }

        const gas = await this.calculateGasLimit(payload, this.ftMetadata, this.ftProgramId, 0);

        const message: any = {
            destination: this.ftProgramId,
            payload,
            gasLimit: BigInt(gas?.toHuman().min_limit?.toString().replace(/,/g, '') as string),
            value: 0,
        }

        if (this.validateAccount()) {

            return {
                message: this.api?.message.send(message, this.ftMetadata),
                gasLimit: Number(gas?.toHuman().min_limit?.toString().replace(/,/g, '') as string) / 1000000000000
            };
        }

        return null;
    }

    private validateAccount(): boolean {
        const localAccount = this.account;
        return this.accounts.some(
            (vissibleAccount: Account) => vissibleAccount.address === localAccount?.address
        )
    }

    public async calculateGasLimit(payload: AnyJson, metadata: any, programId: `0x${string}`, inputValue: number) {
        return this.api?.program.calculateGas.handle(
            this.account?.decodedAddress as `0x${string}`,

            programId,
            payload,

            inputValue * 1000000000000,
            false,

            metadata,
        );
    }

    public async getHistory(): Promise<any> {
        const localAccount = this.account;
        const response = await this.api?.programState.read({ programId: this.programId, payload: this.programId }, this.metadata || undefined);
        if (!response) {
            return null;
        }
        const data = response.toJSON() as { users: any[] };

        const users = data?.users;

        users.forEach((user: any[]) => {
            if (user.length > 0 && user[0] === localAccount?.decodedAddress) {
                const dataUser = user[1];
                const historyData = {
                    unestakeHistory: dataUser.unestakeHistory,
                    userTotalVaraStaked: dataUser.userTotalVaraStaked,
                    transactionHistory: dataUser.transactionHistory,
                }
                return historyData;
            }
        });

        console.log("No se encontró historial para este usuario");
        return {
            unestakeHistory: [
                [
                    "0",
                    {
                        amount: "88",
                        liberationEra: "438",
                        liberationDays: "7"
                    }
                ]
            ],
            userTotalVaraStaked: "0",
            transactionHistory: [
                {
                    transactionId: "0",
                    transactionType: "stake",
                    transactionAmount: "10",
                    transactionTime: "1,713,922,548,000"
                }
            ],
        };
    }
}