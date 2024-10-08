"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  name: string;
  onDateSelect: (date: Date | null) => void;
}

export function DatePicker({ name, onDateSelect }: DatePickerProps) {
  const [date, setDate] = React.useState<Date | null>(null);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate ?? null);
    onDateSelect(selectedDate ?? null);
  };

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal", // Updated to w-full
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date || undefined}
            onSelect={handleDateSelect}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      {date && (
        <input type="hidden" name={name} value={date.toISOString()} />
      )}
    </>
  );
}
