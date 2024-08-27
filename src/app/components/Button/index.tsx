import { ButtonProps } from "./types";

const Button: React.FC<ButtonProps> = ({
  bgColor = "bg-slate-950",
  textColor = "text-white",
  width = "w-auto",
  padding = "px-10 py-2",
  onClick,
  children,
  icon,
  type,
  disabled,
}) => {
  return (
    <button
      className={`flex items-center justify-center gap-1 rounded ${bgColor} ${textColor} ${width} ${padding} transition duration-300 ease-in-out hover:bg-opacity-85 hover:shadow-md focus:outline-none`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {icon && <span className="">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
