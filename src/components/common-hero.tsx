import { motion } from "framer-motion";
const TopHero = ({
  title1,
  title2,
  subtitle,
}: {
  title1: string;
  title2: string;
  subtitle: string;
}) => {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-14"
      >
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-4 tracking-tight">
          {title1}
          <span className="text-green-600 block">{title2}</span>
        </h1>
        <p className="text-2xl text-gray-600 max-w-2xl mx-auto font-light">
          {subtitle}
        </p>
      </motion.div>
    </div>
  );
};

export default TopHero;
