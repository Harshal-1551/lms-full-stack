import React from "react";
import { assets } from "../../assets/assets";

const Companies = () => {
  const logos = [
    { src: assets.microsoft_logo, alt: "Microsoft" },
    { src: assets.walmart_logo, alt: "Walmart" },
    { src: assets.accenture_logo, alt: "Accenture" },
    { src: assets.adobe_logo, alt: "Adobe" },
    { src: assets.paypal_logo, alt: "Paypal" },
  ];

  return (
    <div className="pt-16 overflow-hidden">
      <p className="text-base text-gray-500 text-center">
        Trusted by learners from
      </p>

      {/* Scrolling container */}
      <div className="relative mt-8 w-full overflow-hidden">
        <div className="flex animate-scroll gap-16 items-center justify-center hover:[animation-play-state:paused]">
          {logos.concat(logos).map((logo, index) => (
            <img
              key={index}
              src={logo.src}
              alt={logo.alt}
              className="md:w-28 w-20 hover:scale-110 transition-transform duration-300 ease-in-out"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Companies;
