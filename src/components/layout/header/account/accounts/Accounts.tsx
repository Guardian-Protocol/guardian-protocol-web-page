import { useState } from 'react';
import type { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import { Flex} from "@chakra-ui/react";
import { useAccount } from '@gear-js/react-hooks';
import { isLoggedIn } from 'utils';
import { LOCAL_STORAGE } from 'consts';
import { AccountButton } from '../account-button';
import styles from './Accounts.module.scss';
import VaraLogo from "../../../../../assets/images/VaraLogo.png";
import { SourceButtons } from './SourceButtons';



type Props = {
  list: InjectedAccountWithMeta[];
  onChange: () => void;
};

function Accounts({ list, onChange }: Props) {
  const { login } = useAccount();
  const isAnyAccount = list.length > 0;
  const [selectedSource, setSelectedSource] = useState<string | null>(null);

  const handleSourceClick = (source: string) => {
    setSelectedSource(source);
  };

  const handleAccountButtonClick = (account: InjectedAccountWithMeta) => {
    login(account);
    localStorage.setItem(LOCAL_STORAGE.ACCOUNT, account.address);
    onChange();
  };


  const getAccounts = (listSource : InjectedAccountWithMeta[]) =>
  listSource.map((account) => (
    <li key={account.address}>
      <AccountButton
        address={account.address}
        name={account.meta.name}
        isActive={isLoggedIn(account)}
        onClick={() => handleAccountButtonClick(account)}
        block
      />
    </li>
  ));


  return isAnyAccount ? (
    <Flex direction="column">
      {!selectedSource ? (
        <SourceButtons list={list} onSelect={handleSourceClick} logo={VaraLogo}/>
      ) : (
        <ul className={styles.list}>{getAccounts(list.filter((account) => account.meta.source === selectedSource))}</ul>
      )}
    </Flex>
  ) : (
    <p style={{ color: 'white' }}>
      No accounts found. Please open Polkadot extension, create a new account or import existing one and reload the
      page.
    </p>
  );
}

export { Accounts };