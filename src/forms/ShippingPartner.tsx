import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateShippingPartner } from "@/features/formSlice";
import { RootState } from "@/store";
import { CircleCheck } from "lucide-react";
import { fetchShipperRates } from "@/layout/api";
import ButtonComponent from "@/layout/ButtonComponent";

function ShippingPartner() {
  const dispatch = useDispatch();
  const selectedPartner = useSelector(
    (state: RootState) => state.form.shippingPartner
  );
  const [courierOptions, setCourierOptions] = useState([]);
  const [loadingPartner, setLoadingPartner] = useState<string | null>(null);
  const { buyerData, orderData, step } = useSelector(
    (state: RootState) => state.form
  );

  function handleSelectPartner(courier: any) {
    setLoadingPartner(courier.id);
    setTimeout(() => {
      dispatch(
        updateShippingPartner({
          id: courier.id,
          name: courier.name,
          rate: courier.rate,
        })
      );
      setLoadingPartner(null);
    }, 1000);
  }

  useEffect(() => {
    if (step === 4) {
      fetchRates(buyerData, orderData, setCourierOptions);
    }
  }, [step, buyerData, orderData]);

  const volumetricWeight =
    (Number(orderData.breadth) *
      Number(orderData.length) *
      Number(orderData.height)) /
    50000;

  function onSubmit() {
    dispatch(updateShippingPartner(selectedPartner));
  }

  return (
    <div className="px-3 md:px-7 py-4">
      <p>
        All shipments via ShipGlobal services are{" "}
        <b>Delivered Duty Paid (DDP)</b> , hence <b>no extra duty</b> will be
        billed on the consignee or the shipper. Rates are inclusive of covid &
        fuel surcharge, exclusive of GST and ex-Delhi Hub.
      </p>
      <p className="mt-2">
        In case any doubt, please call/whatsapp at{" "}
        <span className="text-blue-800 font-semibold">011-422 77777</span>
      </p>
      <div className="flex flex-col md:flex-row items-center gap-2 justify-center px-10 md:px-32 mt-5">
        <WeightCard
          value={Number(orderData.actual_weight)}
          label="Dead weight"
        />
        <WeightCard value={volumetricWeight} label="Volumetric weight" />
        <WeightCard
          value={Math.max(Number(orderData.actual_weight), volumetricWeight)}
          label="Billed weight"
          borderColor="border-orange-300"
          bgColor="bg-yellow-100"
          textColor="text-orange-500"
        />
      </div>
      {courierOptions.length > 1 && (
        <p className="mt-5 font-semibold">
          Showing {courierOptions.length}{" "}
          {courierOptions.length > 1 ? "results" : "result"}{" "}
        </p>
      )}
      {courierOptions.length === 0 ? (
        <p className="text-center font-semibold text-lg mt-9">
          No shipper available
        </p>
      ) : (
        <table className="mt-5 w-full relative text-xs lg:text-sm border-separate border-spacing-y-2.5">
          <thead>
            <tr className="text-left text-slate-500 bg-slate-50">
              <TableHeader
                heading="Courier Partner"
                className="p-4 border-r-0 border-l rounded-l-md"
              />
              <TableHeader heading="Delivery Time" />
              <TableHeader heading="Shipment Rate" />
              <TableHeader
                heading="Select"
                className="border-r rounded-r-md pr-2"
              />
            </tr>
          </thead>
          {courierOptions.map((courier, index) => (
            <tbody key={index} className="mb-4 cursor-pointer">
              <tr>
                <td className="absolute mt-2.5 w-full border-t bg-blue-50 border-x text-xs rounded-t-sm text-red-500 px-3 py-1">
                  Duties will be charged, if applicable
                </td>
              </tr>
              <tr
                className="cursor-pointer"
                onClick={() => handleSelectPartner(courier)}
              >
                <TableDescription
                  description={courier.name}
                  className="font-medium pt-8 pb-4 pl-5 border border-r-0 rounded-l-md"
                />
                <TableDescription description={courier.time} />
                <TableDescription description={courier.rate} />

                <td className="border-t border-b pt-4 border-r rounded-r-md">
                  {loadingPartner === courier.id ? (
                    <div className="w-5 h-5 border-2 border-gray-300 border-t-2 border-t-green-500 rounded-full animate-spin"></div>
                  ) : (
                    <CircleCheck
                      className={`h-6 w-6 cursor-pointer transition-colors ${
                        selectedPartner?.id === courier.id
                          ? "fill-green-500 text-white"
                          : "text-white fill-gray-300"
                      }`}
                    />
                  )}
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      )}
      <ButtonComponent
        label="Pay and Order"
        onClick={onSubmit}
        disabled={!selectedPartner?.id}
        className="transition-opacity duration-200"
      />
    </div>
  );
}

export default ShippingPartner;

interface WeightCardProps {
  value: number;
  label: string;
  borderColor?: string;
  bgColor?: string;
  textColor?: string;
}

export const WeightCard = ({
  value,
  label,
  borderColor = "border-gray-300",
  bgColor = "bg-gray-50",
  textColor = "text-black",
}: WeightCardProps) => {
  return (
    <div
      className={`border ${borderColor} text-center ${bgColor} ${textColor} px-9 py-2 min-w-44 md:min-w-36 rounded-md`}
    >
      <p className="font-medium text-sm">{value.toFixed(2)} KG</p>
      <p className="text-xs">{label}</p>
    </div>
  );
};

interface TableHeaderProps {
  heading: string;
  className?: string;
}
const TableHeader = ({ heading, className }: TableHeaderProps) => {
  return <th className={`border-t border-b ${className}`}>{heading}</th>;
};

interface TableDescriptionProps {
  description: string;
  className?: string;
}
const TableDescription = ({
  description,
  className,
}: TableDescriptionProps) => {
  return (
    <td className={`border-t border-b pt-4 ${className}`}>{description}</td>
  );
};

export const fetchRates = async (
  buyerData: any,
  orderData: any,
  setCourierOptions: any
) => {
  try {
    const payload = {
      customer_shipping_country_code: buyerData.shipping_country,
      customer_shipping_postcode: buyerData.shipping_pincode,
      package_breadth: orderData.breadth,
      package_height: orderData.height,
      package_length: orderData.length,
      package_weight: orderData.actual_weight,
    };
    const rates = await fetchShipperRates(payload);
    setCourierOptions(
      rates.map((rate: any) => ({
        id: `${rate.display_name}-${rate.rate}`,
        name: rate.display_name,
        time: rate.transit_time,
        rate: rate.rate,
      }))
    );
  } catch (error) {
    console.error("Error fetching shipper rates:", error);
  }
};
