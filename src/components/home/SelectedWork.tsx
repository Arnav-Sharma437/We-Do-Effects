'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Section } from '@/components/layout/Section';
import { ArrowRight } from 'lucide-react';

const featuredWork = [
  {
    id: 'project-1',
    client: '[Project Alpha]',
    service: 'Branding & Web Design',
    context: '[Brief challenge/context placeholder]',
  },
  {
    id: 'project-2',
    client: '[Project Beta]',
    service: 'Video Production',
    context: '[Brief challenge/context placeholder]',
  }
];

interface WorkItem {
  id: string;
  _id?: string;
  title: string;
  category: string;
  description: string;
  link: string;
  image: string;
}

export const SelectedWork = ({ workData }: { workData?: WorkItem[] }) => {
  const prefersReducedMotion = useReducedMotion();
  const [data, setData] = React.useState<WorkItem[]>(workData || []);

  React.useEffect(() => {
    if (!workData || workData.length === 0) {
      fetch('/api/admin/content/work').then(r => r.json()).then(res => {
        if (res && res.length > 0) setData(res);
      });
    }
  }, [workData]);

  // Fallback to original hardcoded data if empty
  const displayData: any[] = data.length > 0 ? data : featuredWork.map(w => ({ ...w, title: w.client, category: w.service, description: w.context, link: `/work/${w.id}`, image: '' }));

  return (
    <Section spacing="xl" className="bg-surface relative overflow-hidden border-y border-border/50">
      <div className="flex flex-col items-start mb-24 md:mb-32">
        <h2 className="text-xs font-bold tracking-[0.3em] text-accent uppercase mb-6">Selected Work</h2>
        <h3 className="text-[4rem] md:text-[8rem] font-display font-bold uppercase tracking-tighter text-foreground leading-[0.85]">
          Proof In<br />Execution
        </h3>
      </div>

      <div className="flex flex-col gap-24 md:gap-40">
        {displayData.map((project, index) => (
          <motion.div 
            key={project._id || project.id}
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 1 }}
            className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-24 items-center group`}
          >
            {/* Massive Image Placeholder */}
            <div className="w-full lg:w-[60%] aspect-[4/5] md:aspect-video bg-background relative overflow-hidden border border-border/30">
              {project.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-tr from-surface-elevated to-surface flex items-center justify-center transition-transform duration-700 group-hover:scale-105">
                  <div className="text-border font-display text-5xl md:text-8xl font-bold uppercase tracking-tighter -rotate-12 opacity-30 group-hover:scale-110 transition-transform duration-700">
                    {project._id || project.id}
                  </div>
                </div>
              )}
              
              {/* Interaction Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex items-center justify-center">
                <Link href={project.link || '#'} className="bg-accent text-background text-xs font-bold uppercase tracking-[0.2em] px-8 py-4 rounded-full translate-y-8 group-hover:translate-y-0 transition-all duration-500 shadow-xl">
                  View Project
                </Link>
              </div>
            </div>

            {/* Project Context */}
            <div className={`w-full lg:w-[40%] flex flex-col ${index % 2 === 1 ? 'lg:items-end lg:text-right' : 'lg:items-start text-left'} z-20`}>
              <div className="w-16 h-[2px] bg-accent mb-8" />
              <span className="text-xs font-bold tracking-[0.3em] text-accent uppercase block mb-4">{project.category}</span>
              <h4 className="text-5xl md:text-6xl font-display font-bold uppercase text-foreground mb-6 leading-none tracking-tight">{project.title}</h4>
              
              <p className="text-muted text-base leading-relaxed mb-10 max-w-sm">
                <span className="text-foreground font-medium block mb-2">Context:</span>
                {project.description}
              </p>
              
              <Link 
                href={project.link || '#'}
                className="inline-flex items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] text-foreground hover:text-accent transition-colors"
              >
                <span>Read Case Study</span>
                <ArrowRight className={`w-4 h-4 transition-transform ${index % 2 === 1 ? 'rotate-180 lg:group-hover:-translate-x-3 group-hover:translate-x-3' : 'group-hover:translate-x-3'}`} />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-40 text-center relative z-10">
        <Link 
          href="/work"
          className="inline-flex items-center justify-center text-xl md:text-3xl font-serif text-foreground hover:text-accent transition-colors border-b border-accent pb-2"
        >
          View all selected work
        </Link>
      </div>
    </Section>
  );
};
