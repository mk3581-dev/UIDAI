import { Link } from "react-router-dom";

const GovFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="gov-footer py-8 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-white font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
              <li><Link to="/assistant" className="hover:text-white transition-colors">AI Assistant</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-3">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/data-sources" className="hover:text-white transition-colors">Data Sources</Link></li>
              <li><Link to="/analytics" className="hover:text-white transition-colors">Analytics</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">API Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Help & Support</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-3">Policies</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Use</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Accessibility Statement</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Disclaimer</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p>
              <strong className="text-white">Disclaimer:</strong> This portal is a prototype developed for analytical and research purposes.
            </p>
            <p className="text-white/60">
              Last Updated: January {currentYear} | © {currentYear} NEIP
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default GovFooter;
