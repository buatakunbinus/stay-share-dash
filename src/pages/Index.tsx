import HeroSearch from "@/components/HeroSearch";
import ListingCard from "@/components/ListingCard";
import { listings } from "@/data/listings";
import Testimonials from "@/components/Testimonials";

const Index = () => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Staybnb',
    url: 'https://f82484ef-853b-4507-815e-371255a88fe9.lovableproject.com/',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://f82484ef-853b-4507-815e-371255a88fe9.lovableproject.com/?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <div className="bg-background">
      <HeroSearch />

      <section className="container mt-14">
        <header className="mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold">Explore nearby stays</h2>
          <p className="text-muted-foreground">Handpicked places to make you feel at home.</p>
        </header>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {listings.map((l) => (
            <ListingCard key={l.id} listing={l} />
          ))}
        </div>
      </section>

      <Testimonials />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
};

export default Index;
