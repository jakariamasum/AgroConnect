import { motion } from "framer-motion";
const Label = ({ label }: { label: string }) => {
  return (
    <div>
      <motion.label
        initial={{ opacity: 0.7 }}
        animate={{ opacity: 0.7 }}
        className="block text-sm font-medium text-gray-700 focus:opacity-100"
      >
        {label}
      </motion.label>
    </div>
  );
};

export default Label;
