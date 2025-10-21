import siteConfig from "@/data/siteConfig.json";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert(`Thank you for subscribing with ${email}! You'll receive our updates soon.`);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#0a2540] py-6">
      <div className="mx-auto max-w-[1200px] px-6">
        <p className="text-center text-[14px] text-white/80">
          Copyrights © {currentYear} {siteConfig.footer.copyrightText}{" "}
          <a 
            href={siteConfig.company.website}
            className="text-white hover:text-[#0ea5ff] transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            {siteConfig.footer.copyrightLink}
          </a>
        </p>
      </div>
    </footer>
  );
}
