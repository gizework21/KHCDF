import React from "react";
import { ModalProps } from "./types";
import { IoIosClose } from "react-icons/io";

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  minimized,
}) => {
  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <>
      {isOpen && (
        <div
          className={`fixed top-0 right-0 w-full flex justify-center items-center rounded-md mt-16 bg-gray-900 bg-opacity-50 z-50
           ${
             minimized ? "lg:w-[90%]" : "lg:w-[80%]"
           } transition-all duration-500 ease-in`}
          style={{ height: "calc(100vh - 64px)" }}
          onClick={handleOverlayClick}
        >
          <div className="bg-white text-black px-4 md:p-5 rounded-lg relative mx-10 z-50">
            <button
              className="absolute top-2 right-5 md:right-2 text-gray-600 hover:bg-slate-200 rounded-md"
              onClick={onClose}
            >
              <IoIosClose size={34} />
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
