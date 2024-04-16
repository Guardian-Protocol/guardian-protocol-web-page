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

    Grid,

} from "@chakra-ui/react";
import VaraLogo from "../../assets/images/VaraLogo.png";


type WithdrawProps = {
    stakeamount: any;
    
    AmountInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    setStakeamount: React.Dispatch<React.SetStateAction<any>>;
    maxamountvara: () => void;
    
};

function Withdraw({ stakeamount, AmountInputChange, setStakeamount, maxamountvara,}: WithdrawProps) {

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
    )
}

export { Withdraw };