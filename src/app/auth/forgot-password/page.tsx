"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Input, Card, CardContent, CardHeader, CardTitle } from "@/components/ui";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Password reset request for:", email);
    alert("Password reset link sent to your email!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm dark:bg-gray-800/80">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto w-20 h-20 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-10 h-10 text-gray-600 dark:text-gray-300"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-700 dark:text-gray-200">
              FORGOT PASSWORD
            </CardTitle>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Enter your email address and we&apos;ll send you a link to reset your password.
            </p>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <svg
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-full font-semibold transition-colors"
              >
                SEND RESET LINK
              </Button>
            </form>

            <div className="text-center space-y-2">
              <Link
                href="/auth/login"
                className="text-sm text-purple-500 hover:text-purple-600 dark:text-purple-400 dark:hover:text-purple-300"
              >
                Back to Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
