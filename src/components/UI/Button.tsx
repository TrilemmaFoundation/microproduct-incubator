import type React from "react";

type ButtonVariant = "primary" | "secondary" | "discord";
type ButtonSize = "default" | "small";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  fullWidth?: boolean;
  size?: ButtonSize;
}

const baseStyles =
  "box-border relative rounded-[10px] transition-all shadow-[0_4px_4px_0_rgba(10,10,20,1)] hover:shadow-[0_4px_4px_0_rgba(10,10,20,1)] flex items-center justify-center font-bold touch-manipulation";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "border border-dashed border-brand-orange bg-brand-orange text-foreground hover:text-background",
  secondary: "bg-brand-orange text-foreground hover:text-background",
  discord: "bg-brand-blue text-foreground hover:text-background gap-2",
};

const sizeStyles: Record<ButtonSize, string> = {
  default:
    "px-8 sm:px-12 py-3 text-base sm:text-lg min-h-touch h-auto sm:h-[48px] min-w-[160px] sm:min-w-[180px]",
  small:
    "px-5 py-2 text-sm min-h-touch sm:min-h-[36px] h-auto sm:h-[36px] min-w-[130px]",
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  fullWidth = false,
  size = "default",
  className = "",
  disabled,
  ...props
}) => {
  const widthStyles = fullWidth ? "w-full" : "";

  const disabledStyles = disabled
    ? "opacity-50 cursor-not-allowed pointer-events-none"
    : "cursor-pointer active:scale-[0.98]";

  const combinedClassName = [
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    widthStyles,
    disabledStyles,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={combinedClassName} disabled={disabled} {...props}>
      {children}
    </button>
  );
};

export default Button;
