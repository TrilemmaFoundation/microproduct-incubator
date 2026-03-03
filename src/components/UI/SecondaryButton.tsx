import type React from "react";

interface SecondaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  fullWidth?: boolean;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  children,
  fullWidth = false,
  className = "",
  disabled,
  ...props
}) => {
  const baseStyles =
    "box-border relative rounded-[10px] transition-all shadow-[0_4px_4px_0_rgba(10,10,20,1)] hover:shadow-[0_4px_4px_0_rgba(10,10,20,1)] flex items-center justify-center px-12 py-3 text-lg h-[48px] font-bold";

  const defaultStyles = "bg-brand-orange text-foreground hover:text-background";
  // Fill = stroke color; text goes white -> navy

  const widthStyles = fullWidth ? "w-full" : "";

  const disabledStyles = disabled
    ? "opacity-50 cursor-not-allowed pointer-events-none"
    : "cursor-pointer active:scale-[0.98]";

  const combinedClassName = [
    baseStyles,
    defaultStyles,
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

export default SecondaryButton;
