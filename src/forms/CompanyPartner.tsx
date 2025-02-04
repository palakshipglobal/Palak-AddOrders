import React from 'react'

interface CompanyPartnerProps {
    name: string;
    message: string;
    days: string;
    price: string;
    selected: boolean;
    onSelect: () => void;
  }
  
  const CompanyPartner = ({
    name,
    message,
    price,
    days,
    selected,
    onSelect,
  }: CompanyPartnerProps) => {
    return (
      <div
        className={`mt-3 border-2 px-3 lg:px-5 py-3 rounded-md cursor-pointer ${
          selected
            ? "border-blue-100 bg-blue-50"
            : "border-gray-200 border-dashed"
        }`}
        onClick={onSelect}
      >
        <div className="flex justify-between gap-x-7 items-center">
          <div className="flex items-center gap-5">
            <div
              className={`w-5 h-4 md:h-5 rounded-full border ${
                selected ? "border-blue-300 bg-blue-300" : "border-gray-500"
              }`}
            ></div>
            <div className="flex flex-col">
              <p className="lg:text-lg font-bold">{name}</p>
              <p className="text-xs text-red-500">{message}</p>
              <p className="text-xs lg:text-sm text-gray-600 font-medium">
                Estimated Transit : {days} days
              </p>
            </div>
          </div>
          <p>
            Rs. <span className="text-xl lg:text-3xl font-semibold">{price}</span>
          </p>
        </div>
      </div>
    );
  };

export default CompanyPartner