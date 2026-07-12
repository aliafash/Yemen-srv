import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({ label, className = "", ...props }) => {
  return (
    <div className="w-full flex flex-col gap-1.5 text-right">
      {label && <label className="text-xs font-medium text-slate-300">{label}</label>}
      <input
        className={`px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition duration-200 ${className}`}
        {...props}
      />
    </div>
  );
};
