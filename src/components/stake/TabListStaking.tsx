import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ContractCalls } from "contract_utils/ContractCalls";
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
  contractCalls: ContractCalls;
};

function TabListStaking({
  account,
  lockedBalance,
  isModalOpen,
  openModal,
  closeModal,
  accounts,
  contractCalls
  }: TabListStakingProps) {
  
  const [tabIndex, setTabIndex] = useState(0);


  useEffect(() => { }, [tabIndex, account, lockedBalance, isModalOpen, accounts]);

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
        <Stake 
        account={account} 
        lockedBalance={lockedBalance} 
        isModalOpen={isModalOpen} 
        openModal={openModal} 
        closeModal={closeModal} 
        accounts={accounts} 
        contractCalls={contractCalls}
        />

        <Unstake 
        account={account} 
        lockedBalance={lockedBalance} 
        isModalOpen={isModalOpen} 
        openModal={openModal} closeModal={closeModal} 
        accounts={accounts} 
        contractCalls={contractCalls}
        />

        <Withdraw contractCalls={contractCalls} />
        <History contractCalls={contractCalls} />
      </TabPanels>

    </Tabs>
  )
}

export { TabListStaking };

