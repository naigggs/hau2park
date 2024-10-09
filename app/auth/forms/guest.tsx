'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/datePicker";
import Link from "next/link";
import { Guest } from "@/server-actions/auth/actions";

export default function GuestForm() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <main className="container mx-auto w-[90%]">
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Guest Form</h2>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="license_plate">License Plate</Label>
            <Input
              id="license_plate"
              name="license_plate"
              placeholder="Enter your License Plate"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="appointment_date">Appointment Date</Label>
            <DatePicker name="appointment_date" onDateSelect={setSelectedDate} />
          </div>

          {/* Time in and Time out side by side */}
          <div className="flex space-x-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="time_in">Time in</Label>
              <Input
                id="time_in"
                name="time_in"
                type="time"
                placeholder="Pick a time"
                required
              />
            </div>
            <div className="flex-1 space-y-2">
              <Label htmlFor="time_out">Time out</Label>
              <Input
                id="time_out"
                name="time_out"
                type="time"
                placeholder="Pick a time"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="purpose">Purpose of Visit</Label>
            <Textarea
              id="purpose"
              name="purpose"
              placeholder="Enter purpose of visit"
              required
            />
          </div>
          <Button formAction={Guest} type="submit" className="w-full">
            Submit
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Already have an appointment?{" "}
          <Link href="/auth/login" className="text-primary hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}
