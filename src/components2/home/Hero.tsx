import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="bg-gradient-to-br from-[#DA0630] to-[#a00425] rounded-3xl p-6 mb-6">
        <div className="relative z-10 animate-slide-down">
          <h1 className="text-white text-2xl font-bold mb-2">
            Change the world,<br />earn rewards
          </h1>
          <p className="text-white/90 text-sm mb-4 max-w-xs">
            Participate in social initiatives and get exclusive benefits from your favorite brands.
          </p>
          <Link
            to="/client/search"
            className="inline-flex items-center gap-1 bg-white text-[#DA0630] px-4 py-2 rounded-full text-sm font-medium hover:bg-[#fde8eb] transition-colors"
          >
            Discover projects
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-10 right-4 w-24 h-24 rounded-full bg-[#DA0630]/30 blur-2xl"></div>
        <div className="absolute bottom-0 left-10 w-16 h-16 rounded-full bg-[#f2a7b4]/20 blur-xl"></div>
      </div>
    </div>
  );
};

export default Hero;