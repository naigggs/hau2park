"use client";

import { IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner";
import { createClient } from "@/utils/supabase/client";
import React from "react";

const QrCodeScanner: React.FC = () => {
  const [existingRow, setExistingRow] = React.useState<any | null>(null);
  const [acceptedMessage, setAcceptedMessage] = React.useState<string | null>(null); // State for accepted message

  const handleScan = async (detectedCodes: IDetectedBarcode[]) => {
    if (detectedCodes.length > 0) {
      const result = detectedCodes[0].rawValue;
      if (result) {
        try {
          const parsedData = JSON.parse(result);
          console.log("Parsed data:", parsedData);

          const supabase = createClient();
          const { data: existingRow, error } = await supabase
            .from("guest_users")
            .select("*")
            .eq("id", parsedData.id)
            .eq("is_approved", true)
            .single();

          if (error) {
            console.log("No existing row found");
            setAcceptedMessage("Your parking request has been denied.");
            return;
          }

          if (existingRow) {
            console.log("Row exists:", existingRow);
            setExistingRow(existingRow);
            setAcceptedMessage("Your parking request has been accepted!"); // Set accepted message
            }
        } catch (error) {
          console.error("Error parsing QR code data: ", error);
        }
      }
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">QR Code Scanner</h1>
      <Scanner onScan={handleScan} />
      {existingRow && (
        <div className="mt-4 p-4 border rounded">
          <h2 className="text-xl font-semibold">Scanned Data:</h2>
          <pre className="bg-gray-100 p-2 rounded">
            {JSON.stringify(existingRow, null, 2)}
          </pre>
        </div>
      )}
      {acceptedMessage && (
        <p className="mt-4 text-green-600 font-semibold">{acceptedMessage}</p> // Display accepted message
      )}
    </div>
  );
};

export default QrCodeScanner;
