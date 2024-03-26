import { Button, Flex, Image } from "@chakra-ui/react";
import type { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';


type Props = {
  list: InjectedAccountWithMeta[];
  onSelect: (source: string) => void;
  logo: string
};

function SourceButtons({ list, onSelect, logo }: Props) {
  const sources = list.reduce<string[]>((acc, curr) => {
    if (!acc.includes(curr.meta.source)) {
      acc.push(curr.meta.source);
    }
    return acc;
  }, []);

  return (
    <>
      {sources.map((source) => (
        <Button
          key={source}
          colorScheme="teal"
          size="lg"
          disabled={!list.length}
          onClick={() => onSelect(source)}
          width="100%"
          style={{ marginBottom: "5%" , marginTop: "5%"}}
        >
          <Flex justifyContent="space-between" alignItems="center" width="100%">
            <Flex alignItems="center">
              <Image src={logo} alt={`${source} logo`} h="20px" />
              <span style={{ marginLeft: "10%" }}>{(source === "talisman") ? "Talisman" : "Polkadot.js"}</span>
            </Flex>
            <span>{(!list.length) ? "Disabled" : "Enabled"}</span>
          </Flex>
        </Button>
      ))}
    </>
  );
}

export { SourceButtons };