import {
  TabPanel,
  Text,
  Button,
  Image,
  Box,
  Flex,
} from "@chakra-ui/react";
import { ContractCalls } from "contract_utils/ContractCalls";
import { useEffect, useState } from "react";
import VaraLogo from "../../assets/images/VaraLogo.png";

type WithdrawProps = {
  contractCalls: ContractCalls;
};

function Withdraw({contractCalls}: WithdrawProps) {
  
  const [unestakeHistory, setUnestakeHistory] = useState<any[]>([
    {
      amount: "88",
      liberationEra: "0",
      liberationDays: "7",
      unestakeId: "0"
    }
  ]);

  const [currentEra, setCurrentEra] = useState<number>(0);
  const [isHistoryEmpty, setIsHistoryEmpty] = useState<boolean>(false);

  const handleWithdraw = (unestakeId: number, amount: number) => {
    contractCalls.withdraw(unestakeId, amount).then((response) => {
      console.log(response);
    });
  }

  useEffect(() => {
    contractCalls.getUnestakeHistory().then((history) => {
      if(history !== 0) {

        if (history.length === 0) {
          setIsHistoryEmpty(true);
        }

        setUnestakeHistory(history)
      }
    });

    contractCalls.getCurrentEra().then((era) => {
      setCurrentEra(era);
    });
  }, [contractCalls])


  if (isHistoryEmpty) {
    return (
      <TabPanel
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Text fontSize="lg" fontWeight="bold">There is no unestakes</Text>
      </TabPanel>
    );
  }

  return (
    <TabPanel
      display="flex"
      justifyContent="center"
      alignItems="center"
    > 
    <Flex direction="column" w="100%">
    {unestakeHistory.map((history, index) => (
        <Box
          key={history.unestakeId} 
          borderWidth="3px"
          borderRadius="lg"
          overflow="hidden"
          w="100%"
          borderColor="#F8AD18"
          bg="#131111"
          mt={index > 0 ? 4 : 0}
        >
          <Flex justify="space-between" p={5} align="center" w="100%">
            <Flex align="center" w="70%" justify="space-between">
              <Flex direction="column" justify="space-between">
                <Flex align="center">
                  <Text fontSize="lg" fontWeight="bold">Request Amount </Text>
                </Flex>
                <Flex align="center">
                  <Text fontSize="lg" fontWeight="bold">Remaining Eras </Text>
                </Flex>
              </Flex>
              <Flex direction="column" alignItems="flex-end">
                <Flex align="center">
                  <Text fontSize="lg" fontWeight="bold">{history?.amount}</Text>
                  <Image src={VaraLogo} boxSize="40px" ml={2} />
                </Flex>
                <Flex align="center">
                  <Text fontSize="lg" fontWeight="bold">{history?.liberationEra}</Text>
                  <Text ml={4} fontSize="lg" fontWeight="bold">Eras</Text>
                </Flex>
              </Flex>
            </Flex>
            <Button
              onClick={() =>{
                if (currentEra > history?.liberationEra) {
                  handleWithdraw(history?.unestakeId, history?.amount);
                }
              }}
              colorScheme="teal"
              size="lg"
              style={{
                color: "black",
                background: (currentEra > history?.liberationEra) ? "#F8AD18" : "#38A169",
                width: "140px",
              }}
            >
              Claim
            </Button>
          </Flex>
        </Box>
      ))}
    </Flex>
      
    </TabPanel>
  )
}

export { Withdraw };