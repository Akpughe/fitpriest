import { ReactNode } from "react";

interface FloatingBadgeProps {
  children: ReactNode;
  className?: string;
  variant?: "light" | "dark" | "glass";
}

const variantStyles = {
  light: "bg-white text-gray-900 shadow-large",
  dark: "bg-brand-black text-white shadow-large",
  glass: "glass-dark text-white shadow-large",
};

export function FloatingBadge({
  children,
  className = "",
  variant = "light",
}: FloatingBadgeProps) {
  return (
    <div
      className={`
        ${variantStyles[variant]}
        rounded-xl px-5 py-3
        font-medium text-sm
        backdrop-blur-md
        transition-all duration-300
        hover:scale-105 hover:shadow-xl
        ${className}
      `}
    >
      {children}
    </div>
  );
}
