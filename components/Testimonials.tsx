
import React from 'react';
import type { Testimonial } from '../types';
import AnimatedSection from './AnimatedSection';

const QuoteIcon = () => (
    <svg className="h-12 w-12 text-[#00B4D8]/30" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
        <path d="M9.352 4C4.456 4 0 8.456 0 13.352c0 4.288 3.472 7.776 7.776 7.776H9.352v-4.8H7.776c-1.664 0-3.008-1.344-3.008-3.008s1.344-3.008 3.008-3.008h1.576V4zM22.648 4C17.752 4 13.296 8.456 13.296 13.352c0 4.288 3.472 7.776 7.776 7.776h1.576v-4.8h-1.576c-1.664 0-3.008-1.344-3.008-3.008s1.344-3.008 3.008-3.008h1.576V4z" />
    </svg>
);

const Testimonials: React.FC<{ testimonials: Testimonial[] }> = ({ testimonials }) => {
    return (
        <AnimatedSection>
            <section className="py-20 sm:py-32 bg-slate-900/50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Professional Commendations</h2>
                        <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
                            Feedback from leaders and collaborators in the industry.
                        </p>
                    </div>
                    <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="bg-slate-900/30 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
                                <div className="relative">
                                    <QuoteIcon />
                                    <blockquote className="mt-4 text-lg text-slate-300 leading-relaxed">
                                        <p>&ldquo;{testimonial.quote}&rdquo;</p>
                                    </blockquote>
                                </div>
                                <footer className="mt-6">
                                    <p className="font-bold text-white">{testimonial.author}</p>
                                    <p className="text-slate-400">{testimonial.title}</p>
                                </footer>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </AnimatedSection>
    );
};

export default Testimonials;
