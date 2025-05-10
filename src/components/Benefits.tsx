import React from 'react';
import { Shield, Clock, DollarSign, BarChart } from 'lucide-react';

export const Benefits: React.FC = () => {
  const benefits = [
    {
      icon: <DollarSign className="h-8 w-8 text-blue-400" />,
      title: "Maximize ROI",
      description: "Get the best possible value for your unused software licenses and recover your investment.",
      backContent: "Our advanced pricing algorithms ensure you get up to 70% more value compared to traditional resale methods."
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-400" />,
      title: "100% Legal & Secure",
      description: "All transactions are fully compliant with licensing agreements and protected by our secure platform.",
      backContent: "Enterprise-grade encryption and blockchain verification ensure complete transaction security and authenticity."
    },
    {
      icon: <Clock className="h-8 w-8 text-blue-400" />,
      title: "Fast Process",
      description: "From submission to payment, our streamlined process typically takes less than 72 hours.",
      backContent: "AI-powered validation system processes licenses in real-time, with instant payment processing upon verification."
    },
    {
      icon: <BarChart className="h-8 w-8 text-blue-400" />,
      title: "Market Insights",
      description: "Access real-time market data to make informed decisions about when to buy or sell licenses.",
      backContent: "Advanced analytics and predictive modeling help you maximize returns with optimal timing suggestions."
    }
  ];

  return (
    <section id="benefits" className="py-20 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us</h2>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            SoftSell offers unique advantages that make license reselling simple, secure, and profitable.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front glass-card rounded-xl p-6 flex flex-col items-center">
                  <div className="mb-4 bg-blue-500/20 p-4 rounded-full">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-blue-200 text-center">{benefit.description}</p>
                </div>
                <div className="flip-card-back glass-card rounded-xl p-6 flex items-center justify-center text-center">
                  <p className="text-lg text-blue-100">{benefit.backContent}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};