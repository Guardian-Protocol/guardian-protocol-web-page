import { useEffect, useMemo, useState } from 'react';
import { useAccount, useAlert, useApi } from '@gear-js/react-hooks';
import { Button } from '@chakra-ui/react';
import { ContractCalls } from 'contract_utils/ContractCalls';
import { AccountsModal } from './accounts-modal';
import { Wallet } from './wallet';

function Account() {
  const { account, accounts } = useAccount();
  const api = useApi();
  const alert = useAlert();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gvaraBalance, setGvaraBalance] = useState(0);

  const contractCalls = useMemo(() => new ContractCalls(api!.api, account!, accounts, alert), [api, account, accounts, alert]);


  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    contractCalls.getGVaraBalance().then((balance) => {
      setGvaraBalance(balance);
      console.log(balance)
    });
  }, [contractCalls]);

  return (
    <>
      {account ? (
        <Wallet gvara={gvaraBalance} balance={account.balance} address={account.address} name={account.meta.name} onClick={openModal} />
      ) : (
        <Button backgroundColor="black" color='white' onClick={openModal} _hover={{ backgroundColor: 'gray.600' }}> Connect Your Wallet</Button>
      )}
      {isModalOpen && <AccountsModal accounts={accounts} close={closeModal} />}
    </>
  );
}

export { Account };
