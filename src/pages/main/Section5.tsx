import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { VStack, HStack, Heading, Flex, Image, Box, Button,Grid, Icon, Divider } from "@chakra-ui/react";
import { FaGithub, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

function Section5() {
  const controls = useAnimation();
  const ref: any = useRef();

  useEffect(() => {
    const element: any = ref.current;

    const handleScroll = () => {
      const { scrollY } = window;
      const elementTop = element.offsetTop;
      const windowHeight = window.innerHeight;

      if (scrollY + windowHeight > elementTop) {
        controls.start({ opacity: 1, y: 0, transition: { duration: 0.5 } });
      } else {
        controls.start({ opacity: 0, y: 100 });
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [controls]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={controls}
      className="scroll-appear-element"
    >
      <Grid templateColumns="repeat(3, 350px)" gap={1}>
        <VStack alignItems="center" spacing={14}>
          <Heading size="lg" textColor="black">Networks</Heading>
          <HStack justifyContent="center" spacing={10}>
            <Button  className="fade-in"
              as={Link}
              to="https://github.com/Guardian-Protocol/GuardianProtocol"
              size="lg"
              borderRadius="full"
              backgroundColor="black"
              transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
              border="2px"
              borderColor="yellow.300"
              textColor="white"
              h="75px"
              w="75px"
              _hover={{ color: "gray.900"}}>
              <Icon as={FaGithub} boxSize="25px" />
            </Button>
            <Button as={Link}
              to="https://x.com/guardiandefi?s=21&t=dZnUyTL5rfjf5OpZTlQW0g"
              size="lg"
              borderRadius="full"
              backgroundColor="black"
              transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
              border="2px"
              borderColor="yellow.300"
              textColor="white"
              h="75px"
              w="75px"
              _hover={{ color: "gray.900"}}>
              <Icon as={FaTwitter} boxSize="25px" />
            </Button>
          </HStack>
        </VStack>
        <Divider orientation="vertical" borderColor="black" ml={160} height="170px"/>
        <VStack alignItems="center" spacing={5}>
          <Heading size="lg" textColor="black">Supporters</Heading>
          <HStack justifyContent="center" spacing={2}>
            <Image w="140px" h="140px"   src="http://guardiandefi.xyz/wp-content/uploads/2023/09/Cryptomx-Logo.png" />
            <Box w="15px"/>
            <Image w="140px" h="140px" src="http://guardiandefi.xyz/wp-content/uploads/2023/09/Vara-Logo-1.png" />
            <Box w="15px"/>
            <Image w="140px" h="140px" src="http://guardiandefi.xyz/wp-content/uploads/2023/09/maguey-studioLogo.png" />
          </HStack>
        </VStack>
      </Grid>
    </motion.div>
  );
}

export { Section5 };