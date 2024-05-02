import { GridItem, Center, Box } from "@chakra-ui/react";
import { useApi, useAlert, useAccount } from "@gear-js/react-hooks";
import { useState, useEffect } from "react";
import { ContractCalls } from "contract_utils/ContractCalls";
import { TabListStaking } from "../../components/stake/TabListStaking";
import XBackground from "../../assets/images/XBackground.svg";

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { api } = useApi();
  const { accounts, account } = useAccount();
  const alert = useAlert();

  const contractCalls = new ContractCalls(api, account!, accounts, alert);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {}, [api, account, accounts]);
  useEffect(() => {
    document.documentElement.style.setProperty("--background-color", "#131111");
  }, []);
  return (
    <GridItem
      w="100%"
      minH="90vh"
      style={{
        backgroundImage: `url(${XBackground})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover", 
        backgroundPosition: "center",
      }}
    >
      <Box h="90px" />
      <Center>
        <TabListStaking
          account={account}
          lockedBalance={0}
          isModalOpen={isModalOpen}
          openModal={openModal}
          closeModal={closeModal}
          accounts={accounts}
          contractCalls={contractCalls}
        />
      </Center>
      <Box h="90px" />
    </GridItem>
  );
}

export { Home };
