const Footer = () => {
  return (
    <footer className="mt-10 pt-6 border-t text-center text-sm text-muted-foreground">
      <div className="flex flex-col mt-20 items-center">
        <p>FakerDB - AI-powered SQL data generator</p>
        <p className="mt-1">Built with ❤️ from Madagascar 🇲🇬</p>
        <p className="text-xs text-gray-500 mt-2">
          © {new Date().getFullYear()} All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
