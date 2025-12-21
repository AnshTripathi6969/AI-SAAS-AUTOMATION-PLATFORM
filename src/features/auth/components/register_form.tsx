"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { motion } from "framer-motion";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

const registerSchema = z
  .object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(1, "Password is required"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const router = useRouter();
  const [shake, setShake] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const isPending = form.formState.isSubmitting;
  const emailValue = form.watch("email");
  const isEmailValid = registerSchema.shape.email.safeParse(emailValue).success;

  const onSubmit = async (values: RegisterFormValues) => {
    await authClient.signUp.email(
      {
        name: values.email,
        email: values.email,
        password: values.password,
        callbackURL: "/",
      },
      {
        onSuccess: () => router.push("/"),
        onError: (ctx) => {
          toast.error(ctx.error.message);
          setShake(true);
          setTimeout(() => setShake(false), 400);
        },
      }
    );
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-black overflow-hidden px-4">
      {/* BACKGROUND GLOW */}
      <motion.div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute left-1/2 top-[-30%] h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-purple-600/30 blur-[180px]"
          animate={{ y: [0, 40, 0] }}
          transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-[-15%] bottom-[-30%] h-[600px] w-[600px] rounded-full bg-blue-600/25 blur-[180px]"
          animate={{ y: [0, -40, 0] }}
          transition={{ duration: 50, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* 🔥 NEON ENERGY LINES (SAME AS LOGIN) */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-[2px] w-[140px] rounded-full
              bg-gradient-to-r from-transparent via-purple-400/60 to-transparent"
            style={{
              top: `${35 + i * 4}%`,
              left: "30%",
            }}
            animate={{
              x: ["-120px", "120px"],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeInOut",
            }}
          />
        ))}

        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={`blue-${i}`}
            className="absolute h-[2px] w-[120px] rounded-full
              bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"
            style={{
              top: `${40 + i * 5}%`,
              left: "28%",
              rotate: "-10deg",
            }}
            animate={{
              x: ["-100px", "100px"],
              opacity: [0, 0.9, 0],
            }}
            transition={{
              duration: 8 + i,
              repeat: Infinity,
              delay: i * 1.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* CARD */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{
          opacity: 1,
          y: 0,
          x: shake ? [-6, 6, -4, 4, 0] : 0,
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-20 w-full max-w-md"
      >
        <motion.div
          animate={{
            boxShadow: [
              "0 0 0 rgba(168,85,247,0)",
              "0 0 40px rgba(168,85,247,0.25)",
              "0 0 0 rgba(168,85,247,0)",
            ],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Card className="border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-white">
                Get started
              </CardTitle>
              <CardDescription className="text-white/60">
                Create your account to start automating
              </CardDescription>
            </CardHeader>

            <CardContent>
              {/* OAUTH */}
              <div className="mb-6 flex flex-col gap-3">
                {["github", "google"].map((p) => (
                  <motion.div key={p} whileTap={{ scale: 0.97 }}>
                    <Button
                      variant="outline"
                      type="button"
                      disabled={isPending}
                      className="flex w-full items-center gap-3 border-white/15 bg-white/5 text-white hover:bg-white/10"
                    >
                      <Image
                        alt={p}
                        src={`/logos/${p}.svg`}
                        width={18}
                        height={18}
                      />
                      Continue with {p.charAt(0).toUpperCase() + p.slice(1)}
                    </Button>
                  </motion.div>
                ))}
              </div>

              {/* FORM */}
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/80">Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            className={`bg-white/5 border-white/10 text-white transition focus:ring-2 ${
                              isEmailValid
                                ? "focus:border-emerald-500 focus:ring-emerald-500/30"
                                : "focus:border-purple-500 focus:ring-purple-500/30"
                            }`}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/80">
                          Password
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            className="bg-white/5 border-white/10 text-white focus:ring-2 focus:ring-purple-500/30"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/80">
                          Confirm password
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            className="bg-white/5 border-white/10 text-white focus:ring-2 focus:ring-purple-500/30"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <motion.div whileTap={{ scale: 0.97 }}>
                    <Button
                      type="submit"
                      disabled={isPending}
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600"
                    >
                      {isPending ? "Creating account..." : "Sign up"}
                    </Button>
                  </motion.div>
                </form>
              </Form>

              <p className="mt-6 text-center text-sm text-white/60">
                Already have an account?{" "}
                <Link href="/login" className="text-white hover:underline">
                  Log in
                </Link>
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
