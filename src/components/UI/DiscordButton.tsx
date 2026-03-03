import type React from "react";
import { EXTERNAL_LINKS } from "../../constants/externalLinks";

type ButtonSize = "default" | "small";

interface DiscordButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  fullWidth?: boolean;
  size?: ButtonSize;
}

const baseStyles =
  "box-border relative rounded-[10px] transition-all shadow-[0_4px_4px_0_rgba(10,10,20,1)] hover:shadow-[0_4px_4px_0_rgba(10,10,20,1)] flex items-center justify-center gap-2 font-bold touch-manipulation bg-brand-blue text-foreground hover:text-background cursor-pointer active:scale-[0.98]";

const sizeStyles: Record<ButtonSize, string> = {
  default:
    "px-8 sm:px-12 py-3 text-base sm:text-lg min-h-touch h-auto sm:h-[48px] min-w-[160px] sm:min-w-[180px]",
  small:
    "px-5 py-2 text-sm min-h-touch sm:min-h-[36px] h-auto sm:h-[36px] min-w-[130px]",
};

const DiscordButton: React.FC<DiscordButtonProps> = ({
  fullWidth = false,
  size = "default",
  className = "",
  ...props
}) => {
  const widthStyles = fullWidth ? "w-full" : "";

  const combinedClassName = [
    baseStyles,
    sizeStyles[size],
    widthStyles,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <a
      href={EXTERNAL_LINKS.mentorForm}
      target="_blank"
      rel="noopener noreferrer"
      className={combinedClassName}
      {...props}
    >
      <span>Apply to Mentor</span>
    </a>
  );
};

export default DiscordButton;
