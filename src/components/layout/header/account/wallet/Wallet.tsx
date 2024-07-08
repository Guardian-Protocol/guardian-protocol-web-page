import { Account } from '@gear-js/react-hooks';
import { AccountButton } from '../account-button';
import styles from './Wallet.module.scss';

type Props = {
  balance: Account['balance'];
  address: string;
  name: string | undefined;
  gvara: number;
  onClick: () => void;
};

function Wallet({ balance, address, name, gvara, onClick }: Props) {
  return (
    <div className={styles.wallet}>
      <div className={styles.outerContainerWallet}>
        <p className={styles.balance}>
          {gvara} <span className={styles.currency}>gVARA</span>
        </p>
        <p className={styles.balance}>
          {balance.value} <span className={styles.currency}>{balance.unit}</span>
        </p>
      </div>
      <AccountButton address={address} name={name} onClick={onClick} />
    </div>
  );
}

export { Wallet };
