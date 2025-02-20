import React, { useState } from "react";
import { CountrySelect } from "@/layout/ComboboxDemo";
import SimpleFormField from "@/layout/SimpleFormField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RateSchema } from "@/layout/schemas";
import { Form } from "@/components/ui/form";
import ShipmentDetails, { MeasurementInput } from "@/layout/ShipmentDetails";
import { Button } from "@/components/ui/button";
import { WeightCard } from "@/forms/ShippingPartner";
import { CircleCheck } from "lucide-react";
import { QuickTipsContent } from "@/AddOrderForm";
import { fetchShipperRates } from "@/layout/api";

const RateCalculator = () => {
  const [showCalculatedWeight, setShowCalculatedWeight] = useState(false);
  const [courierOptions, setCourierOptions] = useState([]);

  const [selectedCourier, setSelectedCourier] = useState(null);
  const [formData, setFormData] = useState(null);

  const RateForm = useForm({
    resolver: zodResolver(RateSchema),
    defaultValues: {
      country: "",
      pincode: "",
      weight: null,
      breadth: null,
      length: null,
      height: null,
    },
  });

  const volumetricWeight = () =>
    (Number(formData?.breadth || 0) *
      Number(formData?.length || 0) *
      Number(formData?.height || 0)) /
    5000;

  const handleSelectPartner = (courier: any) => {
    setSelectedCourier(courier.id);
  };

  const handleResetData = () => {
    RateForm.reset();
    setFormData(null);
    setCourierOptions([]);
    setSelectedCourier(null);
    setShowCalculatedWeight(false);
  };

  const fetchRates = async (values: any) => {
    try {
      const payload = {
        customer_shipping_country_code: values.country,
        customer_shipping_postcode: values.pincode,
        package_breadth: values.breadth,
        package_height: values.height,
        package_length: values.length,
        package_weight: values.weight,
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

  const onSubmit = async (values: any) => {
    setFormData(values);
    setShowCalculatedWeight(true);
    await fetchRates(values);
  };
  return (
    <div className="bg-gray-50 p-3 md:p-10">
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
                  label="Destination Pincode"
                  name="pincode"
                  form={RateForm}
                  type="text"
                  placeholder="Enter Destination Pincode..."
                  required
                />
              </div>
              <div className="flex flex-col md:flex-row justify-between md:gap-x-10 gap-y-4">
                <MeasurementInput
                  label="Actual Weight"
                  form={RateForm}
                  name="weight"
                  placeholder="Eg. 1.25"
                  unit="kg"
                  required
                  className="mt-8"
                />
                <div>
                  <p className="text-sm mt-1">Dimensions</p>
                  <ShipmentDetails form={RateForm} />
                </div>
              </div>
              <Buttons reset={handleResetData} />
            </form>
          </Form>
          {showCalculatedWeight && formData && (
            <WeightSummary
              formData={formData}
              volumetricWeight={volumetricWeight()}
            />
          )}
          {formData && (
            <CourierTable
              courierOptions={courierOptions}
              handleSelectPartner={handleSelectPartner}
              selectedCourier={selectedCourier}
            />
          )}
        </div>
        <div className="bg-white w-1/3 hidden lg:block max-h-max rounded-md px-4 py-3">
          <QuickTipsContent />
        </div>
      </div>
    </div>
  );
};

const Buttons = ({ reset }) => (
  <div className="flex justify-center md:justify-end gap-x-2 md:gap-x-5">
    <Button
      variant="outline"
      className="text-blue-800 border border-blue-800"
      onClick={() => reset()}
    >
      Reset
    </Button>
    <Button className="bg-blue-800 hover:bg-blue-800/90" type="submit">
      Calculate
    </Button>
  </div>
);

const WeightSummary = ({ formData, volumetricWeight }) => (
  <div className="flex flex-col md:flex-row items-center gap-3 justify-center mt-10">
    <WeightCard value={Number(formData.weight)} label="Dead weight" />
    <WeightCard value={volumetricWeight} label="Volumetric weight" />
    <WeightCard
      value={Math.max(Number(formData.weight), volumetricWeight)}
      label="Billed weight"
      borderColor="border-orange-300"
      bgColor="bg-yellow-100"
      textColor="text-orange-500"
    />
  </div>
);

const CourierTable = ({
  courierOptions,
  handleSelectPartner,
  selectedCourier,
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
            className="p-3 border-r-0 border-l rounded-l-md"
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
              className="font-medium pt-8 pb-4 pl-1.5 md:pl-5 border border-r-0 rounded-l-md"
            />
            <TableDescription description={courier.time} />
            <TableDescription description={courier.rate} />
            <td className="border-t border-b pt-4 border-r rounded-r-md">
              <CircleCheck
                onClick={() => handleSelectPartner(courier)}
                className={`h-6 w-6 cursor-pointer transition-colors ${
                  selectedCourier === courier.id
                    ? "fill-green-500 text-white"
                    : "text-white fill-gray-300"
                }`}
              />
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
    <td className={`border-t border-b pt-4 pr-2 ${className}`}>
      {description}
    </td>
  );
};

export default RateCalculator;
