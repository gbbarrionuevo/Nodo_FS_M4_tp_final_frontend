// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';

const PageTransition = ({ children }) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </>
  );
}

export default PageTransition;