import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ServiceHero } from '@/components/services/ServiceHero';
import { ServiceSection, ServiceBulletList, ServiceCard, ServiceGrid, ServiceCTAButton } from '@/components/services/ServiceContent';
import Image from 'next/image';

export const metadata = {
  title: 'Video Marketing - We Do Effects',
  description: 'Video marketing strategies and visual storytelling to engage audiences.',
};

export default function VideoMarketingPage() {
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col bg-background">
        <ServiceHero 
          title="Video Marketing" 
          imageSrc="/assets/about/service-video.jpg" // Placeholder for banner
        />

        <section className="py-16 md:py-24">
          <div className="max-w-[900px] mx-auto px-6">
            
            <ServiceSection title="Video Marketing: What Exactly Is It?">
              <p>
                Simply put, video marketing is strategic use of the videos to promote, market, and build your brand, products, and services. This is not merely about shooting a video — it is about telling engaging stories with which your target audience identifies and connects emotionally, thus building credibility and spurring them into action. Be it enhancing brand visibility, customer engagement, or conversion, video marketing stands as your most potent visual communication medium.
              </p>
              <p>
                Attention-wise, videos always come first, especially in a digital market filled with short attention spans and an overflow of content. From 15-second spots to TV commercials, the video takes the client's message and turns it into something even more easily remembered, building a great rapport for the brand itself.
              </p>
            </ServiceSection>

            <ServiceSection title="Why is Video Marketing Important for Your Business?">
              <ServiceBulletList items={[
                { title: 'Increase Engagement', text: 'People retain 95% of the message if they watch it on video, versus a mere 10% when reading the same message in print. Videos get shared, liked, and commented on, greatly amplifying your social networking presence.' },
                { title: 'Convert More Visitors into Customers', text: 'Landing pages with video can increase conversions by up to 80%. Be it a TV advertisement or a social media campaign, a good video manages to convert views into sales.' },
                { title: 'Boosted SEO Ranking', text: 'Google is 53 times more likely to rank 1st a website with video content. Provided that you use the right video, it will complement your SEO greatly and increase visitors\' stay on your site.' },
                { title: 'Increase Brand Recall', text: 'This is your time to show your personality and what you can do with your product, leaving a strong imprint on the minds of the viewers. If executed perfectly, videos make those emotional correlates with the viewers that text alone cannot.' },
                { title: 'Higher ROI', text: 'According to Wyzowl\'s Video Marketing Survey, 89% of marketers say video gives them a good return on investment. The impact of your video rests really on the value and creativity of the video content itself and how it affects the viewers standing in terms of their awareness towards your brand.' },
              ]} />
            </ServiceSection>

            <ServiceSection title="Types Of Video Marketing We Provide">
              <p>The firm We Do Effects UK does not only make videos, we create visual stories that stir the soul. See the major video marketing categories for which we possess expertise:</p>
              
              <ServiceGrid>
                <ServiceCard title="TV Advertising" delay={0}>
                  <p>Disseminate your marketing message far and wide with impactful commercials that put your brand as first in public perception. We provide cinematic TV commercials that stand apart and yield results-in full honesty-from conceptualizing to final editing.</p>
                  <ul className="list-disc list-outside ml-4 mt-4 space-y-2 text-foreground/80">
                    <li>Scriptwriting, casting, and full production</li>
                    <li>Integration in Ad campaigns</li>
                    <li>Delivery of application-ready formats for broadcast and streaming</li>
                  </ul>
                  <ServiceCTAButton href="/pricing" text="VIEW PRICING →" />
                </ServiceCard>

                <ServiceCard title="Music Videos" delay={0.1}>
                  <p>Be it independent artists or record labels; we translate your music into a stunning visual experience. Our creative team collaborates with you to develop video expressions for your sound that are very emotional, beautiful, and easy to share.</p>
                  <ul className="list-disc list-outside ml-4 mt-4 space-y-2 text-foreground/80">
                    <li>Creative direction and storyboarding</li>
                    <li>On-location or studio shoots</li>
                    <li>Full postproduction and editing</li>
                  </ul>
                  <ServiceCTAButton href="/pricing" text="VIEW PRICING →" />
                </ServiceCard>

                <ServiceCard title="Social Media Videos" delay={0.2}>
                  <p>When you want to keep attention, the first 3 seconds count. We whip up a platform-specific wide range of videos for Instagram, TikTok, YouTube, Facebook, and beyond. Short but very effective, these videos work wonders for promos, reels, stories, and ads.</p>
                  <ul className="list-disc list-outside ml-4 mt-4 space-y-2 text-foreground/80">
                    <li>Vertical and square formats for mobile</li>
                    <li>Includes motion graphics and captioning</li>
                    <li>Trend-informed and brand-approved</li>
                  </ul>
                  <p className="mt-4 font-bold text-foreground">Social media videos from us help your brand go viral, sell products, or share a story.</p>
                  <ServiceCTAButton href="/pricing" text="VIEW PRICING →" />
                </ServiceCard>

                <ServiceCard title="Final Thoughts: Let Your Brand Be Seen and Heard" delay={0.3}>
                  <p>Video production has become indispensable in the present-day marketing vista patronizing the visual breathe. It is the time wherein with much competition for attention, only brands that invest in the right high-quality video content that touches people in an emotionally relevant manner will be able to stand apart.</p>
                  <p>At We Do Effects UK, creativity and technology, backed up by strategy, combine to create strong video content. Our videos are meant to engage, inspire, and convert, whatever platform or purpose they are intended for.</p>
                  <p>Do you want to make your brand unforgettable? We say "Go ahead!" and help put that vision into a working form.</p>
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
