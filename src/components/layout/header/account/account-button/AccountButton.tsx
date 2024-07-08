import Identicon from '@polkadot/react-identicon';
import { buttonStyles } from '@gear-js/ui';
import { Button, Flex } from '@chakra-ui/react';
import "./style.css";

type Props = {
  address: string;
  name: string | undefined;
  onClick: () => void;
  isActive?: boolean;
  block?: boolean;
};

function AccountButton({ address, name, onClick, isActive, block }: Props) {
  

  return (
   <Button backgroundColor="yellow.200" type="button" width="100%" onClick={onClick}  _hover={{ backgroundColor: 'yellow.300' }}>
      <Flex direction="row" align="center" width="90%">
        <Identicon value={address} className={buttonStyles.icon} theme="polkadot" size={28} style={{ marginRight: '10px' }}/>
        {name}
      </Flex>
    </Button>
  );
}

export { AccountButton };
