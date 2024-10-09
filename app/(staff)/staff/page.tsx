'use client'

import React from "react";
import QrCodeScanner from "@/components/qrCodeScanner";
import { Scanner } from "@yudiel/react-qr-scanner";

export default function Staff() {
  return (
    <div>
      <QrCodeScanner />
    </div>
  );
}
