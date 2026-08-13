import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ServiceHero } from '@/components/services/ServiceHero';
import { ServiceSection, ServiceBulletList, ServiceCard, ServiceGrid, ServiceCTAButton } from '@/components/services/ServiceContent';

export const metadata = {
  title: 'SEO - We Do Effects',
  description: 'Smart and Strategic SEO expertise that goes beyond mere clicks.',
};

export default function SEOPage() {
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col bg-background">
        <ServiceHero 
          title="SEO" 
          imageSrc="/assets/about/service-seo.jpg" 
        />

        <section className="py-16 md:py-24">
          <div className="max-w-[900px] mx-auto px-6">
            
            <ServiceSection title="Getting Amid Top in Smart and Strategic SEO">
              <p>
                With the world granted digital-first, sitting on the Google first page is considered a favorable act for a business to thrive. If your potential customers don't find you online, they find your competitor. This is where Search Engine Optimization (SEO) comes in.
              </p>
              <p>
                At We Do Effects UK, we focus in creating <strong>SEO expertise London</strong> that go beyond mere clicks, that enable genuine and measurable transformations for your business.
              </p>
            </ServiceSection>

            <ServiceSection title="What is SEO?">
              <p>
                Search Engine Optimization (SEO) is preparing your own webpage and the online presence thereof to reach a higher rank in the search engine results page (SERP). It constitutes of technical improvements, targeting keywords, creating content of high-quality, or backlinking, working concurrently towards putting the site forward when the audience is either searching for the product or for the client services by himself.
              </p>
              <p>
                Think of SEO as an investment for your online visibility in the long run. It is not just knowing that one is there at all-they must have found the right people at the right time.
              </p>
            </ServiceSection>

            <ServiceSection title="Why Does SEO Matter?">
              <p className="mb-6">Search engines are the first stop for a lot of consumers looking for information, recommendations, or solutions. Here's why investing in SEO must be crucial:</p>
              <ServiceBulletList items={[
                { title: 'Visibility', text: 'The highest-ranking sites get most of the clicks; SEO ensures your business is at the limelight at the right moment.' },
                { title: 'Organic Traffic', text: 'SEO brings in highly relevant traffic already interested in what you have to offer without paying for clicks.' },
                { title: 'Trust and Credibility', text: 'A high search engine ranking leads to building confidence and authority of the business in its industry.' },
                { title: 'Better User Experience', text: 'SEO entails the optimization of website structure, speed, and content, so the site itself becomes easy to use and pleasant to navigate.' },
                { title: 'Sustainable Growth', text: 'With paid ads, everything will stop once you finish paying for it, but with SEO, you can engender enough momentum that keeps drawing traffic and leads over time.' },
              ]} />
            </ServiceSection>

            <ServiceSection title="SEO Approach We Use">
              <p>At WDE, we avoid cookie-cutter <strong>SEO service provider London</strong>. Each business is different, so is every campaign that we create. Here's how we do it:</p>
              
              <ServiceGrid>
                <ServiceCard title="Website Audit & Analysis" delay={0}>
                  <p>Prior to optimization, we dive deep into your current digital presence. We audit your technical site performance, structure of content, backlink profile, keyword rankings, and competitors. This helps us see exactly what works and what doesn't and where the biggest opportunities lie.</p>
                </ServiceCard>

                <ServiceCard title="Keyword Research & Strategy" delay={0.1}>
                  <p>The high-impact keywords your audience is searching for are not always the highest-volume search terms but intent-driven phrases leading to conversions. Based upon these, our team prepares a customized strategy focused on target keywords using on-page optimization, content, and technical improvements.</p>
                </ServiceCard>

                <ServiceCard title="On-Page Optimization" delay={0.2}>
                  <p>We fine-tune everything on your site, from improving meta tags and headings to reworking your content, and even increasing the speed of your pages. Every page is prepared to be easily crawled by search engines — but even easier for humans to navigate.</p>
                </ServiceCard>

                <ServiceCard title="High-Quality Content Creation" delay={0.3}>
                  <p>SEO and content go hand in hand. Our content team produces relevant and engaging blog posts, landing pages, and website copy full of keywords that rank and resonate with your audience. Quality content builds trust and not only improve rankings but motivate their audience to take action.</p>
                </ServiceCard>

                <ServiceCard title="Link Building & Off-Page SEO" delay={0.4}>
                  <p>Search engines consider a backlink as a vote of authority. We help build a strong backlink profile using white hat and ethical methods, including guest posts, local citations, directory submissions, and partnerships, in order to increase your domain authority and visibility.</p>
                </ServiceCard>

                <ServiceCard title="Local SEO" delay={0.5}>
                  <p>If your company is targeting particular regions, our local SEO packs make sure that you are represented in local search results as well as Google Maps. To dominate your region, we will optimize your Google Business Profile, set up local citations, and work for geo-targeted keywords.</p>
                </ServiceCard>
                
                <ServiceCard title="Reporting & Performance Tracking" delay={0.6}>
                  <p>Transparency is of utmost importance. We provide reports on a regular basis, which display rankings, traffic, conversions, and the performance of campaigns. This data can then be used to monitor the activities and re-engineer strategies for further enhancements.</p>
                </ServiceCard>
              </ServiceGrid>
            </ServiceSection>

            <ServiceSection title="The reason to choose We Do Effects UK">
              <p>We are not your usual SEO agency. We Do Effects UK strives to be your digital growth partner — truly invested in the success of your brand. Our team keeps up with algorithm updates, industry trends, and tools to keep your site ahead of the curve.</p>
              <p>We bring together data with creativity and strategy, to give you SEO solutions that are measurable, meaningful, and results-oriented. We cater to local businesses and businesses with national aspirations alike, crafting SEO campaigns that establish your online presence and fast-track your business goals.</p>
            </ServiceSection>

            <ServiceSection title="Ready to Rank Higher?">
              <p>Don't get lost in the noise. With a strategic SEO plan tailored to your business, you can attract the right audience, increase brand visibility, and drive consistent organic traffic.</p>
              <p className="font-bold text-foreground">Partner with We Do Effects UK and let's climb the search rankings — together.</p>
              <ServiceCTAButton href="/pricing" text="VIEW PRICING →" />
            </ServiceSection>

          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
