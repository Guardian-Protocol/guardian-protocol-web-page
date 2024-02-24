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
  Flex,
  Grid,
  Box,
  Text
} from "@chakra-ui/react";
import { useApi, useAlert, useAccount } from "@gear-js/react-hooks";
import { useState, useEffect } from "react";
import { web3FromSource } from "@polkadot/extension-dapp";
import { ProgramMetadata, encodeAddress } from "@gear-js/api";
import VaraLogo from "../../assets/images/VaraLogo.png";
import XBackground from "../../assets/images/XBackground.svg";

function Home() {
  useEffect(() => {
    document.documentElement.style.setProperty("--background-color", "#131111");
  }, []);

  const alert = useAlert();
  const { accounts, account } = useAccount();
  const { api } = useApi();

  const [gVARAbalance, setGVARAbalance] = useState<any | undefined>(0);

  const [fullState, setFullState] = useState<any | undefined>({});

  const Localbalances = fullState.balances || [];

  // Add your programID
  const programIDFT =
    "0xe609506126c6eedd004d964396c52668420916c7f0164af50b40652175ca2641";

  // Add your metadata.txt
  const metaFT =
    "00010001000000000001030000000107000000000000000108000000a90b3400081466745f696f28496e6974436f6e66696700000c01106e616d65040118537472696e6700011873796d626f6c040118537472696e67000120646563696d616c73080108753800000400000502000800000503000c081466745f696f204654416374696f6e000118104d696e74040010011075313238000000104275726e040010011075313238000100205472616e736665720c011066726f6d14011c4163746f724964000108746f14011c4163746f724964000118616d6f756e74100110753132380002001c417070726f7665080108746f14011c4163746f724964000118616d6f756e74100110753132380003002c546f74616c537570706c790004002442616c616e63654f66040014011c4163746f724964000500001000000507001410106773746418636f6d6d6f6e287072696d6974697665731c4163746f724964000004001801205b75383b2033325d0000180000032000000008001c081466745f696f1c46544576656e74000110205472616e736665720c011066726f6d14011c4163746f724964000108746f14011c4163746f724964000118616d6f756e74100110753132380000001c417070726f76650c011066726f6d14011c4163746f724964000108746f14011c4163746f724964000118616d6f756e74100110753132380001002c546f74616c537570706c790400100110753132380002001c42616c616e63650400100110753132380003000020081466745f696f3c496f46756e6769626c65546f6b656e00001801106e616d65040118537472696e6700011873796d626f6c040118537472696e67000130746f74616c5f737570706c791001107531323800012062616c616e6365732401505665633c284163746f7249642c2075313238293e000128616c6c6f77616e6365732c01905665633c284163746f7249642c205665633c284163746f7249642c2075313238293e293e000120646563696d616c730801087538000024000002280028000004081410002c00000230003000000408142400";

  const metadataFT = ProgramMetadata.from(metaFT);

  const getBalance = () => {
    api.programState
      .read({ programId: programIDFT, payload: "" }, metadataFT)
      .then((result) => {
        setFullState(result.toJSON());
      })
      .catch(({ message }: Error) => alert.error(message));

    Localbalances.some(([address, balances]: any) => {
      if (encodeAddress(address) === account?.address) {
        setGVARAbalance(balances);

        return true;
      }
      return false;
    });
  };

  useEffect(() => {
    getBalance();
  });

  const [stakeamount, setStakeamount] = useState<any | undefined>(0);

  // Add your programID
  const programID =
    "0x604379d79c45a4ef9e66d0ea4745e7f413dc58ccda7aa73653ddb1090c22712e";

  // Add your metadata.txt
  const meta =
    "00010001000000000001040000000106000000000000000107000000b5072c000808696f18496e69744654000004013466745f70726f6772616d5f696404011c4163746f72496400000410106773746418636f6d6d6f6e287072696d6974697665731c4163746f724964000004000801205b75383b2033325d000008000003200000000c000c0000050300100808696f444c69717569645374616b65416374696f6e000108145374616b6504001401107531323800000020576974686472617704001401107531323800010000140000050700180808696f404c69717569645374616b654576656e740001083c5375636365737366756c5374616b65000000445375636365737366756c556e7374616b65000100001c0808696f34496f4c69717569645374616b6500001c01146f776e657204011c4163746f7249640001547374616b696e675f746f6b656e5f6164647265737304011c4163746f72496400015876617261746f6b656e5f746f74616c5f7374616b65641401107531323800014c746f74616c5f74696d655f70726f746f636f6c20010c7536340001606776617261746f6b656e735f7265776172645f746f74616c14011075313238000144646973747269627574696f6e5f74696d6520010c75363400011475736572732401505665633c284163746f7249642c2075313238293e00002000000506002400000228002800000408041400";

  const metadata = ProgramMetadata.from(meta);

  const unstakemessage = { withdraw: Math.floor(stakeamount) };

  const rewardsemessage = { withdraw: Math.floor(stakeamount) };

  const stakemessage = { stake: Math.floor(stakeamount) };

  const maxamountvara = () => {
    setStakeamount(account?.balance.value);
  };

  const maxamountgvara = () => {
    setStakeamount(gVARAbalance);
  };

  const signer = async (inmessage: any) => {
    const message: any = {
      destination: programID, // programId
      payload: inmessage,
      gasLimit: 899819245,
      value: 0,
    };

    const localaccount = account?.address;
    const isVisibleAccount = accounts.some(
      (visibleAccount) => visibleAccount.address === localaccount
    );

    if (isVisibleAccount) {
      // Create a message extrinsic

      try {
        const transferExtrinsic = await api.message.send(message, metadata);

        const injector = await web3FromSource(accounts[0].meta.source);
        transferExtrinsic
          .signAndSend(
            accounts[0].address,
            { signer: injector.signer },
            ({ status }: any) => {
              if (status.isInBlock) {
                console.log(
                  `Completed at block hash #${status.asInBlock.toString()}`
                );
                alert.success(`Block hash #${status.asInBlock.toString()}`);
              } else {
                console.log(`Current status: ${status.type}`);
                if (status.type === "Finalized") {
                  alert.success(status.type);
                  setStakeamount(0);
                }
              }
            }
          )
          .catch((error: any) => {
            console.log(":( transaction failed", error);
          });
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const AmountInputChange = async (event: any) => {
    setStakeamount(event.target.value);
  };

  return (
    <GridItem w="100%" h="100%" 
    style={{
      backgroundImage: `url(${XBackground})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: '120%', // Ajusta este valor según sea necesario
      backgroundPosition: '50% 80%', // Ajusta estos valores según sea necesario
    }}>
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
                        <Td fontSize="18px" style={{ color: "white" }}>Amount</Td>
                        <Td style={{ visibility: "hidden" }}>.</Td>
                      </Tr>
                      <Td fontSize="18px" isNumeric textAlign="end" style={{ color: "white" }}>
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
                        <Td fontSize="18px" fontWeight="bold" style={{ color: "white" }}>
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
                        <Td fontSize="18px" style={{ color: "white" }}>Total Balance </Td>
                        <Td style={{ visibility: "hidden" }}>.</Td>
                      </Tr>
                      <Td fontSize="18px" isNumeric textAlign="end" style={{ color: "white" }}>
                        4.00%
                      </Td>
                    </Grid>

                    <Grid templateColumns="1fr auto" gap="1">
                      <Tr textColor="white">
                        <Td fontSize="18px" style={{ color: "white" }}>Locked</Td>
                        <Td style={{ visibility: "hidden" }}>.</Td>
                      </Tr>
                      <Td fontSize="18px" isNumeric textAlign="end" style={{ color: "white" }}>
                        0.0%
                      </Td>
                    </Grid>

                    <Grid templateColumns="1fr auto" gap="1">
                      <Tr textColor="white">
                        <Td fontSize="18px" style={{ color: "white" }}>Available</Td>
                        <Td style={{ visibility: "hidden" }}>.</Td>
                      </Tr>
                      <Td fontSize="18px" isNumeric textAlign="end" style={{ color: "white" }}>
                        10%
                      </Td>
                    </Grid>

                    <Td
                      width="100%"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Button
                        colorScheme="teal"
                        size="lg"
                        style={{
                          color: "black",
                          background: "#F8AD18",
                          width: "240px",
                        }}
                        onClick={() => signer(stakemessage)}
                      >
                        Connect Wallet
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
                    <Grid templateColumns="1fr auto" gap="1">
                      <Tr
                        id="espacio"
                        style={{ marginBottom: "3px !important" }}
                      >
                        <Td fontSize="18px" style={{ color: "white" }}>Amount</Td>
                        <Td style={{ visibility: "hidden" }}>.</Td>
                      </Tr>
                      <Td fontSize="18px" isNumeric textAlign="end" style={{ color: "white" }}>
                        Available: {gVARAbalance} gVARA
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
                            <Text fontFamily="'Consolas', italic" color="turquoise">g</Text>
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
                        <Td fontSize="18px" fontWeight="bold" style={{ color: "white" }}>
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
                        <Td fontSize="18px" style={{ color: "white" }}>Total Balance</Td>
                        <Td style={{ visibility: "hidden", color: "white" }}>
                          .
                        </Td>
                      </Tr>
                      <Td fontSize="18px" isNumeric textAlign="end" style={{ color: "white" }}>
                        4.00%
                      </Td>
                    </Grid>

                    <Grid templateColumns="1fr auto" gap="4">
                      <Tr textColor="white">
                        <Td fontSize="18px" style={{ color: "white" }}>Locked</Td>
                        <Td style={{ visibility: "hidden" }}>.</Td>
                      </Tr>
                      <Td fontSize="18px" isNumeric textAlign="end" style={{ color: "white" }}>
                        0.0%
                      </Td>
                    </Grid>

                    <Grid templateColumns="1fr auto" gap="4">
                      <Tr textColor="white">
                        <Td fontSize="18px" style={{ color: "white" }}>Available</Td>
                        <Td style={{ visibility: "hidden" }}>.</Td>
                      </Tr>
                      <Td fontSize="18px" isNumeric textAlign="end" style={{ color: "white" }}>
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
                        onClick={() => signer(unstakemessage)}
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
                        <Td fontSize="18px" style={{ color: "white" }}>Amount</Td>
                        <Td style={{ visibility: "hidden" }}>.</Td>
                      </Tr>
                      <Td fontSize="18px" isNumeric textAlign="end" style={{ color: "white" }}>
                        Available: {gVARAbalance} gVARA
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
                        <Td fontSize="18px" style={{ color: "white" }}>Total Balance</Td>
                        <Td style={{ visibility: "hidden" }}>.</Td>
                      </Tr>
                      <Td fontSize="18px" isNumeric textAlign="end" style={{ color: "white" }}>
                        4.00%
                      </Td>
                    </Grid>

                    <Grid templateColumns="1fr auto" gap="4">
                      <Tr textColor="white">
                        <Td fontSize="18px" style={{ color: "white" }}>Locked</Td>
                        <Td style={{ visibility: "hidden" }}>.</Td>
                      </Tr>
                      <Td fontSize="18px" isNumeric textAlign="end" style={{ color: "white" }}>
                        0.0%
                      </Td>
                    </Grid>

                    <Grid templateColumns="1fr auto" gap="4">
                      <Tr textColor="white">
                        <Td fontSize="18px" style={{ color: "white" }}>Available</Td>
                        <Td style={{ visibility: "hidden", color: "white" }}>
                          .
                        </Td>
                      </Tr>
                      <Td fontSize="18px" isNumeric textAlign="end" style={{ color: "white" }}>
                        10%
                      </Td>
                    </Grid>

                      <Td
                        width="100%" display="flex" justifyContent="center"
                      >
                        <Button
                          colorScheme="teal"
                          size="lg"
                          style={{
                            color: "black",
                            background: "#F8AD18",
                            width: "240px",
                          }}
                          onClick={() => signer(unstakemessage)}
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
