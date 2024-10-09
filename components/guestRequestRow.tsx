"use client";

import { Button } from "@/components/ui/button";
import { ApproveRequest, RejectRequest } from "@/server-actions/admin/actions";

interface GuestRequestRowProps {
  request: {
    id: string;
    name: string;
    appointment_date: string;
    time_in: string;
    time_out: string;
    purpose: string;
    license_plate: string;
  };
}

const GuestRequestRow: React.FC<GuestRequestRowProps> = ({ request }) => {
  const handleApprove = async () => {
    const formData = new FormData();
    formData.append("requestId", request.id);

    await ApproveRequest(formData);
    window.location.reload();
  };

  const handleReject = async () => {
    const formData = new FormData();
    formData.append("requestId", request.id);

    await RejectRequest(formData);
    window.location.reload();
  };

  return (
    <tr>
      <td>{request.name}</td>
      <td>{request.appointment_date}</td>
      <td>
        {request.time_in} to {request.time_out}
      </td>
      <td>{request.purpose}</td>
      <td>{request.license_plate}</td>
      <td>
        <div className="flex space-x-2">
          <Button variant="default" onClick={handleApprove}>
            Approve
          </Button>
          <Button variant="destructive" onClick={handleReject}>
            Reject
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default GuestRequestRow;
