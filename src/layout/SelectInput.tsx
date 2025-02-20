import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React from "react";
import Required from "./Required";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchInputProps {
  form: any;
  name: string;
  label: string;
  fetchData: any;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

const SearchInput = ({
  form,
  name,
  label,
  fetchData,
  placeholder,
  required = false,
  className,
}: SearchInputProps) => {
  const { setValue, clearErrors, watch } = useFormContext();
  const fieldValue = watch(name); // Watch field value in real-time
  const [searchQuery, setSearchQuery] = useState("");
  const [options, setOptions] = useState<
    { value: string; label: string; code: string }[]
  >([]);
  const [filteredOptions, setFilteredOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const data = await fetchData();
        setOptions(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchOptions();
  }, [fetchData]);

  useEffect(() => {
    if (searchQuery.length > 0) {
      const filtered = options.filter(
        (option) =>
          option.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
          option.code.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions(options);
    }
  }, [searchQuery, options]);

  useEffect(() => {
    const selectedOption = options.find((opt) => opt.value === fieldValue);
    if (selectedOption) {
      setSearchQuery(selectedOption.label);
    } else {
      setSearchQuery("");
    }
  }, [fieldValue, options]);

  const handleSelectOption = (option: { value: string; label: string }) => {
    setValue(name, option.value);
    setSearchQuery(option.label);
    setIsDropdownOpen(false);
    clearErrors(name);
  };

  return (
    <FormField
      name={name}
      control={form.control}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel className="text-sm font-normal">
            {label} {required && <Required />}
          </FormLabel>
          <FormControl>
            <div className="relative w-full">
              <div className="flex items-center">
                <div
                  className={`pl-1.5 pt-2.5 h-9 rounded-l-md border border-r-0 border-gray-200 ${className}`}
                >
                  <Search className="text-gray-500 size-4" />
                </div>
                <Input
                  type="text"
                  {...field}
                  value={searchQuery || ""}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onClick={() => setIsDropdownOpen(true)}
                  placeholder={placeholder}
                  className="rounded-l-none border-l-0 focus-visible:outline-none focus-visible:ring-0"
                />
              </div>
              {isDropdownOpen && (
                <div className="absolute mt-0.5 text-sm p-1 w-full border rounded-md shadow-md bg-white z-50 max-h-80 overflow-y-auto">
                  {filteredOptions.length > 0 ? (
                    filteredOptions.map((option) => (
                      <div
                        key={option.value}
                        className="px-4 py-2 hover:bg-gray-100 rounded-md pl-10 cursor-pointer"
                        onClick={() => handleSelectOption(option)}
                      >
                        {option.label}
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-sm p-4">
                      No results found.
                    </div>
                  )}
                </div>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SearchInput;
