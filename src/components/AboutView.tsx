import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Award, ShieldCheck, Heart, Compass, ArrowRight, User } from 'lucide-react';
import { useAppData } from '../hooks/useAppData';

const getMemberImage = (id: string) => {
  if (id === 'yassine') return '/images/male_therapist_massage_1784194934046.jpg';
  if (id === 'amira') return '/images/glowing_spa_massage_1784194956492.jpg';
  if (id === 'lina') return '/images/glistening_massage_oil_1784194564535.jpg';
  return null;
};

export const AboutView: React.FC = () => {
  const { team: TEAM, milestones: HISTORICAL_MILESTONES } = useAppData();
  const [hoveredMilestone, setHoveredMilestone] = useState<number | null>(null);

  const values = [
    {
      icon: <Award className="w-5 h-5 text-brand-gold" />,
      title: "Authentic Bath Culture",
      desc: "We strictly uphold the ancient rituals of the Moroccan Hammam, employing traditional kessa gloves, eucalyptus black soaps, and geothermal steam."
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-brand-gold" />,
      title: "Sustainable Cooperatives",
      desc: "All of our cold-pressed Argan oils are sourced through direct fair-trade agreements with female-run agricultural cooperatives in southwest Morocco."
    },
    {
      icon: <Heart className="w-5 h-5 text-brand-gold" />,
      title: "Neuromuscular Precision",
      desc: "We merge gentle aromatherapeutic strokes with targeted anatomical myofascial release, ensuring functional muscle repair and deep systemic relief."
    }
  ];

  return (
    <div id="about-view" className="space-y-20 py-8 md:py-12">
      {/* 1. Header & Story Timeline Block - Styled like Screen 3 */}
      <motion.section 
        id="our-story" 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start bg-white p-8 md:p-14 rounded-xl border border-brand-clay/10 shadow-lg relative overflow-hidden">
          {/* Animated drifting geometric pattern background */}
          <div className="absolute inset-0 bg-moroccan-pattern animate-pattern-slow opacity-20 pointer-events-none" />
          
          {/* Left Side: Editorial Story & Values (7 cols) */}
          <div className="lg:col-span-7 space-y-8 relative z-10">
            <div className="inline-flex items-center gap-1.5 text-brand-clay uppercase font-bold text-[10px] tracking-widest">
              <Compass className="w-3.5 h-3.5 text-brand-clay" /> OUR STORY
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-brand-dark tracking-tight leading-tight font-semibold">
              A decade of merging ancestral thermal rituals with modern luxury.
            </h2>

            <p className="text-brand-dark/70 text-xs sm:text-sm md:text-base leading-relaxed">
              Bright Massage and Morocco was founded with a singular, deep conviction: that genuine rest is an inseparable harmony of clean, natural elements and meticulous biological therapy. We set out to build an authentic escape in Marrakech that strips away the noise of modern life, enveloping you in the warmth of Moroccan clay and golden oils.
            </p>

            <p className="text-brand-dark/70 text-xs sm:text-sm md:text-base leading-relaxed">
              Over the past ten years, we have brought together certified physical therapists and third-generation Hammam masters, creating customized treatment regimens that guarantee long-lasting relief from physical fatigue and mental burnout.
            </p>

            {/* Quick stats tags */}
            <div className="flex gap-4 pt-2">
              <div className="bg-[#EADCD2]/20 p-4 rounded-xl border border-brand-clay/10 flex-1">
                <span className="block font-serif text-xl sm:text-2xl font-bold text-brand-clay leading-none">10+</span>
                <span className="block text-[9px] uppercase font-bold text-brand-dark/40 tracking-wider mt-1">Years of Excellence</span>
              </div>
              <div className="bg-[#EADCD2]/20 p-4 rounded-xl border border-brand-clay/10 flex-1">
                <span className="block font-serif text-xl sm:text-2xl font-bold text-brand-clay leading-none">100%</span>
                <span className="block text-[9px] uppercase font-bold text-brand-dark/40 tracking-wider mt-1">Organic Materials</span>
              </div>
            </div>
          </div>

          {/* Right Side: Timeline - Matches Screen 3 exactly in vertical alignment */}
          <div className="lg:col-span-5 border-l-2 border-brand-clay/20 pl-6 sm:pl-8 py-2 space-y-8 relative z-10">
            {HISTORICAL_MILESTONES.map((milestone, idx) => (
              <div 
                key={idx} 
                className="relative group transition-smooth"
                onMouseEnter={() => setHoveredMilestone(idx)}
                onMouseLeave={() => setHoveredMilestone(null)}
              >
                {/* Custom dot indicator */}
                <div className={`absolute -left-[33px] sm:-left-[41px] top-1.5 w-4 h-4 rounded-full border-2 bg-brand-sand transition-all duration-300 ${
                  hoveredMilestone === idx ? 'bg-brand-clay border-brand-clay scale-125' : 'border-brand-clay/20'
                }`} />
                
                <span className="text-xs font-mono font-bold text-brand-clay block leading-none">{milestone.year}</span>
                <h4 className="font-serif text-lg font-bold text-brand-dark tracking-tight mt-1 group-hover:text-brand-clay transition-colors">
                  {milestone.title}
                </h4>
                <p className="text-xs text-brand-dark/60 leading-relaxed font-sans mt-1.5">
                  {milestone.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </motion.section>

      {/* 2. Core Values & USPs */}
      <motion.section 
        id="our-values" 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12"
      >
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="text-brand-clay font-bold uppercase text-[10px] tracking-[0.25em]">Guiding Principles</span>
          <h3 className="font-serif text-2xl sm:text-3xl text-brand-dark tracking-tight font-semibold">How We Restore Harmony</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-[#EADCD2]/10 p-6 sm:p-8 rounded-xl border border-brand-clay/15 shadow-sm space-y-4 hover:border-brand-clay/30 transition-smooth hover:-translate-y-1"
            >
              <div className="w-10 h-10 rounded-xl bg-white border border-brand-clay/15 flex items-center justify-center">
                {v.icon}
              </div>
              <h4 className="font-serif text-lg font-bold text-brand-dark">{v.title}</h4>
              <p className="text-xs sm:text-sm text-brand-dark/70 leading-relaxed font-sans font-light">
                {v.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* 3. Team Introduction Grid - Matching reference guidelines */}
      <motion.section 
        id="our-experts" 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12"
      >
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="text-brand-clay font-bold uppercase text-[10px] tracking-[0.25em]">Our Masters</span>
          <h3 className="font-serif text-2xl sm:text-3xl text-brand-dark tracking-tight font-semibold">Certified Wellness Artisans</h3>
          <p className="text-brand-dark/60 text-xs sm:text-sm">
            Meet our certified team of thermal treatment experts, anatomists, and therapeutic designers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TEAM.map((member, i) => (
            <motion.div 
              key={member.id} 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="bg-white rounded-xl border border-brand-clay/10 overflow-hidden shadow-md group hover:shadow-lg transition-smooth flex flex-col justify-between"
            >
              
              {/* Photo Frame (Real premium image of their therapeutic work) */}
              <div className="h-80 relative overflow-hidden border-b border-brand-clay/15">
                {getMemberImage(member.id) ? (
                  <>
                    <img
                      src={getMemberImage(member.id)!}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-brand-dark/45 flex flex-col justify-end p-6 text-white text-left">
                      <h5 className="font-serif text-lg font-bold leading-none">{member.name}</h5>
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-brand-gold mt-1.5 block">{member.role}</span>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full bg-[#EADCD2]/30 flex flex-col justify-center items-center p-6 text-center">
                    <div className="absolute inset-0 bg-moroccan-pattern opacity-10" />
                    <div className="w-14 h-14 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center text-brand-clay mb-3">
                      <User className="w-6 h-6" />
                    </div>
                    <h5 className="font-serif text-sm font-bold text-brand-dark leading-none">{member.name}</h5>
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-brand-clay mt-1.5 block">{member.role}</span>
                    <p className="text-[10.5px] text-brand-dark/50 leading-relaxed mt-4 font-mono italic max-w-[240px]">
                      {member.photoDesc}
                    </p>
                  </div>
                )}
              </div>

              {/* Bio & Specialty Text Block */}
              <div className="p-6 space-y-4 bg-white/40 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[9px] font-bold tracking-widest text-brand-gold uppercase block">Specialty Domain</span>
                  <span className="font-serif text-sm font-bold text-brand-dark block">{member.specialty}</span>
                  <p className="text-xs text-brand-dark/70 leading-relaxed font-sans font-light">
                    {member.bio}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};
