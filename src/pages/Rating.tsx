import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";

const ratingSchema = z.object({
  roomQuality: z.coerce.number().int().min(1).max(5),
  roomReadiness: z.coerce.number().int().min(1).max(5),
  ownerResponse: z.coerce.number().int().min(1).max(5),
  hygiene: z.coerce.number().int().min(1).max(5),
  locationConvenience: z.coerce.number().int().min(1).max(5),
  amenities: z.coerce.number().int().min(1).max(5),
  valueForMoney: z.coerce.number().int().min(1).max(5),
  overallSatisfaction: z.coerce.number().int().min(1).max(5),
});

type RatingFormValues = z.infer<typeof ratingSchema>;

const metrics: Array<{ key: keyof RatingFormValues; label: string }> = [
  { key: "roomQuality", label: "Room quality" },
  { key: "roomReadiness", label: "Room readiness" },
  { key: "ownerResponse", label: "Owner response" },
  { key: "hygiene", label: "Hygiene of the house" },
  { key: "locationConvenience", label: "Location convenience" },
  { key: "amenities", label: "Amenities" },
  { key: "valueForMoney", label: "Value for money" },
  { key: "overallSatisfaction", label: "Overall satisfaction" },
];

const Rating = () => {
  const { toast } = useToast();

  const form = useForm<RatingFormValues>({
    resolver: zodResolver(ratingSchema),
    defaultValues: {
      roomQuality: 3,
      roomReadiness: 3,
      ownerResponse: 3,
      hygiene: 3,
      locationConvenience: 3,
      amenities: 3,
      valueForMoney: 3,
      overallSatisfaction: 3,
    },
    mode: "onChange",
  });

  const averageScore = useMemo(() => {
    const values = form.getValues();
    const total = Object.values(values).reduce((sum, value) => sum + Number(value || 0), 0);
    return Number((total / metrics.length).toFixed(2));
  }, [form.watch()]);

  const onSubmit = (values: RatingFormValues) => {
    const total = Object.values(values).reduce((sum, value) => sum + Number(value), 0);
    const average = Number((total / metrics.length).toFixed(2));
    toast({
      title: "Thanks for your review!",
      description: `Your average rating is ${average}/5`,
    });
    // In a real app, submit 'values' to the backend here
  };

  return (
    <main className="container py-10">
      <Card className="mx-auto max-w-3xl">
        <CardHeader>
          <CardTitle>Rate your stay</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid gap-6 md:grid-cols-2">
                {metrics.map((metric) => (
                  <FormField
                    key={metric.key}
                    control={form.control}
                    name={metric.key}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{metric.label}</FormLabel>
                        <FormControl>
                          <RadioGroup
                            className="flex items-center gap-4"
                            value={String(field.value)}
                            onValueChange={(value) => field.onChange(Number(value))}
                          >
                            {[1, 2, 3, 4, 5].map((score) => {
                              const id = `${String(metric.key)}-${score}`;
                              return (
                                <div key={id} className="flex items-center gap-2">
                                  <RadioGroupItem id={id} value={String(score)} />
                                  <label htmlFor={id} className="text-sm text-muted-foreground cursor-pointer">
                                    {score}
                                  </label>
                                </div>
                              );
                            })}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">Average score: <span className="font-medium text-foreground">{averageScore}/5</span></div>
                <Button type="submit">Submit rating</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
};

export default Rating;


