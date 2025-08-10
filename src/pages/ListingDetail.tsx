import { useParams, Link } from "react-router-dom";
import { listings } from "@/data/listings";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const ListingDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const listing = listings.find((l) => l.id === id);

  if (!listing) {
    return (
      <main className="container py-16">
        <h1 className="text-2xl font-semibold">Listing not found</h1>
        <p className="mt-2 text-muted-foreground">The place you're looking for doesn't exist.</p>
        <Button asChild className="mt-6"><Link to="/">Go back</Link></Button>
      </main>
    );
  }

  const reserve = () => {
    toast({ title: "Reservation flow coming soon", description: "We'll add checkout and payments next." });
  };

  return (
    <main className="container">
      <article className="py-6">
        <div className="overflow-hidden rounded-2xl">
          <img
            src={listing.image}
            alt={`${listing.title} in ${listing.location}`}
            className="h-[40vh] w-full object-cover md:h-[60vh]"
          />
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <h1 className="font-display text-3xl md:text-4xl">{listing.title}</h1>
            <p className="mt-1 text-muted-foreground">{listing.location} • ★ {listing.rating.toFixed(2)}</p>

            <section className="mt-6">
              <h2 className="text-lg font-semibold">About this place</h2>
              <p className="mt-2 text-muted-foreground">
                A beautifully designed stay with all amenities for a comfortable getaway. Close to attractions,
                dining, and nature. Perfect for couples and small groups.
              </p>
            </section>
          </div>

          <aside>
            <Card className="shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-2xl font-semibold text-foreground">${listing.price}</span>
                    <span className="text-sm text-muted-foreground"> / night</span>
                  </div>
                  <span className="text-sm">★ {listing.rating.toFixed(1)}</span>
                </div>
                <Button className="mt-4 w-full" onClick={reserve}>Reserve</Button>
                <p className="mt-2 text-xs text-muted-foreground">No charges yet. You won’t be charged until confirmation.</p>
              </CardContent>
            </Card>
          </aside>
        </div>
      </article>
    </main>
  );
};

export default ListingDetail;
