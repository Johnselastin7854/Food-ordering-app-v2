function Footer() {
  return (
    <footer className="bg-orange-500 py-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <img src="./logo-white.png" alt="mern eats" className="w-32 h-auto" />

        <span className="text-white font-bold tracking-tight flex gap-4">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
        </span>
      </div>
    </footer>
  );
}

export default Footer;
