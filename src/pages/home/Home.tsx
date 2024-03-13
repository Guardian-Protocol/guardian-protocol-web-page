import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
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
  GridItem,
  Center,
  Grid,
  Box,
  Text,
} from "@chakra-ui/react";

import { web3FromSource } from "@polkadot/extension-dapp";
import { useApi, useAlert, useAccount } from "@gear-js/react-hooks";
import { getStateMetadata } from "@gear-js/api";
import { useState, useEffect } from "react";
import { getLockedBalance } from "contract_utils/GetLockedBalance";
import { ExtrinsicFactory } from "contract_utils/ExtrinsicFactory";
import { useWasmMetadata } from "contract_utils/WasmMetadata";
import { AccountsModal } from "../../components/layout/header/account/accounts-modal/AccountsModal"
import stateWasm from "../../contract_metadata/state.meta.wasm";
import XBackground from "../../assets/images/XBackground.svg";
import VaraLogo from "../../assets/images/VaraLogo.png";

function Home() {
  const [stakeamount, setStakeamount] = useState<any | undefined>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lockedBalance, setLockedBalance] = useState<any | undefined>(0);
  const [isMessageSuccess, setIsMessageSuccess] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [metaSate, setMetaState] = useState<any>();

  const { api } = useApi();
  const { buffer } = useWasmMetadata(stateWasm);  
  const { accounts, account } = useAccount();

  const alert = useAlert();
  const stakemessage = { stake: Math.floor(stakeamount) };
  const extFactory = new ExtrinsicFactory(accounts, account, api);
  
  const stake = async () => {
    setIsFirstRender(false);
    const mintMessageFactory = await extFactory.messageExtrinsic(stakemessage); 
    const injector = await web3FromSource(accounts[0].meta.source);

    const alertStyle = {
      style: {
        color: "white",
      }
    }
    
    mintMessageFactory?.signAndSend(
      account?.address ?? alert.error("No account found"),  
      { signer: injector.signer },
      ({ status }) => {
        if (status.isInBlock) {
          alert.success(status.asInBlock.toHuman()?.toString(), { ...alertStyle });
        } else if (status.isFinalized) {
          alert.success(status.type, { ...alertStyle });
          setIsMessageSuccess(true);
          
        } 
      }
    )
  };
  
  const maxamountvara = () => {
    setStakeamount(account?.balance.value);
  };
  
  const AmountInputChange = async (event: any) => {
    setStakeamount(event.target.value);
  };
  
  const openModal = () => {
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const locked = () => {
    getLockedBalance(buffer, api, metaSate, account).then((balance) => {
      try {
        setLockedBalance((balance.toJSON() as { [index: string]: any }).totalLocketBalance.total);
        console.log("soy la funcion") //I don’t know why this breaks the code when it’s deleted
      } catch {
        setLockedBalance(0);
      }
    });
  }
  useEffect(() => {
    document.documentElement.style.setProperty("--background-color", "#131111");
    if (buffer !== undefined) {
      getStateMetadata(buffer as Buffer).then((meta) => {
        setMetaState(meta);
      });  
    }
  }, [buffer]);

  useEffect(() => {
    setIsFirstRender(true)
    if (buffer !== undefined && api && metaSate && isMessageSuccess) {
      locked();
      setIsMessageSuccess(false);
    }
    if (buffer !== undefined && api && metaSate && isFirstRender) {
      locked();
    }
    
  }, [account, buffer, api, metaSate, isMessageSuccess]);

  return (
    <GridItem
      w="100%"
      h="90vh"
      style={{
        backgroundImage: `url(${XBackground})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "120%", // Ajusta este valor según sea necesario
        backgroundPosition: "50% 80%", // Ajusta estos valores según sea necesario
      }}
    >
      <Box h="90px" />
      <Center>
        <Tabs
          isFitted
          variant="enclosed"
          style={{ color: "white", border: "4px solid #F8AD18" }}
          w="800px"
          h="490px"
          backgroundColor="black"
          borderRadius="30px"
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
              borderBottom="3px solid #F8AD18 "
              borderTopLeftRadius="0px"
              borderTopRightRadius="24px"
              color="white"
              backgroundColor="black"
              fontSize="18px"
            >
              Withdraw
            </Tab>
          </TabList>

          <TabPanels>
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
                            value={stakeamount}
                            onChange={(event) => {
                              const { value } = event.target;
                              if (!Number.isNaN(Number(value))) {
                                AmountInputChange(event);
                              }
                            }}
                            borderWidth="3px"
                            display="flex"
                            alignContent="center"
                            onClick={() => {
                              if (stakeamount === "0") {
                                setStakeamount("");
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
                        {stakeamount} gVARA
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
                        { parseFloat(account?.balance.value as string) + lockedBalance }
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
                        { lockedBalance }
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
                        { account?.balance.value }
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
                          onClick={stake}
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
                        Available: gVARA
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
                            value={stakeamount}
                            onChange={(event) => {
                              const { value } = event.target;
                              if (!Number.isNaN(Number(value))) {
                                AmountInputChange(event);
                              }
                            }}
                            borderWidth="3px"
                            display="flex"
                            alignContent="center"
                            onClick={() => {
                              if (stakeamount === "0") {
                                setStakeamount("");
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
                        {stakeamount} VARA
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
                        4.00%
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
                        0.0%
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
                        10%
                      </Td>
                    </Grid>

                    <Td width="100%" display="flex" justifyContent="center">
                      <Button
                        colorScheme="teal"
                        size="lg"
                        style={{
                          color: "black",
                          background: "#F8AD18",
                          width: "240px",
                        }}
                        onClick={() => {}}
                      >
                        Unstake
                      </Button>
                    </Td>
                  </Tbody>
                </Table>
              </TableContainer>
            </TabPanel>

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
                    <Grid templateColumns="1fr auto" gap="4">
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
                        Available: gVARA
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
                            value={stakeamount}
                            onChange={(event) => {
                              const { value } = event.target;
                              if (!Number.isNaN(Number(value))) {
                                AmountInputChange(event);
                              }
                            }}
                            borderWidth="3px"
                            display="flex"
                            alignContent="center"
                            onClick={() => {
                              if (stakeamount === "0") {
                                setStakeamount("");
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
                        <Td style={{ visibility: "hidden" }}>.</Td>
                      </Tr>
                      <Td
                        fontSize="18px"
                        isNumeric
                        textAlign="end"
                        style={{ color: "white" }}
                      >
                        4.00%
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
                        0.0%
                      </Td>
                    </Grid>

                    <Grid templateColumns="1fr auto" gap="4">
                      <Tr textColor="white">
                        <Td fontSize="18px" style={{ color: "white" }}>
                          Available
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
                        10%
                      </Td>
                    </Grid>

                    <Td width="100%" display="flex" justifyContent="center">
                      <Button
                        colorScheme="teal"
                        size="lg"
                        style={{
                          color: "black",
                          background: "#F8AD18",
                          width: "240px",
                        }}
                        onClick={() => {}}
                      >
                        Withdraw
                      </Button>
                    </Td>
                  </Tbody>
                </Table>
              </TableContainer>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Center>
      <Box h="60px" />
    </GridItem>
  );
}

export { Home };
