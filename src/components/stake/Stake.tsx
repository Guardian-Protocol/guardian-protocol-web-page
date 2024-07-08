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
    Flex,
    Grid,
    Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AccountsModal } from "components/layout/header/account/accounts-modal";
import { ContractCalls } from "contract_utils/ContractCalls";
import { AnyJson } from "@polkadot/types/types";
import VaraLogo from "../../assets/images/VaraLogo.png";
import Advertencia from '../../assets/images/icons/advertencia.svg';

type StakeProps = {
    account: any;
    lockedBalance: any;
    isModalOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
    accounts: any;
    contractCalls: ContractCalls
};

function Stake({
    account,
    lockedBalance,
    isModalOpen,
    openModal,
    closeModal,
    accounts, 
    contractCalls }: StakeProps) {

    const [stakeAmount, setStakeAmount] = useState(0);
    const [gas, setGas] = useState(0);

    const maxamountvara = () => {
        setStakeAmount(account?.balance.value);
    };

    const stakeVara = async () => {
        const payload: AnyJson = {
            stake: stakeAmount
        }

        await contractCalls.stake(payload, stakeAmount, gas);
    }

    useEffect(() => {}, [gas]);

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
                        <Grid templateColumns="1fr auto" gap="10">
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
                                Available: {account?.balance.value} VARA
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
                                        value={stakeAmount}
                                        onChange={(event) => {
                                            const { value } = event.target;
                                            if (!Number.isNaN(Number(value))) {
                                                setStakeAmount(Number(value));

                                                contractCalls.gasLimit("staking", { stake: Number(value) }, Number(value)).then((calculatedGas) => {
                                                    setGas(10000000000);
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
                                            onClick={maxamountvara}
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
                                    <Text>The cost of the Gas will be {String(gas / 100000000000)} VARA currently</Text>
                                </Flex>
                            </Td>
                        </Grid>

                        <Grid templateColumns="1fr auto" gap="1">
                            <Tr textColor="white">
                                <Td
                                    fontSize="18px"
                                    fontWeight="bold"
                                    style={{ color: "white" }}
                                >
                                    You will recieve
                                </Td>
                                <Td style={{ visibility: "hidden" }}>.</Td>
                            </Tr>
                            <Td
                                isNumeric
                                textAlign="end"
                                fontWeight="bold"
                                style={{ color: "white" }}
                                fontSize="18px"
                            >
                                {stakeAmount} gVARA
                            </Td>
                        </Grid>

                        <Tr style={{ visibility: "hidden" }}>
                            <Td>.</Td>
                            <Td>.</Td>
                            <Td isNumeric>.</Td>
                        </Tr>

                        <Grid templateColumns="1fr auto" gap="1">
                            <Tr textColor="white">
                                <Td fontSize="18px" style={{ color: "white" }}>
                                    Total Balance{" "}
                                </Td>
                                <Td style={{ visibility: "hidden" }}>.</Td>
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

                        <Grid templateColumns="1fr auto" gap="1">
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
                            </Td>
                        </Grid>

                        <Grid templateColumns="1fr auto" gap="1">
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

                        <Td
                            width="100%"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                        >
                            {account ? (
                                <Button
                                    colorScheme="teal"
                                    size="lg"
                                    style={{
                                        color: "black",
                                        background: "#F8AD18",
                                        width: "240px",
                                    }}
                                    onClick={stakeVara}
                                >
                                    Stake
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

export { Stake };