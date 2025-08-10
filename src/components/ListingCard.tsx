import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export interface ListingProps {
  id: string;
  title: string;
  location: string;
  price: number; // per night
  rating: number;
  image: string;
}

const ListingCard: React.FC<{ listing: ListingProps }> = ({ listing }) => {
  return (
    <Card className="group overflow-hidden transition-transform duration-200 hover:scale-[1.01] hover:shadow-xl">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={listing.image}
          alt={`${listing.title} in ${listing.location}`}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-medium leading-tight">{listing.title}</h3>
            <p className="text-sm text-muted-foreground">{listing.location}</p>
          </div>
          <div className="text-sm">
            <span className="font-semibold">★ {listing.rating.toFixed(1)}</span>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">${listing.price}</span> night
          </span>
          <Button asChild size="sm" variant="secondary">
            <Link to={`/listing/${listing.id}`} aria-label={`View ${listing.title}`}>
              View
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ListingCard;
