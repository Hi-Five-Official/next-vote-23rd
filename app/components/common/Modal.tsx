"use client";

import { useEffect } from "react";

interface BaseModalProps {
  title: string;
  description?: string;
  rightLabel?: string;
  onConfirm: () => void;
  onClose?: () => void;
}

interface SingleButtonModalProps extends BaseModalProps {
  buttons: "single";
}

interface DoubleButtonModalProps extends BaseModalProps {
  buttons: "double";
  leftLabel?: string;
  onCancel: () => void;
}

type ModalProps = SingleButtonModalProps | DoubleButtonModalProps;

const Modal = (props: ModalProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") props.onClose?.();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [props]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={props.onClose}
    >
      <div
        className="w-80 overflow-hidden rounded-2xl bg-white shadow-lg md:w-100"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex flex-col items-center gap-2 px-6 py-12 text-center md:gap-3">
          <p className="text-heading2-sb text-black">{props.title}</p>
          {props.description && (
            <p className="text-heading3-sb text-gray-80">{props.description}</p>
          )}
        </div>
        <div className="flex">
          {props.buttons === "double" && (
            <button
              onClick={props.onCancel}
              className="text-body1-sb text-gray-90 bg-gray-30 hover:bg-gray-20 md:text-heading1-sb flex-1 cursor-pointer py-4 transition-colors"
            >
              {props.leftLabel ?? "아니오"}
            </button>
          )}
          <button
            onClick={props.onConfirm}
            className="text-body1-sb hover:bg-purple-40 md:text-heading1-sb flex-1 cursor-pointer bg-purple-50 py-4 text-white transition-colors"
          >
            {props.rightLabel ?? "예"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
