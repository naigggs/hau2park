"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { time } from "console";

export async function Login(formData: FormData) {
  const supabase = createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/home", "layout");
  redirect("/home");
}

export async function Signup(formData: FormData) {
  const supabase = createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  };

  if (data.password.length !== data.confirmPassword.length) {
    return { error: "Password lengths do not match. Please try again." };
  }

  if (data.password !== data.confirmPassword) {
    return { error: "Passwords do not match. Please try again." };
  }

  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });

  if (error) {
    console.log(error);
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/home");
}

export async function Logout() {
  const supabase = createClient()

  await supabase.auth.signOut();

  revalidatePath("/", "layout");
  redirect("/");
}

export async function Guest(formData: FormData){
  const supabase = createClient();

  const data = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    appointment_date: formData.get("appointment_date") as string,
    license_plate: formData.get("license_plate") as string,
    time_in: formData.get("time_in") as string,
    time_out: formData.get("time_out") as string,
    purpose: formData.get("purpose") as string,
  };

  const { error } = await supabase.from("guest_users").insert([data]);

  if (error) {
    console.error(error);
  }

  revalidatePath("/home", "layout");
  redirect("/home");
}