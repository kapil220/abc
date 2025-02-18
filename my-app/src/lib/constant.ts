
// Types for services data
export interface Service {
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  fullContent: {
    introduction: string;
    understanding: string;
    services: {
      title: string;
      items: string[];
    };
    process: {
      title: string;
      steps: { step: number; description: string }[];
    };
    conclusion: string;
  };
  benefits: string[];
  targetAudience: string;
  imageUrl: string;
  gallery?: string[];
}

// Services data array
export const services: Service[] = [
  {
    name: "Social Media Management",
    slug: "socialmediamanagement",
    shortDescription: "Strategic social media growth and engagement.",
    description: "Comprehensive social media management services, including content planning, posting, audience engagement, and analytics tracking to boost online presence and brand loyalty.",
    fullContent: {
      introduction: "At The Ink Pot Group, we specialize in Social Media Management, a strategic approach to enhancing your brand's presence across various social platforms. Our goal is to foster meaningful engagement, build a loyal community, and drive measurable growth for your business.",
      understanding: "Social Media Management involves the comprehensive process of creating, scheduling, analyzing, and engaging with content posted on social media platforms. It's more than just posting updates; it's about crafting a cohesive strategy that aligns with your brand's voice and objectives, ensuring consistent and authentic communication with your audience.",
      services: {
        title: "Our Comprehensive Services",
        items: [
          "Platform Optimization: We ensure your profiles on platforms such as Facebook, Instagram, Twitter, LinkedIn, and others are fully optimized. This includes updating profile information, aligning visuals with your brand identity, and implementing best practices to enhance visibility.",
          "Content Creation and Scheduling: Our team develops engaging and relevant content tailored to your audience's interests. We maintain a content calendar to schedule posts at optimal times, ensuring a consistent and timely presence that resonates with your followers.",
          "Community Engagement: Building a loyal community requires active interaction. We monitor comments and messages, respond promptly, and foster discussions to create a vibrant and engaged audience.",
          "Performance Analytics: Utilizing advanced analytics tools, we track key metrics to assess the effectiveness of our strategies. This data-driven approach allows us to refine our tactics, ensuring continuous improvement and alignment with your business goals."
        ]
      },
      process: {
        title: "Our Collaborative Process",
        steps: [
          { step: 1, description: "Discovery Session: We begin by understanding your brand's voice, goals, and target audience. This foundational step ensures our strategies are tailored to your unique needs." },
          { step: 2, description: "Strategic Planning: Based on our insights, we craft a customized social media plan that outlines content themes, posting schedules, and engagement tactics aligned with your objectives." },
          { step: 3, description: "Content Development and Scheduling: Our creative team produces high-quality content, including graphics, videos, and copywriting. We then schedule these posts to ensure optimal reach and engagement." },
          { step: 4, description: "Active Community Management: We monitor your social media channels to engage with your audience, address inquiries, and manage feedback, fostering a positive brand image." },
          { step: 5, description: "Performance Review and Reporting: Regular reports provide insights into key performance indicators such as reach, engagement, and conversion rates. We use this data to make informed adjustments, enhancing the effectiveness of your social media presence." }
        ]
      },
      conclusion: "Partner with The Ink Pot Group to elevate your brand's social media impact. Our expertise and personalized approach ensure your brand not only reaches but resonates with your target audience, driving sustained growth and success."
    },
    benefits: [
      "Increased brand awareness",
      "Higher engagement rates",
      "Consistent content strategy",
      "Optimized social media presence"
    ],
    targetAudience: "Businesses, influencers, and brands looking to grow their social media presence.",
    imageUrl: "/images/service1.webp"
  },
  {
    name: "Digital Strategy",
    slug: "digitalstrategy",
    shortDescription: "Data-driven strategies for online success.",
    description: "Expertly crafted digital strategies that drive traffic, enhance brand positioning, and improve conversions through SEO, social media, and online campaigns.",
    fullContent: {
      introduction: "At The Ink Pot Group, we specialize in Digital Strategy, a comprehensive approach designed to align your business objectives with the ever-evolving digital landscape. Our mission is to craft tailored strategies that enhance your online presence, engage your target audience, and drive sustainable growth.",
      understanding: "Digital Strategy involves the meticulous planning and execution of online initiatives to achieve specific business goals. It encompasses the integration of various digital channels and technologies, ensuring a cohesive and effective online presence that resonates with your audience and stands out in the competitive market.",
      services: {
        title: "Our Comprehensive Services",
        items: [
          "Market Research and Analysis: We delve deep into industry trends, competitor activities, and consumer behaviors to identify opportunities and challenges specific to your business.",
          "Audience Profiling: By defining and understanding your target demographics, we tailor strategies that effectively reach and engage the right audience.",
          "Channel Selection and Integration: We determine the most impactful digital platforms—such as SEO, social media, email marketing, and paid advertising—and integrate them to work harmoniously towards your objectives.",
          "Campaign Planning and Execution: Our team designs cohesive campaigns that align with your brand's voice and goals, ensuring consistent messaging and optimal reach across all chosen channels."
        ]
      },
      process: {
        title: "Our Collaborative Process",
        steps: [
          { step: 1, description: "Initial Consultation: We begin by engaging in a thorough discussion to understand your business goals, current digital footprint, and specific challenges." },
          { step: 2, description: "Research and Insights: Utilizing advanced tools and methodologies, we conduct comprehensive market and audience research to gather actionable insights." },
          { step: 3, description: "Strategic Roadmap Development: Based on our findings, we craft a detailed digital strategy roadmap outlining recommended actions, timelines, and key performance indicators (KPIs)." },
          { step: 4, description: "Implementation Support: Our team assists in executing the strategy, coordinating with your internal teams or managing the process entirely to ensure seamless integration and execution." },
          { step: 5, description: "Monitoring and Optimization: We continuously monitor performance metrics, providing regular reports and making data-driven adjustments to optimize the strategy for maximum effectiveness." }
        ]
      },
      conclusion: "Partner with The Ink Pot Group to navigate the complexities of the digital world. Our expertise and personalized approach ensure that your brand not only adapts to the digital age but thrives, achieving measurable success and a competitive edge in your industry."
    },
    benefits: [
      "Optimized online presence",
      "Increased customer engagement",
      "Data-backed marketing decisions",
      "Higher ROI on digital efforts"
    ],
    targetAudience: "Businesses seeking a strong and effective online presence.",
    imageUrl: "/images/service2.webp"
  },
  {
    name: "Content Creation",
    slug: "contentcreation",
    shortDescription: "Compelling content that captivates audiences.",
    description: "High-quality written, visual, and video content tailored to your brand's voice and objectives to engage and inspire your audience.",
    fullContent: {
      introduction: "At The Ink Pot Group, we excel in Content Creation, a vital service designed to produce engaging and valuable media that captivates your target audience and reinforces your brand's presence. Our mission is to craft content that not only informs but also inspires and drives meaningful interactions.",
      understanding: "Content Creation involves the development of various forms of media—including written, visual, and interactive elements—that align with your brand's voice and resonate with your audience. It's a strategic process aimed at delivering relevant information and fostering engagement across multiple platforms.",
      services: {
        title: "Our Comprehensive Services",
        items: [
          "Copywriting: Crafting compelling and informative written content for blogs, articles, website copy, and social media posts that reflect your brand's tone and message.",
          "Graphic Design: Designing visually appealing graphics, infographics, and illustrations that enhance your brand's visual identity and effectively communicate complex information.",
          "Video Production: Producing high-quality videos, from concept development to final editing, including promotional videos, tutorials, and storytelling pieces that engage and inform your audience.",
          "Social Media Content: Creating platform-specific content that encourages interaction and builds community across channels like Facebook, Instagram, Twitter, and LinkedIn."
        ]
      },
      process: {
        title: "Our Collaborative Process",
        steps: [
          { step: 1, description: "Content Planning: We begin by identifying key topics and formats that align with your brand's objectives and appeal to your target audience." },
          { step: 2, description: "Creation and Design: Our team develops original content, ensuring it embodies your brand's voice and meets high-quality standards." },
          { step: 3, description: "Review and Approval: We collaborate closely with you to refine the content, incorporating feedback to ensure it aligns with your vision and goals." },
          { step: 4, description: "Publishing: Once approved, we distribute the content across chosen platforms, optimizing for each channel to maximize reach and engagement." },
          { step: 5, description: "Performance Analysis: We monitor the content's performance using analytics tools, providing insights and recommendations to inform future content strategies." }
        ]
      },
      conclusion: "Partner with The Ink Pot Group to elevate your brand through strategic content creation. Our expertise ensures that your message resonates, engages, and drives action among your audience."
    },
    benefits: [
      "Enhanced brand storytelling",
      "Higher audience engagement",
      "SEO-friendly content",
      "Consistent brand voice"
    ],
    targetAudience: "Brands and businesses looking for impactful content to connect with their audience.",
    imageUrl: "/images/service3.webp"
  },
  {
    name: "Photography & Videography",
    slug: "photography-videography",
    shortDescription: "Professional visuals for brand storytelling.",
    description: "High-quality photography and videography services to create visually compelling content that enhances brand identity and marketing campaigns.",
    fullContent: {
      introduction: "At The Ink Pot Group, we specialize in Photography and Videography, offering professional visual content that captures the essence of your brand and engages your audience. Our mission is to create stunning visuals that tell your story authentically and compellingly.",
      understanding: "In today's digital landscape, high-quality visuals are paramount. Professional photography and videography not only enhance your brand's image but also build trust and credibility with your audience. They serve as powerful tools to showcase your products, services, and company culture, making a lasting impression.",
      services: {
        title: "Our Comprehensive Services",
        items: [
          "Product Photography: Showcasing your products with high-quality images that highlight their features and appeal.",
          "Corporate Portraits: Capturing professional images of your team to humanize your brand and foster connection.",
          "Event Coverage: Documenting significant events and milestones with a keen eye for detail and storytelling.",
          "Promotional Videos: Creating engaging videos that highlight your services or products, designed to captivate and convert your audience.",
          "Aerial/Drone Photography: Providing unique aerial perspectives to add a dynamic dimension to your visual content."
        ]
      },
      process: {
        title: "Our Collaborative Process",
        steps: [
          { step: 1, description: "Consultation: We begin by discussing your visual content needs and objectives, ensuring we understand your brand and goals." },
          { step: 2, description: "Pre-Production Planning: Organizing shoot logistics, including location scouting, storyboard development, and scheduling to ensure a seamless experience." },
          { step: 3, description: "Production: Capturing high-quality visuals using state-of-the-art equipment and techniques, with a focus on bringing your vision to life." },
          { step: 4, description: "Post-Production: Editing and enhancing visuals to align with your brand aesthetics, ensuring the final product is polished and professional." },
          { step: 5, description: "Delivery: Providing the final media in formats optimized for your platforms, ready to elevate your marketing efforts." }
        ]
      },
      conclusion: "Partner with The Ink Pot Group to enrich your brand's narrative through exceptional photography and videography. Our expertise ensures that your visual content not only stands out but also resonates deeply with your audience, driving engagement and success."
    },
    benefits: [
      "Stronger visual branding",
      "Higher engagement and shares",
      "Professional-grade media content",
      "Tailored creative direction"
    ],
    targetAudience: "Businesses, influencers, and brands in need of professional visual content.",
    imageUrl: "/images/service4.webp"
  },
  {
    name: "Branding & Logo Design",
    slug: "brandinglogodesign",
    shortDescription: "Crafting unique brand identities.",
    description: "Strategic branding solutions, including logo design, color schemes, typography, and brand guidelines to establish a strong and memorable identity.",
    fullContent: {
      introduction: "At The Ink Pot Group, we specialize in Branding and Logo Design, crafting unique visual identities that encapsulate your brand's essence and resonate with your target audience. Our mission is to develop cohesive and memorable brand elements that distinguish your business in a competitive marketplace.",
      understanding: "Branding is the strategic process of defining and shaping your company's identity, values, and voice to create a consistent and impactful presence across all platforms. Logo design, a critical component of branding, involves creating a distinctive symbol or mark that embodies your brand's character and facilitates instant recognition.",
      services: {
        title: "Our Comprehensive Services",
        items: [
          "Brand Identity Development: Collaborating with you to define your brand's mission, vision, values, and unique selling propositions, ensuring a strong foundation for all branding efforts.",
          "Logo Design: Creating versatile and scalable logos that effectively communicate your brand's personality and appeal to your target market.",
          "Brand Guidelines: Developing comprehensive guidelines that outline the proper usage of your brand elements, including color palettes, typography, imagery, and tone of voice, to maintain consistency across all communications.",
          "Collateral Design: Designing cohesive marketing materials such as business cards, letterheads, brochures, and digital assets that reflect your brand identity and reinforce your market presence."
        ]
      },
      process: {
        title: "Our Collaborative Process",
        steps: [
          { step: 1, description: "Discovery Session: Engaging in in-depth discussions to understand your business goals, target audience, and brand aspirations." },
          { step: 2, description: "Research and Analysis: Conducting thorough market research to identify industry trends, competitor positioning, and audience preferences, informing a strategic approach to your brand development." },
          { step: 3, description: "Concept Development: Brainstorming and sketching multiple logo concepts and brand elements, exploring various design directions that align with your brand's identity." },
          { step: 4, description: "Design and Refinement: Digitally rendering selected concepts using professional design software, refining them based on your feedback to achieve the perfect representation of your brand." },
          { step: 5, description: "Finalization and Delivery: Providing the finalized logo and brand assets in various formats suitable for print and digital use, along with comprehensive brand guidelines to ensure consistent application." }
        ]
      },
      conclusion: "Partner with The Ink Pot Group to establish a compelling brand identity that not only reflects your business's core values but also captivates and engages your audience, setting the stage for lasting success."
    },
    benefits: [
      "Stronger brand recognition",
      "Consistent brand identity",
      "Professional and modern aesthetics",
      "Tailored branding strategy"
    ],
    targetAudience: "Startups, businesses, and individuals looking to establish or refresh their brand identity.",
    imageUrl: "/images/service5.webp"
  }
];

/**
 * Get a service by its slug
 * @param slug The service slug to find
 * @returns The matching service or undefined if not found
 */
export function getServiceBySlug(slug: string): Service | undefined {
  return services.find(service => service.slug === slug);
}


  
export const socialMediaWork = [
  {
    title: "Instagram Growth Campaign",
    description: "Boosted engagement for a fashion brand.",
    image: "/images/work1.jpeg",
    slug: "instagram-growth-campaign"
  },
  {
    title: "Facebook Ads Management",
    description: "Optimized ad spend for an e-commerce store.",
    image: "/images/work2.webp",
    slug: "facebook-ads-management"
  },
  {
    title: "LinkedIn B2B Strategy",
    description: "Generated leads through professional networking.",
    image: "/images/work3.avif",
    slug: "linkedin-b2b-strategy"
  },
  {
    title: "TikTok Viral Challenge",
    description: "Created a trend with influencer collaborations.",
    image: "/images/work4.jpg",
    slug: "tiktok-viral-challenge"
  }
];

export const digitalStrategyWork = [
  {
    title: "SEO Optimization",
    description: "Improved search ranking for a startup.",
    image: "/images/work5.jpg",
    slug: "seo-optimization"
  },
  {
    title: "Email Marketing Automation",
    description: "Enhanced customer retention for an SaaS business.",
    image: "/images/work6.jpg",
    slug: "email-marketing-automation"
  },
  {
    title: "Market Research & Analytics",
    description: "Data-driven decisions for a fintech company.",
    image: "/images/yoga2.jpg",
    slug: "market-research-analytics"
  },
  {
    title: "Conversion Rate Optimization",
    description: "A/B testing to increase sales.",
    image: "/images/yoga3.jpg",
    slug: "conversion-rate-optimization"
  }
];

export const contentCreationWork = [
  {
    title: "Blog & Article Writing",
    description: "High-quality content for thought leadership.",
    image: "/images/yoga3.webp",
    slug: "blog-article-writing"
  },
  {
    title: "Video Script Development",
    description: "Engaging scripts for YouTube & TikTok.",
    image: "/images/yoga5.jpg",
    slug: "video-script-development"
  },
  {
    title: "Infographics & Visual Content",
    description: "Eye-catching designs for marketing.",
    image: "/images/work3.avif",
    slug: "infographics-visual-content"
  },
  {
    title: "Podcast Production",
    description: "Branded audio content for storytelling.",
    image: "/images/test.jpg",
    slug: "podcast-production"
  }
];

export const photographyWork = [
  {
    title: "Product Photography",
    description: "Professional images for e-commerce stores.",
    image: "/images/test.jpg",
    slug: "product-photography"
  },
  {
    title: "Event Coverage",
    description: "Captured live moments with high-quality shots.",
    image: "/images/test.jpg",
    slug: "event-coverage"
  },
  {
    title: "Drone Videography",
    description: "Aerial shots for real estate & tourism.",
    image: "/images/test.jpg",
    slug: "drone-videography"
  },
  {
    title: "Brand Lifestyle Shoot",
    description: "Created authentic brand imagery.",
    image: "/images/test.jpg",
    slug: "brand-lifestyle-shoot"
  }
];

export const brandingWork = [
  {
    title: "Logo Design",
    description: "Created unique brand identities.",
    image: "/images/digital.jpg",
    slug: "logo-design"
  },
  {
    title: "Brand Guidelines Development",
    description: "Established cohesive brand elements.",
    image: "/images/digital.jpg",
    slug: "brand-guidelines-development"
  },
  {
    title: "Packaging Design",
    description: "Designed standout product packaging.",
    image: "/images/digital.jpg",
    slug: "packaging-design"
  },
  {
    title: "Rebranding Strategy",
    description: "Revamped outdated brand visuals.",
    image: "/images/digital.jpg",
    slug: "rebranding-strategy"
  }
];


  