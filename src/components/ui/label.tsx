import { motion } from "framer-motion";
const Label = ({
  label,
  required = true,
}: {
  label: string;
  required?: boolean;
}) => {
  return (
    <div>
      <motion.label
        initial={{ opacity: 0.7 }}
        animate={{ opacity: 0.7 }}
        className="block text-sm font-medium text-gray-700 focus:opacity-100"
      >
        {label}
        {required ? (
          <span className="text-red-500 ml-1">*</span>
        ) : (
          <span className="text-gray-400 ml-1">(optional)</span>
        )}
      </motion.label>
    </div>
  );
};

export default Label;
