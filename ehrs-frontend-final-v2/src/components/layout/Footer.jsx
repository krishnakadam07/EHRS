<<<<<<< HEAD
import React, { useState } from 'react';
=======
import React from 'react';
>>>>>>> 9b97f337fadfab789e1aa5c4f19d7d650499fe67
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiActivity, FiTwitter, FiGithub, FiLinkedin, FiMail, FiArrowRight } from 'react-icons/fi';
import { ROUTES } from '../../routes/routeConstants';
import Button from '../common/Button';
<<<<<<< HEAD
import { toast } from 'react-toastify';

export default function Footer() {
    const navigate = useNavigate();

    return (
        <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 pt-20 pb-10 relative overflow-hidden z-20 mt-auto shrink-0">

            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />
            <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">

                    {/* Brand & Newsletter Column (Spans 4) */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        <motion.div
                            className="flex items-center gap-3 cursor-pointer group"
                            whileHover={{ scale: 1.02 }}
                            onClick={() => navigate(ROUTES.PUBLIC.HOME)}
                        >
                            <div className="w-10 h-10 bg-gradient-to-tr from-primary to-sky-400 rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-all duration-300">
                                <FiActivity className="w-6 h-6" />
                            </div>
                            <span className="text-2xl font-black text-white tracking-tight">EHRS<span className="text-primary">.</span></span>
                        </motion.div>

                        <p className="text-slate-400 leading-relaxed max-w-sm">
                            The decentralized Emergency Health Record System. Empowering patients and first responders with instant, secure medical data access globally.
                        </p>

                        <div className="mt-4 flex flex-col gap-3">
                            <span className="text-xs font-black uppercase tracking-widest text-slate-500">Subscribe to Updates</span>
                            <form
                                onSubmit={async (e) => {
                                    e.preventDefault();
                                    const email = e.target.email.value;
                                    if (!email) return;

                                    try {
                                        const res = await fetch('http://localhost:8081/api/subscriptions/subscribe', {
                                            method: 'POST',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify({ email })
                                        });

                                        const data = await res.text();
                                        if (res.ok) {
                                            toast.success(data);
                                            e.target.reset();
                                        } else {
                                            toast.error(data);
                                        }
                                    } catch (err) {
                                        toast.error("Failed to connect to backend server.");
                                    }
                                }}
                                className="flex gap-2 max-w-sm"
                            >
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    placeholder="Enter your email"
                                    className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-primary focus:ring-1 focus:ring-primary w-full transition-all"
                                />
                                <Button type="submit" variant="primary" className="px-5 shrink-0 hover:scale-105 transition-transform"><FiArrowRight /></Button>
                            </form>
                        </div>
                    </div>

                    {/* Links Column 1: Platform */}
                    <div className="lg:col-span-2 flex flex-col gap-4">
                        <h4 className="text-white font-bold mb-2">Platform</h4>
                        <FooterLink to={ROUTES.PUBLIC.HOME}>Home</FooterLink>
                        <FooterLink to={ROUTES.PUBLIC.ABOUT}>About Us</FooterLink>
                        <FooterLink to={ROUTES.PUBLIC.CONTACT}>Contact Support</FooterLink>
                        <FooterLink to={ROUTES.AUTH.REGISTER}>Patient Registration</FooterLink>
                        <FooterLink to={ROUTES.AUTH.LOGIN}>Doctor Portal</FooterLink>
                    </div>

                    {/* Links Column 2: Resources */}
                    <div className="lg:col-span-2 flex flex-col gap-4">
                        <h4 className="text-white font-bold mb-2">Resources</h4>
                        <FooterLink to="/documentation">Documentation</FooterLink>
                        <FooterLink to="/security-whitepaper">Security Whitepaper</FooterLink>
                        <FooterLink to="/api-integrations">Hospital APIs</FooterLink>
                        <FooterLink to="/status">System Status</FooterLink>
                    </div>

                    {/* Links Column 3: Legal */}
                    <div className="lg:col-span-2 flex flex-col gap-4">
                        <h4 className="text-white font-bold mb-2">Legal</h4>
                        <FooterLink to="/privacy">Privacy Policy</FooterLink>
                        <FooterLink to="/terms">Terms of Service</FooterLink>
                        <FooterLink to="/hipaa">HIPAA Compliance</FooterLink>
                        <FooterLink to="/cookies">Cookie Policy</FooterLink>
                    </div>

                    {/* 🌟 NEW Links Column 4: Developers */}
                    <div className="lg:col-span-2 flex flex-col gap-4">
                        <h4 className="text-white font-bold mb-2">Developers</h4>
                        <FooterLink to="/developers">Meet the Team</FooterLink>
                        <FooterLink to="/architecture">Architecture</FooterLink>
                        <motion.a
                            href="https://github.com/krishnakadam07/EHRS"
                            target="_blank"
                            className="text-left text-slate-400 hover:text-white transition-colors duration-200 text-sm font-medium"
                        >
                            GitHub Source Code
                        </motion.a>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-sm font-medium text-slate-500">
                        &copy; {new Date().getFullYear()} Emergency Health Record System. All rights reserved.
                    </p>

                    <div className="flex gap-4">
                        <SocialIcon icon={<FiTwitter />} href="#" />
                        <SocialIcon icon={<FiGithub />} href="https://github.com/krishnakadam07/EHRS" />
                        <SocialIcon icon={<FiLinkedin />} href="https://linkedin.com/krishnakadam07" />
                        <SocialIcon icon={<FiMail />} href="aaks2026@gmail.com" />
                    </div>
                </div>
            </div>
        </footer>
    );
}

function FooterLink({ children, to }) {
    const navigate = useNavigate();
    return (
        <motion.button
            whileHover={{ x: 5, color: '#0ea5e9' }}
            onClick={() => navigate(to)}
            className="text-left text-slate-400 hover:text-white transition-colors duration-200 text-sm font-medium"
        >
            {children}
        </motion.button>
    );
}

function SocialIcon({ icon, href }) {
    return (
        <motion.a
            whileHover={{ y: -3, backgroundColor: '#1e293b', color: '#0ea5e9' }}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center transition-colors duration-300"
        >
            {React.cloneElement(icon, { className: 'w-5 h-5' })}
        </motion.a>
    );
}
=======

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 pt-20 pb-10 relative overflow-hidden z-20 mt-auto shrink-0">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand & Newsletter Column (Spans 4) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <motion.div 
               className="flex items-center gap-3 cursor-pointer group"
               whileHover={{ scale: 1.02 }}
               onClick={() => navigate(ROUTES.PUBLIC.HOME)}
            >
               <div className="w-10 h-10 bg-gradient-to-tr from-primary to-sky-400 rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-all duration-300">
                  <FiActivity className="w-6 h-6" />
               </div>
               <span className="text-2xl font-black text-white tracking-tight">EHRS<span className="text-primary">.</span></span>
            </motion.div>
            
            <p className="text-slate-400 leading-relaxed max-w-sm">
               The decentralized Emergency Health Record System. Empowering patients and first responders with instant, secure medical data access globally.
            </p>

            <div className="mt-4 flex flex-col gap-3">
               <span className="text-xs font-black uppercase tracking-widest text-slate-500">Subscribe to Updates</span>
               <div className="flex gap-2 max-w-sm">
                  <input 
                     type="email" 
                     placeholder="Enter your email" 
                     className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-primary focus:ring-1 focus:ring-primary w-full transition-all"
                  />
                  <Button variant="primary" className="px-5 shrink-0"><FiArrowRight /></Button>
               </div>
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden lg:block lg:col-span-1"></div>

          {/* Links Column 1 */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h4 className="text-white font-bold mb-2">Platform</h4>
            <FooterLink to={ROUTES.PUBLIC.HOME}>Home</FooterLink>
            <FooterLink to={ROUTES.PUBLIC.ABOUT}>About Us</FooterLink>
            <FooterLink to={ROUTES.PUBLIC.CONTACT}>Contact Support</FooterLink>
            <FooterLink to={ROUTES.AUTH.REGISTER}>Patient Registration</FooterLink>
            <FooterLink to={ROUTES.AUTH.LOGIN}>Doctor Portal</FooterLink>
          </div>

          {/* Links Column 2 */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h4 className="text-white font-bold mb-2">Resources</h4>
            <FooterLink to="#">Documentation</FooterLink>
            <FooterLink to="#">Security Whitepaper</FooterLink>
            <FooterLink to="#">Hospital API Integrations</FooterLink>
            <FooterLink to="#">System Status</FooterLink>
          </div>

          {/* Links Column 3 */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h4 className="text-white font-bold mb-2">Legal</h4>
            <FooterLink to="#">Privacy Policy</FooterLink>
            <FooterLink to="#">Terms of Service</FooterLink>
            <FooterLink to="#">HIPAA Compliance</FooterLink>
            <FooterLink to="#">Cookie Policy</FooterLink>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm font-medium text-slate-500">
            &copy; {new Date().getFullYear()} Emergency Health Record System. All rights reserved.
          </p>
          
          <div className="flex gap-4">
            <SocialIcon icon={<FiTwitter />} href="#" />
            <SocialIcon icon={<FiGithub />} href="#" />
            <SocialIcon icon={<FiLinkedin />} href="#" />
            <SocialIcon icon={<FiMail />} href="mailto:hello@ehrs.network" />
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ children, to }) {
   const navigate = useNavigate();
   return (
      <motion.button 
         whileHover={{ x: 5, color: '#0ea5e9' }}
         onClick={() => navigate(to)}
         className="text-left text-slate-400 hover:text-white transition-colors duration-200 text-sm font-medium"
      >
         {children}
      </motion.button>
   );
}

function SocialIcon({ icon, href }) {
   return (
      <motion.a 
         whileHover={{ y: -3, backgroundColor: '#1e293b', color: '#0ea5e9' }}
         href={href}
         target="_blank"
         rel="noopener noreferrer"
         className="w-10 h-10 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center transition-colors duration-300"
      >
         {React.cloneElement(icon, { className: 'w-5 h-5' })}
      </motion.a>
   );
}
>>>>>>> 9b97f337fadfab789e1aa5c4f19d7d650499fe67
