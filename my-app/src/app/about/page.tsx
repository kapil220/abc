import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">About ACB Limited</h1>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
            <p className="text-gray-600">
              To become the leading yoga service provider...
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-600">
              To provide accessible, high-quality yoga services...
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Goals</h2>
            <ul className="space-y-4 text-gray-600">
              <li>• Expand our reach to serve more communities</li>
              <li>• Maintain the highest standards of yoga instruction</li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
            <ul className="space-y-4 text-gray-600">
              <li>• Authenticity in teaching and practice</li>
              <li>• Commitment to personal growth</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
