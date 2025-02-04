"use client";

import * as React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function DatePickerWithPresets({ name }: { name: string }) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !field.value && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2" />
              {field.value
                ? format(new Date(field.value), "PPP")
                : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            className="flex w-auto flex-col space-y-2 p-2"
          >
            {/* Preset Date Selection */}
            <Select
              onValueChange={(value) =>
                field.onChange(addDays(new Date(), parseInt(value)))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a date" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="0">Today</SelectItem>
                <SelectItem value="1">Tomorrow</SelectItem>
                <SelectItem value="3">In 3 days</SelectItem>
                <SelectItem value="7">In a week</SelectItem>
              </SelectContent>
            </Select>

            <div className="rounded-md border">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
              />
            </div>
          </PopoverContent>
        </Popover>
      )}
    />
  );
}
