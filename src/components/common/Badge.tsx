import React from "react";

interface BadgeProps {
  text: string;
  color?: string; // Tailwind の色指定クラス
}

const Badge: React.FC<BadgeProps> = ({ text, color = "bg-gray-200 text-gray-800" }) => {
  return (
    <span
      className={`px-2 py-1 text-xs font-semibold rounded-full ${color}`}
    >
      {text}
    </span>
  );
};

export default Badge;
