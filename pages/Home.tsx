
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Cpu, 
  TrendingUp, 
  ShieldCheck, 
  CheckCircle2, 
  MessageSquare,
  Award,
  Zap
} from 'lucide-react';
import { SERVICES } from '../constants';

const Home: React.FC = () => {
  const [stats, setStats] = useState({ projects: 0, certs: 0, retention: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setStats(prev => ({
        projects: prev.projects < 500 ? prev.projects + 10 : 500,
        certs: prev.certs < 50 ? prev.certs + 2 : 50,
        retention: prev.retention < 98 ? prev.retention + 2 : 98,
      }));
    }, 40);
    return () => clearInterval(timer);
  }, []);

  const getServiceVisual = (id: string, icon: React.ReactNode) => {
    const gradients: Record<string, string> = {
      'implementation': 'from-blue-600 to-indigo-700',
      'development': 'from-navy to-blue-900',
      'integration': 'from-teal-accent to-blue-500',
      'migration': 'from-indigo-500 to-purple-600',
      'ai-solutions': 'from-salesforce via-teal-accent to-blue-400',
      'managed-services': 'from-navy via-salesforce to-indigo-800'
    };
    
    return (
      <div className={`w-full h-40 rounded-[2.5rem] bg-gradient-to-br ${gradients[id] || 'from-salesforce to-blue-600'} flex items-center justify-center mb-8 relative overflow-hidden group-hover:scale-[1.02] transition-all duration-500 shadow-xl border border-white/10`}>
        <div className="absolute inset-0 opacity-20 mix-blend-overlay">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id={`grid-${id}`} width="15" height="15" patternUnits="userSpaceOnUse">
                <path d="M 15 0 L 0 0 0 15" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#grid-${id})`} />
          </svg>
        </div>
        <div className="w-16 h-16 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl flex items-center justify-center text-white relative z-10 shadow-inner group-hover:scale-110 transition-transform">
          {icon}
        </div>
      </div>
    );
  };

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 lg:pt-36 lg:pb-52 bg-navy overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-[#051f3e] to-salesforce opacity-90"></div>
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30-30-30z' fill='%23fff'/%3E%3C/svg%3E")` }}></div>
        
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-teal-accent/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[600px] h-[600px] bg-salesforce/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white text-xs font-black uppercase tracking-widest mb-10 shadow-2xl">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-accent"></span>
            </span>
            Agentforce Early Adopter Program 2025
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-black text-white mb-8 leading-[1] max-w-6xl mx-auto tracking-tight drop-shadow-2xl">
            CRM is Now <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-accent to-salesforce">Autonomous</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-14 max-w-3xl mx-auto leading-relaxed font-light">
            Deploy AI-powered Salesforce solutions that think, reason, and act. Elevate your enterprise with the world's most intelligent CRM architecture.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-24">
            <Link to="/contact" className="w-full sm:w-auto px-12 py-5 bg-salesforce hover:bg-white hover:text-navy text-white rounded-full text-lg font-black transition-all transform hover:scale-105 shadow-2xl flex items-center justify-center gap-3">
              Start Strategy Audit <Zap className="w-5 h-5 fill-current" />
            </Link>
            <Link to="/services" className="w-full sm:w-auto px-12 py-5 bg-white/5 border-2 border-white/20 hover:bg-white hover:text-navy hover:border-white text-white rounded-full text-lg font-black transition-all flex items-center justify-center gap-3 backdrop-blur-md">
              Our Capabilities <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto pt-16 border-t border-white/10">
            <div className="space-y-1">
              <div className="text-4xl lg:text-5xl font-black text-white tracking-tighter">{stats.projects}+</div>
              <div className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em]">Success Rollouts</div>
            </div>
            <div className="space-y-1 border-x border-white/10">
              <div className="text-4xl lg:text-5xl font-black text-white tracking-tighter">{stats.retention}%</div>
              <div className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em]">Client Satisfaction</div>
            </div>
            <div className="space-y-1">
              <div className="text-4xl lg:text-5xl font-black text-white tracking-tighter">{stats.certs}+</div>
              <div className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em]">Technical Certs</div>
            </div>
          </div>
        </div>
      </section>

      {/* Advantage Grid */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-24">
            <h2 className="text-xs font-black text-salesforce uppercase tracking-[0.4em] mb-6">The Elite Distinction</h2>
            <h3 className="text-4xl md:text-6xl font-black text-navy tracking-tight">Technical Mastery Meets AI Strategy</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { icon: <Cpu />, title: 'Agentforce First', text: 'Leaders in the Atlas Reasoning Engine and autonomous AI agent deployment.' },
              { icon: <Award />, title: 'Architectural Rigor', text: 'Bespoke frameworks built by Multi-Cloud Certified Technical Architects.' },
              { icon: <TrendingUp />, title: 'Quantifiable ROI', text: 'We map every feature to business outcomes. Efficiency is our primary metric.' },
              { icon: <ShieldCheck />, title: 'Trust & Privacy', text: 'Strict adherence to Einstein Trust Layer protocols and data sovereignty.' }
            ].map((item, idx) => (
              <div key={idx} className="p-12 rounded-[3.5rem] bg-gray-50 hover:bg-white hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)] transition-all group border border-transparent hover:border-gray-100 flex flex-col items-center">
                <div className="w-20 h-20 bg-navy rounded-3xl flex items-center justify-center mb-10 group-hover:bg-salesforce transition-all duration-500 transform group-hover:rotate-6 shadow-xl">
                  {React.cloneElement(item.icon as React.ReactElement<any>, { className: "text-white w-10 h-10" })}
                </div>
                <h4 className="text-2xl font-black text-navy mb-5">{item.title}</h4>
                <p className="text-gray-500 leading-relaxed font-light text-lg">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Pillars */}
      <section className="py-32 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-24 gap-10">
            <div className="max-w-2xl text-center lg:text-left">
              <h2 className="text-xs font-black text-salesforce uppercase tracking-[0.4em] mb-6">Operational Excellence</h2>
              <h3 className="text-4xl md:text-6xl font-black text-navy tracking-tight leading-tight">6 Strategic Pillars of Digital Success</h3>
            </div>
            <Link to="/services" className="px-10 py-5 bg-white border border-gray-200 text-navy font-black rounded-full hover:bg-salesforce hover:text-white transition-all shadow-sm">
              View Detailed Roadmaps
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {SERVICES.map((service) => (
              <div key={service.id} className="group bg-white p-12 rounded-[4rem] shadow-sm hover:shadow-2xl transition-all duration-700 flex flex-col h-full border border-gray-100 hover:border-salesforce/20">
                {getServiceVisual(service.id, service.icon)}
                <h4 className="text-2xl font-black text-navy mb-5 tracking-tight">{service.title}</h4>
                <p className="text-gray-500 mb-10 flex-grow leading-relaxed font-light text-lg">{service.shortDescription}</p>
                <Link to="/services" className="text-salesforce font-black inline-flex items-center gap-2 group/link text-sm uppercase tracking-[0.2em]">
                  Master Pillar <ArrowRight className="w-4 h-4 group-hover/link:translate-x-2 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conversion Section */}
      <section className="py-32">
        <div className="container mx-auto px-4">
          <div className="bg-salesforce rounded-[5rem] p-16 md:p-36 text-center relative overflow-hidden shadow-2xl shadow-salesforce/40">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 rounded-full -mr-72 -mt-72 blur-[100px]"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-navy/30 rounded-full -ml-72 -mb-72 blur-[100px]"></div>
            
            <div className="relative z-10 space-y-12">
              <h3 className="text-5xl md:text-8xl font-black text-white tracking-tight leading-[1]">Ready for a Breakthrough?</h3>
              <p className="text-xl md:text-3xl text-white/80 max-w-4xl mx-auto font-light leading-relaxed">
                Join the elite enterprises leveraging Agentforce to outpace the competition. Your journey to an autonomous organization starts with a single audit.
              </p>
              <div className="flex flex-col items-center gap-10">
                <Link to="/contact" className="px-16 py-7 bg-white text-salesforce rounded-full text-2xl font-black hover:bg-navy hover:text-white transition-all transform hover:scale-105 shadow-2xl flex items-center gap-4">
                  Request Free Audit <MessageSquare className="w-7 h-7 fill-current" />
                </Link>
                <div className="flex flex-wrap items-center justify-center gap-10 text-white/60 text-[10px] font-black uppercase tracking-[0.3em]">
                  <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-teal-accent" /> Certified Partners</span>
                  <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-teal-accent" /> 24h Response</span>
                  <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-teal-accent" /> Zero Risk</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
