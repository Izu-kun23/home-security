import React, { useEffect, useState } from 'react';

const dummyProducts = [
  {
    id: 1,
    name: '4K Security Camera',
    description: 'Crystal-clear surveillance with night vision.',
    price: '$199.99',
    image: 'https://uk.ctronics.com/cdn/shop/products/ctronics-2k-4mp-security-cameras-wireless-outdoor-wifi-solar-10000mah-battery-powered-uk-ctronics-1_1024x1024.jpg?v=1715765649',
  },
  {
    id: 2,
    name: 'Smart Alarm System',
    description: 'Get instant alerts to your phone.',
    price: '$149.99',
    image: 'https://www.netatmo.com/img/bdcd533a-415d-4709-b752-7de0e8f1887a.jpg',
  },
  {
    id: 3,
    name: 'Access Control Panel',
    description: 'Secure and monitor building entry points.',
    price: '$299.99',
    image: 'https://electropeak.com/pub/media/catalog/product/cache/95f75205f3b943f313b30831421df8c2/r/f/rfid-01-005-1-cu-k15-ic10-rfid-access.jpg',
  },
  {
    id: 4,
    name: 'Wireless Doorbell',
    description: 'HD video and two-way audio support.',
    price: '$89.99',
    image: 'https://m.media-amazon.com/images/G/02/kindle/journeys/3tK3ZGUGrjlHn16z/NjQ3YzEzNTAt._FMpng_AC_SY200_QL85_CB556822198_.jpg',
  },
  {
    id: 5,
    name: 'Motion Detector',
    description: 'Smart motion detection with alerts.',
    price: '$59.99',
    image: 'https://www.inds.co.uk/wp-content/uploads/2015/08/Motion_Detector.jpg',
  },
  {
    id: 6,
    name: 'Indoor Security Camera',
    description: 'Compact and discreet with 1080p video.',
    price: '$129.99',
    image: 'https://ecsplumbing.co.uk/wp-content/uploads/2020/09/nest-cam-iq.jpg',
  },
];

const AllProducts = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="px-4 pt-5 pb-10">
        <h1 className="text-3xl font-bold mb-8 text-center">All Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {dummyProducts.map((product, index) => (
            <div
              key={product.id}
              className={`bg-gray-900 rounded-lg shadow-lg p-4 transition-all duration-1000 ease-out transform ${
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              } hover:shadow-2xl hover:-translate-y-1`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h2 className="text-lg font-semibold text-white mb-1">{product.name}</h2>
              <p className="text-gray-300 text-sm mb-2">{product.description}</p>
              <div className="text-blue-400 font-bold text-md">{product.price}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;