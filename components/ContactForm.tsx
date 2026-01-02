
import React, { useState } from 'react';
import AnimatedSection from './AnimatedSection';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    message: '',
  });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setResponseMessage('');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // In a real app, you'd have success/error logic from your backend
    const isSuccess = true; 

    if (isSuccess) {
      setStatus('success');
      setResponseMessage('Thank you for your message! I will get back to you shortly.');
      setFormData({ name: '', email: '', company: '', projectType: '', message: '' });
    } else {
      setStatus('error');
      setResponseMessage('Something went wrong. Please try again later.');
    }
  };

  return (
    <AnimatedSection>
      <section id="contact" className="py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Contact & Inquiries</h2>
            <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
              Open to discussing new projects, collaborations, and opportunities.
            </p>
          </div>
          <div className="mt-16 max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required className="w-full bg-slate-800/50 border border-slate-700 rounded-md py-3 px-4 text-white placeholder-slate-400 focus:ring-2 focus:ring-[#00B4D8] focus:outline-none" />
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your Email" required className="w-full bg-slate-800/50 border border-slate-700 rounded-md py-3 px-4 text-white placeholder-slate-400 focus:ring-2 focus:ring-[#00B4D8] focus:outline-none" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                   <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Agency / Company" className="w-full bg-slate-800/50 border border-slate-700 rounded-md py-3 px-4 text-white placeholder-slate-400 focus:ring-2 focus:ring-[#00B4D8] focus:outline-none" />
                   <select name="projectType" value={formData.projectType} onChange={handleChange} className="w-full bg-slate-800/50 border border-slate-700 rounded-md py-3 px-4 text-white focus:ring-2 focus:ring-[#00B4D8] focus:outline-none">
                      <option value="" disabled>Select Project Type</option>
                      <option>Flood Risk Analysis</option>
                      <option>Stormwater Design</option>
                      <option>GIS Analysis</option>
                      <option>General Inquiry</option>
                  </select>
              </div>
              <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Your Message" rows={5} required className="w-full bg-slate-800/50 border border-slate-700 rounded-md py-3 px-4 text-white placeholder-slate-400 focus:ring-2 focus:ring-[#00B4D8] focus:outline-none"></textarea>
              <div className="text-center">
                <button type="submit" disabled={status === 'sending'} className="bg-[#00B4D8] text-white font-bold py-3 px-12 rounded-lg text-lg hover:bg-opacity-80 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
              </div>
              {responseMessage && (
                <p className={`text-center mt-4 text-sm ${status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                  {responseMessage}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
};

export default ContactForm;
