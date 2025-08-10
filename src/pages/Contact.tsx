import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const contactSchema = z
  .object({
    fullName: z.string().min(2, "Please enter your full name"),
    email: z.string().email("Enter a valid email address"),
    phone: z
      .string()
      .min(7, "Enter a valid phone number")
      .max(20)
      .regex(/^[0-9+()\-\s]*$/, "Only numbers and + ( ) - are allowed"),
    destination: z.string().min(2, "Please enter a destination or property"),
    guests: z.coerce.number().int().min(1, "At least 1 guest").max(20, "Max 20 guests"),
    dates: z
      .object({ from: z.date().optional(), to: z.date().optional() })
      .refine((r) => !!r.from && !!r.to, { message: "Please select your check-in and check-out dates" }),
    preferredContact: z.enum(["email", "phone"], { required_error: "Select a contact method" }),
    message: z.string().min(10, "Please provide a short message (min 10 chars)"),
    budget: z
      .union([z.literal(""), z.coerce.number().int().positive("Enter a positive number")])
      .optional()
      .transform((v) => (v === "" ? undefined : v)),
  })
  .refine((data) => {
    const { from, to } = data.dates;
    return from && to ? from < to : false;
  }, { path: ["dates"], message: "Check-out must be after check-in" });

type ContactFormValues = z.infer<typeof contactSchema>;

const Contact = () => {
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      destination: "",
      guests: 2,
      dates: { from: undefined, to: undefined },
      preferredContact: "email",
      message: "",
      budget: undefined,
    },
    mode: "onChange",
  });

  const nights = useMemo(() => {
    const range = form.getValues().dates as DateRange;
    if (!range?.from || !range?.to) return 0;
    const ms = range.to.getTime() - range.from.getTime();
    return Math.max(0, Math.round(ms / (1000 * 60 * 60 * 24)));
  }, [form.watch("dates")]);

  const onSubmit = (values: ContactFormValues) => {
    toast({
      title: "Thanks! We received your inquiry",
      description: `${values.fullName}, we will contact you via ${values.preferredContact} within 24 hours.`,
    });
    // Submit to backend or email service here
  };

  return (
    <main className="container py-10">
      <Card className="mx-auto max-w-4xl">
        <CardHeader>
          <CardTitle>Contact us for a booking inquiry</CardTitle>
          <CardDescription>
            Share your trip details and we’ll help you secure the perfect stay.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-8 md:grid-cols-2">
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full name</FormLabel>
                      <FormControl>
                        <Input placeholder="Jane Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="jane@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="+1 202 555 0123" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="preferredContact"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred contact method</FormLabel>
                      <FormControl>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select method" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="email">Email</SelectItem>
                            <SelectItem value="phone">Phone</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea rows={6} placeholder="Tell us about your trip, preferences, and any questions..." {...field} />
                      </FormControl>
                      <FormDescription>
                        Include details like flexibility, must-have amenities, or special occasions.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="destination"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Destination or property</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Bali, Paris, or specific listing" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-6 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="guests"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Guests</FormLabel>
                        <FormControl>
                          <Select value={String(field.value)} onValueChange={(v) => field.onChange(Number(v))}>
                            <SelectTrigger>
                              <SelectValue placeholder="Guests" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
                                <SelectItem key={n} value={String(n)}>
                                  {n}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="budget"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Approx. nightly budget (USD)</FormLabel>
                        <FormControl>
                          <Input type="number" min={1} placeholder="e.g., 250" value={field.value as any ?? ""} onChange={field.onChange} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="dates"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Dates</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "justify-start text-left font-normal",
                                !field.value?.from && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value?.from ? (
                                field.value.to ? (
                                  <span>
                                    {format(field.value.from, "LLL dd, y")} – {format(field.value.to, "LLL dd, y")}
                                  </span>
                                ) : (
                                  <span>{format(field.value.from, "LLL dd, y")}</span>
                                )
                              ) : (
                                <span>Pick dates</span>
                              )}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            initialFocus
                            mode="range"
                            numberOfMonths={2}
                            selected={field.value as DateRange}
                            onSelect={(range) => field.onChange(range)}
                          />
                        </PopoverContent>
                      </Popover>
                      {nights > 0 && (
                        <FormDescription>{nights} night{nights === 1 ? "" : "s"}</FormDescription>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="pt-2 flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    By submitting, you agree to our terms and privacy policy.
                  </p>
                  <Button type="submit">Send inquiry</Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
};

export default Contact;

