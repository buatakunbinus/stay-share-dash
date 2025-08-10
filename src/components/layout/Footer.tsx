const Footer = () => {
  return (
    <footer className="border-t mt-16">
      <div className="container py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold">Company</h3>
            <nav className="mt-3 space-y-2 text-sm text-muted-foreground">
              <a href="#about" className="hover:opacity-80">About</a>
              <a href="#careers" className="hover:opacity-80">Careers</a>
              <a href="#press" className="hover:opacity-80">Press</a>
              <a href="#blog" className="hover:opacity-80">Blog</a>
            </nav>
          </div>
          <div>
            <h3 className="text-sm font-semibold">Explore</h3>
            <nav className="mt-3 space-y-2 text-sm text-muted-foreground">
              <a href="#destinations" className="hover:opacity-80">Top destinations</a>
              <a href="#categories" className="hover:opacity-80">Categories</a>
              <a href="#experiences" className="hover:opacity-80">Experiences</a>
              <a href="#gift-cards" className="hover:opacity-80">Gift cards</a>
            </nav>
          </div>
          <div>
            <h3 className="text-sm font-semibold">Support</h3>
            <nav className="mt-3 space-y-2 text-sm text-muted-foreground">
              <a href="#help" className="hover:opacity-80">Help Center</a>
              <a href="#safety" className="hover:opacity-80">Safety information</a>
              <a href="#cancellation" className="hover:opacity-80">Cancellation options</a>
              <a href="#report" className="hover:opacity-80">Report neighborhood concern</a>
            </nav>
          </div>
          <div>
            <h3 className="text-sm font-semibold">Legal</h3>
            <nav className="mt-3 space-y-2 text-sm text-muted-foreground">
              <a href="#terms" className="hover:opacity-80">Terms</a>
              <a href="#privacy" className="hover:opacity-80">Privacy</a>
              <a href="#cookies" className="hover:opacity-80">Cookie policy</a>
              <a href="#licenses" className="hover:opacity-80">Licenses</a>
            </nav>
          </div>
        </div>

        <div className="mt-10 flex flex-col md:flex-row gap-4 md:gap-8 items-center justify-between text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Staybnb • Built with love</p>
          <nav className="flex gap-4">
            <a href="#privacy" className="hover:opacity-80">Privacy</a>
            <a href="#terms" className="hover:opacity-80">Terms</a>
            <a href="#sitemap" className="hover:opacity-80">Sitemap</a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
