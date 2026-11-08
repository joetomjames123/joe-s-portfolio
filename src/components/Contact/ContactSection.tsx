import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { PROFILE_DATA } from '../../data/profile';
import { useTheme } from '../../contexts/ThemeContext';

export const ContactSection: React.FC = () => {
  const { isLightMode } = useTheme();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    enquiry: 'General Enquiry',
    message: ''
  });

  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');

    setTimeout(() => {
      setFormState('success');
      const mailtoUrl = `mailto:${PROFILE_DATA.email}?subject=${encodeURIComponent(formData.subject || formData.enquiry + ' from ' + formData.name)}&body=${encodeURIComponent(formData.message + '\n\nEnquiry Type: ' + formData.enquiry + '\nFrom: ' + formData.name + ' (' + formData.email + ')')}`;
      window.open(mailtoUrl, '_blank');
    }, 600);
  };

  return (
    <section 
      id="contact" 
      className="py-28 relative border-t transition-colors duration-500"
      style={{
        backgroundColor: 'var(--bg-primary)',
        borderColor: 'var(--bg-card-border)'
      }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Top Tag matching Screenshot */}
        <span 
          className="font-mono text-xs uppercase tracking-[0.25em] font-semibold block mb-4"
          style={{ color: 'var(--accent-color)' }}
        >
          HAVE AN IDEA IN MIND?
        </span>

        {/* Big "Let's talk." Heading with Green Dot from Screenshot */}
        <div className="mb-10">
          <h2 
            className="font-sans text-6xl sm:text-8xl font-semibold tracking-tight flex items-baseline transition-colors"
            style={{ color: 'var(--text-primary)' }}
          >
            <span>Let&apos;s talk</span>
            <span className="text-emerald-400 text-7xl sm:text-9xl leading-none ml-1">.</span>
          </h2>
          
          <a
            href={`mailto:${PROFILE_DATA.email}`}
            className="inline-flex items-center space-x-1 font-mono text-xs sm:text-sm uppercase tracking-widest transition-colors mt-4"
            style={{ color: 'var(--text-secondary)' }}
          >
            <span>{PROFILE_DATA.email.toUpperCase()}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Form and Details Grid from Screenshot */}
        <div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pt-6 border-t transition-colors"
          style={{ borderColor: 'var(--bg-card-border)' }}
        >
          
          {/* Left: Input Form */}
          <div className="lg:col-span-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label 
                    className="block text-xs font-mono mb-2"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    Your name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="What should I call you?"
                    className="w-full bg-transparent border-b pb-3 text-sm focus:outline-none transition-colors"
                    style={{
                      borderColor: 'var(--bg-card-border)',
                      color: 'var(--text-primary)'
                    }}
                  />
                </div>

                <div>
                  <label 
                    className="block text-xs font-mono mb-2"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@example.com"
                    className="w-full bg-transparent border-b pb-3 text-sm focus:outline-none transition-colors"
                    style={{
                      borderColor: 'var(--bg-card-border)',
                      color: 'var(--text-primary)'
                    }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div>
                  <label 
                    className="block text-xs font-mono mb-2"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="A quick introduction"
                    className="w-full bg-transparent border-b pb-3 text-sm focus:outline-none transition-colors"
                    style={{
                      borderColor: 'var(--bg-card-border)',
                      color: 'var(--text-primary)'
                    }}
                  />
                </div>

                <div>
                  <label 
                    className="block text-xs font-mono mb-2"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    Enquiry
                  </label>
                  <select
                    value={formData.enquiry}
                    onChange={(e) => setFormData({ ...formData, enquiry: e.target.value })}
                    className="w-full bg-transparent border-b pb-3 text-sm focus:outline-none transition-colors cursor-pointer"
                    style={{
                      borderColor: 'var(--bg-card-border)',
                      color: 'var(--text-primary)'
                    }}
                  >
                    <option value="General Enquiry" style={{ backgroundColor: isLightMode ? '#FFFFFF' : '#0A0C10', color: isLightMode ? '#000000' : '#FFFFFF' }}>General Enquiry</option>
                    <option value="AI Engineering / Project" style={{ backgroundColor: isLightMode ? '#FFFFFF' : '#0A0C10', color: isLightMode ? '#000000' : '#FFFFFF' }}>AI Engineering / ML Build</option>
                    <option value="Frontend Development" style={{ backgroundColor: isLightMode ? '#FFFFFF' : '#0A0C10', color: isLightMode ? '#000000' : '#FFFFFF' }}>Frontend Web App</option>
                    <option value="Internship / Role" style={{ backgroundColor: isLightMode ? '#FFFFFF' : '#0A0C10', color: isLightMode ? '#000000' : '#FFFFFF' }}>Internship / Job Opportunity</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <label 
                  className="block text-xs font-mono mb-2"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Your message
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="A little about what you have in mind..."
                  className="w-full bg-transparent border-b pb-3 text-sm focus:outline-none transition-colors resize-none"
                  style={{
                    borderColor: 'var(--bg-card-border)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>

              <div className="pt-4">
                {/* Lime green button matching Screenshot */}
                <button
                  type="submit"
                  disabled={formState === 'submitting'}
                  className="px-8 py-3.5 bg-[#A3E635] hover:bg-[#BEF264] text-black font-mono text-xs font-bold tracking-wider rounded-lg transition-all flex items-center space-x-2 cursor-pointer shadow-lg hover:shadow-[#A3E635]/20"
                >
                  <span>{formState === 'submitting' ? 'PREPARING...' : 'SEND AN ENQUIRY'}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
                <p 
                  className="font-mono text-[11px] mt-3"
                  style={{ color: 'var(--text-muted)' }}
                >
                  This opens your email app with the message ready to send.
                </p>
              </div>
            </form>
          </div>

          {/* Right: Elsewhere & Call from Screenshot */}
          <div 
            className="lg:col-span-4 space-y-10 lg:pl-8 lg:border-l transition-colors"
            style={{ borderColor: 'var(--bg-card-border)' }}
          >
            <div>
              <span 
                className="font-mono text-[11px] uppercase tracking-widest block mb-4"
                style={{ color: 'var(--text-muted)' }}
              >
                ELSEWHERE
              </span>
              <div className="space-y-3 font-mono text-sm">
                <a
                  href={PROFILE_DATA.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between py-1 group transition-colors"
                  style={{ color: 'var(--text-primary)' }}
                >
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3.5 h-3.5" style={{ color: 'var(--text-muted)' }} />
                </a>
                <a
                  href={PROFILE_DATA.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between py-1 group transition-colors"
                  style={{ color: 'var(--text-primary)' }}
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3.5 h-3.5" style={{ color: 'var(--text-muted)' }} />
                </a>
                <a
                  href={PROFILE_DATA.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between py-1 group transition-colors"
                  style={{ color: 'var(--text-primary)' }}
                >
                  <span>Instagram</span>
                  <ArrowUpRight className="w-3.5 h-3.5" style={{ color: 'var(--text-muted)' }} />
                </a>
              </div>
            </div>

            <div 
              className="pt-6 border-t transition-colors"
              style={{ borderColor: 'var(--bg-card-border)' }}
            >
              <span 
                className="font-mono text-[11px] uppercase tracking-widest block mb-2"
                style={{ color: 'var(--text-muted)' }}
              >
                CALL / WHATSAPP
              </span>
              <span 
                className="font-mono text-sm font-semibold block mb-2"
                style={{ color: 'var(--text-primary)' }}
              >
                {PROFILE_DATA.phone}
              </span>
              <a
                href={`https://wa.me/${PROFILE_DATA.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 font-mono text-xs text-emerald-400 hover:underline"
              >
                <span>MESSAGE ON WHATSAPP</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
