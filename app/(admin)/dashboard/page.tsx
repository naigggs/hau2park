import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { createClient } from "@/utils/supabase/server";
import GuestRequestRow from "@/components/guestRequestRow";

export default async function GuestParkingDashboard() {
  const supabase = createClient();

  const { data: requests, error } = await supabase
    .from("guest_users")
    .select("*")
    .eq("is_approved", false) 
    .eq("is_rejected", false);

  if (error) {
    console.error("Error fetching requests: ", error);
  }

  console.log(requests);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Guest Parking Request Dashboard
      </h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Guest Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Purpose</TableHead>
            <TableHead>License Plate</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests?.map((request) => (
            // DONT REMOVE: THIS IS REQUIRED FOR BACKEND
            <GuestRequestRow key={request.id} request={request} />
            // DONT REMOVE : THIS IS REQUIRED FOR BACKEND
          ))}
        </TableBody>
      </Table>
      {requests?.length === 0 && (
        <p className="text-center mt-4 text-gray-500">No pending requests</p>
      )}
    </div>
  );
}
