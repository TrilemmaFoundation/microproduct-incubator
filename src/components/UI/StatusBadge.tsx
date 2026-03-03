import type React from "react";

type StatusVariant = "completed" | "dropped" | "inProgress" | "onboarding";

interface StatusBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant: StatusVariant;
  children: React.ReactNode;
}

const baseStyles =
  "flex flex-row items-center justify-center px-2.5 py-2 gap-2 rounded-[10px] transition-all font-sans font-bold text-xs sm:text-xs leading-4 min-h-[32px] min-w-[80px]";

const variantStyles: Record<StatusVariant, string> = {
  completed: "bg-[#FF9940] text-brand-navy",
  dropped: "bg-destructive text-white",
  inProgress: "bg-brand-amber text-white",
  onboarding: "bg-brand-blue text-white",
};

const StatusBadge: React.FC<StatusBadgeProps> = ({
  variant,
  children,
  className = "",
  ...props
}) => {
  const combinedClassName = [baseStyles, variantStyles[variant], className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={combinedClassName} {...props}>
      {children}
    </div>
  );
};

export default StatusBadge;
