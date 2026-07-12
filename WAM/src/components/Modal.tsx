import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 text-right shadow-2xl relative animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center border-b border-slate-800 pb-3 mb-4">
          <button onClick={onClose} className="text-slate-400 hover:text-slate-100 transition">&times;</button>
          <h3 className="text-base font-bold text-slate-100">{title}</h3>
        </div>
        {children}
      </div>
    </div>
  );
};
