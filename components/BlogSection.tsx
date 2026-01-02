
import React from 'react';
import type { BlogPost } from '../types';
import AnimatedSection from './AnimatedSection';

const ArrowRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
);

const BlogSection: React.FC<{ posts: BlogPost[] }> = ({ posts }) => {
    return (
        <AnimatedSection>
            <section id="insights" className="py-20 sm:py-32">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Technical Insights</h2>
                        <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
                            Exploring advancements and best practices in hydrological engineering.
                        </p>
                    </div>
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map(post => (
                            <a key={post.id} href={post.link} className="group block bg-slate-800/50 border border-slate-700 rounded-lg overflow-hidden hover:-translate-y-2 transition-transform duration-300 shadow-lg hover:shadow-cyan-500/10">
                                <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover" />
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-white">{post.title}</h3>
                                    <p className="text-slate-400 mt-3 text-base">{post.excerpt}</p>
                                    <div className="mt-4 text-[#00B4D8] font-semibold inline-flex items-center">
                                        Read More
                                        <ArrowRightIcon />
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </section>
        </AnimatedSection>
    );
};

export default BlogSection;
