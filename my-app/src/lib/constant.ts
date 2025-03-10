
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
    title: "Tech Startup Minimal Logo",     
    description: "Created a clean, geometric logo design for a fintech startup focusing on simplicity and recognition.",     
    image: "/images/log1.webp",
    type: "image",
    tags: ["Minimalist", "Fintech", "Geometric"]
  },  
  {     
    title: "Corporate Identity Mark",     
    description: "Developed a professional logo with strong visual hierarchy for a consulting firm.",     
    image: "/images/log2.webp",
    type: "image",
    tags: ["Corporate", "Professional", "Identity"]
  },   
  {     
    title: "Abstract Tech Emblem",     
    description: "Designed an abstract, modern emblem representing innovation and digital transformation.",     
    image: "/images/log3.webp",
    type: "image",
    tags: ["Abstract", "Innovation", "Digital"]
  },  
  {     
    title: "Software Company Wordmark",     
    description: "Crafted a distinctive wordmark logo with custom typography for a software development company.",     
    image: "/images/log4.webp",
    type: "image",
    tags: ["Wordmark", "Software", "Typography"]
  },
  {     
    title: "E-commerce Brand Identity",     
    description: "Created a comprehensive visual identity system including logo, color palette, and typography for an online retailer.",     
    image: "/images/log5.webp",
    type: "image",
    tags: ["Brand System", "Retail", "Visual Identity"]
  },   
  {     
    title: "Luxury Fashion Monogram",     
    description: "Designed an elegant monogram logo with refined details for a high-end clothing brand.",     
    image: "/images/log6.webp",
    type: "image",
    tags: ["Monogram", "Luxury", "Sophisticated"]
  },   
  {     
    title: "Dynamic Letterform Logo",     
    description: "Created a dynamic, animated letterform with fluid motion for a digital media company.",     
    image: "/images/log7.webp",
    type: "image",
    tags: ["Animation", "Letterform", "Digital Media"]
  },
  {     
    title: "Handcrafted Script Identity",     
    description: "Developed a custom script logotype with organic, hand-drawn qualities for an artisan brand.",     
    image: "/images/log8.webp",
    type: "image",
    tags: ["Script", "Handcrafted", "Artisanal"]
  },
  {     
    title: "Minimalist Symbol Design",     
    description: "Designed a reductive symbol mark focusing on essential forms and negative space.",     
    image: "/images/log9.webp",
    type: "image",
    tags: ["Symbol", "Negative Space", "Reductive"]
  },
  {     
    title: "Expressive Typographic Logo",     
    description: "Created an expressive logotype that combines letterforms with visual metaphors related to the brand's purpose.",     
    image: "/images/log10.webp",
    type: "image",
    tags: ["Expressive", "Visual Metaphor", "Conceptual"]
  } 
];

export const realEstateWork = [
  {
    title: "Exclusive Property Brand System",
    description: "Developed a sophisticated brand identity for a luxury real estate developer, including logo, print materials, and digital assets.",
    image: "/images/real1.webp",
    type: "image",
    tags: ["Luxury Branding", "Print Design", "Visual System"]
  },
  {
    title: "Interactive Property Listing Platform",
    description: "Designed and developed a responsive website with advanced search features, map integration, and personalized user experience.",
    image: "/images/real2.webp",
    type: "image",
    tags: ["Web Development", "User Experience", "Interactive"]
  },
  {
    title: "Architectural Visualization Tour",
    description: "Produced photorealistic 3D walkthroughs of pre-construction properties to help clients visualize finished spaces.",
    video: "/video/realvideo2.mp4", 
    type: "video",
    tags: ["3D Rendering", "Architectural", "Pre-visualization"]
  },
  {
    title: "Real Estate Lead Generation Campaign",
    description: "Designed and implemented a multi-platform social media strategy resulting in 45% increase in qualified property inquiries.",
    image: "/images/real3.webp",
    type: "image",
    tags: ["Lead Generation", "Digital Strategy", "Conversion"]
  },
  {
    title: "Premium Estate Cinematic Tour",
    description: "Produced a cinematic video showcase highlighting architectural features, interior design, and surrounding landscape of a luxury property.",
    video: "/video/realvideo1.mp4",
    type: "video",
    tags: ["Cinematic", "Storytelling", "Luxury Property"]
  },
  {
    title: "Realtor Personal Branding",
    description: "Created a distinctive personal brand identity and content strategy for a high-performing real estate agent.",
    image: "/images/real4.webp",
    type: "image",
    tags: ["Personal Branding", "Content Strategy", "Agent Marketing"]
  },
  {
    title: "Property Development Campaign",
    description: "Designed promotional materials and digital advertisements for a new residential development targeting young professionals.",
    image: "/images/real5.webp",
    type: "image",
    tags: ["Development Marketing", "Target Audience", "Residential"]
  },
  {
    title: "Commercial Property 3D Experience",
    description: "Created an interactive 3D visualization allowing potential tenants to explore and customize commercial office spaces.",
    video: "/video/realvideo3.mp4", 
    type: "video",
    tags: ["Commercial Real Estate", "Interactive", "Space Planning"]
  },
  {
    title: "Real Estate Instagram Strategy",
    description: "Developed a cohesive visual identity and content calendar for a real estate firm's Instagram presence.",
    image: "/images/real6.webp",
    type: "image",
    tags: ["Instagram Marketing", "Content Calendar", "Visual Identity"]
  },
  {
    title: "Neighborhood Lifestyle Marketing",
    description: "Created lifestyle-focused marketing materials highlighting community amenities, local businesses, and quality of life.",
    image: "/images/real7.webp",
    type: "image",
    tags: ["Lifestyle Marketing", "Community", "Location Branding"]
  },
  {
    title: "Real Estate Instagram Strategy2",
    description: "Developed a cohesive visual identity and content calendar for a real estate firm's Instagram presence.",
    image: "/images/real8.webp",
    type: "image",
    tags: ["Instagram Marketing", "Content Calendar", "Visual Identity"]
  },
  {
    title: "Neighborhood Lifestyle Marketing2",
    description: "Created lifestyle-focused marketing materials highlighting community amenities, local businesses, and quality of life.",
    image: "/images/real9.webp",
    type: "image",
    tags: ["Lifestyle Marketing", "Community", "Location Branding"]
  },
];

export const foodRestaurantWork = [
  {
    title: "Artisanal Food Photography",
    description: "Captured the craftsmanship and detail of handmade culinary creations for a farm-to-table restaurant.",
    image: "/images/food1.webp",
    type: "image",
    tags: ["Artisanal", "Craftsmanship", "Farm-to-Table"]
  },
  {
    title: "Gourmet Plating Showcase",
    description: "Photographed meticulously plated dishes highlighting texture, color, and composition for a fine dining establishment.",
    image: "/images/food2.webp",
    type: "image",
    tags: ["Fine Dining", "Plating", "Composition"]
  },
  {
    title: "Seasonal Menu Highlights",
    description: "Created a visual story of seasonal ingredients and special menu items for quarterly promotional campaigns.",
    image: "/images/food3.webp",
    type: "image",
    tags: ["Seasonal", "Ingredients", "Campaign"]
  },
  {
    title: "Beverage Portfolio",
    description: "Photographed craft cocktails and wine selections emphasizing mood, lighting, and atmosphere.",
    image: "/images/food4.webp",
    type: "image",
    tags: ["Beverages", "Cocktails", "Atmosphere"]
  },
  {
    title: "Street Food Documentary",
    description: "Captured the vibrant culture and authentic flavors of street food for a casual eatery's brand story.",
    image: "/images/food5.webp",
    type: "image",
    tags: ["Street Food", "Authentic", "Culture"]
  },
  {
    title: "Dessert Collection",
    description: "Showcased artful pastries and desserts with attention to detail and textural elements.",
    image: "/images/food6.webp",
    type: "image",
    tags: ["Pastry", "Desserts", "Textural"]
  },
  {
    title: "Chef's Table Experience",
    description: "Documented the intimate chef's table experience focusing on interaction, preparation, and exclusive dishes.",
    image: "/images/food7.webp",
    type: "image",
    tags: ["Chef's Table", "Exclusive", "Experience"]
  },
  {
    title: "Ingredient Spotlight Series",
    description: "Created a visual series highlighting key ingredients in their raw form and final dish presentation.",
    image: "/images/food8.webp",
    type: "image",
    tags: ["Ingredients", "Process", "Transformation"]
  },
  {
    title: "International Cuisine Feature",
    description: "Photographed authentic international dishes emphasizing cultural heritage and traditional preparation methods.",
    image: "/images/food9.webp",
    type: "image",
    tags: ["International", "Cultural", "Traditional"]
  },
  {
    title: "Comfort Food Collection",
    description: "Styled and photographed nostalgic comfort foods with warm, inviting aesthetics for a family restaurant.",
    image: "/images/food10.webp",
    type: "image",
    tags: ["Comfort Food", "Nostalgic", "Homestyle"]
  },
  {
    title: "Breakfast Menu Launch",
    description: "Created bright, morning-light imagery for a cafe's new breakfast menu launch campaign.",
    image: "/images/food11.webp",
    type: "image",
    tags: ["Breakfast", "Morning Light", "Cafe"]
  },
  {
    title: "Food Truck Identity",
    description: "Developed visual content for a food truck's social media presence capturing the mobile dining experience.",
    image: "/images/food12.webp",
    type: "image",
    tags: ["Food Truck", "Mobile", "Social Content"]
  },
  {
    title: "Bistro Visual Identity",
    description: "Designed a comprehensive brand identity system for a neighborhood bistro emphasizing local heritage.",
    image: "/images/content1.webp",
    type: "image",
    tags: ["Bistro", "Local Heritage", "Identity System"]
  },
  {
    title: "Editorial Food Photography",
    description: "Created magazine-quality food photography with narrative storytelling for a restaurant's feature article.",
    image: "/images/content2.webp",
    type: "image",
    tags: ["Editorial", "Storytelling", "Publication"]
  },
  {
    title: "Menu Design & Photography Integration",
    description: "Developed a visually cohesive menu design integrating custom photography with typography and layout.",
    image: "/images/content8.webp",
    type: "image",
    tags: ["Menu Design", "Integration", "Typography"]
  },
  {
    title: "Culinary Techniques Masterclass",
    description: "Produced an educational video series featuring a renowned chef demonstrating signature techniques and recipes.",
    video: "/video/res.mp4",
    type: "video",
    tags: ["Educational", "Techniques", "Masterclass"]
  },
  {
    title: "Restaurant Online Ordering System",
    description: "Created a user-centered design for a restaurant's custom ordering platform with seamless payment processing.",
    image: "/images/content4.webp",
    type: "image",
    tags: ["E-commerce", "User-Centered", "Digital Platform"]
  },
  {
    title: "Restaurant Mobile Application",
    description: "Designed a native mobile app for reservations, loyalty program, and personalized dining recommendations.",
    image: "/images/content9.webp",
    type: "image",
    tags: ["Mobile App", "Loyalty", "Personalization"]
  },
  {
    title: "Dining Experience Documentary",
    description: "Created an immersive short film showcasing a restaurant's unique atmosphere, service style, and guest experience.",
    video: "/video/res2.mp4",
    type: "video",
    tags: ["Documentary", "Service", "Guest Experience"]
  },
  {
    title: "Farm-to-Table Journey",
    description: "Produced a video story following ingredients from local farms to final dishes, highlighting sustainability practices.",
    video: "/video/res3.mp4",
    type: "video",
    tags: ["Sustainability", "Local Sourcing", "Farm Relationships"]
  },
  {
    title: "Fusion Cuisine Photography",
    description: "Captured innovative fusion dishes that blend culinary traditions with contemporary presentation.",
    image: "/images/content10.webp",
    type: "image",
    tags: ["Fusion", "Innovation", "Cross-Cultural"]
  }, {
    title: "Artisanal Food Photography2",
    description: "Captured the craftsmanship and detail of handmade culinary creations for a farm-to-table restaurant.",
    image: "/images/rest1.webp",
    type: "image",
    tags: ["Artisanal", "Craftsmanship", "Farm-to-Table"]
  },
  {
    title: "Gourmet Plating Showcase2",
    description: "Photographed meticulously plated dishes highlighting texture, color, and composition for a fine dining establishment.",
    image: "/images/rest2.webp",
    type: "image",
    tags: ["Fine Dining", "Plating", "Composition"]
  },
  {
    title: "Seasonal Menu Highlights2",
    description: "Created a visual story of seasonal ingredients and special menu items for quarterly promotional campaigns.",
    image: "/images/rest3.webp",
    type: "image",
    tags: ["Seasonal", "Ingredients", "Campaign"]
  },
  {
    title: "Beverage Portfolio2",
    description: "Photographed craft cocktails and wine selections emphasizing mood, lighting, and atmosphere.",
    image: "/images/rest4.webp",
    type: "image",
    tags: ["Beverages", "Cocktails", "Atmosphere"]
  },
  {
    title: "Street Food Documentary2",
    description: "Captured the vibrant culture and authentic flavors of street food for a casual eatery's brand story.",
    image: "/images/rest5.webp",
    type: "image",
    tags: ["Street Food", "Authentic", "Culture"]
  },
  {
    title: "Dessert Collection2",
    description: "Showcased artful pastries and desserts with attention to detail and textural elements.",
    image: "/images/rest6.webp",
    type: "image",
    tags: ["Pastry", "Desserts", "Textural"]
  },
  {
    title: "Chef's Table Experience2",
    description: "Documented the intimate chef's table experience focusing on interaction, preparation, and exclusive dishes.",
    image: "/images/rest7.webp",
    type: "image",
    tags: ["Chef's Table", "Exclusive", "Experience"]
  },
  {
    title: "Ingredient Spotlight Series2",
    description: "Created a visual series highlighting key ingredients in their raw form and final dish presentation.",
    image: "/images/rest8.webp",
    type: "image",
    tags: ["Ingredients", "Process", "Transformation"]
  },
  {
    title: "International Cuisine Feature2",
    description: "Photographed authentic international dishes emphasizing cultural heritage and traditional preparation methods.",
    image: "/images/rest9.webp",
    type: "image",
    tags: ["International", "Cultural", "Traditional"]
  },
  {
    title: "Comfort Food Collection2",
    description: "Styled and photographed nostalgic comfort foods with warm, inviting aesthetics for a family restaurant.",
    image: "/images/rest10.webp",
    type: "image",
    tags: ["Comfort Food", "Nostalgic", "Homestyle"]
  },
  {
    title: "Breakfast Menu Launch2",
    description: "Created bright, morning-light imagery for a cafe's new breakfast menu launch campaign.",
    image: "/images/rest11.webp",
    type: "image",
    tags: ["Breakfast", "Morning Light", "Cafe"]
  },
  {
    title: "Food Truck Identity2",
    description: "Developed visual content for a food truck's social media presence capturing the mobile dining experience.",
    image: "/images/rest12.webp",
    type: "image",
    tags: ["Food Truck", "Mobile", "Social Content"]
  },
  {
    title: "Artisanal Food Photography3",
    description: "Captured the craftsmanship and detail of handmade culinary creations for a farm-to-table restaurant.",
    image: "/images/rest13.webp",
    type: "image",
    tags: ["Artisanal", "Craftsmanship", "Farm-to-Table"]
  },
  {
    title: "Gourmet Plating Showcase3",
    description: "Photographed meticulously plated dishes highlighting texture, color, and composition for a fine dining establishment.",
    image: "/images/rest14.webp",
    type: "image",
    tags: ["Fine Dining", "Plating", "Composition"]
  },
  {
    title: "Seasonal Menu Highlights3",
    description: "Created a visual story of seasonal ingredients and special menu items for quarterly promotional campaigns.",
    image: "/images/rest15.webp",
    type: "image",
    tags: ["Seasonal", "Ingredients", "Campaign"]
  },
  {
    title: "Beverage Portfolio3",
    description: "Photographed craft cocktails and wine selections emphasizing mood, lighting, and atmosphere.",
    image: "/images/rest16.webp",
    type: "image",
    tags: ["Beverages", "Cocktails", "Atmosphere"]
  },
  {
    title: "Street Food Documentary3",
    description: "Captured the vibrant culture and authentic flavors of street food for a casual eatery's brand story.",
    image: "/images/rest17.webp",
    type: "image",
    tags: ["Street Food", "Authentic", "Culture"]
  },
  {
    title: "Dessert Collection3",
    description: "Showcased artful pastries and desserts with attention to detail and textural elements.",
    image: "/images/rest18.webp",
    type: "image",
    tags: ["Pastry", "Desserts", "Textural"]
  },
  {
    title: "Chef's Table Experience3",
    description: "Documented the intimate chef's table experience focusing on interaction, preparation, and exclusive dishes.",
    image: "/images/rest19.webp",
    type: "image",
    tags: ["Chef's Table", "Exclusive", "Experience"]
  },
];

export const commercialsWork = [
  {
    title: "National Brand Campaign",
    description: "Directed and produced a multi-platform commercial campaign for national television and digital streaming services.",
    image: "/images/branding3.webp",
    type: "image",
    tags: ["National", "Multi-Platform", "Campaign"]
  },
  {
    title: "Emotional Storytelling Commercial",
    description: "Created a narrative-driven commercial focusing on emotional connection and brand values rather than product features.",
    image: "/images/commercial1.webp",
    type: "image",
    tags: ["Emotional", "Narrative", "Brand Values"]
  },
  {
    title: "Technical Product Launch",
    description: "Developed a technical product demonstration commercial highlighting innovative features and user benefits.",
    image: "/images/commercial2.webp",
    type: "image",
    tags: ["Product Launch", "Technical", "Demonstration"]
  },
  {
    title: "Corporate Documentary",
    description: "Produced a mini-documentary showcasing company history, mission, and impact for investor relations and recruitment.",
    image: "/images/branding1.webp",
    type: "image",
    tags: ["Documentary", "Corporate History", "Investor Relations"]
  },
  {
    title: "Executive Interview Series",
    description: "Created a professional interview series featuring leadership perspectives on industry trends and company vision.",
    image: "/images/comm1.webp",
    type: "image",
    tags: ["Leadership", "Interview Series", "Thought Leadership"]
  },
  {
    title: "Company Culture Showcase",
    description: "Developed visual content highlighting workplace culture, team dynamics, and employee stories for recruitment.",
    image: "/images/comm2.webp",
    type: "image",
    tags: ["Company Culture", "Recruitment", "Employee Stories"]
  },
  {
    title: "Annual Report Visual Narrative",
    description: "Translated financial results and yearly achievements into an engaging visual story for stakeholders.",
    image: "/images/comm4.webp",
    type: "image",
    tags: ["Annual Report", "Financial", "Stakeholder Communication"]
  },
  {
    title: "Product Demonstration Video",
    description: "Created a detailed walkthrough of product functionality, features, and benefits with professional demonstration.",
    image: "/images/branding2.webp",
    type: "image",
    tags: ["Product Demo", "Walkthrough", "Features"]
  },
  {
    title: "Lifestyle Brand Campaign",
    description: "Produced authentic lifestyle content featuring real users engaging with products in natural environments.",
    image: "/images/branding4.webp",
    type: "image",
    tags: ["Lifestyle", "Authentic", "User-Generated"]
  },
  {
    title: "Premium Footwear Commercial",
    description: "Directed a high-end commercial showcasing craftsmanship, materials, and design philosophy of luxury shoes.",
    video: "/video/shoes.mp4",
    type: "video",
    tags: ["Footwear", "Craftsmanship", "Luxury"]
  },
  {
    title: "Athletic Shoe Campaign",
    description: "Created performance-focused visual content for athletic footwear highlighting technical features and athlete testimonials.",
    image: "/images/shoe.webp",
    type: "image",
    tags: ["Athletic", "Performance", "Technical"]
  },
  {
    title: "Influencer Collaboration Campaign",
    description: "Managed production of authentic content through strategic partnerships with niche influencers aligned with brand values.",
    image: "/images/branding5.webp",
    type: "image",
    tags: ["Influencer", "Collaboration", "Authentic"]
  },
];

export const postWork = [
  {
    title: "Engagement-Driven Content Series",
    description: "Created a cohesive set of interactive and shareable posts designed to maximize audience engagement and participation.",
    image: "/images/post1.webp",
    type: "image",
    tags: ["Interactive", "Engagement", "Series"]
  },
  {
    title: "Conversion-Optimized Ad Campaign",
    description: "Designed and tested multiple ad variations with strategic messaging and CTAs resulting in 37% conversion improvement.",
    image: "/images/post2.webp",
    type: "image",
    tags: ["Conversion", "A/B Testing", "Call-to-Action"]
  },
  {
    title: "Platform-Specific Visual Strategy",
    description: "Developed tailored visual content optimized for each platform's unique audience, algorithm, and content preferences.",
    image: "/images/post3.webp",
    type: "image",
    tags: ["Platform-Specific", "Algorithm Optimization", "Audience Targeting"]
  },
  {
    title: "Brand Story Carousel Series",
    description: "Created a multi-slide carousel series that progressively reveals brand history, values, and differentiators.",
    image: "/images/post4.webp",
    type: "image",
    tags: ["Carousel", "Progressive Narrative", "Brand History"]
  },
  {
    title: "Visual Identity System for Social",
    description: "Developed a comprehensive visual system with templates, color palettes, and graphic elements for consistent brand presence.",
    image: "/images/post5.webp",
    type: "image",
    tags: ["Visual System", "Templates", "Consistency"]
  },
  {
    title: "User-Generated Content Campaign",
    description: "Designed a framework for soliciting, curating, and featuring authentic customer content within brand channels.",
    image: "/images/post6.webp",
    type: "image",
    tags: ["UGC", "Customer Content", "Authenticity"]
  },
  {
    title: "Educational Content Series",
    description: "Created informative and visually engaging posts establishing thought leadership and addressing customer pain points.",
    image: "/images/post7.webp",
    type: "image",
    tags: ["Educational", "Thought Leadership", "Value-Driven"]
  },
  {
    title: "Seasonal Campaign Framework",
    description: "Developed a flexible content system for seasonal promotions that maintains brand identity while adapting to timely themes.",
    image: "/images/post8.webp",
    type: "image",
    tags: ["Seasonal", "Promotional", "Adaptable"]
  },
  {
    title: "Engagement-Driven Content Series2",
    description: "Created a cohesive set of interactive and shareable posts designed to maximize audience engagement and participation.",
    image: "/images/post9.webp",
    type: "image",
    tags: ["Interactive", "Engagement", "Series"]
  },
  {
    title: "Conversion-Optimized Ad Campaign2",
    description: "Designed and tested multiple ad variations with strategic messaging and CTAs resulting in 37% conversion improvement.",
    image: "/images/post10.webp",
    type: "image",
    tags: ["Conversion", "A/B Testing", "Call-to-Action"]
  },
  {
    title: "Platform-Specific Visual Strategy2",
    description: "Developed tailored visual content optimized for each platform's unique audience, algorithm, and content preferences.",
    image: "/images/post11.webp",
    type: "image",
    tags: ["Platform-Specific", "Algorithm Optimization", "Audience Targeting"]
  },
  {
    title: "Brand Story Carousel Series2",
    description: "Created a multi-slide carousel series that progressively reveals brand history, values, and differentiators.",
    image: "/images/post12.webp",
    type: "image",
    tags: ["Carousel", "Progressive Narrative", "Brand History"]
  },
  {
    title: "Visual Identity System for Social2",
    description: "Developed a comprehensive visual system with templates, color palettes, and graphic elements for consistent brand presence.",
    image: "/images/post13.webp",
    type: "image",
    tags: ["Visual System", "Templates", "Consistency"]
  },
  {
    title: "User-Generated Content Campaign2",
    description: "Designed a framework for soliciting, curating, and featuring authentic customer content within brand channels.",
    image: "/images/post14.webp",
    type: "image",
    tags: ["UGC", "Customer Content", "Authenticity"]
  },
  {
    title: "Educational Content Series2",
    description: "Created informative and visually engaging posts establishing thought leadership and addressing customer pain points.",
    image: "/images/post15.webp",
    type: "image",
    tags: ["Educational", "Thought Leadership", "Value-Driven"]
  },
  {
    title: "Engagement-Driven Content Series3",
    description: "Created a cohesive set of interactive and shareable posts designed to maximize audience engagement and participation.",
    image: "/images/post16.webp",
    type: "image",
    tags: ["Interactive", "Engagement", "Series"]
  },
  {
    title: "Conversion-Optimized Ad Campaign3",
    description: "Designed and tested multiple ad variations with strategic messaging and CTAs resulting in 37% conversion improvement.",
    image: "/images/post17.webp",
    type: "image",
    tags: ["Conversion", "A/B Testing", "Call-to-Action"]
  },
  {
    title: "Platform-Specific Visual Strategy3",
    description: "Developed tailored visual content optimized for each platform's unique audience, algorithm, and content preferences.",
    image: "/images/post18.webp",
    type: "image",
    tags: ["Platform-Specific", "Algorithm Optimization", "Audience Targeting"]
  },
  {
    title: "Brand Story Carousel Series3",
    description: "Created a multi-slide carousel series that progressively reveals brand history, values, and differentiators.",
    image: "/images/post19.webp",
    type: "image",
    tags: ["Carousel", "Progressive Narrative", "Brand History"]
  },
  {
    title: "Visual Identity System for Social3",
    description: "Developed a comprehensive visual system with templates, color palettes, and graphic elements for consistent brand presence.",
    image: "/images/post20.webp",
    type: "image",
    tags: ["Visual System", "Templates", "Consistency"]
  },

  {
    title: "Educational Content Series3",
    description: "Created informative and visually engaging posts establishing thought leadership and addressing customer pain points.",
    image: "/images/post22.webp",
    type: "image",
    tags: ["Educational", "Thought Leadership", "Value-Driven"]
  },
  {
    title: "Seasonal Campaign Framework3",
    description: "Developed a flexible content system for seasonal promotions that maintains brand identity while adapting to timely themes.",
    image: "/images/post23.webp",
    type: "image",
    tags: ["Seasonal", "Promotional", "Adaptable"]
  },
  {
    title: "Engagement-Driven Content Series3",
    description: "Created a cohesive set of interactive and shareable posts designed to maximize audience engagement and participation.",
    image: "/images/post24.webp",
    type: "image",
    tags: ["Interactive", "Engagement", "Series"]
  },
  {
    title: "Conversion-Optimized Ad Campaign3",
    description: "Designed and tested multiple ad variations with strategic messaging and CTAs resulting in 37% conversion improvement.",
    image: "/images/post25.webp",
    type: "image",
    tags: ["Conversion", "A/B Testing", "Call-to-Action"]
  },
  {
    title: "Platform-Specific Visual Strategy3",
    description: "Developed tailored visual content optimized for each platform's unique audience, algorithm, and content preferences.",
    image: "/images/post26.webp",
    type: "image",
    tags: ["Platform-Specific", "Algorithm Optimization", "Audience Targeting"]
  },
  {
    title: "Brand Story Carousel Series3",
    description: "Created a multi-slide carousel series that progressively reveals brand history, values, and differentiators.",
    image: "/images/post27.webp",
    type: "image",
    tags: ["Carousel", "Progressive Narrative", "Brand History"]
  },
  {
    title: "Visual Identity System for Social3",
    description: "Developed a comprehensive visual system with templates, color palettes, and graphic elements for consistent brand presence.",
    image: "/images/post28.webp",
    type: "image",
    tags: ["Visual System", "Templates", "Consistency"]
  },
  {
    title: "User-Generated Content Campaign3",
    description: "Designed a framework for soliciting, curating, and featuring authentic customer content within brand channels.",
    image: "/images/post29.webp",
    type: "image",
    tags: ["UGC", "Customer Content", "Authenticity"]
  },
  {
    title: "Educational Content Series3",
    description: "Created informative and visually engaging posts establishing thought leadership and addressing customer pain points.",
    image: "/images/post30.webp",
    type: "image",
    tags: ["Educational", "Thought Leadership", "Value-Driven"]
  },
  {
    title: "User-Generated Content Campaign3",
    description: "Designed a framework for soliciting, curating, and featuring authentic customer content within brand channels.",
    image: "/images/post31.webp",
    type: "image",
    tags: ["UGC", "Customer Content", "Authenticity"]
  },
  {
    title: "Educational Content Series3",
    description: "Created informative and visually engaging posts establishing thought leadership and addressing customer pain points.",
    image: "/images/post32.webp",
    type: "image",
    tags: ["Educational", "Thought Leadership", "Value-Driven"]
  },
  {
    title: "Engagement-Driven Content Series4",
    description: "Created a cohesive set of interactive and shareable posts designed to maximize audience engagement and participation.",
    image: "/images/post34.webp",
    type: "image",
    tags: ["Interactive", "Engagement", "Series"]
  },
  {
    title: "Conversion-Optimized Ad Campaign4",
    description: "Designed and tested multiple ad variations with strategic messaging and CTAs resulting in 37% conversion improvement.",
    image: "/images/post34.webp",
    type: "image",
    tags: ["Conversion", "A/B Testing", "Call-to-Action"]
  },
  {
    title: "Platform-Specific Visual Strategy4",
    description: "Developed tailored visual content optimized for each platform's unique audience, algorithm, and content preferences.",
    image: "/images/post35.webp",
    type: "image",
    tags: ["Platform-Specific", "Algorithm Optimization", "Audience Targeting"]
  },
  {
    title: "Brand Story Carousel Series4",
    description: "Created a multi-slide carousel series that progressively reveals brand history, values, and differentiators.",
    image: "/images/post36.webp",
    type: "image",
    tags: ["Carousel", "Progressive Narrative", "Brand History"]
  },
  {
    title: "Visual Identity System for Social4",
    description: "Developed a comprehensive visual system with templates, color palettes, and graphic elements for consistent brand presence.",
    image: "/images/post37.webp",
    type: "image",
    tags: ["Visual System", "Templates", "Consistency"]
  },
  {
    title: "User-Generated Content Campaign4",
    description: "Designed a framework for soliciting, curating, and featuring authentic customer content within brand channels.",
    image: "/images/post38.webp",
    type: "image",
    tags: ["UGC", "Customer Content", "Authenticity"]
  },
  {
    title: "Educational Content Series4",
    description: "Created informative and visually engaging posts establishing thought leadership and addressing customer pain points.",
    image: "/images/post39.webp",
    type: "image",
    tags: ["Educational", "Thought Leadership", "Value-Driven"]
  },
  {
    title: "Seasonal Campaign Framework4",
    description: "Developed a flexible content system for seasonal promotions that maintains brand identity while adapting to timely themes.",
    image: "/images/post40.webp",
    type: "image",
    tags: ["Seasonal", "Promotional", "Adaptable"]
  },
  {
    title: "Engagement-Driven Content Series4",
    description: "Created a cohesive set of interactive and shareable posts designed to maximize audience engagement and participation.",
    image: "/images/post41.webp",
    type: "image",
    tags: ["Interactive", "Engagement", "Series"]
  },
  {
    title: "Conversion-Optimized Ad Campaign4",
    description: "Designed and tested multiple ad variations with strategic messaging and CTAs resulting in 37% conversion improvement.",
    image: "/images/post42.webp",
    type: "image",
    tags: ["Conversion", "A/B Testing", "Call-to-Action"]
  },
  {
    title: "Platform-Specific Visual Strategy4",
    description: "Developed tailored visual content optimized for each platform's unique audience, algorithm, and content preferences.",
    image: "/images/post43.webp",
    type: "image",
    tags: ["Platform-Specific", "Algorithm Optimization", "Audience Targeting"]
  },
  {
    title: "Brand Story Carousel Series4",
    description: "Created a multi-slide carousel series that progressively reveals brand history, values, and differentiators.",
    image: "/images/post44.webp",
    type: "image",
    tags: ["Carousel", "Progressive Narrative", "Brand History"]
  },
  {
    title: "Visual Identity System for Social4",
    description: "Developed a comprehensive visual system with templates, color palettes, and graphic elements for consistent brand presence.",
    image: "/images/post45.webp",
    type: "image",
    tags: ["Visual System", "Templates", "Consistency"]
  },
  {
    title: "User-Generated Content Campaign4",
    description: "Designed a framework for soliciting, curating, and featuring authentic customer content within brand channels.",
    image: "/images/post46.webp",
    type: "image",
    tags: ["UGC", "Customer Content", "Authenticity"]
  },
  {
    title: "Educational Content Series4",
    description: "Created informative and visually engaging posts establishing thought leadership and addressing customer pain points.",
    image: "/images/post47.webp",
    type: "image",
    tags: ["Educational", "Thought Leadership", "Value-Driven"]
  },
  {
    title: "Engagement-Driven Content Series4",
    description: "Created a cohesive set of interactive and shareable posts designed to maximize audience engagement and participation.",
    image: "/images/post48.webp",
    type: "image",
    tags: ["Interactive", "Engagement", "Series"]
  },
  {
    title: "Conversion-Optimized Ad Campaign4",
    description: "Designed and tested multiple ad variations with strategic messaging and CTAs resulting in 37% conversion improvement.",
    image: "/images/post49.webp",
    type: "image",
    tags: ["Conversion", "A/B Testing", "Call-to-Action"]
  },
  {
    title: "Platform-Specific Visual Strategy4",
    description: "Developed tailored visual content optimized for each platform's unique audience, algorithm, and content preferences.",
    image: "/images/post50.webp",
    type: "image",
    tags: ["Platform-Specific", "Algorithm Optimization", "Audience Targeting"]
  },
  {
    title: "Brand Story Carousel Series4",
    description: "Created a multi-slide carousel series that progressively reveals brand history, values, and differentiators.",
    image: "/images/post51.webp",
    type: "image",
    tags: ["Carousel", "Progressive Narrative", "Brand History"]
  },
  {
    title: "Visual Identity System for Social4",
    description: "Developed a comprehensive visual system with templates, color palettes, and graphic elements for consistent brand presence.",
    image: "/images/post52.webp",
    type: "image",
    tags: ["Visual System", "Templates", "Consistency"]
  },

  {
    title: "Educational Content Series4",
    description: "Created informative and visually engaging posts establishing thought leadership and addressing customer pain points.",
    image: "/images/post53.webp",
    type: "image",
    tags: ["Educational", "Thought Leadership", "Value-Driven"]
  },
  {
    title: "Seasonal Campaign Framework4",
    description: "Developed a flexible content system for seasonal promotions that maintains brand identity while adapting to timely themes.",
    image: "/images/post54.webp",
    type: "image",
    tags: ["Seasonal", "Promotional", "Adaptable"]
  },
  {
    title: "Engagement-Driven Content Series4",
    description: "Created a cohesive set of interactive and shareable posts designed to maximize audience engagement and participation.",
    image: "/images/post55.webp",
    type: "image",
    tags: ["Interactive", "Engagement", "Series"]
  },
  {
    title: "Conversion-Optimized Ad Campaign4",
    description: "Designed and tested multiple ad variations with strategic messaging and CTAs resulting in 37% conversion improvement.",
    image: "/images/post56.webp",
    type: "image",
    tags: ["Conversion", "A/B Testing", "Call-to-Action"]
  },
  {
    title: "Platform-Specific Visual Strategy4",
    description: "Developed tailored visual content optimized for each platform's unique audience, algorithm, and content preferences.",
    image: "/images/post57.webp",
    type: "image",
    tags: ["Platform-Specific", "Algorithm Optimization", "Audience Targeting"]
  },
  {
    title: "Brand Story Carousel Series4",
    description: "Created a multi-slide carousel series that progressively reveals brand history, values, and differentiators.",
    image: "/images/post58.webp",
    type: "image",
    tags: ["Carousel", "Progressive Narrative", "Brand History"]
  },
  {
    title: "Brand Story Carousel Series5",
    description: "Created a multi-slide carousel series that progressively reveals brand history, values, and differentiators.",
    image: "/images/post59.webp",
    type: "image",
    tags: ["Carousel", "Progressive Narrative", "Brand History"]
  },
];







  