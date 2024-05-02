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
import { useEffect, useState } from "react";
import { ContractCalls } from "contract_utils/ContractCalls";
import { AnyJson } from "@polkadot/types/types";
import VaraLogo from "../../assets/images/VaraLogo.png";
import Advertencia from '../../assets/images/icons/advertencia.svg';

type UnstakeProps = {
    account: any;
    lockedBalance: any;
    isModalOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
    accounts: any;
    contractCalls: ContractCalls;
};

function Unstake({ 
    openModal, 
    closeModal, 
    account, 
    accounts, 
    lockedBalance, 
    isModalOpen, 
    contractCalls }: UnstakeProps) {
    
    const [unstakeAmount, setUnstakeAmount] = useState(0);
    const [approveGas, setApproveGas] = useState(0);

    const maxamountvaraUnstake = () => {
        setUnstakeAmount(account?.balance.value);
    };

    const unstakeVara = async () => {
        const payload: AnyJson = {
            unestake: unstakeAmount
        }

        const approvePayload: AnyJson = {
            "Approve": {
                "to": process.env.REACT_PROGRAM_SOURCE,
                "amount": unstakeAmount
            },
        }
    
        await contractCalls.unstake(payload, approvePayload, 0, approveGas);
    }
    
    useEffect(() => {
        console.log(approveGas)
    }, [approveGas]);

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
                                        onChange={(event) => {
                                            const { value } = event.target;
                                            if (!Number.isNaN(Number(value))) {    
                                                setUnstakeAmount(Number(value));

                                                const approvePayload: AnyJson = {
                                                    "Approve": {
                                                        "to": process.env.REACT_FT_PROGRAM_SOURCE,
                                                        "amount": unstakeAmount
                                                    },
                                                }

                                                contractCalls.gasLimit("ft", approvePayload, Number(value)).then((calculatedGas) => {
                                                    setApproveGas(calculatedGas);
                                                });
                                            }
                                        }}
                                        borderWidth="3px"
                                        display="flex"
                                        alignContent="center"
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

                        <Grid templateColumns="1fr auto" gap="1">
                            <Td isNumeric color="white" fontSize="md">
                                <Flex align="center" justifyContent="flex-end">
                                    <Image src={Advertencia} boxSize="30px" mr={2} />
                                    <Text>The cost of the Gas will be {String((approveGas / 100000000000) * 2)} VARA currently</Text>
                                </Flex>
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
                                {unstakeAmount} VARA
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
                                    onClick={unstakeVara}
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