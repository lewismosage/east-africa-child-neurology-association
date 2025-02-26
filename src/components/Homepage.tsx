import React from "react";
import { motion } from "framer-motion";
import Hero from "./Hero";
import { useMediaQuery } from "react-responsive";
import agakhan from "../assets/agakhan.jpg";
import cnf from "../assets/cnf.webp";
import kpa from "../assets/kpa.jpg";
import pat from "../assets/pat.jpg";
import uon from "../assets/uon.jpg";
import who from "../assets/who.png";
import amref from "../assets/amref.png";
import moh from "../assets/moh.jpg";

interface Partner {
  id: number;
  name: string;
  logo: string;
}

interface PartnersSectionProps {
  partners: Partner[];
}

const PartnersSection: React.FC<PartnersSectionProps> = ({ partners }) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const cardWidth = isMobile ? 120 : 200;
  const gap = isMobile ? 8 : 16;
  const totalWidth = (cardWidth + gap) * partners.length;

  return (
    <div className="bg-gray-50 py-16 overflow-hidden mt-8 border-2 border-purple-500">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-8 text-primary">
          Our Network of Partners
        </h2>
        <p className="text-xl max-w-2xl mx-auto mb-8 text-center text-black-600">
          Working together to advance child neurology in East Africa.
        </p>
        <div className="relative overflow-hidden w-full">
          <motion.div
            className="flex"
            style={{ width: totalWidth * 2 }}
            animate={{ x: ["0%", `-${totalWidth}px`], transitionEnd: { x: "0%" } }}
            transition={{
              duration: isMobile ? 8 : 12,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[...partners, ...partners].map((partner, index) => (
              <motion.div
                key={`${partner.id}-${index}`}
                className="flex-shrink-0 p-2 bg-white rounded-lg shadow-md flex flex-col items-center justify-center cursor-pointer"
                style={{ width: cardWidth, marginRight: gap }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="w-10 h-10 md:w-24 md:h-24 mb-2 object-contain"
                />
                <p className="text-xs md:text-lg font-medium text-center">
                  {partner.name}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};


const HomePage = () => {
  const partners = [
    {
      id: 1,
      name: "Kenya Pediatric Association (KPA)",
      logo: kpa,
    },
    {
      id: 2,
      name: "University of Nairobi (Kenya)",
      logo: uon,
    },
    {
      id: 3,
      name: "Tanzania Pediatric Association (TPA)",
      logo: pat,
    },
    {
      id: 4,
      name: "Aga Khan University Hospital (Kenya, Uganda, Tanzania)",
      logo: agakhan,
    },
    {
      id: 5,
      name: "World Health Organization (WHO) - Africa",
      logo: who,
    },
    {
      id: 6,
      name: "Child Neurology Foundation (CNF)",
      logo: cnf,
    },
    {
      id: 7,
      name: "Amref Health Africa",
      logo: amref,
    },
    {
      id: 8,
      name: "Ministry of Health (Kenya)",
      logo: moh,
    },
  ];

  return (
    <div>
      <Hero />
      <PartnersSection partners={partners} />
    </div>
  );
};

export default HomePage;