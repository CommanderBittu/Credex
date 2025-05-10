import React from 'react';
import { Upload, DollarSign, CreditCard } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: <Upload className="h-12 w-12 text-blue-700" />,
      title: "Upload License",
      description: "Submit your unused software license details through our secure platform."
    },
    {
      icon: <DollarSign className="h-12 w-12 text-blue-700" />,
      title: "Get Valuation",
      description: "Receive a competitive market valuation within 24 hours from our expert team."
    },
    {
      icon: <CreditCard className="h-12 w-12 text-blue-700" />,
      title: "Get Paid",
      description: "Accept our offer and get paid quickly through your preferred payment method."
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our streamlined process makes selling your unused software licenses quick and hassle-free.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-lg h-full flex flex-col items-center text-center transition-transform hover:-translate-y-2 duration-300">
                <div className="bg-blue-50 p-4 rounded-full mb-6">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <div className="h-0.5 w-8 bg-blue-200"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};