"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

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

export async function getJobs() {
  const supabase = createClient()

  const { data, error } = await supabase.from("jobs").select("*");

  if (error) {
    console.log(error);
    revalidatePath("/error", "layout");
    redirect("/error");
  }

  return data;
}
