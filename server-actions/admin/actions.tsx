"use server";

import nodemailer from "nodemailer";
import { createClient } from "@/utils/supabase/server";

export async function ApproveRequest(formData: FormData) {
   const supabase = createClient();
    // TODO: Supabase

    
        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });
    
        const mailOption = {
          from: "HAU2PARK@gmail.com",
          to: email as string,
          subject: "Your Item has been Delivered!",
          html: `
          <h3>Hello</h3>
          <li> This is to inform you that your item has been delivered!</li>
          <li> Click this link to confirm the order.</li> 
          `,
        };
    
        await transporter.sendMail(mailOption);
      } else {
        console.log("Email found");
        revalidatePath(`/dashboard/activeloads/${id}/rate`, "layout");
        redirect(`/dashboard/activeloads/${id}/rate`);
      }
    
      revalidatePath(`/dashboard/activeloads/${id}/rate`, "layout");
      redirect(`/dashboard/activeloads/${id}/rate`);
}