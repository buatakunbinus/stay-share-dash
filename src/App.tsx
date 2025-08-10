import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import Index from "@/pages/Index";
import ListingDetail from "@/pages/ListingDetail";
import NotFound from "@/pages/NotFound";
import Rating from "@/pages/Rating";
import Contact from "@/pages/Contact";
import Experiences from "@/pages/Experiences";
import Host from "@/pages/Host";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col font-sans">
          <NavBar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/listing/:id" element={<ListingDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/rating" element={<Rating />} />
              <Route path="/experiences" element={<Experiences />} />
              <Route path="/host" element={<Host />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
