import React from "react";
import { Loader } from "lucide-react";

type ButtonVariant = "primary" | "secondary" | "danger" | "custom";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  isLoading?: boolean;
  icon?: React.ReactNode;
  bgColor?: string; // Add custom background color prop
  textColor?: string; // Add custom text color prop
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  isLoading = false,
  icon,
  className = "",
  bgColor,
  textColor = "text-black",
  ...props
}) => {
  // Determine the button style based on the variant or custom colors
  const getButtonStyle = (): string => {
    // If custom background color is provided, use it
    if (bgColor) {
      return `${bgColor} ${textColor}`;
    }

    switch (variant) {
      case "primary":
        return "bg-blue-200 hover:bg-blue-300 text-black";
      case "secondary":
        return "bg-gray-200 hover:bg-gray-300 text-black";
      case "danger":
        return "bg-red-200 hover:bg-red-300 text-black";
      default:
        return "bg-blue-200 hover:bg-blue-300 text-black";
    }
  };

  return (
    <button
      className={`${getButtonStyle()} font-medium py-2 px-8 rounded-full transition duration-200 flex items-center justify-center gap-2 ${
        isLoading ? "opacity-70 cursor-not-allowed" : ""
      } ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <Loader className="animate-spin h-4 w-4" />
      ) : icon ? (
        icon
      ) : null}
      {children}
    </button>
  );
};

export default Button;
