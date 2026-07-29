import React from "react";

// Importing actual files from src/assets/client
import ravasaLogo from "../../assets/client/RavasaArtboard 1 copy.webp";
import varunLogo from "../../assets/client/varun.webp";
import happyEventsLogo from "../../assets/client/Happy events.webp";
import jaspireLogo from "../../assets/client/Jaspire logo.webp";
import logoPng from "../../assets/client/logo png.png";
import artboard4 from "../../assets/client/Artboard 4.webp";
import artboard39 from "../../assets/client/Artboard 39 copy 6.webp";
import lapwingLogo from "../../assets/client/Lapwing PNG.webp";
import zargoldLogo from "../../assets/client/zargold.webp";
import vihariLogo from "../../assets/client/vihari.webp";
import svdLogo from "../../assets/client/svd.webp";
import remediLogo from "../../assets/client/remedi.webp";
import oryzaLogo from "../../assets/client/oryza.webp";
import globusLogo from "../../assets/client/globus it.webp";
import fruitBandiLogo from "../../assets/client/fruit bandi.webp";
import sannidhiLogo from "../../assets/client/Sannidhi-Logo.webp";

export const ClientsListing = () => {
  const clients = [
    { name: "Ravasa", logo: ravasaLogo },
    { name: "Varun", logo: varunLogo },
    { name: "Happy Events", logo: happyEventsLogo },
    { name: "Jaspire", logo: jaspireLogo },
    { name: "Jewellers", logo: logoPng },
    { name: "Voxela", logo: artboard4 },
    { name: "One Ent", logo: artboard39 },
    { name: "Lapwing", logo: lapwingLogo },
    { name: "Zargold", logo: zargoldLogo },
    { name: "Vihari", logo: vihariLogo },
    { name: "SVD", logo: svdLogo },
    { name: "Remedy", logo: remediLogo },
    { name: "Oryza", logo: oryzaLogo },
    { name: "Globus IT", logo: globusLogo },
    { name: "Fruit Bandi", logo: fruitBandiLogo },
    { name: "Sannidhi", logo: sannidhiLogo },
  ];

  return (
    <div className="py-24 px-6 md:px-12 bg-[#197C48] relative z-20">
      <div className="max-w-[1800px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12">
          {clients.map((client, i) => (
            <div
              key={i}
              className="group relative flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-500 bg-white/5 p-8 rounded-3xl hover:bg-white/10"
            >
              <img
                src={client.logo}
                alt={client.name}
                className="h-16 md:h-20 object-contain group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
