
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Calendar, 
  User, 
  Search,
  Filter,
  Tag as TagIcon
} from 'lucide-react';
import { BLOG_POSTS } from '../constants';

const Blog: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Strategy', 'Technical', 'AI & Innovation', 'Platform Governance'];

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const featuredPost = useMemo(() => BLOG_POSTS.find(p => p.isFeatured) || BLOG_POSTS[0], []);
  const otherPosts = useMemo(() => filteredPosts.filter(p => p.id !== featuredPost.id || activeCategory !== 'All'), [filteredPosts, featuredPost, activeCategory]);

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="bg-navy pt-24 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="blog-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#blog-pattern)" />
          </svg>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-black text-white mb-6">Resources & Insights</h1>
              <p className="text-xl text-gray-400 font-light">The strategic blueprint for modern Salesforce success, curated by certified experts.</p>
            </div>
            <div className="relative w-full lg:w-96">
              <input 
                type="text" 
                placeholder="Search resources, tags, or topics..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-full py-4 px-12 text-white placeholder-gray-400 focus:outline-none focus:border-salesforce transition-all backdrop-blur-md"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>
        </div>
      </section>

      {/* Category Navigation */}
      <nav className="border-b border-gray-100 bg-white sticky top-16 z-30 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-8 overflow-x-auto no-scrollbar py-4">
            <div className="flex items-center gap-2 text-navy/40 shrink-0">
              <Filter size={18} />
              <span className="text-xs font-black uppercase tracking-widest">Filter:</span>
            </div>
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-sm font-bold whitespace-nowrap transition-all px-4 py-2 rounded-full ${activeCategory === cat ? 'bg-salesforce text-white' : 'text-gray-500 hover:text-salesforce hover:bg-gray-50'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Featured Spotlight (Only show when on "All") */}
      {activeCategory === 'All' && !searchQuery && (
        <section className="pt-16 pb-8">
          <div className="container mx-auto px-4">
            <Link to={`/blog/${featuredPost.id}`} className="group relative block bg-navy rounded-[3rem] overflow-hidden shadow-2xl transition-transform hover:scale-[1.01]">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={featuredPost.image} alt={featuredPost.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                </div>
                <div className="p-8 md:p-16 flex flex-col justify-center text-white space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-teal-accent text-navy text-[10px] font-black uppercase tracking-widest rounded-full">Featured Article</span>
                    <span className="text-xs font-bold text-gray-400">{featuredPost.category}</span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black leading-tight group-hover:text-teal-accent transition-colors">{featuredPost.title}</h2>
                  <p className="text-lg text-gray-400 font-light leading-relaxed">{featuredPost.excerpt}</p>
                  <div className="flex items-center gap-6 pt-4 text-xs font-bold text-gray-500 uppercase tracking-widest">
                    <span className="flex items-center gap-2"><User size={14} /> {featuredPost.author}</span>
                    <span className="flex items-center gap-2"><Calendar size={14} /> {featuredPost.date}</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Article Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {otherPosts.length > 0 ? (
              otherPosts.map((post) => (
                <article key={post.id} className="group flex flex-col h-full bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500">
                  <div className="aspect-[16/9] overflow-hidden relative">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute bottom-4 left-4 flex gap-2">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black text-navy uppercase tracking-widest shadow-sm">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-8 flex flex-col flex-grow space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="text-[10px] font-bold text-salesforce bg-salesforce/5 px-2 py-0.5 rounded">#{tag}</span>
                      ))}
                    </div>
                    <h3 className="text-2xl font-bold text-navy group-hover:text-salesforce transition-colors leading-tight">
                      <Link to={`/blog/${post.id}`}>{post.title}</Link>
                    </h3>
                    <p className="text-gray-500 font-light leading-relaxed flex-grow text-sm">{post.excerpt}</p>
                    <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs font-bold text-gray-400 uppercase tracking-widest">
                        <span className="flex items-center gap-1.5"><Calendar size={12} /> {post.date.split(',')[0]}</span>
                      </div>
                      <Link to={`/blog/${post.id}`} className="text-salesforce font-bold text-sm inline-flex items-center gap-1 group/link">
                        Read More <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="col-span-full py-20 text-center bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
                <p className="text-gray-500 font-bold">No resources found. Try a different category or search term.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Knowledge Newsletter */}
      <section className="py-24 bg-navy relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-salesforce opacity-10 rounded-full blur-3xl -mr-48 -mt-48"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">Stay Ahead of the Curve</h2>
            <p className="text-xl text-gray-400 font-light">Join our bi-weekly dispatch of Salesforce AI strategy, enterprise patterns, and ecosystem news.</p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
               <input 
                type="email" 
                placeholder="Enter your work email" 
                className="flex-grow px-8 py-4 rounded-full bg-white/10 border border-white/20 text-white focus:outline-none focus:border-salesforce"
               />
               <button className="px-10 py-4 bg-salesforce text-white rounded-full font-bold hover:bg-teal-accent transition-all whitespace-nowrap">
                 Join 5,000+ Pros
               </button>
            </form>
            <div className="flex items-center justify-center gap-4 text-xs font-bold text-gray-500 uppercase tracking-widest">
               <span className="flex items-center gap-1"><TagIcon size={12} /> Weekly Tech Insights</span>
               <span className="flex items-center gap-1"><TagIcon size={12} /> Case Study Breakdowns</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
