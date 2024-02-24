import {
  Text,
  GridItem,
  VStack,
  HStack,
  Heading,
  Button,
  Center,
  Flex,
  Image,
  Box
} from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { Section2 } from "./Section2";
import { HoverEffect } from "./HoverEffect";
import { Section3 } from "./Section3";
import { Section5 } from "./Section5";
import { Section4 } from "./Section4";
import DotGrid from "../../assets/images/DotGrid.png"




function Main() {
  useEffect(() => {
    document.documentElement.style.setProperty('--background-color', '#F8AD18');
  }, []);

  return (
    <>
      <GridItem h="650px" w="100%" bg="#F8AD18">
        <Center>
          <HStack>
            <Flex direction="row" gap="250">
              <HStack>
                <VStack align="start" spacing={5}>
                  <Heading size="4xl" textColor="black" textAlign="left" fontWeight="semibold">
                    Liquid Staking <br /> Protocol
                  </Heading>
                  <Text textColor="black" fontSize="3xl">
                    Securing and descentralizing
                  </Text>
                  <Heading fontSize="3xl" >Vara Network</Heading>
                  <Box h="20px"/>
                  <HStack>
                    <Button
                      as={Link}
                      to="/home"
                      size="lg"
                      borderRadius="10"
                      backgroundColor="black"
                      textColor="white"
                      variant="ghost"
                      _hover={{ color: "gray.900"}}
                      transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
                      border="2px"
                      borderColor="yellow.300"
                      w="400px"
                    >
                      <HStack>
                        <Heading size="2x1">Stake Now!</Heading>
                      </HStack>
                    </Button>
                  </HStack>
                </VStack>
              </HStack>
              <Box position="relative" w="39%" h="40%">
                <Box
                  position="absolute"
                  backgroundImage={`url(${DotGrid})`}
                  backgroundRepeat="no-repeat"
                  backgroundSize="150%"
                  backgroundPosition="center"
                  w="152%" 
                  h="105.20%" 
                  left="-24%"
                  top="-1%"
                />
                <VStack>
                  <Image
                    position="revert"
                    marginLeft="-400px"
                    w="70px"
                    h="70 px"
                    src="http://guardiandefi.xyz/wp-content/uploads/2023/09/x-icon.png"
                    transform="rotate(45deg)"
                  />
                  <HoverEffect/>
                  <Image
                    position="revert"
                    w="70px"
                    h="70 px"
                    src="http://guardiandefi.xyz/wp-content/uploads/2023/09/x-icon.png"
                    transform="rotate(45deg)"
                    marginLeft="400px"
                  />
                </VStack>
              </Box>
            </Flex>
          </HStack>
        </Center>
      </GridItem>

      <GridItem h="600px" w="100%" bg="#F9B830" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Center>
          <Section2/>
        </Center>
      </GridItem>

      <GridItem h="400px" w="100%" bg="#F9B830" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Center>
        <Section3/>
        </Center>
      </GridItem>

      <GridItem h="820px" w="100%" bg="#F8AD18" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Center>
          <Section4/>
        </Center>
      </GridItem>

      <GridItem h="300px" w="100%" bg="#F9B830" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Center>
          <Section5/>
        </Center>
      </GridItem>
    </>
  );
}

export { Main };
