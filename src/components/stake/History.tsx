import {
    TabPanel,
    Text,
    Image,
    Box,
    Flex,
} from "@chakra-ui/react";
import { useState } from "react";
import { ContractCalls } from "contract_utils/ContractCalls";
import VaraLogo from "../../assets/images/VaraLogo.png";

type HistoryProps = {
    contractCalls: ContractCalls;
};

function History({contractCalls}: HistoryProps) {
    const [transactionHistory, setTransactionHistory] = useState<any[]>([
        {
            transactionAmount: "0",
            transactionType: "Stake",
            transactionTime: "0"
        }
    ]);

    contractCalls.getHistory().then((history) => {
        if (history !== "No history found") {
            setTransactionHistory(history.transactionHistory);
        }
    });

    if (transactionHistory[0]?.transactionAmount === "0") {
        return (
          <TabPanel
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Text fontSize="lg" fontWeight="bold">You have no transaction history</Text>
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
                {transactionHistory.map((history, index) => (
                    <Box key={history.transactionTime} borderWidth="3px" borderRadius="lg" overflow="hidden" w="100%" borderColor="#F8AD18" bg="#131111" mt={index > 0 ? 4 : 0}>
                        <Flex justify="space-between" p={5} align="center" w="100%">
                            <Flex align="center" w="70%" justify="space-between">
                                <Flex direction="column" justify="space-between">
                                    <Flex align="center">
                                        <Text fontSize="lg" fontWeight="bold">Request Amount</Text>
                                    </Flex>
                                </Flex>
                                <Flex direction="column" alignItems="flex-end">
                                    <Flex align="center">
                                        <Text fontSize="lg" fontWeight="bold">{history.transactionAmount}</Text>
                                        <Image src={VaraLogo} boxSize="40px" ml={2} />

                                    </Flex>
                                </Flex>

                            </Flex>
                            <Flex align="center" w="30%" justifyContent="center">
                                <Text fontSize="lg" fontWeight="bold">{history.transactionType}</Text>
                            </Flex>
                        </Flex>
                    </Box>
                ))}
            </Flex>
        </TabPanel>
    )
}

export { History };