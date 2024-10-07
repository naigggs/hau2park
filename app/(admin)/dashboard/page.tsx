import React from "react";
import { chatGetParkingSpot } from "@/server-actions/parking/actions";
import { Button } from "@/components/ui/button";

export default async function Dashboard() {
  return (
    <div>
      <form>
        <Button formAction={chatGetParkingSpot} variant="outline" size="sm">
          Give me a parking spot.
        </Button>
      </form>
    </div>
  );
}
