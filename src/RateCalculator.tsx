import React, { useState, useMemo, useEffect } from "react";
import { CountrySelect } from "./layout/ComboboxDemo";
import SimpleFormField from "./layout/SimpleFormField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RateSchema } from "./layout/schemas";
import { Form } from "./components/ui/form";
import ShipmentDetails, { MeasurementInput } from "./layout/ShipmentDetails";
import { Button } from "./components/ui/button";
import { WeightCard } from "./forms/ShippingPartner";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import {
  updateRateCalculatorData,
  updateShippingPartner,
} from "./features/formSlice";
import { CircleCheck } from "lucide-react";
import { QuickTipsContent } from "./AddOrderForm";
import { fetchShipperRates } from "./layout/api";

const RateCalculator = () => {
  const dispatch = useDispatch();
  const { rateCalculatorData, shippingPartner } = useSelector(
    (state: RootState) => state.form
  );

  const [showCalculatedWeight, setShowCalculatedWeight] = useState(false);
  const [courierOptions, setCourierOptions] = useState([]);
  const [loadingPartner, setLoadingPartner] = useState<string | null>(null);

  const RateForm = useForm({
    resolver: zodResolver(RateSchema),
    defaultValues: rateCalculatorData,
  });

  const volumetricWeight = () =>
    (Number(rateCalculatorData?.breadth || 0) *
      Number(rateCalculatorData?.length || 0) *
      Number(rateCalculatorData?.height || 0)) /
    5000;

  useEffect(() => {
    fetchRates(rateCalculatorData, setCourierOptions);
  }, []);

  const handleSelectPartner = (courier: any) => {
    setLoadingPartner(courier.id);
    setTimeout(() => {
      dispatch(updateShippingPartner(courier));
      setLoadingPartner(null);
    }, 1000);
  };

  const onSubmit = (values: any) => {
    dispatch(updateRateCalculatorData(values));
    setShowCalculatedWeight(true);
  };

  return (
    <div className="bg-gray-50 p-4 md:p-10">
      <p className="text-2xl font-semibold">Rate Calculator</p>
      <div className="flex gap-3 mt-4">
        <div className="w-full rounded-md lg:w-2/3 bg-white p-5 md:px-6 md:py-5">
          <Form {...RateForm}>
            <form
              onSubmit={RateForm.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-x-10 gap-y-4">
                <CountrySelect
                  name="country"
                  label="Destination Country"
                  required
                  form={RateForm}
                />
                <SimpleFormField
                  label="Pincode"
                  name="pincode"
                  form={RateForm}
                  type="text"
                  placeholder="Type Code"
                />
              </div>
              <div className="flex flex-col md:flex-row justify-between md:gap-x-10 gap-y-4">
                <MeasurementInput
                  label="Actual Weight"
                  form={RateForm}
                  name="weight"
                  placeholder="Type here..."
                  unit="kg"
                  required
                  className="mt-8"
                />
                <div>
                  <p className="text-sm mt-1">Dimensions</p>
                  <ShipmentDetails form={RateForm} />
                </div>
              </div>
              <Buttons />
            </form>
          </Form>
          {showCalculatedWeight && (
            <WeightSummary
              rateCalculatorData={rateCalculatorData}
              volumetricWeight={volumetricWeight}
            />
          )}
          <CourierTable
            courierOptions={courierOptions}
            loadingPartner={loadingPartner}
            handleSelectPartner={handleSelectPartner}
            selectedPartner={shippingPartner}
          />
        </div>
        <div className="bg-white w-1/3 hidden lg:block max-h-max rounded-md px-4 py-3">
          <QuickTipsContent />
        </div>
      </div>
    </div>
  );
};

const Buttons = () => (
  <div className="flex justify-center md:justify-end gap-x-2 md:gap-x-5">
    <Button variant="outline" className="text-blue-800 border border-blue-800">
      Reset
    </Button>
    <Button className="bg-blue-800 hover:bg-blue-800/90" type="submit">
      Continue
    </Button>
  </div>
);

const fetchRates = async (rateCalculatorData: any, setCourierOptions: any) => {
  try {
    const payload = {
      customer_shipping_country_code: rateCalculatorData.country,
      customer_shipping_postcode: rateCalculatorData.pincode,
      package_breadth: rateCalculatorData.breadth,
      package_height: rateCalculatorData.height,
      package_length: rateCalculatorData.length,
      package_weight: rateCalculatorData.weight,
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

export default RateCalculator;

const WeightSummary = ({ rateCalculatorData, volumetricWeight }) => (
  <div className="flex flex-col md:flex-row items-center gap-3 justify-center mt-10">
    <WeightCard value={Number(rateCalculatorData.weight)} label="Dead weight" />
    <WeightCard value={volumetricWeight} label="Volumetric weight" />
    <WeightCard
      value={Math.max(Number(rateCalculatorData.weight), volumetricWeight)}
      label="Billed weight"
      borderColor="border-orange-300"
      bgColor="bg-yellow-100"
      textColor="text-orange-500"
    />
  </div>
);

const CourierTable = ({
  courierOptions,
  loadingPartner,
  handleSelectPartner,
  selectedPartner,
}) =>
  courierOptions.length === 0 ? (
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

      {courierOptions.map((courier: any, index: any) => (
        <tbody>
          <tr>
            <td className="absolute mt-2.5 w-full border-t bg-blue-50 border-x text-xs rounded-t-sm text-red-500 px-3 py-1">
              Duties will be charged, if applicable
            </td>
          </tr>
          <tr
            key={index}
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
  );

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
