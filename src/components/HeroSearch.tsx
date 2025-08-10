import React from "react";
import heroImage from "@/assets/hero-living.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const HeroSearch: React.FC = () => {
  const { toast } = useToast();

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Search coming soon",
      description: "We'll connect results and filters next.",
    });
  };

  return (
    <section className="relative">
      <div className="relative overflow-hidden rounded-2xl shadow-2xl">
        <img
          src={heroImage}
          alt="Cozy modern living room with large windows overlooking nature"
          className="h-[46vh] w-full object-cover md:h-[60vh]"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/40 to-background/10" />
        <div className="absolute inset-0 flex items-end p-6 md:p-10">
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl md:text-6xl font-semibold leading-tight animate-fade-in">
              Book unique stays and experiences
            </h1>
            <p className="mt-3 text-lg text-muted-foreground md:text-xl">
              Discover cabins, villas and one-of-a-kind homes around the world.
            </p>
          </div>
        </div>
      </div>

      <Card className="-mt-8 mx-auto max-w-5xl shadow-xl animate-enter">
        <CardContent className="p-4 md:p-6">
          <form onSubmit={onSearch} className="grid grid-cols-1 gap-3 md:grid-cols-5">
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm text-muted-foreground">Where</label>
              <Input placeholder="Search destinations" aria-label="Where" />
            </div>
            <div>
              <label className="mb-1 block text-sm text-muted-foreground">Check in</label>
              <Input type="date" aria-label="Check in date" />
            </div>
            <div>
              <label className="mb-1 block text-sm text-muted-foreground">Check out</label>
              <Input type="date" aria-label="Check out date" />
            </div>
            <div className="flex items-end">
              <Button type="submit" className="w-full">Search</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};

export default HeroSearch;
