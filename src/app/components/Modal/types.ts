import { ReactNode } from "react";

export interface ModalProps {
  isOpen: boolean;
  minimized: boolean;
  onClose: () => void;
  children?: ReactNode;
}
