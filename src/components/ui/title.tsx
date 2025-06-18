import { motion } from "framer-motion";
const Title = ({ title, subtitle }: { title: string; subtitle: string }) => {
  return (
    <div>
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
          {title}
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
      </motion.div>
    </div>
  );
};

export default Title;
