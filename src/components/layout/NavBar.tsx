import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NavBar = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2" aria-label="Staybnb home">
          <div className={cn("text-xl font-bold font-display bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent")}>Staybnb</div>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link to="/" className="hover:opacity-80 transition-opacity">Stays</Link>
          <Link to="/experiences" className="hover:opacity-80 transition-opacity">Experiences</Link>
          <Link to="/host" className="hover:opacity-80 transition-opacity">Become a Host</Link>
          <Link to="/contact" className="hover:opacity-80 transition-opacity">Contact</Link>
          <Link to="/rating" className="hover:opacity-80 transition-opacity">Rating</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Button variant="ghost" className="hidden sm:inline-flex">Log in</Button>
          <Button>Sign up</Button>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
