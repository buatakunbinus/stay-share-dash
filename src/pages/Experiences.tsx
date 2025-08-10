import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, MapPin } from "lucide-react";

type Experience = {
  id: string;
  title: string;
  location: string;
  category: "Adventure" | "Culinary" | "Wellness" | "Culture";
  duration: string; // e.g. "3 hours"
  pricePerPerson: number;
  rating: number;
  image: string;
};

// Using listing images as placeholders for experiences
import heroImage from "@/assets/hero-living.jpg";
import listing1 from "@/assets/listing-1.jpg";
import listing2 from "@/assets/listing-2.jpg";
import listing3 from "@/assets/listing-3.jpg";
import listing4 from "@/assets/listing-4.jpg";

const EXPERIENCES: Experience[] = [
  {
    id: "e1",
    title: "Sunrise Coastal Hike",
    location: "Cornwall, UK",
    category: "Adventure",
    duration: "3 hours",
    pricePerPerson: 45,
    rating: 4.9,
    image: listing2,
  },
  {
    id: "e2",
    title: "Farm-to-Table Cooking Class",
    location: "Tuscany, Italy",
    category: "Culinary",
    duration: "2.5 hours",
    pricePerPerson: 70,
    rating: 4.8,
    image: listing1,
  },
  {
    id: "e3",
    title: "Guided Old Town Walk",
    location: "Prague, Czechia",
    category: "Culture",
    duration: "2 hours",
    pricePerPerson: 30,
    rating: 4.7,
    image: listing4,
  },
  {
    id: "e4",
    title: "Lakeside Yoga Session",
    location: "Queenstown, NZ",
    category: "Wellness",
    duration: "1.5 hours",
    pricePerPerson: 35,
    rating: 4.85,
    image: listing3,
  },
  {
    id: "e5",
    title: "Street Food Night Tour",
    location: "Bangkok, Thailand",
    category: "Culinary",
    duration: "3 hours",
    pricePerPerson: 55,
    rating: 4.9,
    image: listing1,
  },
  {
    id: "e6",
    title: "Kayak the Hidden Coves",
    location: "Tulum, Mexico",
    category: "Adventure",
    duration: "4 hours",
    pricePerPerson: 80,
    rating: 4.92,
    image: listing2,
  },
];

const Experiences = () => {
  return (
    <main className="bg-background">
      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Experiences banner" className="h-[35vh] w-full object-cover" />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="container relative z-10 py-16 text-white">
          <h1 className="text-3xl md:text-4xl font-semibold">Curated local experiences</h1>
          <p className="mt-2 text-white/90 max-w-2xl">
            Make your stay unforgettable with handpicked adventures, culinary classes, wellness retreats, and cultural tours.
          </p>
          <div className="mt-6 flex gap-2 flex-wrap">
            <Badge variant="secondary" className="bg-white/90 text-black">Adventure</Badge>
            <Badge variant="secondary" className="bg-white/90 text-black">Culinary</Badge>
            <Badge variant="secondary" className="bg-white/90 text-black">Wellness</Badge>
            <Badge variant="secondary" className="bg-white/90 text-black">Culture</Badge>
          </div>
        </div>
      </section>

      {/* Featured grid */}
      <section className="container py-12">
        <header className="mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold">Featured this month</h2>
          <p className="text-muted-foreground">High-rated activities guests love near our stays.</p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {EXPERIENCES.map((exp) => (
            <Card key={exp.id} className="overflow-hidden">
              <div className="aspect-video overflow-hidden">
                <img src={exp.image} alt={exp.title} className="h-full w-full object-cover" />
              </div>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{exp.title}</CardTitle>
                  <div className="flex items-center text-sm text-muted-foreground gap-1">
                    <Star className="h-4 w-4 fill-current" />
                    {exp.rating.toFixed(2)}
                  </div>
                </div>
                <CardDescription className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4" /> {exp.location}</span>
                  <span className="inline-flex items-center gap-1"><Clock className="h-4 w-4" /> {exp.duration}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">From</div>
                  <div className="text-base font-medium">${exp.pricePerPerson} <span className="text-sm text-muted-foreground">/ person</span></div>
                </div>
                <Button asChild className="mt-4 w-full">
                  <Link to="/contact">Request availability</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t bg-muted/30">
        <div className="container py-12 md:py-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-semibold">Custom itineraries for your stay</h3>
              <p className="mt-2 text-muted-foreground">
                Tell us what you love and we’ll curate a day-by-day experience plan around your booking.
              </p>
            </div>
            <div className="flex md:justify-end gap-3">
              <Button asChild variant="secondary"><Link to="/rating">Rate a past stay</Link></Button>
              <Button asChild><Link to="/contact">Plan my trip</Link></Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Experiences;


