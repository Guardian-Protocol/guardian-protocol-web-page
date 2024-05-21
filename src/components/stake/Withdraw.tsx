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

function Withdraw({contractCalls }: WithdrawProps) {
  
  const [unestakeHistory, setUnestakeHistory] = useState<any[]>([
      {
        amount: "88",
        liberationEra: "0",
        liberationDays: "7",
        unestakeId: "0"
      }
    ]);

  useEffect(() => {
    contractCalls.getUnestakeHistory().then((history) => {
      if(history !== 0) {
        setUnestakeHistory(history)
      }
    });
  }, [contractCalls])


  if (unestakeHistory[0]?.liberationEra === "0") {
    return (
      <TabPanel
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Text fontSize="lg" fontWeight="bold">You have no Unestakes made</Text>
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
              colorScheme="teal"
              size="lg"
              style={{
                color: "black",
                background: "#F8AD18",
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