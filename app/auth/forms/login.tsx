import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { Login } from "@/server-actions/auth/actions";

export default function LoginForm() {
  return (
    <main className="container mx-auto">
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
            />
            <Label htmlFor="remember">Remember me</Label>
          </div>
          <Button formAction={Login} type="submit" className="w-full">
            Log in
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link href="/auth/register" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}
