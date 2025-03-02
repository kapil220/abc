
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
      items: { title: string; description: string }[]
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
    shortDescription: "Strategic social media growth and engagement for your socials.",
    description: "Comprehensive social media management services, including content planning, posting, audience engagement, and analytics tracking to boost online presence and brand loyalty.",
    fullContent: {
      introduction: "At The Ink Pot Group, we specialize in Social Media Management, a strategic approach to enhancing your brand's presence across various social platforms. Our goal is to foster meaningful engagement, build a loyal community, and drive measurable growth for your business.",
      understanding: "Social Media Management involves the comprehensive process of creating, scheduling, analyzing, and engaging with content posted on social media platforms. It's more than just posting updates; it's about crafting a cohesive strategy that aligns with your brand's voice and objectives, ensuring consistent and authentic communication with your audience.",
      services: {
        title: "Our Comprehensive Services",
        items: [
          {
            title: "Platform Optimization",
            description: "We ensure your profiles on platforms such as Facebook, Instagram, Twitter, LinkedIn, and others are fully optimized. This includes updating profile information, aligning visuals with your brand identity, and implementing best practices to enhance visibility."
          },
          {
            title: "Content Creation and Scheduling",
            description: "Our team develops engaging and relevant content tailored to your audience's interests. We maintain a content calendar to schedule posts at optimal times, ensuring a consistent and timely presence that resonates with your followers."
          },
          {
            title: "Community Engagement",
            description: "Building a loyal community requires active interaction. We monitor comments and messages, respond promptly, and foster discussions to create a vibrant and engaged audience."
          },
          {
            title: "Performance Analytics",
            description: "Utilizing advanced analytics tools, we track key metrics to assess the effectiveness of our strategies. This data-driven approach allows us to refine our tactics, ensuring continuous improvement and alignment with your business goals."
          }
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
    shortDescription: "Data-driven strategies for your online success.",
    description: "Expertly crafted digital strategies that drive traffic, enhance brand positioning, and improve conversions through SEO, social media, and online campaigns.",
    fullContent: {
      introduction: "At The Ink Pot Group, we specialize in Digital Strategy, a comprehensive approach designed to align your business objectives with the ever-evolving digital landscape. Our mission is to craft tailored strategies that enhance your online presence, engage your target audience, and drive sustainable growth.",
      understanding: "Digital Strategy involves the meticulous planning and execution of online initiatives to achieve specific business goals. It encompasses the integration of various digital channels and technologies, ensuring a cohesive and effective online presence that resonates with your audience and stands out in the competitive market.",
      services: {
        title: "Our Comprehensive Services",
        items: [
          {
            title: "Market Research and Analysis",
            description: "We delve deep into industry trends, competitor activities, and consumer behaviors to identify opportunities and challenges specific to your business."
          },
          {
            title: "Audience Profiling",
            description: "By defining and understanding your target demographics, we tailor strategies that effectively reach and engage the right audience."
          },
          {
            title: "Channel Selection and Integration",
            description: "We determine the most impactful digital platforms—such as SEO, social media, email marketing, and paid advertising—and integrate them to work harmoniously towards your objectives."
          },
          {
            title: "Campaign Planning and Execution",
            description: "Our team designs cohesive campaigns that align with your brand's voice and goals, ensuring consistent messaging and optimal reach across all chosen channels."
          }
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
    shortDescription: "Compelling content to captivate your audience.",
    description: "High-quality written, visual, and video content tailored to your brand's voice and objectives to engage and inspire your audience.",
    fullContent: {
      introduction: "At The Ink Pot Group, we excel in Content Creation, a vital service designed to produce engaging and valuable media that captivates your target audience and reinforces your brand's presence. Our mission is to craft content that not only informs but also inspires and drives meaningful interactions.",
      understanding: "Content Creation involves the development of various forms of media—including written, visual, and interactive elements—that align with your brand's voice and resonate with your audience. It's a strategic process aimed at delivering relevant information and fostering engagement across multiple platforms.",
      services: {
        title: "Our Comprehensive Services",
        items: [
          {
            title: "Copywriting",
            description: "Crafting compelling and informative written content for blogs, articles, website copy, and social media posts that reflect your brand's tone and message."
          },
          {
            title: "Graphic Design",
            description: "Designing visually appealing graphics, infographics, and illustrations that enhance your brand's visual identity and effectively communicate complex information."
          },
          {
            title: "Video Production",
            description: "Producing high-quality videos, from concept development to final editing, including promotional videos, tutorials, and storytelling pieces that engage and inform your audience."
          },
          {
            title: "Social Media Content",
            description: "Creating platform-specific content that encourages interaction and builds community across channels like Facebook, Instagram, Twitter, and LinkedIn."
          }
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
    shortDescription: "Professional visuals for your brand's story.",
    description: "High-quality photography and videography services to create visually compelling content that enhances brand identity and marketing campaigns.",
    fullContent: {
      introduction: "At The Ink Pot Group, we specialize in Photography and Videography, offering professional visual content that captures the essence of your brand and engages your audience. Our mission is to create stunning visuals that tell your story authentically and compellingly.",
      understanding: "In today's digital landscape, high-quality visuals are paramount. Professional photography and videography not only enhance your brand's image but also build trust and credibility with your audience. They serve as powerful tools to showcase your products, services, and company culture, making a lasting impression.",
      services: {
        title: "Our Comprehensive Services",
        items: [
          {
            title: "Product Photography",
            description: "Showcasing your products with high-quality images that highlight their features and appeal."
          },
          {
            title: "Corporate Portraits",
            description: "Capturing professional images of your team to humanize your brand and foster connection."
          },
          {
            title: "Event Coverage",
            description: "Documenting significant events and milestones with a keen eye for detail and storytelling."
          },
          {
            title: "Promotional Videos",
            description: "Creating engaging videos that highlight your services or products, designed to captivate and convert your audience."
          },
          {
            title: "Aerial/Drone Photography",
            description: "Providing unique aerial perspectives to add a dynamic dimension to your visual content."
          }
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
    shortDescription: "Crafting your unique brand identity.",
    description: "Strategic branding solutions, including logo design, color schemes, typography, and brand guidelines to establish a strong and memorable identity.",
    fullContent: {
      introduction: "At The Ink Pot Group, we specialize in Branding and Logo Design, crafting unique visual identities that encapsulate your brand's essence and resonate with your target audience. Our mission is to develop cohesive and memorable brand elements that distinguish your business in a competitive marketplace.",
      understanding: "Branding is the strategic process of defining and shaping your company's identity, values, and voice to create a consistent and impactful presence across all platforms. Logo design, a critical component of branding, involves creating a distinctive symbol or mark that embodies your brand's character and facilitates instant recognition.",
      services: {
        title: "Our Comprehensive Services",
        items: [
          {
            title: "Brand Identity Development",
            description: "Collaborating with you to define your brand's mission, vision, values, and unique selling propositions, ensuring a strong foundation for all branding efforts."
          },
          {
            title: "Logo Design",
            description: "Creating versatile and scalable logos that effectively communicate your brand's personality and appeal to your target market."
          },
          {
            title: "Brand Guidelines",
            description: "Developing comprehensive guidelines that outline the proper usage of your brand elements, including color palettes, typography, imagery, and tone of voice, to maintain consistency across all communications."
          },
          {
            title: "Collateral Design",
            description: "Designing cohesive marketing materials such as business cards, letterheads, brochures, and digital assets that reflect your brand identity and reinforce your market presence."
          }
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


  
export const logoDesignWork = [   
  {     
    title: "Minimalist Logo Design",     
    description: "Crafted a sleek and modern logo for a tech startup.",     
    image: "/images/log5.png",
    type: "image",
    tags: ["Minimalist", "Tech", "Modern"]
  },  
  {     
    title: "Minimalist Logo Design",     
    description: "Crafted a sleek and modern logo for a tech startup.",     
    image: "/images/log1.jpg",
    type: "image",
    tags: ["Minimalist", "Tech", "Modern"]
  },   

  {     
    title: "Minimalist Logo Design",     
    description: "Crafted a sleek and modern logo for a tech startup.",     
    image: "/images/log3.jpg",
    type: "image",
    tags: ["Minimalist", "Tech", "Modern"]
  },  
  {     
    title: "Minimalist Logo Design",     
    description: "Crafted a sleek and modern logo for a tech startup.",     
    image: "/images/log4.jpg",
    type: "image",
    tags: ["Minimalist", "Tech", "Modern"]
  },
  {     
    title: "Brand Identity Creation",     
    description: "Developed a unique logo and branding for an e-commerce store.",     
    image: "/images/log2.png",
    type: "image",
    tags: ["Branding", "E-commerce", "Identity"]
  },   
  {     
    title: "Luxury Logo Design",     
    description: "Designed a premium and elegant logo for a high-end fashion brand.",     
    image: "/images/log7.png",
    type: "image",
    tags: ["Luxury", "Fashion", "Elegant"]
  },   
  {     
    title: "Creative Typography Logo",     
    description: "Blended custom typography with creative elements for a modern brand.",     
    image: "/images/log8.webp",
    type: "image",
    tags: ["Typography", "Creative", "Custom"]
  } ,
  {     
    title: "Creative Typography Logo",     
    description: "Blended custom typography with creative elements for a modern brand.",     
    image: "/images/log6.jpg",
    type: "image",
    tags: ["Typography", "Creative", "Custom"]
  } ,
  {     
    title: "Creative Typography Logo",     
    description: "Blended custom typography with creative elements for a modern brand.",     
    image: "/images/log9.jpeg",
    type: "image",
    tags: ["Typography", "Creative", "Custom"]
  } 
];

export const realEstateWork = [
  {
    title: "Luxury Property Branding",
    description: "Designed a premium brand identity for high-end real estate.",
    image: "/images/real1.jpg",
    type: "image",
    tags: ["Luxury", "Branding", "Premium"]
  },
  {
    title: "Real Estate Website Design",
    description: "Developed a user-friendly property listing platform.",
    image: "/images/real2.jpg",
    type: "image",
    tags: ["Website", "UI/UX", "Property"]
  },
  {
    title: "Virtual Tour & 3D Rendering",
    description: "Created immersive property showcases with 3D visuals.",
    video: "/video/realvideo2.mp4", 
    
    type: "video",
    tags: ["3D", "Virtual Tour", "Immersive"]
  },
  {
    title: "Social Media Marketing for Realtors",
    description: "Increased property leads with targeted social campaigns.",
    image: "/images/real4.jpg",
    type: "image",
    tags: ["Social Media", "Marketing", "Leads"]
  },
  {
    title: "Luxury Home Walkthrough",
    description: "A detailed walkthrough video highlighting premium real estate features.",
    video: "/video/realvideo1.mp4",
   
    type: "video",
    tags: ["Walkthrough", "Luxury", "Premium"]
  },
  {
    title: "Social Media Marketing for Realtors",
    description: "Increased property leads with targeted social campaigns.",
    image: "/images/real5.jpg",
    type: "image",
    tags: ["Social Media", "Marketing", "Leads"]
  },
  {
    title: "Social Media Marketing for Realtors",
    description: "Increased property leads with targeted social campaigns.",
    image: "/images/real6.jpg",
    type: "image",
    tags: ["Social Media", "Marketing", "Leads"]
  },
  {
    title: "Virtual Tour & 3D Rendering",
    description: "Created immersive property showcases with 3D visuals.",
    video: "/video/realvideo3.mp4", 
    
    type: "video",
    tags: ["3D", "Virtual Tour", "Immersive"]
  },
  {
    title: "Social Media Marketing for Realtors",
    description: "Increased property leads with targeted social campaigns.",
    image: "/images/real7.jpg",
    type: "image",
    tags: ["Social Media", "Marketing", "Leads"]
  },
];

export const foodRestaurantWork = [
  {
    title: "Restaurant Logo & Branding",
    description: "Crafted a unique identity for a gourmet restaurant.",
    image: "/images/content1.jpg",
    type: "image",
    tags: ["Logo", "Branding", "Gourmet"]
  },
  {
    title: "Food Photography & Menu Design",
    description: "Captured appetizing visuals for menus and promotions.",
    image: "/images/content2.jpg",
    type: "image",
    tags: ["Photography", "Menu", "Culinary"]
  },
  {
    title: "Food Photography & Menu Design",
    description: "Captured appetizing visuals for menus and promotions.",
    image: "/images/content8.jpg",
    type: "image",
    tags: ["Photography", "Menu", "Culinary"]
  },
  {
    title: "Chef Spotlight Series",
    description: "Video showcase featuring signature dishes and culinary expertise.",
    video: "/video/food1.mp4",
    
    type: "video",
    tags: ["Chef", "Culinary", "Video Series"]
  },
  {
    title: "Website & Online Ordering System",
    description: "Developed an intuitive platform for online reservations & delivery.",
    image: "/images/content4.jpg",
    type: "image",
    tags: ["Website", "Online Ordering", "UX Design"]
  },
  {
    title: "Website & Online Ordering System",
    description: "Developed an intuitive platform for online reservations & delivery.",
    image: "/images/content9.jpg",
    type: "image",
    tags: ["Website", "Online Ordering", "UX Design"]
  },
  {
    title: "Restaurant Atmosphere Tour",
    description: "An immersive video tour of a restaurant's unique ambiance and dining experience.",
    video: "/video/food2.mp4",
    
    type: "video",
    tags: ["Ambiance", "Tour", "Experience"]
  },
  
  {
    title: "Chef Spotlight Series",
    description: "Video showcase featuring signature dishes and culinary expertise.",
    video: "/video/food3.mp4",
    
    type: "video",
    tags: ["Chef", "Culinary", "Video Series"]
  },
  {
    title: "Food Photography & Menu Design",
    description: "Captured appetizing visuals for menus and promotions.",
    image: "/images/content10.jpg",
    type: "image",
    tags: ["Photography", "Menu", "Culinary"]
  }
];

export const commercialsWork = [
  {
    title: "TV Commercial Production",
    description: "Produced high-quality commercials for brand awareness.",
    image: "/images/branding3.jpg",
    type: "image",
    tags: ["TV", "Commercial", "Production"]
  },
  {
    title: "Corporate Production",
    description: "Created professional videos for business marketing.",
    image: "/images/branding1.jpg",
    type: "image",
    tags: ["Corporate", "Professional", "Business"]
  },
  {
    title: "Corporate Production",
    description: "Created professional videos for business marketing.",
    image: "/images/comm1.jpg",
    type: "image",
    tags: ["Corporate", "Professional", "Business"]
  },
  {
    title: "Corporate Production",
    description: "Created professional videos for business marketing.",
    image: "/images/comm2.jpg",
    type: "image",
    tags: ["Corporate", "Professional", "Business"]
  },
  {
    title: "Corporate Production",
    description: "Created professional videos for business marketing.",
    image: "/images/comm4.webp",
    type: "image",
    tags: ["Corporate", "Professional", "Business"]
  },
  {
    title: "Product Advertising",
    description: "Showcased product features with compelling visuals.",
    image: "/images/branding2.jpg",
    type: "image",
    tags: ["Product", "Advertising", "Features"]
  },
  {
    title: "Influencer & Lifestyle Shoots",
    description: "Captured authentic content for brand storytelling.",
    image: "/images/branding4.jpg",
    type: "image",
    tags: ["Influencer", "Lifestyle", "Authentic"]
  },
  {
    title: "Shoes",
    description: "An immersive video tour of a restaurant's unique ambiance and dining experience.",
    video: "/video/shoes.mp4",
    
    type: "video",
    tags: ["Product", "Branding", "Shoes"]
  },
  {
    title: "shoes branding",
    description: "Captured authentic content for brand storytelling.",
    image: "/images/shoe.jpg",
    type: "image",
    tags: ["Influencer", "Lifestyle", "Authentic"]
  },

];

export const postWork = [
  {
    title: "Social Media Post Design",
    description: "Designed engaging visuals for social media marketing campaigns.",
    image: "/images/photo1.jpg",
    type: "image",
    tags: ["Social Media", "Design", "Marketing"]
  },
  {
    title: "Instagram & Facebook Ads",
    description: "Created high-converting ad creatives for targeted social media promotions.",
    image: "/images/photo2.jpg",
    type: "image",
    tags: ["Instagram", "Facebook", "Ads"]
  },
  {
    title: "Instagram & Facebook Ads",
    description: "Created high-converting ad creatives for targeted social media promotions.",
    image: "/images/post10.jpg",
    type: "image",
    tags: ["Instagram", "Facebook", "Ads"]
  },
 
  {
    title: "Brand Awareness Campaign",
    description: "Designed a cohesive post series for brand storytelling.",
    image: "/images/photo4.jpg",
    type: "image",
    tags: ["Brand Awareness", "Storytelling", "Series"]
  },
  {
    title: "Brand Awareness Campaign2",
    description: "Designed a cohesivec post series for brand storytelling.",
    image: "/images/post5.jpg",
    type: "image",
    tags: ["Brand Awareness", "Storytelling", "Series"]
  },
  {
    title: "Brand Awareness Campaign2",
    description: "Designed a cohesivec post series for brand storytelling.",
    image: "/images/post5.jpg",
    type: "image",
    tags: ["Brand Awareness", "Storytelling", "Series"]
  },
  {
    title: "Brand Awareness Campaign",
    description: "Designed a cohesive post series for brand storytelling.",
    image: "/images/post6.jpg",
    type: "image",
    tags: ["Brand Awareness", "Storytelling", "Series"]
  },
  {
    title: "Brand Awareness Campaign",
    description: "Designed a cohesive post series for brand storytelling.",
    image: "/images/post7.jpg",
    type: "image",
    tags: ["Brand Awareness", "Storytelling", "Series"]
  },
  {
    title: "Brand Awareness Campaign",
    description: "Designed a cohesive post series for brand storytelling.",
    image: "/images/post11.jpg",
    type: "image",
    tags: ["Brand Awareness", "Storytelling", "Series"]
  },
 
];







  