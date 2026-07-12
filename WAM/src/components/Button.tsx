import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
}

export const Button: React.FC<ButtonProps> = ({ children, variant = "primary", className = "", ...props }) => {
  const base = "px-4 py-2 rounded-lg font-medium transition duration-200 active:scale-95 text-center";
  const styles = {
    primary: "bg-teal-600 hover:bg-teal-700 text-white shadow-md shadow-teal-900/20",
    secondary: "bg-slate-700 hover:bg-slate-600 text-slate-100",
    danger: "bg-rose-600 hover:bg-rose-700 text-white"
  };

  return (
    <button className={`${base} ${styles[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};
