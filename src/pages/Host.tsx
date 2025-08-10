import { useMemo, useState } from "react";
import { useForm, ControllerRenderProps } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const amenityOptions = [
  "Wi‑Fi",
  "Air conditioning",
  "Heating",
  "Kitchen",
  "Washer",
  "Dryer",
  "Free parking",
  "Pool",
  "Hot tub",
  "TV",
  "Workspace",
  "Pets allowed",
  "Outdoor area",
  "BBQ grill",
] as const;

const propertyTypes = ["Apartment", "House", "Villa", "Cabin", "Cottage", "Loft", "Studio"] as const;

const cancellationPolicies = [
  { value: "flexible", label: "Flexible (full refund up to 24h before)" },
  { value: "moderate", label: "Moderate (full refund up to 5 days before)" },
  { value: "strict", label: "Strict (partial refund up to 7 days before)" },
];

const hostSchema = z
  .object({
    // Host info
    fullName: z.string().min(2, "Enter your full name"),
    email: z.string().email("Enter a valid email"),
    phone: z
      .string()
      .min(7, "Enter a valid phone number")
      .max(20)
      .regex(/^[0-9+()\-\s]*$/, "Only numbers and + ( ) - are allowed"),

    // Property basics
    title: z.string().min(5, "Give your listing a descriptive title"),
    description: z.string().min(20, "Describe your place (min 20 characters)"),
    propertyType: z.enum(propertyTypes, { required_error: "Select a property type" }),

    // Address
    country: z.string().min(2, "Country is required"),
    street: z.string().min(3, "Street address is required"),
    city: z.string().min(2, "City is required"),
    state: z.string().min(2, "State/Region is required"),
    postalCode: z.string().min(3, "Postal code is required"),

    // Capacity
    bedrooms: z.coerce.number().int().min(0).max(20),
    bathrooms: z.coerce.number().int().min(0).max(20),
    maxGuests: z.coerce.number().int().min(1).max(32),

    // Amenities
    amenities: z.array(z.enum(amenityOptions)).min(1, "Select at least 1 amenity"),

    // Safety
    safetySmokeDetector: z.boolean().optional().transform(Boolean),
    safetyFireExtinguisher: z.boolean().optional().transform(Boolean),
    safetyFirstAidKit: z.boolean().optional().transform(Boolean),
    registrationId: z.string().optional(),

    // Pricing & availability
    pricePerNight: z.coerce.number().positive("Enter a nightly price"),
    cleaningFee: z.coerce.number().min(0).default(0),
    minNights: z.coerce.number().int().min(1).max(30),
    maxNights: z.coerce.number().int().min(1).max(365),
    checkInWindow: z.enum(["12:00-15:00", "15:00-18:00", "18:00-21:00"]),
    checkOutTime: z.enum(["10:00", "11:00", "12:00"]),
    cancellationPolicy: z.enum(["flexible", "moderate", "strict"], { required_error: "Select a policy" }),

    // House rules
    rules: z.string().min(10, "Add a few house rules"),
    allowInstantBook: z.boolean().optional().transform(Boolean),

    // Photos (store filenames only for demo)
    photos: z.array(z.string()).min(1, "Add at least 1 photo").max(4, "Maximum 4 photos"),

    // Terms
    agreeToTerms: z.boolean().refine((v) => v, { message: "You must agree before submitting" }),
  })
  .refine((data) => data.maxNights >= data.minNights, {
    message: "Max nights must be greater than or equal to min nights",
    path: ["maxNights"],
  });

type HostForm = z.infer<typeof hostSchema>;

const Host = () => {
  const { toast } = useToast();
  const [photoSlots, setPhotoSlots] = useState<{ room?: string; front?: string; backyard?: string; living?: string }>({});

  const form = useForm<HostForm>({
    resolver: zodResolver(hostSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      title: "",
      description: "",
      propertyType: undefined as unknown as HostForm["propertyType"],
      country: "",
      street: "",
      city: "",
      state: "",
      postalCode: "",
      bedrooms: 1,
      bathrooms: 1,
      maxGuests: 2,
      amenities: [],
      safetySmokeDetector: true,
      safetyFireExtinguisher: true,
      safetyFirstAidKit: false,
      registrationId: "",
      pricePerNight: 120,
      cleaningFee: 30,
      minNights: 1,
      maxNights: 30,
      checkInWindow: "15:00-18:00",
      checkOutTime: "11:00",
      cancellationPolicy: "moderate",
      rules: "No parties. No smoking inside. Respect quiet hours after 10pm.",
      allowInstantBook: false,
      photos: [],
      agreeToTerms: false,
    },
    mode: "onChange",
  });

  const estimatedPayout = useMemo(() => {
    const nights = Math.max(1, form.getValues().minNights);
    const total = form.getValues().pricePerNight * nights - form.getValues().cleaningFee;
    return Math.max(0, Number(total.toFixed(2)));
  }, [form.watch(["pricePerNight", "minNights", "cleaningFee"]) ]);

  const onSubmit = (values: HostForm) => {
    toast({
      title: "Listing submitted for review",
      description: `${values.title} • ${values.city}, ${values.country}. We’ll get back to you within 24–48h.`,
    });
    // Submit to backend here
  };

  const updatePhotos = (
    field: ControllerRenderProps<HostForm, "photos">,
    slot: keyof typeof photoSlots,
    fileList: FileList | null
  ) => {
    const name = fileList && fileList[0] ? fileList[0].name : undefined;
    const next = { ...photoSlots, [slot]: name };
    setPhotoSlots(next);
    const values = [next.room, next.front, next.backyard, next.living].filter(Boolean) as string[];
    field.onChange(values);
  };

  const clearPhoto = (
    field: ControllerRenderProps<HostForm, "photos">,
    slot: keyof typeof photoSlots
  ) => {
    const next = { ...photoSlots, [slot]: undefined };
    setPhotoSlots(next);
    const values = [next.room, next.front, next.backyard, next.living].filter(Boolean) as string[];
    field.onChange(values);
  };

  return (
    <main className="container py-8">
      <div className="mx-auto max-w-5xl space-y-8">
        <header className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-semibold">Become a Host</h1>
          <p className="text-muted-foreground">Share your space with trusted guests. Tell us about your place to get started.</p>
        </header>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Host info */}
            <Card>
              <CardHeader>
                <CardTitle>About you</CardTitle>
                <CardDescription>We’ll use this to contact you and verify your listing.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6 md:grid-cols-3">
                <FormField control={form.control} name="fullName" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full name</FormLabel>
                    <FormControl><Input placeholder="Jane Doe" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl><Input type="email" placeholder="jane@example.com" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="phone" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl><Input placeholder="+1 202 555 0123" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </CardContent>
            </Card>

            {/* Property basics */}
            <Card>
              <CardHeader>
                <CardTitle>Property details</CardTitle>
                <CardDescription>Tell guests what makes your place special.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <FormField control={form.control} name="title" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Listing title</FormLabel>
                      <FormControl><Input placeholder="Cozy seaside cottage with ocean views" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="propertyType" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Property type</FormLabel>
                      <FormControl>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger><SelectValue placeholder="Select a type" /></SelectTrigger>
                          <SelectContent>
                            {propertyTypes.map((t) => (<SelectItem key={t} value={t}>{t}</SelectItem>))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>

                <FormField control={form.control} name="description" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl><Textarea rows={6} placeholder="Describe layout, vibe, nearby attractions, and what guests can expect." {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </CardContent>
            </Card>

            {/* Photos (up to 4) */}
            <Card>
              <CardHeader>
                <CardTitle>Photos</CardTitle>
                <CardDescription>Upload up to 4 images: Room, Front, Backyard, and Living room.</CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="photos"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <FormLabel className="flex items-center justify-between">
                            <span>Room</span>
                            {photoSlots.room && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => clearPhoto(field, "room")}
                              >
                                Remove
                              </Button>
                            )}
                          </FormLabel>
                          <FormControl>
                            <Input type="file" accept="image/*" onChange={(e) => updatePhotos(field, "room", e.target.files)} />
                          </FormControl>
                          {photoSlots.room && (
                            <FormDescription className="!mt-1">Selected: {photoSlots.room}</FormDescription>
                          )}
                        </div>
                        <div>
                          <FormLabel className="flex items-center justify-between">
                            <span>Front</span>
                            {photoSlots.front && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => clearPhoto(field, "front")}
                              >
                                Remove
                              </Button>
                            )}
                          </FormLabel>
                          <FormControl>
                            <Input type="file" accept="image/*" onChange={(e) => updatePhotos(field, "front", e.target.files)} />
                          </FormControl>
                          {photoSlots.front && (
                            <FormDescription className="!mt-1">Selected: {photoSlots.front}</FormDescription>
                          )}
                        </div>
                        <div>
                          <FormLabel className="flex items-center justify-between">
                            <span>Backyard</span>
                            {photoSlots.backyard && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => clearPhoto(field, "backyard")}
                              >
                                Remove
                              </Button>
                            )}
                          </FormLabel>
                          <FormControl>
                            <Input type="file" accept="image/*" onChange={(e) => updatePhotos(field, "backyard", e.target.files)} />
                          </FormControl>
                          {photoSlots.backyard && (
                            <FormDescription className="!mt-1">Selected: {photoSlots.backyard}</FormDescription>
                          )}
                        </div>
                        <div>
                          <FormLabel className="flex items-center justify-between">
                            <span>Living room</span>
                            {photoSlots.living && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => clearPhoto(field, "living")}
                              >
                                Remove
                              </Button>
                            )}
                          </FormLabel>
                          <FormControl>
                            <Input type="file" accept="image/*" onChange={(e) => updatePhotos(field, "living", e.target.files)} />
                          </FormControl>
                          {photoSlots.living && (
                            <FormDescription className="!mt-1">Selected: {photoSlots.living}</FormDescription>
                          )}
                        </div>
                      </div>
                      <FormDescription className="mt-4">
                        JPG/PNG recommended, at least 1200px wide. You can add more photos later.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Address */}
            <Card>
              <CardHeader>
                <CardTitle>Address</CardTitle>
                <CardDescription>This helps guests find and evaluate your place.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6 md:grid-cols-2">
                <FormField control={form.control} name="country" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl><Input placeholder="United Kingdom" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="street" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street address</FormLabel>
                    <FormControl><Input placeholder="123 Coastal Road" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="city" render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl><Input placeholder="Cornwall" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="state" render={({ field }) => (
                  <FormItem>
                    <FormLabel>State / Region</FormLabel>
                    <FormControl><Input placeholder="England" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="postalCode" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Postal code</FormLabel>
                    <FormControl><Input placeholder="TR11 5AB" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </CardContent>
            </Card>

            {/* Capacity & amenities */}
            <Card>
              <CardHeader>
                <CardTitle>Capacity & amenities</CardTitle>
                <CardDescription>Who can you host and what do you offer?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-3">
                  <FormField control={form.control} name="bedrooms" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bedrooms</FormLabel>
                      <FormControl><Input type="number" min={0} max={20} {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="bathrooms" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bathrooms</FormLabel>
                      <FormControl><Input type="number" min={0} max={20} {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="maxGuests" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Max guests</FormLabel>
                      <FormControl><Input type="number" min={1} max={32} {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>

                <FormField control={form.control} name="amenities" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amenities</FormLabel>
                    <FormDescription>Select all that apply.</FormDescription>
                    <div className="mt-2 grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {amenityOptions.map((a) => (
                        <label key={a} className="flex items-center gap-2 text-sm">
                          <Checkbox
                            checked={field.value?.includes(a)}
                            onCheckedChange={(checked) => {
                              const set = new Set(field.value ?? []);
                              if (checked) set.add(a); else set.delete(a);
                              field.onChange(Array.from(set));
                            }}
                          />
                          <span>{a}</span>
                        </label>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )} />
              </CardContent>
            </Card>

            {/* Safety & compliance */}
            <Card>
              <CardHeader>
                <CardTitle>Safety & compliance</CardTitle>
                <CardDescription>Help guests feel secure and meet local requirements.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-3">
                  <FormField control={form.control} name="safetySmokeDetector" render={({ field }) => (
                    <FormItem className="flex flex-row items-center gap-2">
                      <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                      <FormLabel className="!m-0">Smoke detector</FormLabel>
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="safetyFireExtinguisher" render={({ field }) => (
                    <FormItem className="flex flex-row items-center gap-2">
                      <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                      <FormLabel className="!m-0">Fire extinguisher</FormLabel>
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="safetyFirstAidKit" render={({ field }) => (
                    <FormItem className="flex flex-row items-center gap-2">
                      <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                      <FormLabel className="!m-0">First aid kit</FormLabel>
                    </FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="registrationId" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Local registration ID (optional)</FormLabel>
                    <FormControl><Input placeholder="If applicable" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </CardContent>
            </Card>

            {/* Pricing */}
            <Card>
              <CardHeader>
                <CardTitle>Pricing & availability</CardTitle>
                <CardDescription>Set expectations for guests and maximize occupancy.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-3">
                  <FormField control={form.control} name="pricePerNight" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nightly price (USD)</FormLabel>
                      <FormControl><Input type="number" min={1} {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="cleaningFee" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cleaning fee (USD)</FormLabel>
                      <FormControl><Input type="number" min={0} {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <div className="self-end text-sm text-muted-foreground">
                    Est. first-night payout: <span className="font-medium text-foreground">${estimatedPayout}</span>
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <FormField control={form.control} name="minNights" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Min nights</FormLabel>
                      <FormControl><Input type="number" min={1} max={30} {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="maxNights" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Max nights</FormLabel>
                      <FormControl><Input type="number" min={1} max={365} {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>

                <div className="grid gap-6 sm:grid-cols-3">
                  <FormField control={form.control} name="checkInWindow" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Check-in window</FormLabel>
                      <FormControl>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                          <SelectContent>
                            {(["12:00-15:00", "15:00-18:00", "18:00-21:00"] as const).map((t) => (
                              <SelectItem key={t} value={t}>{t}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="checkOutTime" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Check-out time</FormLabel>
                      <FormControl>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                          <SelectContent>
                            {(["10:00", "11:00", "12:00"] as const).map((t) => (
                              <SelectItem key={t} value={t}>{t}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="cancellationPolicy" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cancellation policy</FormLabel>
                      <FormControl>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                          <SelectContent>
                            {cancellationPolicies.map((p) => (
                              <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
              </CardContent>
            </Card>

            

            {/* Rules & terms */}
            <Card>
              <CardHeader>
                <CardTitle>House rules & terms</CardTitle>
                <CardDescription>Set expectations and confirm platform terms.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField control={form.control} name="rules" render={({ field }) => (
                  <FormItem>
                    <FormLabel>House rules</FormLabel>
                    <FormControl><Textarea rows={5} placeholder="e.g., No smoking indoors, quiet hours after 10pm, pets on request only." {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="allowInstantBook" render={({ field }) => (
                  <FormItem className="flex flex-row items-center gap-2">
                    <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                    <FormLabel className="!m-0">Allow instant booking</FormLabel>
                  </FormItem>
                )} />
                <FormField control={form.control} name="agreeToTerms" render={({ field }) => (
                  <FormItem className="flex flex-row items-start gap-2">
                    <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                    <div>
                      <FormLabel className="!m-0">I agree to the Staybnb Host Terms and local regulations</FormLabel>
                      <FormDescription>By submitting, you confirm you’re legally permitted to host and that all details are accurate.</FormDescription>
                    </div>
                    <FormMessage />
                  </FormItem>
                )} />
              </CardContent>
            </Card>

            <div className="flex items-center justify-end gap-3">
              <Button variant="secondary" type="button" onClick={() => form.reset()}>Reset</Button>
              <Button type="submit">Submit listing</Button>
            </div>
          </form>
        </Form>
      </div>
    </main>
  );
};

export default Host;


