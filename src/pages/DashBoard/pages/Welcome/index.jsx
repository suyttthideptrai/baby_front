// src/components/WelcomePage.js
import React from 'react';
import WhiteLogo from '../../../../assets/symbols/LogoWhite2Svg.svg'


const WelcomePage = () => {
  return (
    <div className="h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-500 flex flex-col items-center justify-center text-white pb-[10%]">
      {/* Header */}
      <img src={WhiteLogo} className='h-16' />
      <header className="text-center mb-10 select-none">
        <h1 className="text-5xl font-extrabold mb-4">Welcome to BabySmile management portal!</h1>
        <p className="text-2xl font-medium">Join us and explore the limitless possibilities.</p>
      </header>

      {/* Action Button */}
      <button
        className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-2xl hover:scale-105 transition transform duration-300"
      >
        Let&apos;s Go!
      </button>

      {/* Decorative Elements */}
      <div className="absolute bottom-10 flex space-x-4 opacity-60">
        <div className="w-16 h-16 bg-pink-500 rounded-full shadow-xl"></div>
        <div className="w-24 h-24 bg-primary rounded-full shadow-xl"></div>
        <div className="w-32 h-32 bg-purple-500 rounded-full shadow-xl"></div>
      </div>
    </div>
  );
};

export default WelcomePage;
