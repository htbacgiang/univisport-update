import React from 'react';
import Image from 'next/image';

const partners = [
  { id: 3, name: 'Partner 18', logo: '/khach-hang/18.png' },
  { id: 1, name: 'Partner 16', logo: '/khach-hang/16.jpg' },
  { id: 2, name: 'Partner 17', logo: '/khach-hang/17.png' },
  { id: 4, name: 'Partner 19', logo: '/khach-hang/19.png' },
  { id: 5, name: 'Partner 1', logo: '/khach-hang/1.jpg' },
  { id: 50, name: 'Partner 2', logo: '/khach-hang/2.jpg' },
  { id: 6, name: 'Partner 3', logo: '/khach-hang/3.jpg' },
  { id: 7, name: 'Partner 4', logo: '/khach-hang/4.jpg' },
  { id: 8, name: 'Partner 5', logo: '/khach-hang/5.jpg' },
  { id: 9, name: 'Partner 6', logo: '/khach-hang/6.jpg' },
  { id: 10, name: 'Partner 7', logo: '/khach-hang/7.jpg' },
  { id: 11, name: 'Partner 8', logo: '/khach-hang/8.jpg' },
  { id: 12, name: 'Partner 9', logo: '/khach-hang/9.jpg' },
  { id: 13, name: 'Partner 10', logo: '/khach-hang/10.jpg' },
  { id: 14, name: 'Partner 11', logo: '/khach-hang/11.jpg' },
  { id: 15, name: 'Partner 12', logo: '/khach-hang/12.jpg' },
  { id: 16, name: 'Partner 13', logo: '/khach-hang/13.jpg' },
  { id: 17, name: 'Partner 15', logo: '/khach-hang/15.jpg' },
];

const PartnersSection = () => {
  return (
    <section className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">

      {/* Partners / Logos Grid */}
      <div className="container mx-auto">
        <div className="grid grid-cols-6 md:grid-cols-6 lg:grid-cols-6 gap-4 md:gap-4 items-center justify-items-center ">
          {partners.map((partner) => (
            <div key={partner.id} className="transition-all duration-300 transform hover:scale-105">
              <Image
                src={partner.logo}
                alt={`${partner.name} logo`}
                width={120}
                height={60}
                className="h-10 sm:h-20 md:h-20 w-auto object-contain mix-blend-multiply" // Added mix-blend-multiply to remove white backgrounds cleanly
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;