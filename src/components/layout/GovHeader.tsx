import { Link } from "react-router-dom";

const GovHeader = () => {
  return (
    <header className="gov-header py-3 px-4 md:px-8">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Ashoka Chakra styled emblem placeholder */}
          <div className="w-14 h-14 rounded-full bg-white/10 border-2 border-white/30 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full border-2 border-accent flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-accent" />
            </div>
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-bold tracking-tight">
              National Enrolment Intelligence Portal
            </h1>
            <p className="text-xs md:text-sm text-white/80">
              AI-powered platform for enrolment statistics and biometric trends
            </p>
          </div>
        </div>
        
        <div className="hidden lg:flex items-center gap-6 text-sm text-white/80">
          <span>Government of India</span>
          <div className="w-px h-5 bg-white/30" />
          <span>Ministry of Electronics & IT</span>
        </div>
      </div>
    </header>
  );
};

export default GovHeader;
