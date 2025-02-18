import { Button } from "@/components/ui/button";
import React from "react";

interface ButtonProps{
    label:string;
    onClick?:()=>void;
    className?:string;
    disabled?:boolean
}
const ButtonComponent = ({ label ,onClick,className,disabled}:ButtonProps) => {
  return (
    <div className="flex justify-end py-3">
      <Button type="submit" className="bg-blue-800 hover:bg-blue-800/90" onClick={onClick} disabled={disabled}>
        {label}
      </Button>
    </div>
  );
};

export default ButtonComponent;
