// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// export default function Hero() {
//   const navigate = useNavigate();

//   const handleClick = () => {
//     navigate('/signin'); // Programmatic navigation
//   };

//   return (
//     <div className="bg-gray-50 py-20">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center">
//           <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
//             Advanced GST Management Solutions
//           </h1>
//           <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
//             Streamline your GST compliance with our cutting-edge tools and AI-powered insights.
//           </p>
//           <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
//             <div className="rounded-md shadow">
//               <button
//                 className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
//                 onClick={handleClick}
//               >
//                 Get started
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



import React from 'react';
import FeatureSection from './FeatureSection';

const features = [
  {
    id: 'mismatch-detection',
    title: 'Mismatch Detection',
    description: 'Identify and reconcile discrepancies between your GST portal entries and accounting software data.',
    styleType: 'card'
  },
  {
    id: 'ai-identification',
    title: 'AI Chatbot',
    description: 'Leverage AI to get answers about your queries!',
    styleType: 'testimonial'
  },
  {
    id: 'real-time-wallet',
    title: 'Real-Time Wallet',
    description: 'Monitor your GST liabilities and blocked credits in real-time, ensuring optimal cash flow management.',
    styleType: 'list'
  },
  {
    id: 'itc-adjustment',
    title: 'Blocked Credits management',
    description: 'Manage and adjust Blocked Tax Credit, differentiate between Current GST credits and blocked GST credits ',
    styleType: 'split'
  },
  {
    id: 'visual-tax-management',
    title: 'Visual Tax Management',
    description: 'Get insights through visual representations of your tax data and compliance status.',
    styleType: 'card'
  }
];

export default function Hero() {
  return (
    <div>
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              Advanced GST Management Solutions
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Streamline your GST compliance with our cutting-edge tools and AI-powered insights.
            </p>
          </div>
        </div>
      </div>
      {features.map((feature) => (
        <FeatureSection key={feature.id} {...feature} />
      ))}
    </div>
  );
}
