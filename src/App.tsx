/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Camera, 
  Calendar, 
  Send, 
  BarChart3, 
  Layers, 
  CheckCircle2, 
  ArrowRight, 
  Instagram, 
  Twitter, 
  Linkedin,
  Menu,
  X,
  ChevronRight,
  Plus,
  Cpu,
  Users
} from 'lucide-react';

// --- Types ---
interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  details: string[];
}

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

interface PricingPlan {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}

interface ALaCarteItem {
  id: string;
  name: string;
  price: string;
}

// --- Data ---
const SERVICES: Service[] = [
  {
    id: 'branding',
    title: 'Personal Branding',
    description: 'Build a creative identity that resonates with your true self.',
    icon: <Layers className="w-6 h-6" />,
    details: ['Identity Mapping', 'Creative Direction', 'Voice Development', 'Impact Strategy']
  },
  {
    id: 'production-full',
    title: 'Production Services',
    description: 'A dedicated team of experts to handle your entire content pipeline.',
    icon: <Users className="w-6 h-6" />,
    details: ['Videographers & Editors', 'Professional Writers', '1:1 Coaching', 'Strategic Consulting']
  },
  {
    id: 'ai-branding',
    title: 'AI-Powered Branding',
    description: 'Leverage cutting-edge AI tools to accelerate your brand creation.',
    icon: <Cpu className="w-6 h-6" />,
    details: ['AI Identity Generation', 'Automated Workflows', 'Smart Copywriting', 'Predictive Analytics']
  },
  {
    id: 'creation',
    title: 'Authentic Creation',
    description: 'We make content creation easy, so you can focus on being real.',
    icon: <Camera className="w-6 h-6" />,
    details: ['Effortless Workflows', 'Raw Storytelling', 'Mobile-First Design', 'Simplified Editing']
  },
  {
    id: 'monetization',
    title: 'Impact & Growth',
    description: 'Turn your influence into a sustainable financial engine.',
    icon: <BarChart3 className="w-6 h-6" />,
    details: ['Monetization Models', 'Strategic Sharing', 'Community Building', 'Revenue Optimization']
  }
];

const PROCESS_STEPS: ProcessStep[] = [
  { number: '01', title: 'Niche Discovery', description: 'We identify your unique angle to ensure you stand out in a crowded market.' },
  { number: '02', title: 'Custom Strategy', description: 'A fully customizable roadmap tailored to your specific creative and financial goals.' },
  { number: '03', title: 'Easy Workflow', description: 'Simplified, easy-to-follow production systems that remove all technical friction.' },
  { number: '04', title: 'Impact Growth', description: 'Strategic publishing focused on building a personal brand with real substance.' }
];

const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    quote: "Annaverse media group helped me transition from chasing likes to building a brand that actually pays the bills. Their focus on impact over fame changed my entire perspective.",
    author: "Sarah Jenkins",
    role: "Digital Educator",
    avatar: "https://picsum.photos/seed/sarah/100/100"
  },
  {
    id: '2',
    quote: "The production workflow they set up for me is so simple. I used to spend days editing; now I spend hours, and the content feels more 'me' than ever.",
    author: "Marcus Chen",
    role: "Tech Storyteller",
    avatar: "https://picsum.photos/seed/marcus/100/100"
  },
  {
    id: '3',
    quote: "Finally, an agency that understands that personal branding isn't about being a celebrity—it's about being a leader in your niche. My revenue has tripled since we started.",
    author: "Elena Rodriguez",
    role: "Creative Consultant",
    avatar: "https://picsum.photos/seed/elena/100/100"
  }
];

const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'essential',
    name: 'Essential',
    price: '$2,500',
    description: 'Perfect for creators starting their professional journey.',
    features: [
      'Brand Identity Consultation',
      'Creative Direction',
      'Script Writing (4/mo)',
      'Marketing Consultation',
      'Basic AI Tools Access'
    ]
  },
  {
    id: 'professional',
    name: 'Professional',
    price: '$5,000',
    description: 'The complete engine for consistent growth and impact.',
    isPopular: true,
    features: [
      'Everything in Essential',
      'Social Media Strategy',
      'Social Media Management',
      'Photography & Video Production',
      '1:1 Monthly Coaching'
    ]
  },
  {
    id: 'elite',
    name: 'Elite',
    price: 'Custom',
    description: 'A full-scale partnership for high-impact leaders.',
    features: [
      'Everything in Professional',
      'Partnership Management',
      'Brand Deal Negotiation',
      'Revenue Focused Strategies',
      'Priority Production Support'
    ]
  }
];

const A_LA_CARTE_ITEMS: ALaCarteItem[] = [
  { id: '1', name: 'Single Video Production', price: '$750' },
  { id: '2', name: 'Brand Identity Deep Dive', price: '$1,200' },
  { id: '3', name: '1:1 Strategy Session', price: '$400' },
  { id: '4', name: 'Social Media Audit', price: '$500' },
  { id: '5', name: 'Script Writing (Pack of 5)', price: '$600' },
  { id: '6', name: 'AI Workflow Setup', price: '$900' }
];

// --- Components ---

const DynamicAvatar = ({ name, size = "w-12 h-12" }: { name: string, size?: string }) => {
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
  
  // Generate a consistent color based on the name
  const colors = [
    'bg-emerald-100 text-emerald-700',
    'bg-zinc-100 text-zinc-700',
    'bg-slate-100 text-slate-700',
    'bg-emerald-900 text-emerald-100',
    'bg-black text-white'
  ];
  
  const charCodeSum = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const colorClass = colors[charCodeSum % colors.length];

  return (
    <div className={`${size} rounded-full flex items-center justify-center font-bold text-xs tracking-tighter ${colorClass} border border-black/5`}>
      {initials}
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
            <Layers className="text-white w-4 h-4" />
          </div>
          <span className="font-bold text-xl tracking-tighter uppercase">Annaverse media group</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {['Services', 'Process', 'Pricing', 'Testimonials', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium hover:text-emerald-600 transition-colors">
              {item}
            </a>
          ))}
          <button className="bg-black text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-emerald-600 transition-colors">
            Get Started
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white border-b border-gray-100 p-6 md:hidden flex flex-col gap-4 shadow-xl"
          >
            {['Services', 'Process', 'Pricing', 'Testimonials', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsOpen(false)} className="text-lg font-medium py-2 border-b border-gray-50">
                {item}
              </a>
            ))}
            <button className="bg-black text-white w-full py-4 rounded-xl mt-4">
              Get Started
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            Social Media Creative Agency
          </div>
          <h1 className="text-6xl md:text-8xl font-bold leading-[0.9] tracking-tighter mb-8">
            IMPACT. <br />
            NOT <span className="text-emerald-600">FAME.</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-md mb-10 leading-relaxed">
            We help creators build authentic personal brands and creative marketing strategies that drive real impact and financial freedom.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-black text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-emerald-600 transition-all group">
              Start Your Project <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="border border-black/10 px-8 py-4 rounded-full font-bold hover:bg-gray-50 transition-all">
              View Our Work
            </button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative"
        >
          <div className="aspect-square bg-gray-100 rounded-[40px] overflow-hidden relative group">
            <img 
              src="https://picsum.photos/seed/agency/800/800" 
              alt="Creative Agency" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          
          {/* Floating Stats */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-6 -right-6 bg-white p-6 rounded-2xl shadow-2xl border border-gray-100 hidden lg:block"
          >
            <div className="flex items-center gap-4">
              <div className="bg-emerald-100 p-3 rounded-xl">
                <BarChart3 className="text-emerald-600 w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Avg. Growth</p>
                <p className="text-2xl font-bold">+142%</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-6 -left-6 bg-black text-white p-6 rounded-2xl shadow-2xl hidden lg:block"
          >
            <div className="flex items-center gap-4">
              <div className="bg-white/10 p-3 rounded-xl">
                <CheckCircle2 className="text-emerald-400 w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Projects Delivered</p>
                <p className="text-2xl font-bold">500+</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const Services = () => {
  return (
    <section id="services" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-4">Our Philosophy</h2>
          <p className="text-4xl font-bold tracking-tight">Authenticity made easy. Impact made sustainable.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, idx) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-10 rounded-[32px] border border-gray-100 hover:shadow-xl transition-all group"
            >
              <div className="w-14 h-14 bg-gray-900 text-white rounded-2xl flex items-center justify-center mb-8 group-hover:bg-emerald-600 transition-colors">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">{service.description}</p>
              <ul className="space-y-3">
                {service.details.map((detail) => (
                  <li key={detail} className="flex items-center gap-2 text-sm font-medium text-gray-500">
                    <Plus className="w-3 h-3 text-emerald-500" /> {detail}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Process = () => {
  return (
    <section id="process" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-4">The Workflow</h2>
            <h3 className="text-5xl font-bold tracking-tight mb-8 leading-tight">A niche, customizable, and easy-to-follow path.</h3>
            <p className="text-lg text-gray-600 mb-12 leading-relaxed">
              We help you carve out your unique space with a strategy that is built around your life, not the other way around.
            </p>
            <div className="space-y-8">
              {PROCESS_STEPS.map((step) => (
                <div key={step.number} className="flex gap-6 items-start">
                  <span className="text-4xl font-bold text-gray-200 leading-none">{step.number}</span>
                  <div>
                    <h4 className="text-xl font-bold mb-2">{step.title}</h4>
                    <p className="text-gray-500">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] bg-gray-900 rounded-[40px] overflow-hidden">
              <img 
                src="https://picsum.photos/seed/process/800/1000" 
                alt="Process" 
                className="w-full h-full object-cover opacity-60"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-emerald-500 rounded-full blur-[100px] opacity-20" />
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-4">Success Stories</h2>
          <p className="text-4xl font-bold tracking-tight">Real creators. Real impact.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, idx) => (
            <motion.div 
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-[32px] border border-gray-100 flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Plus key={i} className="w-3 h-3 text-emerald-500" />
                  ))}
                </div>
                <p className="text-lg text-gray-700 italic leading-relaxed mb-8">
                  "{testimonial.quote}"
                </p>
              </div>
              <div className="flex items-center gap-4">
                <DynamicAvatar name={testimonial.author} />
                <div>
                  <h4 className="font-bold text-sm">{testimonial.author}</h4>
                  <p className="text-xs text-gray-500 font-medium">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Pricing = () => {
  return (
    <section id="pricing" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-4">Investment</h2>
          <p className="text-4xl font-bold tracking-tight">Choose your path to impact.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {PRICING_PLANS.map((plan, idx) => (
            <motion.div 
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={`p-10 rounded-[40px] border flex flex-col ${plan.isPopular ? 'bg-black text-white border-black shadow-2xl scale-105 z-10' : 'bg-white text-black border-gray-100'}`}
            >
              {plan.isPopular && (
                <div className="bg-emerald-500 text-black text-[10px] font-bold uppercase tracking-widest py-1 px-3 rounded-full w-fit mb-6">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold tracking-tighter">{plan.price}</span>
                {plan.price !== 'Custom' && <span className={`text-sm ${plan.isPopular ? 'text-gray-400' : 'text-gray-500'}`}>/mo</span>}
              </div>
              <p className={`text-sm mb-8 leading-relaxed ${plan.isPopular ? 'text-gray-400' : 'text-gray-500'}`}>
                {plan.description}
              </p>
              <div className={`h-px w-full mb-8 ${plan.isPopular ? 'bg-white/10' : 'bg-black/5'}`} />
              <ul className="space-y-4 mb-10 flex-grow">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm font-medium">
                    <CheckCircle2 className={`w-4 h-4 mt-0.5 ${plan.isPopular ? 'text-emerald-400' : 'text-emerald-600'}`} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className={`w-full py-4 rounded-2xl font-bold transition-all ${plan.isPopular ? 'bg-emerald-500 text-black hover:bg-emerald-400' : 'bg-black text-white hover:bg-emerald-600'}`}>
                Choose {plan.name}
              </button>
            </motion.div>
          ))}
        </div>

        {/* A La Carte Section */}
        <div className="mt-32">
          <div className="text-center mb-16">
            <h3 className="text-2xl font-bold mb-4 italic">A La Carte Services</h3>
            <p className="text-gray-500 text-sm">Need something specific? Build your own package.</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {A_LA_CARTE_ITEMS.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                viewport={{ once: true }}
                className="flex items-center justify-between p-6 bg-white border border-gray-100 rounded-2xl hover:border-emerald-200 transition-all group"
              >
                <span className="font-bold text-sm group-hover:text-emerald-600 transition-colors">{item.name}</span>
                <span className="text-xs font-bold text-gray-400 bg-gray-50 px-3 py-1 rounded-full">{item.price}</span>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-sm text-gray-500 mb-6 italic">Don't see what you need? We offer custom solutions.</p>
            <a href="#contact" className="text-sm font-bold text-emerald-600 hover:text-emerald-700 underline underline-offset-8">
              Inquire for a Custom Quote
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-black text-white rounded-t-[60px]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-emerald-400 font-bold uppercase tracking-widest mb-6">Let's Connect</h2>
            <h3 className="text-6xl font-bold tracking-tighter mb-10 leading-[0.9]">READY TO <br />SCALE YOUR <br />PRESENCE?</h3>
            <p className="text-gray-400 text-xl mb-12 max-w-md">
              Fill out the form to start a conversation about your creative needs.
            </p>
            <div className="flex gap-6">
              <a href="#" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="bg-white/5 p-10 rounded-[40px] border border-white/10 backdrop-blur-sm">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Name</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Email</label>
                  <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors" placeholder="john@example.com" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Service Needed</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors appearance-none">
                  <option className="bg-black">Production Planning</option>
                  <option className="bg-black">Content Creation</option>
                  <option className="bg-black">Full Management</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Message</label>
                <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors" placeholder="Tell us about your project..." />
              </div>
              <button className="w-full bg-emerald-500 text-black font-bold py-4 rounded-xl hover:bg-emerald-400 transition-all">
                Send Inquiry
              </button>
            </form>
          </div>
        </div>

        <div className="mt-24 pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-gray-500 text-sm">
          <p>© 2024 Annaverse media group. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-black selection:bg-emerald-200 selection:text-emerald-900">
      <Navbar />
      <Hero />
      <Services />
      <Process />
      <Pricing />
      <Testimonials />
      <Contact />
    </div>
  );
}
