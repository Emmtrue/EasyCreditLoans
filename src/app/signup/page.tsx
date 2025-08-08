'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from 'next/link';
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  county: z.string().min(1, { message: "Please select your county." }),
  phone: z.string().regex(/^0[17]\d{8}$/, { message: "Please enter a valid Kenyan M-Pesa number." }),
  nationalId: z.string().regex(/^\d{7,8}$/, { message: "Please enter a valid National ID number." }),
  gender: z.string().min(1, { message: "Please select your gender." }),
  dob: z.string().min(1, { message: "Date of birth is required." }),
  maritalStatus: z.string().min(1, { message: "Please select your marital status." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  confirmPassword: z.string(),
  agree: z.boolean().default(false).refine((val) => val === true, { message: "You must accept the terms and conditions." }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export default function SignupPage() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      county: "",
      phone: "",
      nationalId: "",
      gender: "",
      dob: "",
      maritalStatus: "",
      password: "",
      confirmPassword: "",
      agree: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { password, confirmPassword, agree, ...userData } = values;
    localStorage.setItem('mwananchi_user', JSON.stringify(userData));
    localStorage.setItem('loanHistory', JSON.stringify([])); // Initialize loan history
    toast({ title: "Account Created!", description: "You can now apply for a loan." });
    router.push('/authorizing');
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4 py-8">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Create Your Account</CardTitle>
          <CardDescription>Get started with quick and easy loans</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="Jane Doe" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="phone" render={({ field }) => (
                  <FormItem><FormLabel>M-PESA Phone Number</FormLabel><FormControl><Input placeholder="0712345678" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="nationalId" render={({ field }) => (
                  <FormItem><FormLabel>National ID Number</FormLabel><FormControl><Input placeholder="12345678" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="dob" render={({ field }) => (
                  <FormItem><FormLabel>Date of Birth</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="gender" render={({ field }) => (
                  <FormItem><FormLabel>Gender</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger></FormControl><SelectContent><SelectItem value="male">Male</SelectItem><SelectItem value="female">Female</SelectItem></SelectContent></Select><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="maritalStatus" render={({ field }) => (
                  <FormItem><FormLabel>Marital Status</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger></FormControl><SelectContent><SelectItem value="single">Single</SelectItem><SelectItem value="married">Married</SelectItem><SelectItem value="divorced">Divorced</SelectItem><SelectItem value="widowed">Widowed</SelectItem></SelectContent></Select><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="county" render={({ field }) => (
                  <FormItem><FormLabel>County</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select county" /></SelectTrigger></FormControl><SelectContent><SelectItem value="nairobi">Nairobi</SelectItem><SelectItem value="mombasa">Mombasa</SelectItem><SelectItem value="kisumu">Kisumu</SelectItem>{/* Add all 47 counties */}</SelectContent></Select><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="password" render={({ field }) => (
                  <FormItem><FormLabel>Password</FormLabel><FormControl><Input type="password" placeholder="********" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="confirmPassword" render={({ field }) => (
                  <FormItem><FormLabel>Confirm Password</FormLabel><FormControl><Input type="password" placeholder="********" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
              <FormField control={form.control} name="agree" render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>I agree to receive information about loan offers and understand the <Link href="#" className="text-primary hover:underline">Terms and Conditions</Link>.</FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )} />
              <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" size="lg">Create Account</Button>
              <div className="text-center">
                <p className="text-sm">Already have an account? <Link href="/login" className="text-primary hover:underline">Log In</Link></p>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
