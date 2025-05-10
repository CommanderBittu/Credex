import React from 'react';
import { ArrowRight } from 'lucide-react';

export const Hero: React.FC = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center hero-gradient overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3183165/pexels-photo-3183165.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center opacity-5"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-purple-900/50"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <div className="inline-block mb-8">
              <div className="glass-card px-6 py-2 rounded-full">
                <span className="text-blue-300">The Future of Software License Trading</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Unlock the <span className="bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">Value</span> in Your Unused Software Licenses
            </h1>
            <p className="text-xl md:text-2xl text-blue-200 mb-10 max-w-2xl mx-auto">
              SoftSell helps businesses buy and sell unused software licenses at competitive prices, turning idle assets into cash flow.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={scrollToContact}
                className="glass-card text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-blue-600/20 transition-all duration-300 transform hover:-translate-y-1"
              >
                Sell My Licenses
              </button>
              <button
                onClick={scrollToContact}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-lg text-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                Get a Quote <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 to-transparent"></div>
    </section>
  );
};