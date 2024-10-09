"use client";

import { IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner";
import { createClient } from "@/utils/supabase/client";
import React from "react";
import { set } from "date-fns";

const QrCodeScanner: React.FC = () => {
//   const [existingRow, setExistingRow] = React.useState<any | null>(null);
//   const handleScan = async (detectedCodes: IDetectedBarcode[]) => {
//     if (detectedCodes.length > 0) {
//       const result = detectedCodes[0].rawValue;
//       if (result) {
//         try {
//           const parsedData = JSON.parse(result);

//           const supabase = createClient();
//           const { data: existingRow, error } = await supabase
//             .from("guest_users")
//             .select("*")
//             .eq("id", parsedData.id)
//             .single();

//           if (error) {
//             console.error("Error checking Supabase: ", error);
//             return;
//           }

//           if (existingRow) {
//             console.log("Row exists:", existingRow);
//             setExistingRow(existingRow);
//             // executeFunction(existingRow);
//           } else {
//             console.log("No existing row found");
//           }
//         } catch (error) {
//           console.error("Error parsing QR code data: ", error);
//         }
//       }
//     }
//   };

//   const executeFunction = (existingRow: any) => {
//     console.log("Executing function with data:", existingRow);
//   };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">QR Code Scanner</h1>
      <Scanner onScan={(result) => console.log(result)}  />
      {/* {existingRow && (
        <div className="mt-4 p-4 border rounded">
          <h2 className="text-xl font-semibold">Scanned Data:</h2>
          <pre className="bg-gray-100 p-2 rounded">
            {JSON.stringify(existingRow, null, 2)}
          </pre>
        </div>
      )} */}
    </div>
  );
};

export default QrCodeScanner;
