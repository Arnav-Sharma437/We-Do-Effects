import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ServiceHero } from '@/components/services/ServiceHero';
import { ServiceSection, ServiceCard, ServiceGrid, ServiceCTAButton } from '@/components/services/ServiceContent';

export const metadata = {
  title: 'Graphic Designing - We Do Effects',
  description: 'Custom designs that possess personalities you command.',
};

export default function GraphicDesigningPage() {
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col bg-background">
        <ServiceHero 
          title="Designing" 
          imageSrc="/assets/about/service-content.jpg" 
        />

        <section className="py-16 md:py-24">
          <div className="max-w-[900px] mx-auto px-6">
            
            <ServiceSection title="Designing">
              <p>
                At We Do Effects, design is one of the greatest forms of tools to communicate your brand message and create impact. With that, our design team takes pride in offering a whole spectrum of design services to help you create breathtaking visuals that represent your brand image and engage your audience.
              </p>
              <p>
                Whether you need graphic designs, designs for the website, logo design, or branding materials, our designers will partner with you and understand what your vision is to bring it to life. Our creative designs are not just beautiful, they are functional in their own right to work in parallel with your brand's identity and objectives.
              </p>
              <p>
                We create custom designs that possess the different personalities you command, thus making it stand apart in a competitive environment. These may be simple and clean designs one day and in-your-face outlandish concepts another, depending on the client's needs and target audience.
              </p>
              <p className="mt-6 font-bold text-foreground">Here are a few of our offering designs:</p>
            </ServiceSection>

            <ServiceSection title="Our Design Offerings">
              <ServiceGrid>
                <ServiceCard title="Logo Designing" delay={0}>
                  <p>Designing logos that epitomize style and clarity and portray the brand's identity in memory and timelessness.</p>
                  <ServiceCTAButton href="/pricing" text="EXPLORE PRICING →" />
                </ServiceCard>

                <ServiceCard title="Menu Design London" delay={0.1}>
                  <p>Inviting, easy-to-read menus for restaurants, cafés, and bars that improve the overall experience for the guest.</p>
                  <ServiceCTAButton href="/pricing" text="EXPLORE PRICING →" />
                </ServiceCard>

                <ServiceCard title="Social Media Post Design" delay={0.2}>
                  <p>Stunning design brochures, banners, and other highly engaging visuals for Instagram, Facebook, LinkedIn, etc.</p>
                  <ServiceCTAButton href="/pricing" text="EXPLORE PRICING →" />
                </ServiceCard>

                <ServiceCard title="Flyer & Brochure Design" delay={0.3}>
                  <p>Flyers and brochures that are creative and informative for marketing, events, or product launches.</p>
                  <ServiceCTAButton href="/pricing" text="EXPLORE PRICING →" />
                </ServiceCard>

                <ServiceCard title="Banner Design" delay={0.4}>
                  <p>We design captivating web banners, event banners, and display ads that grab people's attention and get them to respond.</p>
                  <ServiceCTAButton href="/pricing" text="EXPLORE PRICING →" />
                </ServiceCard>

                <ServiceCard title="Poster Design" delay={0.5}>
                  <p>These are posters vivid for an extravagant event, for advertisement events, and announcements.</p>
                  <ServiceCTAButton href="/pricing" text="EXPLORE PRICING →" />
                </ServiceCard>

                <ServiceCard title="Packaging Design" delay={0.6}>
                  <p>Innovative and attractive packaging solutions that enhance product visibility on shelves.</p>
                  <ServiceCTAButton href="/pricing" text="EXPLORE PRICING →" />
                </ServiceCard>

                <ServiceCard title="Visiting Card (Business Card) Design" delay={0.7}>
                  <p>Stylish and professional, our business cards are meant to impress, guaranteed.</p>
                  <ServiceCTAButton href="/pricing" text="EXPLORE PRICING →" />
                </ServiceCard>

                <ServiceCard title="PPT (Presentation) Design" delay={0.8}>
                  <p>Design effective PowerPoint presentations that emphasize and get your message across in meetings, pitches, and seminars.</p>
                  <ServiceCTAButton href="/pricing" text="EXPLORE PRICING →" />
                </ServiceCard>
              </ServiceGrid>
            </ServiceSection>

            <ServiceSection title="Final Thoughts">
              <p>Apart from the regular graphic design, our UI/UX designers will treat your digital platforms to look brilliant while ensuring easy and enjoyable interaction. Every small detail is very important, and we build interfaces that are easy to understand and navigate, and keep your users hooked and pleased.</p>
              <p>At We Do Effects, a wide array of skills is incorporated into creativity and innovation, thereby making sure that any work taken up is under high levels of expertise. We believe that great design should not only be good to look at, but should also go all out for your brand: provocatively inspiring action, fostering growth, and creating loyalty.</p>
              <p className="font-bold text-foreground">Let us help you create designs that leave a lasting impression — whether it's for your business cards, website, advertisements, packaging, or social media.</p>
            </ServiceSection>

          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
