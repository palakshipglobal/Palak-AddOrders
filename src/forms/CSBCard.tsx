import React from "react";

interface CSBCardProps {
  className?: string;
  Icon: any;
  text1: string;
  text2: string;
  text3: string;
  csbNumber: string;
  iconStyle: string;
  onSelect: any;
}
const CSBCard = ({
  Icon,
  text1,
  text2,
  text3,
  csbNumber,
  iconStyle,
  onSelect,
  className,
}: CSBCardProps) => {
  return (
    <div
      className={`${className} mt-5 p-7 cursor-pointer rounded-md`}
      onClick={onSelect}
    >
      <p className="ml-10 font-semibold text-lg">CSB - {csbNumber}</p>
      <div className="flex items-center gap-14 lg:gap-8 mt-2">
        <Icon className={`${iconStyle} size-8`} />
        <div className="flex flex-col text-sm text-gray-500 font-medium">
          <p>{text1}</p>
          <p>{text2}</p>
          <p>{text3}</p>
        </div>
      </div>
    </div>
  );
};
export default CSBCard;
