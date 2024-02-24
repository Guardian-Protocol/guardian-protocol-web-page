import { Image, Box } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { Account } from './account';
import styles from './Header.module.scss';
import GuardianLogo from '../../../assets/images/GuardianBlack.png';

type Props = {
  isAccountVisible: boolean;
};

function Header({ isAccountVisible }: Props) {
  return (
    <Box w="100%" pl={90} pr={90} className={styles.header} backgroundColor="#F9B830" >
      <h1>
        <Link to="/">
          <Image src={GuardianLogo} width='17%' alt="Logo" className={styles.logo}/>
        </Link>
      </h1>
      {isAccountVisible && <Account />}
    </Box>
  );
}

export { Header };
