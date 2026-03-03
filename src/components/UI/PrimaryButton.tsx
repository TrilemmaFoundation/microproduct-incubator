import type React from "react";
import Button from "./Button";

interface PrimaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  fullWidth?: boolean;
  size?: "default" | "small";
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  fullWidth = false,
  size = "default",
  ...props
}) => {
  return (
    <Button variant="primary" fullWidth={fullWidth} size={size} {...props}>
      {children}
    </Button>
  );
};

export default PrimaryButton;
