// 汎用的なボタンコンポーネント。
import React from "react";

interface ButtonProps {
  text: string;
  onClick: () => void;
  variant?: "primary" | "secondary"; // ボタンの種類
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  variant = "primary",
  disabled = false,
}) => {
  const baseStyle =
    "px-4 py-2 rounded-lg font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-offset-2";

  const primaryStyle =
    "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500";
  const secondaryStyle =
    "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-200";

  const finalStyle = `${baseStyle} ${
    variant === "primary" ? primaryStyle : secondaryStyle
  } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`;

  return (
    <button onClick={onClick} className={finalStyle} disabled={disabled}>
      {text}
    </button>
  );
};

export default Button;
