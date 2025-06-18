import { motion } from "framer-motion";
import Badge from "./ui/badge";
import { MessageCircle } from "lucide-react";
const TopHero = ({
  title1,
  title2,
  subtitle,
  icon,
  badge,
}: {
  title1: string;
  title2: string;
  subtitle: string;
  icon?: React.ElementType;
  badge?: string;
}) => {
  const Icon = icon || MessageCircle;
  const badgeContent = badge || "Get in Touch";
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-14"
      >
        {badge && (
          <Badge
            variant="success"
            className="mb-6 inline-flex items-center bg-green-700 text-white border-green-400"
          >
            <Icon className="w-4 h-4 mr-2" />
            {badgeContent}
          </Badge>
        )}
        <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight text-black">
          {title1} <br />
          <span className="block text-green-600">{title2}</span>
        </h1>

        <p className="text-xl lg:text-2xl mb-8 text-gray-600 leading-relaxed max-w-3xl mx-auto">
          {subtitle}
        </p>
      </motion.div>
    </div>
  );
};

export default TopHero;
