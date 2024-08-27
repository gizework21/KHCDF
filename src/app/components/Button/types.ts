import { ReactNode } from "react";

export type ButtonType = "submit" | "reset" | "button";

export interface ButtonProps {
  bgColor?: string;
  textColor?: string;
  width?: string;
  padding?: string;
  onClick?: () => void;
  children?: ReactNode;
  icon?: ReactNode;
  type?: ButtonType;
  disabled?: boolean;
}
