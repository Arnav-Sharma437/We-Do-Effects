import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ServiceHero } from '@/components/services/ServiceHero';
import { ServiceSection, ServiceBulletList, ServiceCard, ServiceGrid, ServiceCTAButton } from '@/components/services/ServiceContent';

export const metadata = {
  title: 'Website Design - We Do Effects',
  description: 'We Build Websites that Impress, Convert, and Inspire',
};

export default function WebsiteDesignPage() {
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col bg-background">
        <ServiceHero 
          title="Website Design" 
          imageSrc="/assets/about/service-seo.jpg" // Placeholder for banner
        />

        <section className="py-16 md:py-24">
          <div className="max-w-[900px] mx-auto px-6">
            
            <ServiceSection title="We Build Websites that Impress, Convert, and Inspire">
              <p>
                Your website is more than just a web address; it's a brand face; it's an online presence, and more times than not, it's also the first impression a customer has of your business. With users having a matter of seconds to decide if they wish to stay or leave, all that matters is design.
              </p>
              <p>
                At We Do Effects UK, we build websites that not just look good but perform well. We design sites with intention, to click, convert, and take the brand a little higher on the web, whether from ground zero or re-hashing the existing one.
              </p>
            </ServiceSection>

            <ServiceSection title="Why Should One Care About Website Design?">
              <p className="mb-6">
                Your first impression is nearly everything - especially in an online world. If you have an obsolete site, it loads slow, and lags in navigation, users will bounce up till extinction of a few good opportunities. Here is why you need a professional website design at any cost:
              </p>
              <ServiceBulletList items={[
                { title: 'User Experience', text: 'It is important to note that it\'s not just to make beautiful applications. The applications are there to guide visitors through the content so unobtrusively and gently that they will find what they\'re looking for and do something.' },
                { title: 'Mobile Responsiveness', text: 'With over half of web traffic coming from mobile devices, responsive design guarantees that your site will look flawless on every screen—from desktops to tablets to phones.' },
                { title: 'Search Engine Optimisation', text: 'Having a well-structured website will also help your SEO. It will ease the crawling of your web page by Google and help your site get better ranking.' },
                { title: 'Buildup brand credibility', text: 'Your website acts as an extension of your professionalism. Clean, modern, and well-designed websites do help in the establishment of trust and confidence in your brand.' },
                { title: 'Conversion Focus', text: 'Every click counts. Strategic design transforms visitors into customers, with strong calls-to-action (CTAs), lead forms, and a lay-out with excellent usability.' },
              ]} />
              <p className="mt-6 font-bold text-foreground">Your website should always be architected to work for your business.</p>
            </ServiceSection>

            <ServiceSection title="Our Web Design Services">
              <p>At We Do Effects UK, web design for us is a mix of creativity, functionality, and strategy. We provide:</p>
              
              <ServiceGrid>
                <ServiceCard title="Custom Website Design" delay={0}>
                  <p>No template-based, no shortcuts. We custom-design websites that match your brand identity and business goals and user needs. Every design element, from layout to colours and typography to imagery, is chosen to create the smoothest user experience possible.</p>
                  <ServiceCTAButton href="/pricing" text="EXPLORE PRICING →" />
                </ServiceCard>

                <ServiceCard title="Responsive Design" delay={0.1}>
                  <p>We ensure that your website looks great and performs well on all devices and screen sizes. Regardless of whether your users are browsing from their laptop, tablet, or mobile device, they get a seamless experience that holds their engagement.</p>
                  <ServiceCTAButton href="/pricing" text="EXPLORE PRICING →" />
                </ServiceCard>

                <ServiceCard title="UI/UX Design" delay={0.2}>
                  <p>User Interface and User Experience Design constitute the heart of all that we make. We chart user journeys, break navigation, and stitch intuitive pathways that direct visitors towards valuable actions—say: booking a service, submitting a form, or making a purchase.</p>
                  <ServiceCTAButton href="/pricing" text="EXPLORE PRICING →" />
                </ServiceCard>

                <ServiceCard title="E-Commerce Sites" delay={0.3}>
                  <p>Selling online? We design e-commerce sites that are beautiful, secure, and conversion-oriented. Be it Shopify, WooCommerce, or a fully custom solution, we design online stores that convert traffic into transactions.</p>
                  <ServiceCTAButton href="/pricing" text="EXPLORE PRICING →" />
                </ServiceCard>

                <ServiceCard title="Landing Pages & Microsites" delay={0.4}>
                  <p>Do you need a high-conversion landing page for a campaign or a stand-alone microsite? We design focused, goal-oriented pages that do exactly what they're supposed to do—right for product launches, promotions, or targeted lead generation.</p>
                  <ServiceCTAButton href="/pricing" text="EXPLORE PRICING →" />
                </ServiceCard>

                <ServiceCard title="Website Redesign" delay={0.5}>
                  <p>If your site is outdated, underperforming, or simply doesn't exist anymore as a brand, we help get you an alternative. Our redesign initiatives work toward giving the new look an updated feel from usability to performance.</p>
                  <ServiceCTAButton href="/pricing" text="EXPLORE PRICING →" />
                </ServiceCard>
                
                <ServiceCard title="CMS Integration" delay={0.6}>
                  <p>We build sites on WordPress, Webflow, or custom CMS solutions—user-friendly sites where you can easily manage and update content even if you're technically illiterate.</p>
                </ServiceCard>
              </ServiceGrid>
            </ServiceSection>

            <ServiceSection title="Our Design Process">
              <p className="mb-4">Collaboration is a recipe for creativity, and here's how we go about realizing your aspiration:</p>
              <ServiceBulletList items={[
                { title: 'Discovery', text: 'We get to know your business, audience, goals, and competitors.' },
                { title: 'Planning', text: 'We set the structure of the site, content strategy, and features.' },
                { title: 'Design', text: 'Our designers come up with awesome wireframes and mockups that fit your brand.' },
                { title: 'Development', text: 'We develop and fine-tune the site with the latest technologies.' },
                { title: 'Testing & Launch', text: 'We test on multiple browsers and devices and launch with full support.' },
              ]} />
              <p className="mt-6 font-bold text-foreground">Every project is directed by transparency, timelines, and your feedback — from the initial sketch to the pixel-perfect final.</p>
            </ServiceSection>

            <ServiceSection title="Why Choose We Do Effects UK?">
              <p>It is more than just designing and creating a website — we design digital experiences. We have a team of passionate designers, developers, and strategists excited to create sites that impress and also produce results.</p>
              <p>We combine design thinking with business strategy to make sure your website becomes a powerful marketing platform that attracts, engages, and converts.</p>
              <p>Be it a startup, SME, or an evolving brand, we design website solutions for you that fit your needs directly and grow with your business.</p>
            </ServiceSection>

            <ServiceSection title="Let Us Build Your Online Presence">
              <p>Outside your brand, your website is your most valuable online property. Make it count.</p>
              <p className="font-bold text-foreground">Partner with We Do Effects UK to create a beautiful website that functions well and works for the worthy cause of your online brand.</p>
              <ServiceCTAButton href="/pricing" text="GET A QUOTE →" />
            </ServiceSection>

          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
