import {

    TabPanel,
    Table,
    Tbody,
    Tr,
    Td,
    TableContainer,
    Button,
    Input,
    InputGroup,
    InputRightElement,
    InputLeftElement,
    Image,
    Text,
    Grid,
    Flex,
    Box,

} from "@chakra-ui/react";
import { AccountsModal } from "components/layout/header/account/accounts-modal";
import VaraLogo from "../../assets/images/VaraLogo.png";
import Advertencia from '../../assets/images/icons/advertencia.svg';



type UnstakeProps = {
    account: any;
    lockedBalance: any;
    isModalOpen: boolean;
    AmountInputChangeUnstake: (event: React.ChangeEvent<HTMLInputElement>) => void;
    maxamountvaraUnstake: () => void;
    openModal: () => void;
    closeModal: () => void;
    accounts: any;

    unstakeamount: any;
    setUnstakeamount: React.Dispatch<React.SetStateAction<any>>;
    unstake: () => void;
};

function Unstake({ unstakeamount, AmountInputChangeUnstake, setUnstakeamount, maxamountvaraUnstake, openModal, closeModal, account, accounts, lockedBalance, isModalOpen, unstake }: UnstakeProps) {

    return (
        <TabPanel
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
            <TableContainer>
                <Table
                    variant="simple"
                    colorScheme="teal"
                    className="table-content"
                    w="100%"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Tbody>
                        <Grid templateColumns="1fr auto" gap="1">
                            <Tr
                                id="espacio"
                                style={{ marginBottom: "3px !important" }}
                            >
                                <Td fontSize="18px" style={{ color: "white" }}>
                                    Amount
                                </Td>
                                <Td style={{ visibility: "hidden" }}>.</Td>
                            </Tr>
                            <Td
                                fontSize="18px"
                                isNumeric
                                textAlign="end"
                                style={{ color: "white" }}
                            >
                                Available: {account?.balance.value} gVARA
                            </Td>
                        </Grid>

                        <Grid templateColumns="1fr auto" gap="1">
                            <Td position="revert">
                                <InputGroup size="lg">
                                    <InputLeftElement
                                        pointerEvents="none"
                                        paddingTop="10px"
                                        w="90px"
                                    >
                                        <Text
                                            fontFamily="'Consolas', italic"
                                            color="turquoise"
                                        >
                                            g
                                        </Text>
                                        <Image src={VaraLogo} h="60px" w="60px" />
                                    </InputLeftElement>
                                    <Input
                                        paddingLeft="78px"
                                        w="700px"
                                        h="60px"
                                        type="text"
                                        borderColor="#F8AD30"
                                        borderRadius="20px"
                                        focusBorderColor="#F8AD18"
                                        color="white"
                                        backgroundColor="#131111"
                                        _hover={{
                                            borderColor: "#F8AD18",
                                        }}
                                        value={unstakeamount}
                                        onChange={(event) => {
                                            const { value } = event.target;
                                            if (!Number.isNaN(Number(value))) {
                                                AmountInputChangeUnstake(event);
                                            }
                                        }}
                                        borderWidth="3px"
                                        display="flex"
                                        alignContent="center"
                                        onClick={() => {
                                            if (unstakeamount === "0") {
                                                setUnstakeamount("");
                                            }
                                        }}
                                    />
                                    <InputRightElement
                                        paddingRight="20px"
                                        paddingTop="10px"
                                    >
                                        <Button
                                            h="60px"
                                            size="lg"
                                            onClick={maxamountvaraUnstake}
                                            backgroundColor="transparent"
                                            color="white"
                                            _hover={{
                                                backgroundColor: "transparent",
                                            }}
                                        >
                                            MAX
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </Td>
                        </Grid>

                        <Grid templateColumns="1fr auto" gap="4">
                            <Tr textColor="white">
                                <Td
                                    fontSize="18px"
                                    fontWeight="bold"
                                    style={{ color: "white" }}
                                >
                                    You will recieve
                                </Td>
                                <Td style={{ visibility: "hidden", color: "white" }}>
                                    .
                                </Td>
                            </Tr>
                            <Td
                                isNumeric
                                textAlign="end"
                                fontWeight="bold"
                                style={{ color: "white" }}
                                fontSize="18px"
                            >
                                {unstakeamount} VARA
                            </Td>
                        </Grid>

                        <Tr style={{ visibility: "hidden" }}>
                            <Td style={{ color: "white" }}>.</Td>
                            <Td style={{ color: "white" }}>.</Td>
                            <Td isNumeric>.</Td>
                        </Tr>

                        <Grid templateColumns="1fr auto" gap="4">
                            <Tr textColor="white">
                                <Td fontSize="18px" style={{ color: "white" }}>
                                    Total Balance
                                </Td>
                                <Td style={{ visibility: "hidden", color: "white" }}>
                                    .
                                </Td>
                            </Tr>
                            <Td
                                fontSize="18px"
                                isNumeric
                                textAlign="end"
                                style={{ color: "white" }}
                            >
                                {parseFloat(account?.balance.value as string) + lockedBalance}
                            </Td>
                        </Grid>

                        <Grid templateColumns="1fr auto" gap="4">
                            <Tr textColor="white">
                                <Td fontSize="18px" style={{ color: "white" }}>
                                    Locked
                                </Td>
                                <Td style={{ visibility: "hidden" }}>.</Td>
                            </Tr>
                            <Td
                                fontSize="18px"
                                isNumeric
                                textAlign="end"
                                style={{ color: "white" }}
                            >
                                {lockedBalance}
                                {lockedBalance}
                            </Td>
                        </Grid>

                        <Grid templateColumns="1fr auto" gap="4">
                            <Tr textColor="white">
                                <Td fontSize="18px" style={{ color: "white" }}>
                                    Available
                                </Td>
                                <Td style={{ visibility: "hidden" }}>.</Td>
                            </Tr>
                            <Td
                                fontSize="18px"
                                isNumeric
                                textAlign="end"
                                style={{ color: "white" }}
                            >
                                {account?.balance.value}
                            </Td>
                        </Grid>
                        <TabPanel
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Flex direction="column" w="100%">
                                <Box borderWidth="3px" borderRadius="lg" overflow="hidden" w="100%" borderColor="#F8AD18" bg="#131111" mt='5'>
                                    <Flex justify="space-between" p={5} align="center" w="100%">
                                        <Flex align="center" justifyContent="center" >
                                            <Image src={Advertencia} boxSize="45px" mr={6} />
                                            <Text fontSize="md">VARA will be available for withdrawal in 14 Eras (6-7 days)</Text>
                                        </Flex>
                                    </Flex>
                                </Box>
                            </Flex>
                        </TabPanel>
                        <Td width="100%" display="flex" justifyContent="center">
                            {account ? (
                                <Button
                                    colorScheme="teal"
                                    size="lg"
                                    style={{
                                        color: "black",
                                        background: "#F8AD18",
                                        width: "240px",
                                    }}
                                    onClick={unstake}
                                >
                                    Unstake
                                </Button>
                            ) : (
                                <Button
                                    colorScheme="teal"
                                    size="lg"
                                    style={{
                                        color: "black",
                                        background: "#F8AD18",
                                        width: "240px",
                                    }}
                                    onClick={openModal}
                                >
                                    Connect Wallet
                                </Button>
                            )}
                            {isModalOpen && <AccountsModal accounts={accounts} close={closeModal} />}
                        </Td>
                    </Tbody>
                </Table>
            </TableContainer>
        </TabPanel>
    )
}

export { Unstake };