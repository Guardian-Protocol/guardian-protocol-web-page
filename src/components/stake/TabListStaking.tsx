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
  stakeamount: any;
  account: any;
  lockedBalance: any;
  isModalOpen: boolean;
  AmountInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setStakeamount: React.Dispatch<React.SetStateAction<any>>;
  maxamountvara: () => void;
  stake: () => void;
  openModal: () => void;
  closeModal: () => void;
  accounts: any;
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
  accounts }: TabListStakingProps) {
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
      h="490px"
      backgroundColor="black"
      borderRadius="30px"
      onChange={handleTabChange}
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
        <Stake stakeamount={stakeamount} account={account} lockedBalance={lockedBalance} isModalOpen={isModalOpen} AmountInputChange={AmountInputChange} setStakeamount={setStakeamount} maxamountvara={maxamountvara} stake={stake} openModal={openModal} closeModal={closeModal} accounts={accounts} />
        <Unstake account={account} lockedBalance={lockedBalance} stakeamount={stakeamount} AmountInputChange={AmountInputChange} setStakeamount={setStakeamount} maxamountvara={maxamountvara} />
        <Withdraw stakeamount={stakeamount} AmountInputChange={AmountInputChange} setStakeamount={setStakeamount} maxamountvara={maxamountvara} />
        <History />
      </TabPanels>

    </Tabs>
  )
}

export { TabListStaking };

