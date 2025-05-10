import React from 'react';
import { Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      quote: "SoftSell helped us recover over $50,000 from unused enterprise software licenses. The process was seamless and their valuation was higher than competitors.",
      name: "Sarah Johnson",
      role: "CTO",
      company: "Nexus Technologies"
    },
    {
      quote: "As a growing startup, we saved thousands by purchasing pre-owned software licenses through SoftSell. Their verification process gave us complete confidence in the transaction.",
      name: "Michael Chen",
      role: "Operations Director",
      company: "Elevate Solutions"
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-blue-700 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our clients have to say about their experience with SoftSell.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg p-8 shadow-lg text-gray-800 relative"
            >
              <Quote className="absolute top-4 right-4 h-10 w-10 text-blue-100" />
              <p className="text-lg mb-6 italic">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <div className="bg-blue-100 h-12 w-12 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-700 font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-gray-600">{testimonial.role}, {testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};