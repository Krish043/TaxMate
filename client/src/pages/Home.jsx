
import React, { useState, useEffect } from 'react';
import image1 from '../assets/image1.jpg'; // Replace with the actual path to your images
import image2 from '../assets/image2.jpg'; // Replace with the actual path to your images
import image3 from '../assets/image3.jpg'; // Replace with the actual path to your images
import image4 from '../assets/image4.jpg';
import image5 from '../assets/image5.jpg';

const images = [
  {
    image: image4, // Replace with actual image import or path
    title: "Transaction Identification",
    description: "Automatically classify and identify the nature of your GST-related transactions. Enhance accuracy and reduce manual effort.",
  },
  {
    image: image1, // Replace with actual image import or path
    title: "Mismatch Detection",
    description: "Automatically identify and reconcile discrepancies between your GST portal and accounting software data. Ensure accurate and consistent records with ease.",
  },
  {
    image: image2, // Replace with actual image import or path
    title: "Real-Time GST Wallet",
    description: "Monitor your GST liabilities and blocked credits in real-time. Manage cash flow efficiently with up-to-date financial insights and tools.",
  },
  {
    image: image3, // Replace with actual image import or path
    title: "Chat With AI",
    description: "Ask your queries to AI and get answers in just one click!",
  },
  {
    image: image5, // Replace with actual image import or path
    title: "Visual Tax Management",
    description: "Gain clear insights into your tax data with intuitive charts and visual representations. Make informed decisions and stay on top of compliance with ease.",
  },
];



const Home = () => {
  
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };


  return (
    <div>
      <div className="relative w-full h-[calc(100vh-45px)] overflow-hidden hidden md:block">
  <div
    className="absolute inset-0 flex transition-transform duration-500"
    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
  >
    {images.map((item, index) => (
      <div key={index} className="w-full h-screen flex-shrink-0 relative">
        <img
          src={item.image}
          alt={`Slide ${index}`}
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent flex flex-col justify-center items-center text-center text-white px-4">
          <div className="max-w-3xl w-full text-center px-6">
          <h2 className="text-4xl font-bold mb-4 md:text-5xl">{item.title}</h2>
    <p className="text-lg md:text-xl">{item.description}</p>
  </div>
</div>

      </div>
    ))}
  </div>
  <div className="absolute bottom-4 w-full flex justify-center space-x-2">
    {images.map((_, index) => (
      <div
        key={index}
        className={`w-2.5 h-2.5 rounded-full bg-white ${
          index === currentIndex ? "bg-black" : ""
        }`}
      ></div>
    ))}
  </div>
</div>
    </div>
  )
}

export default Home
