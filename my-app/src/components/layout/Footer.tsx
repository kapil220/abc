import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white mt-auto py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center space-x-6">
          <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
          <FooterLink href="/terms-of-service">Terms of Service</FooterLink>
          <FooterLink href="/sitemap">Sitemap</FooterLink>
        </div>
        <p className="mt-4 text-center">© {new Date().getFullYear()} ACB Limited. All rights reserved.</p>
      </div>
    </footer>
  );
};

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, children }) => (
  <a href={href} className="text-gray-300 hover:text-white">
    {children}
  </a>
);

export default Footer;
