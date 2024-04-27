import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Stake } from "./Stake";
import { Withdraw } from "./Withdraw";
import { Unstake } from "./Unstake";
import { History } from "./History";



type TabListStakingProps = {
  account: any;
  lockedBalance: any;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  accounts: any;

  stakeamount: any;
  setStakeamount: React.Dispatch<React.SetStateAction<any>>;
  stake: () => void;
  AmountInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  maxamountvara: () => void;
  stakeGas: any;
  setStakeGas: React.Dispatch<React.SetStateAction<any>>;

  unstakeamount: any;
  setUnstakeamount: React.Dispatch<React.SetStateAction<any>>;
  unstake: () => void;
  maxamountvaraUnstake: () => void;
  AmountInputChangeUnstake : (event: React.ChangeEvent<HTMLInputElement>) => void;
  unstakeGas: any;
  setUnstakeGas: React.Dispatch<React.SetStateAction<any>>;

  unestakeHistory: any[][];
  transactionHistory: any[];
};

function TabListStaking({
  stakeamount,
  account,
  lockedBalance,
  isModalOpen,
  AmountInputChange,
  setStakeamount,
  maxamountvara,
  stake,
  openModal,
  closeModal,
  accounts,
  unstakeamount,
  setUnstakeamount,
  unstake, maxamountvaraUnstake, AmountInputChangeUnstake, unestakeHistory, transactionHistory, stakeGas, setStakeGas, unstakeGas, setUnstakeGas}: TabListStakingProps) {
  const [tabIndex, setTabIndex] = useState(0);


  useEffect(() => {
    console.log(`Se seleccionó la pestaña ${tabIndex}`);
  }, [tabIndex, account, lockedBalance, stakeamount, isModalOpen, accounts]);

  const handleTabChange = (index: any) => {
    setTabIndex(index);
  };

  return (
    <Tabs
      isFitted
      variant="enclosed"
      style={{ color: "white", border: "4px solid #F8AD18" }}
      w="800px"
      backgroundColor="black"
      borderRadius="30px"
      onChange={handleTabChange}
      minHeight="490px"
    >
      <TabList mb="1em" h="60px">
        <Tab
          _selected={{ bg: "#F8AD18", color: "black" }}
          borderBottom="3px solid #F8AD18"
          borderTopLeftRadius="24px"
          borderTopRightRadius="0"
          color="white"
          backgroundColor="black"
          fontSize="18px"
        >
          Stake
        </Tab>
        <Tab
          _selected={{ bg: "#F8AD18", color: "black" }}
          borderBottom="3px solid #F8AD18"
          borderRight="3px solid #F8AD18"
          borderLeft="3px solid #F8AD18"
          borderRadius="0"
          color="white"
          backgroundColor="black"
          fontSize="18px"
        >
          Unstake
        </Tab>
        <Tab
          _selected={{ bg: "#F8AD18", color: "black" }}
          borderBottom="3px solid #F8AD18"
          borderRight="3px solid #F8AD18"
          borderLeft="3px solid #F8AD18"
          borderRadius="0"
          color="white"
          backgroundColor="black"
          fontSize="18px"
        >
          Withdraw
        </Tab>
        <Tab
          _selected={{ bg: "#F8AD18", color: "black" }}
          borderBottom="3px solid #F8AD18 "
          borderTopLeftRadius="0px"
          borderTopRightRadius="24px"
          color="white"
          backgroundColor="black"
          fontSize="18px"
        >
          History
        </Tab>
      </TabList>

      <TabPanels>
        <Stake stakeamount={stakeamount} account={account} lockedBalance={lockedBalance} isModalOpen={isModalOpen} AmountInputChange={AmountInputChange} setStakeamount={setStakeamount} maxamountvara={maxamountvara} stake={stake} openModal={openModal} closeModal={closeModal} accounts={accounts} stakeGas={stakeGas} setStakeGas={setStakeGas}/>

        <Unstake account={account} lockedBalance={lockedBalance} isModalOpen={isModalOpen} maxamountvaraUnstake={maxamountvaraUnstake} AmountInputChangeUnstake={AmountInputChangeUnstake} openModal={openModal} closeModal={closeModal} accounts={accounts} unstakeamount={unstakeamount} setUnstakeamount={setUnstakeamount} unstake={unstake} unstakeGas={unstakeGas} setUnstakeGas={setUnstakeGas}/>

        <Withdraw unestakeHistory={unestakeHistory} />
        <History transactionHistory={transactionHistory} />
      </TabPanels>

    </Tabs>
  )
}

export { TabListStaking };

