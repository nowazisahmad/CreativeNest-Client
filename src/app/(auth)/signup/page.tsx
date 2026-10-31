"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react"; 

export default function SignUpPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSocialLoading, setIsSocialLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries()) as {
      name: string;
      image: string;
      email: string;
      password: string;
    };

    // ১. Password Validation
    const password = user.password;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasMinLength = password.length >= 6;

    if (!hasUppercase || !hasLowercase || !hasMinLength) {
      setIsLoading(false);
      toast.error("Invalid Password", {
        description: "Password must contain at least 1 uppercase, 1 lowercase, and be at least 6 characters long.",
      });
      return;
    }

    const toastId = toast.loading("Creating your account...");

    try {
      const { data, error } = await authClient.signUp.email({ ...user });

      if (error) {
        toast.error("Sign up failed", {
          id: toastId,
          description: error.message || "Something went wrong. Please try again.",
        });
        return;
      }

      if (data) {
        await authClient.signOut(); 

        toast.success("Account created successfully!", {
          id: toastId,
          description: "Please log in with your new credentials.",
        });

        setTimeout(() => {
          router.push("/login");
          router.refresh(); 
        }, 1500);
      }
    } catch (err) {
      toast.error("Something went wrong", {
        id: toastId,
        description: err instanceof Error ? err.message : "Unexpected error occurred.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignUp = async (provider: "google" | "github") => {
    setIsSocialLoading(true);
    const toastId = toast.loading(`Redirecting to ${provider}...`);
    
    try {
      await authClient.signIn.social({
        provider,
        callbackURL: "/", 
        errorCallbackURL: "/signup", 
      });
      toast.dismiss(toastId);
    } catch (err) {
      toast.error("Social sign up failed", {
        id: toastId,
        description: err instanceof Error ? err.message : "Failed to initiate sign up.",
      });
      setIsSocialLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-md mx-auto my-10 px-4">
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create Account</CardTitle>
          <CardDescription>Sign up with your Google or GitHub account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleEmailSignUp}>
            <FieldGroup>
              {/* Social Buttons */}
              <Field className="grid grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  type="button" 
                  onClick={() => handleSocialSignUp("google")}
                  disabled={isSocialLoading || isLoading}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mr-2 h-4 w-4">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Google
                </Button>
                
                <Button 
                  variant="outline" 
                  type="button" 
                  onClick={() => handleSocialSignUp("github")}
                  disabled={isSocialLoading || isLoading}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mr-2 h-4 w-4">
                    <path
                      d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                      fill="currentColor"
                    />
                  </svg>
                  GitHub
                </Button>
              </Field>
              
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with email
              </FieldSeparator>
              
              {/* Name */}
              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Name"
                  required
                />
              </Field>

              {/* Photo URL */}
              <Field>
                <FieldLabel htmlFor="image">Photo URL</FieldLabel>
                <Input
                  id="image"
                  type="url"
                  name="image"
                  placeholder="https://example.com/photo.jpg"
                  required
                />
              </Field>

              {/* Email */}
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>
              
              {/* Password */}
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <div className="relative">
                  <Input 
                    id="password" 
                    name="password" 
                    type={showPassword ? "text" : "password"} 
                    required 
                    placeholder="Min 6 chars, 1 uppercase, 1 lowercase"
                    className="pr-10" 
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </Field>
              
              {/* Submit Button */}
              <Field>
                <Button type="submit" disabled={isLoading || isSocialLoading} className="w-full bg-[#00A8E8] hover:bg-[#0090c9]">
                  {isLoading ? "Signing up..." : "Sign Up"}
                </Button>
                <FieldDescription className="text-center">
                  Have an account? <Link href="/login" className="text-[#00A8E8] hover:underline">Login</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      
      <FieldDescription className="px-6 text-center text-xs">
        By clicking continue, you agree to our <a href="#" className="hover:underline">Terms of Service</a>{" "}
        and <a href="#" className="hover:underline">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}