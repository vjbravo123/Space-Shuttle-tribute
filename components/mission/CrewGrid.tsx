"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface CrewGridProps {
  mission: 'challenger' | 'columbia';
}

const CREW_DATA = {
  challenger: [
    {
      name: "Francis R. Scobee",
      role: "Commander",
      image: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Francis_Richard_Scobee.jpg",
      bio: "Air Force pilot and veteran of STS-41-C."
    },
    {
      name: "Michael J. Smith",
      role: "Pilot",
      image: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Michael_J._Smith.jpg",
      bio: "Navy captain and experienced test pilot."
    },
    {
      name: "Ronald McNair",
      role: "Mission Specialist",
      image: "https://upload.wikimedia.org/wikipedia/commons/9/99/Ronald_McNair.jpg",
      bio: "Physicist and accomplished saxophonist."
    },
    {
      name: "Ellison Onizuka",
      role: "Mission Specialist",
      image: "https://upload.wikimedia.org/wikipedia/commons/1/1e/Ellison_Onizuka.jpg",
      bio: "The first Asian American in space."
    },
    {
      name: "Judith Resnik",
      role: "Mission Specialist",
      image: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Judith_Resnik.jpg",
      bio: "Electrical engineer and second American woman in space."
    },
    {
      name: "Gregory Jarvis",
      role: "Payload Specialist",
      image: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Gregory_Jarvis.jpg",
      bio: "Engineer specialized in satellite design."
    },
    {
      name: "Christa McAuliffe",
      role: "Teacher in Space",
      image: "https://upload.wikimedia.org/wikipedia/commons/4/4f/Christa_McAuliffe.jpg",
      bio: "Chosen from 11,000 to be the first teacher in space."
    }
  ],

  columbia: [
    {
      name: "Rick Husband",
      role: "Commander",
      image: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Rick_D._Husband.jpg",
      bio: "Air Force colonel and mechanical engineer."
    },
    {
      name: "William C. McCool",
      role: "Pilot",
      image: "https://upload.wikimedia.org/wikipedia/commons/5/56/William_C._McCool.jpg",
      bio: "Navy commander and test pilot."
    },
    {
      name: "Michael P. Anderson",
      role: "Mission Specialist",
      image: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Michael_P._Anderson.jpg",
      bio: "Payload commander in charge of science experiments."
    },
    {
      name: "David M. Brown",
      role: "Mission Specialist",
      image: "https://upload.wikimedia.org/wikipedia/commons/3/3f/David_M._Brown.jpg",
      bio: "Captain, flight surgeon, and circus performer."
    },
    {
      name: "Kalpana Chawla",
      role: "Mission Specialist",
      image: "https://upload.wikimedia.org/wikipedia/commons/9/9f/Kalpana_Chawla%2C_NASA_photo_portrait_in_orange_suit.jpg",
      bio: "The first woman of Indian origin to go to space."
    },
    {
      name: "Laurel Clark",
      role: "Mission Specialist",
      image: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Laurel_Clark.jpg",
      bio: "Medical doctor and flight surgeon."
    },
    {
      name: "Ilan Ramon",
      role: "Payload Specialist",
      image: "https://upload.wikimedia.org/wikipedia/commons/8/8f/Ilan_Ramon.jpg",
      bio: "The first Israeli astronaut."
    }
  ]
};

const CrewGrid = ({ mission }: CrewGridProps) => {
  const crew = CREW_DATA[mission];

  return (
    <section className="py-24 px-4 bg-[#020617]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">The Crew</h2>
          <div className="w-20 h-1 bg-sky-500/50 mx-auto rounded-full" />
        </div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
        >
          {crew.map((member) => (
            <motion.div 
              key={member.name} 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="group relative"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 transition-all duration-500 group-hover:border-sky-500/30">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  unoptimized
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-90 group-hover:opacity-70 transition-opacity" />

                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <p className="text-sky-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">
                    {member.role}
                  </p>
                  <h3 className="text-xl font-serif text-white mb-1 leading-tight">
                    {member.name}
                  </h3>
                  <p className="text-slate-400 text-[11px] leading-relaxed italic opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {member.bio}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CrewGrid;