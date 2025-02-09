import React from 'react';
import { Instagram, Linkedin, Facebook } from 'lucide-react';

interface SocialLinksProps {
  className?: string;
}

const SocialLinks: React.FC<SocialLinksProps> = ({ className = '' }) => {
  return (
    <div className={`flex space-x-4 ${className}`}>
      <a href="#" className="hover:text-blue-500" aria-label="Instagram">
        <Instagram className="h-6 w-6" />
      </a>
      <a href="#" className="hover:text-blue-500" aria-label="LinkedIn">
        <Linkedin className="h-6 w-6" />
      </a>
      <a href="#" className="hover:text-blue-500" aria-label="Facebook">
        <Facebook className="h-6 w-6" />
      </a>
    </div>
  );
};

export default SocialLinks;
