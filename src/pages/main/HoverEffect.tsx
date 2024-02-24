import { motion } from "framer-motion";
import { Image } from "@chakra-ui/react";


function HoverEffect() {
  return (
    <motion.div whileHover={{ scale: 1.1 }}>
      <Image
        position="relative"
        w="440px"
        h="440px"
        src="http://guardiandefi.xyz/wp-content/uploads/2023/09/CoinGuardian.png"
      />
    </motion.div>
  );
}

export { HoverEffect };