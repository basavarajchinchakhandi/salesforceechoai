
import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Clock, 
  Share2, 
  Linkedin, 
  Twitter, 
  Facebook,
  ChevronRight,
  Bookmark,
  MessageSquare
} from 'lucide-react';
import { BLOG_POSTS } from '../constants';

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [scrollProgress, setScrollProgress] = useState(0);
  const post = BLOG_POSTS.find(p => p.id === id);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrollProgress((currentScroll / totalScroll) * 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!post) return <Navigate to="/blog" />;

  const relatedPosts = BLOG_POSTS.filter(p => p.id !== id && (p.category === post.category || p.isFeatured)).slice(0, 2);

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Reading Progress */}
      <div className="fixed top-16 left-0 right-0 h-1.5 bg-gray-100 z-50">
        <div 
          className="h-full bg-salesforce transition-all duration-150" 
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      <article>
        {/* Header Section */}
        <header className="pt-24 pb-20 bg-navy text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-salesforce/5 skew-x-12"></div>
          <div className="container mx-auto px-4 max-w-4xl relative z-10">
            <Link to="/blog" className="inline-flex items-center gap-2 text-salesforce font-bold mb-10 hover:text-white transition-colors group">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Back to Resources
            </Link>
            
            <div className="flex flex-wrap items-center gap-6 mb-8 text-xs font-bold uppercase tracking-widest text-gray-500">
               <span className="px-3 py-1 bg-salesforce/20 text-salesforce rounded-full border border-salesforce/30">{post.category}</span>
               <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {post.date}</span>
               <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> {post.readTime}</span>
               <span className="flex items-center gap-2"><User className="w-4 h-4" /> By {post.author}</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tight">{post.title}</h1>
            
            <div className="flex flex-wrap gap-3">
              {post.tags.map(tag => (
                <span key={tag} className="text-[10px] font-bold text-teal-accent border border-teal-accent/30 px-3 py-1 rounded-full bg-teal-accent/10 italic">#{tag}</span>
              ))}
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="container mx-auto px-4 max-w-5xl -mt-16 mb-20 relative z-20">
          <div className="rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
            <img src={post.image} alt={post.title} className="w-full h-auto object-cover max-h-[500px]" />
          </div>
        </div>

        {/* Post Content */}
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex flex-col lg:flex-row gap-20">
            {/* Sidebar Tools */}
            <aside className="lg:w-20 shrink-0 flex lg:flex-col gap-6 lg:sticky lg:top-32 h-fit items-center">
              <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest hidden lg:block">Interact</span>
              <button className="p-4 rounded-full bg-gray-50 hover:bg-salesforce hover:text-white text-gray-400 transition-all shadow-sm"><Linkedin size={20} /></button>
              <button className="p-4 rounded-full bg-gray-50 hover:bg-salesforce hover:text-white text-gray-400 transition-all shadow-sm"><Twitter size={20} /></button>
              <button className="p-4 rounded-full bg-gray-50 hover:bg-salesforce hover:text-white text-gray-400 transition-all shadow-sm"><Bookmark size={20} /></button>
              <div className="w-px h-12 bg-gray-100 hidden lg:block"></div>
              <button className="p-4 rounded-full bg-salesforce/5 hover:bg-salesforce hover:text-white text-salesforce transition-all shadow-sm"><Share2 size={20} /></button>
            </aside>

            {/* Body */}
            <div className="flex-grow max-w-3xl">
              <div 
                dangerouslySetInnerHTML={{ __html: post.content }} 
                className="prose prose-lg prose-navy max-w-none text-gray-700 leading-relaxed text-lg 
                prose-headings:font-black prose-headings:tracking-tight prose-headings:text-navy
                prose-p:font-light prose-strong:font-bold prose-ul:font-light prose-li:my-2"
              />
              
              {/* Author Card */}
              <div className="mt-24 p-10 bg-gray-50 rounded-[3rem] border border-gray-100 flex flex-col md:flex-row items-center gap-8">
                <img src={`https://i.pravatar.cc/150?u=${post.author}`} className="w-24 h-24 rounded-full border-4 border-white shadow-lg" alt={post.author} />
                <div className="flex-grow space-y-2 text-center md:text-left">
                  <p className="text-xs font-black text-salesforce uppercase tracking-widest">About the Author</p>
                  <h4 className="text-2xl font-bold text-navy">{post.author}</h4>
                  <p className="text-gray-500 font-light">Lead Salesforce Strategist at TroopAi with over a decade of multi-cloud implementation experience.</p>
                </div>
                <Link to="/contact" className="px-8 py-4 bg-white text-navy border border-gray-200 rounded-full font-bold hover:bg-salesforce hover:text-white transition-all shadow-sm">
                  Connect
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Recommended Content */}
      <section className="mt-32 py-24 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center justify-between mb-16">
            <h3 className="text-3xl font-black text-navy tracking-tight">Expand Your Knowledge</h3>
            <Link to="/blog" className="text-salesforce font-bold flex items-center gap-2 hover:translate-x-1 transition-transform">
              Browse All Resources <ChevronRight size={18} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {relatedPosts.map(p => (
              <Link key={p.id} to={`/blog/${p.id}`} className="group bg-white rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row shadow-sm hover:shadow-2xl transition-all border border-transparent hover:border-salesforce/10">
                <div className="w-full md:w-48 h-48 md:h-auto shrink-0 overflow-hidden">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="p-8 flex flex-col justify-center space-y-3">
                   <span className="text-[10px] font-black text-salesforce uppercase tracking-widest">{p.category}</span>
                   <h4 className="text-xl font-bold text-navy leading-tight group-hover:text-salesforce transition-colors">{p.title}</h4>
                   <p className="text-sm text-gray-500 line-clamp-2 font-light">{p.excerpt}</p>
                   <span className="text-xs font-bold text-navy flex items-center gap-1 pt-2">Read Resource <ArrowLeft className="w-3 h-3 rotate-180" /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Article CTA */}
      <section className="container mx-auto px-4 max-w-4xl mt-32">
        <div className="bg-salesforce rounded-[4rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-salesforce/40">
          <div className="absolute inset-0 bg-navy opacity-10 pointer-events-none"></div>
          <div className="relative z-10 space-y-6">
            <MessageSquare size={48} className="mx-auto text-teal-accent mb-4" />
            <h3 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">Ready to Apply These Insights?</h3>
            <p className="text-xl text-white/80 font-light max-w-2xl mx-auto">Skip the trial and error. Our architects can help you build the custom framework your business deserves.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
              <Link to="/contact" className="w-full sm:w-auto px-12 py-5 bg-white text-salesforce rounded-full font-bold text-lg hover:bg-navy hover:text-white transition-all shadow-xl">
                Book My Free Audit
              </Link>
              <Link to="/services" className="w-full sm:w-auto px-12 py-5 bg-transparent border-2 border-white/30 text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all">
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;
