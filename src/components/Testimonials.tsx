import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Lena M.",
    initials: "LM",
    quote:
      "Beautiful place and effortless check-in. The photos matched perfectly and the host was super responsive!",
  },
  {
    name: "Arjun P.",
    initials: "AP",
    quote:
      "Stayed here for a long weekend. Quiet neighborhood, comfy beds, and a spotless kitchen. Will book again.",
  },
  {
    name: "Sofia R.",
    initials: "SR",
    quote:
      "Loved the cozy vibe. Close to sights and cafes. The little touches made it feel like home.",
  },
];

const Testimonials = () => {
  return (
    <section className="container mt-16" aria-label="Testimonials from guests">
      <header className="mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold">What our guests say</h2>
        <p className="text-muted-foreground">Real reviews from people who stayed with us.</p>
      </header>

      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((t, idx) => (
          <Card key={idx} className="h-full">
            <CardContent className="p-6">
              <blockquote className="text-base leading-relaxed">“{t.quote}”</blockquote>
              <div className="mt-4 flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>{t.initials}</AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <div className="font-medium">{t.name}</div>
                  <div className="text-muted-foreground">★ ★ ★ ★ ★</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
