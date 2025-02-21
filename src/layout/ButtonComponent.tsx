import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  className?: string;
  variant?: any;
  disabled?: boolean;
}
const ButtonComponent = ({
  label,
  onClick,
  variant,
  disabled,
  className,
}: ButtonProps) => {
  return (
    <div className="flex justify-end">
      <Button
        type="submit"
        variant={variant}
        className={cn("bg-blue-800 hover:bg-blue-800/90", className)}
        onClick={onClick}
        disabled={disabled}
      >
        {label}
      </Button>
    </div>
  );
};

export default ButtonComponent;
