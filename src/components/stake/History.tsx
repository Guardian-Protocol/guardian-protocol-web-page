import {

    TabPanel,
    Text,
    Image,
    Box,
    Flex,

} from "@chakra-ui/react";
import VaraLogo from "../../assets/images/VaraLogo.png";

function History() {

    return (
        <TabPanel
            display="flex"
            justifyContent="center"
            alignItems="center"
        >

            <Box borderWidth="3px" borderRadius="lg" overflow="hidden" w="100%" borderColor="#F8AD18" bg="#131111">
                <Flex justify="space-between" p={5} align="center" w="100%">
                    <Flex align="center" w="70%" justify="space-between">
                        <Flex direction="column" justify="space-between">
                            <Flex align="center">
                                <Text fontSize="lg" fontWeight="bold">Request Amount</Text>
                            </Flex>
                            <Flex align="center">
                                <Text fontSize="lg" fontWeight="bold">Remaining Eras </Text>
                            </Flex>
                        </Flex>
                        <Flex direction="column" alignItems="flex-end">
                            <Flex align="center">
                                <Text fontSize="lg" fontWeight="bold">4.00032</Text>
                                <Image src={VaraLogo} boxSize="40px" ml={2} />

                            </Flex>
                            <Flex align="center">
                                <Text fontSize="lg" fontWeight="bold">10 </Text>
                                <Text ml={4} fontSize="lg" fontWeight="bold">Eras</Text>
                            </Flex>
                        </Flex>

                    </Flex>
                    <Flex align="center" w="30%" justifyContent="center">
                        <Text fontSize="lg" fontWeight="bold">Unstake</Text>
                    </Flex>
                </Flex>
            </Box>
        </TabPanel>
    )
}

export { History };