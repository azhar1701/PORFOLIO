
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ExpertiseGrid from '../components/ExpertiseGrid';
import CaseStudyGallery from '../components/CaseStudyGallery';
import ProjectMap from '../components/ProjectMap';
import Testimonials from '../components/Testimonials';
import BlogSection from '../components/BlogSection';
import CredentialsBar from '../components/CredentialsBar';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';
import ProjectModal from '../components/ProjectModal';
import type { Project, PortfolioData } from '../types';

const HomePage: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/portfolio-data.json');
        const data = await response.json();
        setPortfolioData(data);
      } catch (error) {
        console.error("Failed to load portfolio data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center text-white">Loading Portfolio...</div>;
  }

  if (!portfolioData) {
    return <div className="min-h-screen flex items-center justify-center text-white">Error loading portfolio data.</div>;
  }

  const { projects, expertiseItems, credentials, testimonials, blogPosts } = portfolioData;

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ExpertiseGrid items={expertiseItems} />
        <CaseStudyGallery projects={projects} onSelectProject={setSelectedProject} />
        <ProjectMap projects={projects} onSelectProject={setSelectedProject} />
        <Testimonials testimonials={testimonials} />
        <BlogSection posts={blogPosts} />
        <CredentialsBar credentials={credentials} />
        <ContactForm />
      </main>
      <Footer />
      <ProjectModal
        project={selectedProject}
        projects={projects}
        onClose={() => setSelectedProject(null)}
        onSelectProject={setSelectedProject}
      />
    </>
  );
};

export default HomePage;
