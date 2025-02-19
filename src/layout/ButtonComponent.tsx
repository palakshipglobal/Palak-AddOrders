import { Button } from "@/components/ui/button";
import React from "react";

interface ButtonProps{
    label:string;
    onClick?:()=>void;
    className?:string;
    variant?:any;
    disabled?:boolean
}
const ButtonComponent = ({ label ,onClick,variant,disabled}:ButtonProps) => {
  return (
    <div className="flex justify-end py-3">
      <Button type="submit" variant={variant} className="bg-blue-800 hover:bg-blue-800/90" onClick={onClick} disabled={disabled}>
        {label}
      </Button>
    </div>
  );
};

export default ButtonComponent;
