import Identicon from '@polkadot/react-identicon';
import { buttonStyles } from '@gear-js/ui';
import { Button } from '@chakra-ui/react';
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
   <Button backgroundColor="yellow.500" type="button" onClick={onClick}  _hover={{ backgroundColor: 'yellow.600' }}>
      <Identicon value={address} className={buttonStyles.icon} theme="polkadot" size={28} style={{ marginRight: '10px' }}/>
      {name}
    </Button>
  );
}

export { AccountButton };
