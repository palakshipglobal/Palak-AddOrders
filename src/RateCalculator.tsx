import React, { useState } from "react";
import SimpleFormField from "@/layout/SimpleFormField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RateSchema } from "@/layout/schemas";
import { Form } from "@/components/ui/form";
import ShipmentDetails from "@/layout/ShipmentDetails";
import { Button } from "@/components/ui/button";
import { WeightCard } from "@/forms/ShippingPartner";
import { CircleCheck } from "lucide-react";
import { QuickTipsContent } from "@/AddOrderForm";
import { fetchShipperRates } from "@/layout/api";
import SearchInput from "@/layout/SelectInput";

const RateCalculator = () => {
  const [showCalculatedWeight, setShowCalculatedWeight] = useState(false);
  const [courierOptions, setCourierOptions] = useState([]);
  const [selectedCourier, setSelectedCourier] = useState(null);

  const initialValues = {
    country: "",
    pincode: "",
    actual_weight: "",
    breadth:"",
    length:"",
    height:"",
  };

  const RateForm = useForm({
    resolver: zodResolver(RateSchema),
    defaultValues: initialValues,
  });

  const volumetricWeight = () => {
    const values = RateForm.getValues();
    return (
      (Number(values.breadth || 0) *
        Number(values.length || 0) *
        Number(values.height || 0)) /
      5000
    );
  };

  const handleSelectPartner = (courier: any) => {
    setSelectedCourier(courier.id);
  };

  const handleResetData = () => {
    RateForm.reset();
    setSelectedCourier(null);
    setShowCalculatedWeight(false);
    setCourierOptions([]);
  };

  const fetchRates = async (values: any) => {
    try {
      const payload = {
        customer_shipping_country_code: values.country,
        customer_shipping_postcode: values.pincode,
        package_breadth: values.breadth,
        package_height: values.height,
        package_length: values.length,
        package_weight: values.actual_weight,
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
    setShowCalculatedWeight(true);
    await fetchRates(values);
    console.log(values);
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
                <SearchInput
                  form={RateForm}
                  name="country"
                  label="Select Country"
                  placeholder="Search for a country..."
                  fetchData={fetchCountries}
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
              <ShipmentDetails form={RateForm} />
              <Buttons reset={handleResetData} />
            </form>
          </Form>
          {showCalculatedWeight && (
            <WeightSummary
              formValues={RateForm.getValues()}
              volumetricWeight={volumetricWeight()}
            />
          )}
          {courierOptions.length > 0 && (
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
      type="button"
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

const WeightSummary = ({ formValues, volumetricWeight }) => (
  <div className="flex flex-col md:flex-row items-center gap-3 justify-center mt-10">
    <WeightCard value={Number(formValues.actual_weight)} label="Dead weight" />
    <WeightCard value={volumetricWeight} label="Volumetric weight" />
    <WeightCard
      value={Math.max(Number(formValues.actual_weight), volumetricWeight)}
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
}) => (
  <table className="mt-5 w-full relative text-xs lg:text-sm border-separate border-spacing-y-2.5">
    <thead>
      <tr className="text-left text-slate-500 bg-slate-50">
        <TableHeader
          heading="Courier Partner"
          className="p-3 border-r-0 border-l rounded-l-md"
        />
        <TableHeader heading="Delivery Time" />
        <TableHeader heading="Shipment Rate" />
        <TableHeader heading="Select" className="border-r rounded-r-md pr-2" />
      </tr>
    </thead>
    {courierOptions.map((courier, index) => (
      <tbody key={index}>
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
}: TableDescriptionProps) => (
  <td className={`border-t border-b pt-4 pr-2 ${className}`}>{description}</td>
);

export default RateCalculator;

const fetchCountries = async () => {
  try {
    const response = await fetch(
      "https://api.fr.stg.shipglobal.in/api/v1/location/countries"
    );
    const result = await response.json();
    return result.data.countries.map((country) => ({
      value: country.country_iso2,
      label: country.country_display,
      code: country.country_iso3,
    }));
  } catch (error) {
    console.error("Error fetching countries:", error);
    return [];
  }
};
