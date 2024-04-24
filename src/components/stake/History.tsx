import {

    TabPanel,
    Text,
    Image,
    Box,
    Flex,

} from "@chakra-ui/react";
import VaraLogo from "../../assets/images/VaraLogo.png";

type HistoryProps = {
    unestakeHistory: any[][];
};

function History({ unestakeHistory }: HistoryProps) {

    return (
        <TabPanel
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
            <Flex direction="column" w="100%">
                {unestakeHistory.map((history, index) => (
                    <Box key={index} borderWidth="3px" borderRadius="lg" overflow="hidden" w="100%" borderColor="#F8AD18" bg="#131111" mt={index > 0 ? 4 : 0}>
                        <Flex justify="space-between" p={5} align="center" w="100%">
                            <Flex align="center" w="70%" justify="space-between">
                                <Flex direction="column" justify="space-between">
                                    <Flex align="center">
                                        <Text fontSize="lg" fontWeight="bold">Request Amount</Text>
                                    </Flex>
                                </Flex>
                                <Flex direction="column" alignItems="flex-end">
                                    <Flex align="center">
                                        <Text fontSize="lg" fontWeight="bold">{history[1]?.amount}</Text>
                                        <Image src={VaraLogo} boxSize="40px" ml={2} />

                                    </Flex>
                                </Flex>

                            </Flex>
                            <Flex align="center" w="30%" justifyContent="center">
                                <Text fontSize="lg" fontWeight="bold">Unstake</Text>
                            </Flex>
                        </Flex>
                    </Box>
                ))}
            </Flex>
        </TabPanel>
    )
}

export { History };