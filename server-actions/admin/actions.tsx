"use server";

import nodemailer from "nodemailer";
import QRCode from "qrcode";
import { createClient } from "@/utils/supabase/server";

export async function ApproveRequest(formData: FormData) {
  const supabase = createClient();
  
  const requestId = formData.get("requestId");

  // Update the request to set is_approved to true
  const { data: updateData, error: updateError } = await supabase
    .from('guest_users')
    .update({ is_approved: true })
    .eq('id', requestId);
    
  if (updateError) {
    console.error("Error updating request: ", updateError);
    return; 
  }

  // Fetch the user's email and other details
  const { data: userData, error: fetchError } = await supabase
    .from('guest_users')
    .select('email, name, appointment_date, purpose, license_plate')
    .eq('id', requestId)
    .single();

  if (fetchError) {
    console.error("Error fetching user email: ", fetchError);
    return; 
  }

  const userEmail = userData.email;

  // Generate QR code with user details
  const qrData = {
    name: userData.name,
    email: userEmail,
    appointment_date: userData.appointment_date,
    purpose: userData.purpose,
    license_plate: userData.license_plate,
  };

  try {
    const qrCodeDataUrl = await QRCode.toDataURL(JSON.stringify(qrData));

    // Configure the email transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.NEXT_PUBLIC_USER_EMAIL,
        pass: process.env.NEXT_PUBLIC_USER_PASSWORD,
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.NEXT_PUBLIC_USER_EMAIL, 
      to: userEmail,
      subject: "Parking Request Approved",
      text: "Your parking request has been approved! Here is your QR code:",
      attachments: [
        {
          filename: 'qrcode.png',
          content: qrCodeDataUrl.split(",")[1], // Get the base64 part
          encoding: 'base64',
        },
      ],
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email: ", error);
      } else {
        console.log("Email sent: ", info.response);
      }
    });

  } catch (qrError) {
    console.error("Error generating QR code: ", qrError);
  }
}

export async function RejectRequest(formData: FormData) {
  const supabase = createClient();
  
  const requestId = formData.get("requestId");

  const { data: updateData, error: updateError } = await supabase
    .from('guest_users')
    .update({ is_approved: false, is_rejected: true })
    .eq('id', requestId);
    
  if (updateError) {
    console.error("Error updating request: ", updateError);
    return; 
  }


  const { data: userData, error: fetchError } = await supabase
    .from('guest_users')
    .select('email')
    .eq('id', requestId)
    .single();

  if (fetchError) {
    console.error("Error fetching user email: ", fetchError);
    return; 
  }

  const userEmail = userData.email;


  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.NEXT_PUBLIC_USER_EMAIL,
      pass: process.env.NEXT_PUBLIC_USER_PASSWORD,
    },
  });

 
  const mailOptions = {
    from: process.env.NEXT_PUBLIC_USER_EMAIL, 
    to: userEmail,
    subject: "Parking Request Denied",
    text: "Your parking request has been denied!",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email: ", error);
    } else {
      console.log("Email sent: ", info.response);
    }
  });
}