import listing1 from "@/assets/listing-1.jpg";
import listing2 from "@/assets/listing-2.jpg";
import listing3 from "@/assets/listing-3.jpg";
import listing4 from "@/assets/listing-4.jpg";

export interface Listing {
  id: string;
  title: string;
  location: string;
  price: number; // per night
  rating: number;
  image: string;
}

export const listings: Listing[] = [
  { id: "1", title: "Scandi Nook", location: "Copenhagen, Denmark", price: 180, rating: 4.9, image: listing1 },
  { id: "2", title: "Seaside Villa", location: "Tulum, Mexico", price: 420, rating: 4.8, image: listing2 },
  { id: "3", title: "Woodland Cabin", location: "Banff, Canada", price: 210, rating: 4.95, image: listing3 },
  { id: "4", title: "Industrial Loft", location: "New York, USA", price: 320, rating: 4.7, image: listing4 },
  { id: "5", title: "Desert Retreat", location: "Joshua Tree, USA", price: 240, rating: 4.8, image: listing1 },
  { id: "6", title: "Coastal Cottage", location: "Cornwall, UK", price: 190, rating: 4.7, image: listing2 },
  { id: "7", title: "Mountain Hideaway", location: "Queenstown, New Zealand", price: 260, rating: 4.92, image: listing3 },
  { id: "8", title: "Alpine Chalet", location: "Zermatt, Switzerland", price: 480, rating: 4.93, image: listing4 },
];
