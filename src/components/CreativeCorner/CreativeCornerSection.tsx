import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export const CreativeCornerSection: React.FC = () => {
  const { isLightMode } = useTheme();

  const softwareServices = [
    { name: "AI Engineering & Agent Systems", number: "01" },
    { name: "Frontend Architecture & React", number: "02" },
    { name: "Full-Stack Web Development", number: "03" },
    { name: "Database Design & SQL/NoSQL", number: "04" },
  ];

  const creativeServices = [
    { name: "Photography", number: "01" },
    { name: "Videography", number: "02" },
    { name: "Video Editing & Color Grading", number: "03" },
  ];

  return (
    <section 
      id="services" 
      className="py-28 relative border-t transition-colors duration-500"
      style={{
        backgroundColor: 'transparent',
        borderColor: 'var(--bg-card-border)'
      }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Top Header Tag */}
        <span 
          className="font-mono text-xs uppercase tracking-[0.25em] font-semibold block mb-4"
          style={{ color: 'var(--accent-color)' }}
        >
          WHAT I CAN HELP CREATE
        </span>

        {/* Section Heading matching Screenshot */}
        <div 
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 pb-6 border-b transition-colors"
          style={{ borderColor: 'var(--bg-card-border)' }}
        >
          <h2 
            className="font-sans text-5xl sm:text-7xl font-semibold tracking-tight flex items-baseline transition-colors"
            style={{ color: 'var(--text-primary)' }}
          >
            <span>Services</span>
            <span className="text-emerald-400 text-6xl sm:text-8xl leading-none ml-1">.</span>
          </h2>
          <div 
            className="font-mono text-xs uppercase tracking-widest text-right mt-4 sm:mt-0"
            style={{ color: 'var(--text-muted)' }}
          >
            <div>SOFTWARE FIRST</div>
            <div>CREATIVE ALWAYS</div>
          </div>
        </div>

        {/* Two-column services directory */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column: Software & Development */}
          <div>
            <div 
              className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest mb-6 pb-2 border-b font-semibold"
              style={{ 
                color: 'var(--accent-color)',
                borderColor: 'var(--bg-card-border)'
              }}
            >
              <span>01 / SOFTWARE & AI ENGINEERING</span>
            </div>

            <div 
              className="divide-y"
              style={{ borderColor: 'var(--bg-card-border)' }}
            >
              {softwareServices.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="py-5 flex items-center justify-between group cursor-pointer transition-colors border-b"
                  style={{ borderColor: 'var(--bg-card-border)' }}
                >
                  <div className="flex items-center space-x-6">
                    <span 
                      className="font-mono text-xs transition-colors"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {item.number}
                    </span>
                    <span 
                      className="font-sans text-lg sm:text-xl font-medium group-hover:translate-x-1 transition-all"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {item.name}
                    </span>
                  </div>
                  <ArrowUpRight 
                    className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" 
                    style={{ color: 'var(--text-muted)' }}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Creative Services */}
          <div>
            <div 
              className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest mb-6 pb-2 border-b font-semibold"
              style={{ 
                color: 'var(--accent-color)',
                borderColor: 'var(--bg-card-border)'
              }}
            >
              <span>02 / CREATIVE SERVICES</span>
            </div>

            <div 
              className="divide-y"
              style={{ borderColor: 'var(--bg-card-border)' }}
            >
              {creativeServices.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="py-5 flex items-center justify-between group cursor-pointer transition-colors border-b"
                  style={{ borderColor: 'var(--bg-card-border)' }}
                >
                  <div className="flex items-center space-x-6">
                    <span 
                      className="font-mono text-xs transition-colors"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {item.number}
                    </span>
                    <span 
                      className="font-sans text-lg sm:text-xl font-medium group-hover:translate-x-1 transition-all"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {item.name}
                    </span>
                  </div>
                  <ArrowUpRight 
                    className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" 
                    style={{ color: 'var(--text-muted)' }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
