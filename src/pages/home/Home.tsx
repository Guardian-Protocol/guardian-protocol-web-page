import { GridItem, Center, Box } from "@chakra-ui/react";
import { web3FromSource } from "@polkadot/extension-dapp";
import { useApi, useAlert, useAccount } from "@gear-js/react-hooks";
import { getStateMetadata } from "@gear-js/api";
import { useState, useEffect, useRef, useCallback } from "react";
import { getLockedBalance } from "contract_utils/GetLockedBalance";
import { ExtrinsicFactory } from "contract_utils/ExtrinsicFactory";
import { useWasmMetadata } from "contract_utils/WasmMetadata";
import { TabListStaking } from "../../components/stake/TabListStaking";
import stateWasm from "../../contract_metadata/state.meta.wasm";
import XBackground from "../../assets/images/XBackground.svg";

interface ContractState {
  unestakeHistory: any[][];
  userTotalVaraStaked: string;
  transactionHistory: any[];
}

function Home() {
  const [stakeamount, setStakeamount] = useState<any | undefined>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lockedBalance, setLockedBalance] = useState<any | undefined>(0);
  const [isMessageSuccess, setIsMessageSuccess] = useState(false);
  const isFirstRender = useRef(false);
  const [metaSate, setMetaState] = useState<any>();
  const [history, setHistory] = useState<ContractState>({
    unestakeHistory: [
      [
        "0",
        {
          amount: "88",
          liberationEra: "0",
          liberationDays: "7"
        }
      ]
    ],
    userTotalVaraStaked: "0",
    transactionHistory: [
      {
        transactionId: "0",
        transactionType: "stake",
        transactionAmount: "0",
        transactionTime: "1,713,922,548,000"
      }
    ],
  });

  const { api } = useApi();
  const { buffer } = useWasmMetadata(stateWasm);
  const { accounts, account } = useAccount();

  const prevAccount = useRef(account?.address);

  const alert = useAlert();
  const stakemessage = { stake: Math.floor(stakeamount) };

  const extFactory = new ExtrinsicFactory(accounts, account, api);

  const { getHistory } = extFactory;


  const fetchHistory = useCallback(async () => {
    try {
      const historyData = await getHistory();
      setHistory(historyData);
    } catch (error) {
      console.error("Ocurrió un error al obtener el historial:", error);
      throw error;
    }
  }, [getHistory]);

  const stake = async () => {
    const mintMessageFactory = await extFactory.messageExtrinsic(stakemessage, stakemessage.stake);
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

  useEffect(() => {
    fetchHistory();
    setLockedBalance(history.userTotalVaraStaked);
  }, [fetchHistory, history.userTotalVaraStaked]);

  useEffect(() => {
    document.documentElement.style.setProperty("--background-color", "#131111");
    if (buffer !== undefined) {
      getStateMetadata(buffer as Buffer).then((meta) => {
        setMetaState(meta);
      });
    }
  }, [buffer]);

  console.log(history);

  useEffect(() => {
    console.log(" la cuenta es: ", account)
    if (buffer !== undefined && api && metaSate && isMessageSuccess) {
      getLockedBalance(buffer, api, metaSate, account).then((balance) => {
        try {
          setLockedBalance((balance.toJSON() as { [index: string]: any }).totalLocketBalance.total);
          console.log("entre en isMessage")
        } catch {
          setLockedBalance(0);
        }
        console.log("antes de renderizar nuevamente soy: ", isFirstRender.current)
        setIsMessageSuccess(false);
      });
    }
    if (buffer !== undefined && api && metaSate && !isFirstRender.current) {
      getLockedBalance(buffer, api, metaSate, account).then((balance) => {
        try {
          setLockedBalance((balance.toJSON() as { [index: string]: any }).totalLocketBalance.total);
          console.log("entre en firstRender porque su inversa es: ", !isFirstRender.current)
        } catch {
          setLockedBalance(0);
        }
        isFirstRender.current = !isFirstRender.current;
      });
    } else if (prevAccount.current !== account?.address) {
      window.location.reload();
    } else {
      console.log("No paso porque isFirsRender es: ", isFirstRender.current)
    }
  }, [account, buffer, api, metaSate, isMessageSuccess]);

  const [Unstakeamount, setUnstakeamount] = useState<any | undefined>(0);
  const unstakemessage = { Unestake: Math.floor(Unstakeamount) };

  const maxamountvaraUnstake = () => {
    setUnstakeamount(account?.balance.value);
  };

  const AmountInputChangeUnstake = async (event: any) => {
    setUnstakeamount(event.target.value);
  };

  const unstake = async () => {
    const injector = await web3FromSource(accounts[0].meta.source);

    const alertStyle = {
      style: {
        color: "white",
      }
    }

    const approveMessage = await extFactory.ftAproveTokenExtrinsic(Unstakeamount);

    approveMessage?.signAndSend(
      account?.address ?? alert.error("No account found"),
      { signer: injector.signer },
      async ({ status }) => {
        if (status.isInBlock) {
          alert.success(status.asInBlock.toHuman()?.toString(), { ...alertStyle });
        } else if (status.isFinalized) {
          alert.success(status.type, { ...alertStyle });
          setIsMessageSuccess(true);

          const unStakeMessageFactory = await extFactory.messageExtrinsic(unstakemessage, 0);

          unStakeMessageFactory?.signAndSend(
            account?.address ?? alert.error("No account found"),
            { signer: injector.signer },
            ({ status: innerStatus }) => {
              if (innerStatus.isInBlock) {
                alert.success(innerStatus.asInBlock.toHuman()?.toString(), { ...alertStyle });
              } else if (innerStatus.isFinalized) {
                alert.success(innerStatus.type, { ...alertStyle });
                setIsMessageSuccess(true);
              }
            }
          )
        }
      }
    )
  };

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
        <TabListStaking
          account={account}
          lockedBalance={lockedBalance}
          isModalOpen={isModalOpen}
          AmountInputChange={AmountInputChange}
          maxamountvara={maxamountvara}
          openModal={openModal}
          closeModal={closeModal}
          accounts={accounts}

          stakeamount={stakeamount}
          setStakeamount={setStakeamount}
          stake={stake}

          unstakeamount={Unstakeamount}
          setUnstakeamount={setUnstakeamount}
          unstake={unstake}
          maxamountvaraUnstake={maxamountvaraUnstake}
          AmountInputChangeUnstake={AmountInputChangeUnstake}

          unestakeHistory={history.unestakeHistory}
          transactionHistory={history.transactionHistory}
        />
      </Center>
      <Box h="60px" />
    </GridItem>
  );
}

export { Home };
