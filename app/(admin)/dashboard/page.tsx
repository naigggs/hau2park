import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { createClient } from "@/utils/supabase/server";

export default async function GuestParkingDashboard() {
  const supabase = createClient();

  const { data: requests, error } = await supabase
    .from("guest_users")
    .select("*");

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
            <TableHead>License Plate</TableHead>
            <TableHead>Purpose</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests?.map((request) => (
            <TableRow key={request.id}>
              <TableCell>{request.name}</TableCell>
              <TableCell>{request.appointment_date}</TableCell>
              <TableCell>{request.time_in} to {request.time_out}</TableCell>
              <TableCell>{request.purpose}</TableCell>
              <TableCell>{request.license_plate}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="default">Approve</Button>
                  <Button variant="destructive">Reject</Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {requests?.length === 0 && (
        <p className="text-center mt-4 text-gray-500">No pending requests</p>
      )}
    </div>
  );
}
