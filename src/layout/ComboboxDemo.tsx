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
import { addresses, currency, customers, igst } from "./arrays";

function Combobox({ options, placeholder, field }) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOptions = options.filter(
    (option:any) => option.label.toLowerCase().includes(searchQuery.toLowerCase()) 
  );

  const selectedOption = options.find((option:any) => option.value === field.value);
 

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full bg-gray-100 h-9 text-gray-600 justify-between overflow-hidden text-ellipsis"
        >
          {selectedOption ? selectedOption.label : placeholder}
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[var(--radix-popover-trigger-width)]">
        <Command>
          <CommandInput
            placeholder={placeholder}
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
           <CommandList>
            {filteredOptions.length === 0 ? (
              <CommandEmpty>No results found.</CommandEmpty>
            ) : (
              <CommandGroup>
                {filteredOptions.map((option:any) => (
                  <CommandItem
                    key={option.value}
                    value={option.label} 
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
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export function CountrySelect({ form, name, required }) {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://api.fr.stg.shipglobal.in/api/v1/location/countries"
        );
        const result = await response.json();

        if (result.data && result.data.countries) {
          const formattedCountries = result.data.countries.map(
            (country: any) => ({
              value: country.country_iso2,
              label: country.country_display,
            })
          );
          setCountries(formattedCountries);
          localStorage.setItem("countries", JSON.stringify(formattedCountries));
        }
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
    // }
  }, []);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm font-normal">
            Country {required && <Required />}
          </FormLabel>
          <FormControl>
            <Combobox
              options={countries}
              placeholder="Select a Country"
              field={field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function StateSelect({ form, name, required, states }) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm font-normal">
            State {required && <Required />}
          </FormLabel>
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
          <FormLabel className="text-sm font-normal">
            Invoice Currency {required && <Required />}
          </FormLabel>
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

export function DateSelect({ form, name, required }) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm font-normal">
            Invoice Date {required && <Required />}
          </FormLabel>
          <FormControl>
            <DatePickerWithPresets name="invoice_date" />
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
          <FormLabel className="text-sm font-normal">
            IGST {required && <Required />}
          </FormLabel>
          <FormControl>
            <Combobox options={igst} placeholder="0%" field={field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function CustomerSelect({ form, name }) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Combobox
              options={customers}
              placeholder="Select Pickup Address"
              field={field}
              
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
