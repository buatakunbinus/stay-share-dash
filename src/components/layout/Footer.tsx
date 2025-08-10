const Footer = () => {
  return (
    <footer className="border-t mt-16">
      <div className="container py-8 text-sm text-muted-foreground flex flex-col md:flex-row gap-4 md:gap-8 items-center justify-between">
        <p>© {new Date().getFullYear()} Staybnb • Built with love</p>
        <nav className="flex gap-4">
          <a href="#about" className="hover:opacity-80">About</a>
          <a href="#careers" className="hover:opacity-80">Careers</a>
          <a href="#help" className="hover:opacity-80">Help Center</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
