'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const formSchema = z.object({
  education: z.string().min(1, { message: "Please select your level of education." }),
  employment: z.string().min(1, { message: "Please select your employment status." }),
  income: z.string().min(1, { message: "Please select your monthly income." }),
  purpose: z.string().min(1, { message: "Please select your loan purpose." }),
  refereeName: z.string().min(2, { message: "Referee name must be at least 2 characters." }),
  phone: z.string().regex(/^0[17]\d{8}$/, { message: "Please enter a valid Kenyan phone number." }),
  relationship: z.string().min(1, { message: "Please select your relationship with the referee." }),
});

export function EligibilityForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      education: "",
      employment: "",
      income: "",
      purpose: "",
      refereeName: "",
      phone: "",
      relationship: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    localStorage.setItem('eligibilityData', JSON.stringify(values));
    const newUser = {
      phone: values.phone,
      name: `User ${values.phone.slice(-4)}`
    }
    localStorage.setItem('mwananchi_user', JSON.stringify(newUser));
    router.push('/authorizing');
  }

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="hidden md:block">
          <Image
            src="https://placehold.co/600x700.png"
            alt="Happy person using a phone"
            width={600}
            height={700}
            className="rounded-lg shadow-xl"
            data-ai-hint="happy person phone"
          />
        </div>
        <Card className="w-full max-w-lg mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Find Your Loan Eligibility</CardTitle>
            <CardDescription className="text-center">
              We offer loans from Ksh. 2,000 - 50,000 to your MPESA
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField control={form.control} name="education" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Level of Education</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="primary">Primary</SelectItem>
                          <SelectItem value="secondary">Secondary</SelectItem>
                          <SelectItem value="tertiary">Tertiary</SelectItem>
                          <SelectItem value="none">None</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="employment" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Employment</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="employed">Employed</SelectItem>
                          <SelectItem value="self-employed">Self-Employed</SelectItem>
                          <SelectItem value="unemployed">Unemployed</SelectItem>
                          <SelectItem value="student">Student</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                 <FormField control={form.control} name="income" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Monthly Income</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger><SelectValue placeholder="Select income range" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="0-5k">Ksh 0 - 5,000</SelectItem>
                          <SelectItem value="5k-15k">Ksh 5,001 - 15,000</SelectItem>
                          <SelectItem value="15k-30k">Ksh 15,001 - 30,000</SelectItem>
                          <SelectItem value="30k+">Above Ksh 30,000</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                <FormField control={form.control} name="purpose" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Loan Purpose</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select purpose" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="personal">Personal/Emergency</SelectItem>
                        <SelectItem value="school-fees">School Fees</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="refereeName" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Referee Name</FormLabel>
                    <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="phone" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your M-Pesa Phone Number</FormLabel>
                    <FormControl><Input placeholder="0712345678" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="relationship" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Relationship with Referee</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select relationship" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="family">Family</SelectItem>
                        <SelectItem value="friend">Friend</SelectItem>
                        <SelectItem value="colleague">Colleague</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
                <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" size="lg">Submit Details</Button>
              </form>
            </Form>
            <div className="text-center mt-4">
              <p className="text-sm font-semibold text-gray-600">No CRB Check. No Guarantors. Disbursed to MPESA. No Paperwork.</p>
              <p className="text-xs text-muted-foreground mt-2">
                By submitting you confirm that you accept the <Link href="#" className="underline">Terms and Conditions</Link> and <Link href="#" className="underline">Privacy Policy</Link>.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
