
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Plus, 
  Minus, 
  MessageCircle,
  Mail,
  Phone,
  HelpCircle
} from 'lucide-react';
import { FAQS } from '../constants';

const FAQ: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'General', 'Services', 'Pricing', 'Support'];

  const filteredFaqs = useMemo(() => {
    return FAQS.filter(faq => {
      const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="bg-navy pt-32 pb-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-salesforce opacity-5 -skew-x-12"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-10 tracking-tight">Intelligence Base</h1>
          <div className="max-w-3xl mx-auto relative group">
            <input 
              type="text" 
              placeholder="Search for answers on Agentforce, pricing, or support..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/10 border-2 border-white/20 rounded-full py-6 px-16 text-white text-lg placeholder-gray-400 focus:outline-none focus:border-salesforce transition-all backdrop-blur-md"
            />
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 w-7 h-7 group-focus-within:text-salesforce transition-colors" />
          </div>
          <p className="mt-8 text-gray-400 font-light text-lg">Detailed answers to 32 essential strategic and technical questions.</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-20">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setOpenIndex(null);
                }}
                className={`px-10 py-4 rounded-full text-sm font-black uppercase tracking-widest transition-all border-2 ${activeCategory === cat ? 'bg-salesforce border-salesforce text-white shadow-2xl shadow-salesforce/40' : 'bg-transparent border-gray-100 text-gray-500 hover:border-gray-300'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Accordion List */}
          <div className="space-y-6 min-h-[500px]">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, idx) => (
                <div key={idx} className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden transition-all hover:border-salesforce/20 hover:shadow-xl group">
                  <button 
                    className="w-full flex items-center justify-between p-10 text-left hover:bg-gray-50/30 transition-colors"
                    onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  >
                    <div className="space-y-2">
                      <span className="text-[10px] font-black text-salesforce uppercase tracking-widest bg-salesforce/5 px-3 py-1 rounded-full">{faq.category}</span>
                      <h3 className={`text-xl font-bold tracking-tight transition-colors ${openIndex === idx ? 'text-salesforce' : 'text-navy group-hover:text-salesforce'}`}>{faq.question}</h3>
                    </div>
                    <div className={`shrink-0 w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${openIndex === idx ? 'bg-salesforce border-salesforce text-white rotate-180 shadow-lg' : 'bg-transparent border-gray-100 text-gray-400'}`}>
                      {openIndex === idx ? <Minus className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
                    </div>
                  </button>
                  {openIndex === idx && (
                    <div className="px-10 pb-10 text-gray-600 leading-relaxed text-lg animate-in fade-in slide-in-from-top-4 duration-500 font-light border-t border-gray-50 pt-8">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-32 bg-gray-50 rounded-[4rem] border-2 border-dashed border-gray-200">
                <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-6" />
                <p className="text-gray-500 font-bold text-xl">We couldn't find a match for that query.</p>
                <p className="text-gray-400 font-light mt-2">Try a simpler term or browse by category.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center space-y-16">
            <h2 className="text-4xl font-black text-navy tracking-tight">Prefer a Direct Conversation?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="bg-white p-12 rounded-[3.5rem] shadow-sm flex flex-col items-center gap-6 group hover:-translate-y-2 transition-transform">
                <div className="w-16 h-16 bg-salesforce/10 text-salesforce rounded-[1.5rem] flex items-center justify-center group-hover:bg-salesforce group-hover:text-white transition-colors"><Mail className="w-8 h-8" /></div>
                <div>
                  <h4 className="font-black text-navy text-xl mb-2">Technical Inbox</h4>
                  <p className="text-gray-500 font-light text-sm mb-4">Direct architect access within 24h.</p>
                  <a href="mailto:info@salesforcetroopai.com" className="text-salesforce font-bold hover:underline">info@salesforcetroopai.com</a>
                </div>
              </div>
              <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl flex flex-col items-center gap-6 border-2 border-salesforce hover:-translate-y-2 transition-transform">
                <div className="w-16 h-16 bg-salesforce text-white rounded-[1.5rem] flex items-center justify-center shadow-lg"><MessageCircle className="w-8 h-8" /></div>
                <div>
                  <h4 className="font-black text-navy text-xl mb-2">Instant Strategy</h4>
                  <p className="text-gray-500 font-light text-sm mb-4">Available Mon-Fri 9AM-6PM EST.</p>
                  <Link to="/contact" className="px-8 py-3 bg-salesforce text-white rounded-full font-bold hover:bg-navy transition-all shadow-xl">Book Now</Link>
                </div>
              </div>
              <div className="bg-white p-12 rounded-[3.5rem] shadow-sm flex flex-col items-center gap-6 group hover:-translate-y-2 transition-transform">
                <div className="w-16 h-16 bg-salesforce/10 text-salesforce rounded-[1.5rem] flex items-center justify-center group-hover:bg-salesforce group-hover:text-white transition-colors"><Phone className="w-8 h-8" /></div>
                <div>
                  <h4 className="font-black text-navy text-xl mb-2">Priority Line</h4>
                  <p className="text-gray-500 font-light text-sm mb-4">For urgent multi-cloud inquiries.</p>
                  <a href="tel:+15551234567" className="text-salesforce font-bold hover:underline">+1 (555) 123-4567</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
