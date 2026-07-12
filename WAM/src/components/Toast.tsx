import React from "react";

export const Toast: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div className="fixed bottom-6 left-6 right-6 md:left-auto md:w-80 bg-slate-800 text-slate-100 px-4 py-3 rounded-xl border border-teal-500/30 flex items-center gap-3 shadow-xl z-50 animate-bounce">
      <div className="text-teal-400">✨</div>
      <div className="text-sm text-right flex-1">{message}</div>
    </div>
  );
};
