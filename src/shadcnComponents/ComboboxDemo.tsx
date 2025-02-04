import React, { useEffect } from "react";
import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Required from "./Required";
import { DatePickerWithPresets } from "./DatePicker";

// const states = [
//   { value: "ny", label: "New York" },
//   { value: "ca", label: "California" },
//   { value: "tx", label: "Texas" },
//   { value: "pb", label: "Punjab" },
//   { value: "hr", label: "Haryana" },
//   { value: "dl", label: "Delhi" },
// ];

const addresses = [
  { value: "Main St", label: "Main St" },
  {
    value: "Oak Street",
    label: "Oak Street",
  },
  { value: "Pine St", label: "Pine St" },
];

const currency = [
  { value: "AED", label: "AED" },
  { value: "AUD", label: "AUD" },
  { value: "CAD", label: "CAD" },
  { value: "EUR", label: "EUR" },
  { value: "IND", label: "IND" },
];

const igst = [
  { value: "0", label: "0%" },
  { value: "3", label: "3%" },
  { value: "5", label: "5%" },
  { value: "12", label: "12%" },
  { value: "18", label: "18%" },
];

function Combobox({ options, placeholder, field }) {
  const [open, setOpen] = useState(false);
  const selectedOption = options.find((option) => option.value === field.value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full bg-gray-100 h-10 text-gray-600 justify-between"
        >
          {selectedOption ? selectedOption.label : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      {/* <PopoverContent className="max-w-full p-0"> */}
      <PopoverContent className="p-0 w-[var(--radix-popover-trigger-width)]">
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={() => {
                    field.onChange(option.value);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={`mr-2 h-4 w-4 ${
                      field.value === option.value ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

// export function CountrySelect({ form, name, required }) {
//   const [countries, setCountries] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchCountries() {
//       try {
//         const response = await fetch(
//           "https://api.fr.stg.shipglobal.in/api/v1/location/countries"
//         );
//         const result = await response.json();

//         if (result.data && result.data.countries) {
//           const formattedCountries = result.data.countries.map((country) => ({
//             value: country.country_iso3,
//             label: country.country_display,
//           }));
//           setCountries(formattedCountries);
//         }
//       } catch (error) {
//         console.error("Error fetching countries:", error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchCountries();
//   }, []);

//   return (
//     <FormField
//       control={form.control}
//       name={name}
//       render={({ field }) => (
//         <FormItem>
//           <FormLabel>Country {required && <Required />}</FormLabel>
//           <FormControl>
//             {loading ? (
//               <p>Loading...</p>
//             ) : (
//               <Combobox
//                 options={countries}
//                 placeholder="Select a Country"
//                 field={field}
//               />
//             )}
//           </FormControl>
//           <FormMessage />
//         </FormItem>
//       )}
//     />
//   );
// }

// export function StateSelect({ form, name, required }) {
//   const [states, setStates] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchState() {
//       try {
//         const response = await fetch(
//           "https://api.fr.stg.shipglobal.in/api/v1/location/countries/${country_id}/states"
//         );
//         const result = await response.json();

//         if (result.data && result.data.states) {
//           const formattedStates = result.data.states.map((state) => ({
//             value: state.iso2,
//             label: state.name,
//           }));
//           setStates(formattedStates);
//         }
//       } catch (error) {
//         console.error("Error fetching countries:", error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchState();
//   }, []);
//   return (
//     <FormField
//       control={form.control}
//       name={name}
//       render={({ field }) => (
//         <FormItem>
//           <FormLabel>State {required && <Required />}</FormLabel>
//           <FormControl>
//             <Combobox
//               options={states}
//               placeholder="Select a State"
//               field={field}
//             />
//           </FormControl>
//           <FormMessage />
//         </FormItem>
//       )}
//     />
//   );
// }

export function CountrySelect({ form, name, required }) {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCountries() {
      try {
        const response = await fetch(
          "https://api.fr.stg.shipglobal.in/api/v1/location/countries"
        );
        const result = await response.json();

        if (result.data && result.data.countries) {
          const formattedCountries = result.data.countries.map((country) => ({
            value: country.country_iso2,
            label: country.country_display,
          }));
          setCountries(formattedCountries);
        }
      } catch (error) {
        console.error("Error fetching countries:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCountries();
  }, []);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Country {required && <Required />}</FormLabel>
          <FormControl>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <Combobox
                options={countries}
                placeholder="Select a Country"
                field={field}
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function StateSelect({ form, name, required,states }) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>State {required && <Required />}</FormLabel>
          <FormControl>
            <Combobox
              options={states}
              placeholder="Select a State"
              field={field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function AddressSelect({ form, name }) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Combobox
              options={addresses}
              placeholder="Select an Address"
              field={field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function CurrencySelect({ form, name, required }) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Invoice Currency {required && <Required />}</FormLabel>
          <FormControl>
            <Combobox
              options={currency}
              placeholder="Select the Currency"
              field={field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function IGSTSelect({ form, name, required }) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>IGST {required && <Required />}</FormLabel>
          <FormControl>
            <Combobox options={igst} placeholder="0%" field={field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function DateSelect({ form, name, required }) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Invoice Date {required && <Required />}</FormLabel>
          <FormControl>
            <DatePickerWithPresets name="invoice_date" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
