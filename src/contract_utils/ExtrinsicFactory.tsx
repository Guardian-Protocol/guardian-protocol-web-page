import { GearApi, ProgramMetadata } from '@gear-js/api';
import { Account } from '@gear-js/react-hooks/dist/esm/types';
import { AnyJson } from '@polkadot/types/types';

export class ExtrinsicFactory {

    private api: GearApi | undefined;

    private accounts: any;

    private account: Account | undefined;

    private programId: `0x${string}`;

    private metadata: ProgramMetadata | undefined;

    constructor(accounts: any, account: Account | undefined, api: GearApi) {
        this.api = api;
        this.accounts = accounts;
        this.account = account;
        this.programId = '0xe4f89f80872c3f1d472cfb1aa0e1e6e75a6a9f1d79d1694e18320ce28041df5b'
        this.metadata = ProgramMetadata.from('0x00020001000000000001030000000105000000000000000001060000005d092c0010106773746418636f6d6d6f6e287072696d6974697665731c4163746f724964000004000401205b75383b2033325d0000040000032000000008000800000503000c0808696f444c69717569645374616b65416374696f6e000104145374616b6504001001107531323800000000100000050700140808696f404c69717569645374616b654576656e74000110405375636365737366756c6c5374616b65000000485375636365737366756c6c556e7374616b6500010048546f74616c4c6f636b657442616c616e6365040114746f74616c10011075313238000200285374616b654572726f7200030000180808696f404c69717569645374616b65537461746500002001146f776e657200011c4163746f7249640001547374616b696e675f746f6b656e5f6164647265737300011c4163746f72496400015876617261746f6b656e5f746f74616c5f7374616b656410011075313238000130696e697469616c5f74696d651c010c75363400014c746f74616c5f74696d655f70726f746f636f6c1c010c7536340001606776617261746f6b656e735f7265776172645f746f74616c10011075313238000144646973747269627574696f6e5f74696d651c010c753634000114757365727320016c5665633c284163746f7249642c205573657242616c616e6365293e00001c00000506002000000224002400000408002800280808696f2c5573657242616c616e63650000080158757365725f746f74616c5f766172615f7374616b656410011075313238000158757365725f746f74616c5f6776617261746f6b656e73100110753132380000')
    }

    public async messageExtrinsic(payload: AnyJson) {
        const gas = await this.calculateGasLimit(payload);

        const message: any = {
            destination: this.programId,
            payload,
            gasLimit: BigInt(gas?.toHuman().min_limit?.toString().replace(/,/g, '') as string),
            value: 0,
        }

        if (this.validateAccount()) {
            return this.api?.message.send(message, this.metadata);
        }

        return null;
    }

    private validateAccount(): boolean {
        const localAccount = this.account;
        return this.accounts.some(
            (vissibleAccount: Account) => vissibleAccount.address === localAccount?.address
        )
    }

    private async calculateGasLimit(payload: AnyJson) {
        return this.api?.program.calculateGas.handle(
            this.account?.decodedAddress as `0x${string}`,
            this.programId, 
            payload, 
            0,      
            false, 
            this.metadata,
        );
    }
}