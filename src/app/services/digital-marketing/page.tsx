import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ServiceHero } from '@/components/services/ServiceHero';
import { ServiceSection, ServiceBulletList, ServiceCard, ServiceGrid, ServiceCTAButton } from '@/components/services/ServiceContent';

export const metadata = {
  title: 'Digital Marketing - We Do Effects',
  description: 'Digital marketing solutions tailored to the vision of your brand.',
};

export default function DigitalMarketingPage() {
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col bg-background">
        <ServiceHero 
          title="Digital Marketing" 
          imageSrc="/assets/about/service-digital.jpg" 
        />

        <section className="py-16 md:py-24">
          <div className="max-w-[900px] mx-auto px-6">
            
            <ServiceSection title="What is Digital Marketing?">
              <p>
                In this, nay, fast-paced, tech-savvy world, having the best product or service offered out there is never enough. You have to be seen, heard, and remembered. This is where digital marketing application is found — the creation of online visibility, engagement, and growth.
              </p>
              <p>
                At We Do Effects UK, we specialize in digital marketing solutions tailored to the vision of your brand to convert clicks into loyal customers.
              </p>
              <p className="mt-6">
                Digital marketing constitutes all online marketing endeavors that use digital channels to reach out to existing or potential consumers. These channels comprise search engines, websites, social media, email, mobile apps, and so on. The prime factor about digital marketing that sets it apart from traditional one is its ability to make companies talk directly to a target audience and in real-time — while tracking performance, adjusting strategies, and scaling up success.
              </p>
              <p>
                In short, it is not just placing your business online; it is about featuring your brand, engaging viewers, and prompting interested parties to take some action.
              </p>
            </ServiceSection>

            <ServiceSection title="Why is Digital Marketing Important for Your Business?">
              <p className="mb-6">This is not one to be debated-anymore-of-the-days; the company will have to promote-it via digital marketing.</p>
              <ServiceBulletList items={[
                { title: 'Visibility', text: 'Your potential customers are there. Digital marketing assures that your business meets your audience on any online platform they use, such as search engines, social media, and mobile.' },
                { title: 'Targeted Reach', text: 'Unlike traditional advertising, digital buying allows you to advertise before your intended audience depending on geographic location, interest, age, gender, or language.' },
                { title: 'Low Cost', text: 'It gives small businesses more ROI than traditional marketing methods.' },
                { title: 'Real-Time Analytics', text: 'Most importantly, you will be able to tell if it is working or not and quickly change strategies accordingly. A campaign can be tracked and measured based on concrete data.' },
                { title: 'Branding', text: 'Establish trust, communicate your story, and position yourself as a thought leader in your industry.' },
              ]} />
              <p className="mt-6 font-bold text-foreground">Your competitors are all present online. Are you leading them, or are you lagging?</p>
            </ServiceSection>

            <ServiceSection title="What We Do?">
              <p>The team at We Do Effects UK merges creativity with strategy to create digital marketing experiences that are relevant. Our services include:</p>
              
              <ServiceGrid>
                <ServiceCard title="SEO (Search Engine Optimization)" delay={0}>
                  <p>Search engines are where buying journeys begin. We help your website attain higher ranking on Google through negotiations around in-depth keyword research, on-page and off-page optimization, link building, and content strategy. The ultimate objective is more visibility, organic traffic, and qualified leads.</p>
                  <ServiceCTAButton href="/pricing" text="EXPLORE PRICING →" />
                </ServiceCard>

                <ServiceCard title="Website Designing" delay={0.1}>
                  <p>Your website is your digital showroom — and first impressions really matter. Our team designs responsive, fast, and conversion-oriented websites that are not just good-looking but provide a seamless UX leading the visitors towards conversion. From slick landing pages to complete e-commerce solutions, we ensure your site is fit for performance on all devices.</p>
                  <ServiceCTAButton href="/pricing" text="EXPLORE PRICING →" />
                </ServiceCard>

                <ServiceCard title="Graphic Designing" delay={0.2}>
                  <p>Visuals matter. From logos and branding materials to social media creatives and ad designs, our graphic designers will realise your vision. We create bold, attention-grabbing visuals that convey your message clearly and enhance your brand identity.</p>
                  <ServiceCTAButton href="/pricing" text="EXPLORE PRICING →" />
                </ServiceCard>

                <ServiceCard title="Final Thoughts" delay={0.3}>
                  <p>In a noisy world, digital marketing lends a voice to your brand — a voice that is clear, strategic, and impactful. Need to rank higher, look better, and convert more leads? We Do Effects UK is your digital-growth partner.</p>
                  <p>We don't really do marketing; we create effects: an effect that can be measured, remembered, and market-shift.</p>
                  <p className="font-bold text-foreground">Let's build your digital presence the smart way.</p>
                </ServiceCard>
              </ServiceGrid>
            </ServiceSection>

          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
