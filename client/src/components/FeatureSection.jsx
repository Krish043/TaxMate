
// import React from 'react';

// export default function FeatureSection({ id, title, description }) {
//   return (
//     <section id={id} className="py-12 bg-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="lg:text-center">
//           <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
//             {title}
//           </h2>
//           <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
//             {title}
//           </p>
//           <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
//             {description}
//           </p>
//           <div className="mt-6">
//             <a
//               href="/signin"
//               className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
//             >
//               Learn More
//             </a>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
import React from 'react';

export default function FeatureSection({ id, title, description, styleType }) {
  return (
    <section id={id} className="min-h-screen flex items-center justify-center py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {styleType === 'card' && (
          <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="text-center">
              <h2 className="text-indigo-600 font-semibold tracking-wide uppercase">
                {title}
              </h2>
              <p className="mt-4 text-2xl font-bold text-gray-900">{title}</p>
              <p className="mt-4 text-gray-500">{description}</p>
              <div className="mt-6">
                <a
                  href="/signin"
                  className="inline-block px-5 py-3 text-base font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors duration-300"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        )}

        {styleType === 'testimonial' && (
          <div className="bg-indigo-100 p-8 rounded-lg shadow-lg">
            <blockquote className="text-center text-lg text-gray-700 italic">
              "{description}"
            </blockquote>
            <p className="mt-4 text-right font-semibold text-indigo-600">
              - {title}
            </p>
          </div>
        )}

        {styleType === 'list' && (
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-indigo-600 font-semibold tracking-wide uppercase mb-4">
              {title}
            </h2>
            <ul className="list-disc pl-5 text-gray-700">
              {description.split('. ').map((item, index) => (
                <li key={index} className="mb-2">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {styleType === 'split' && (
          <div className="flex flex-col md:flex-row items-center bg-white p-6 rounded-lg shadow-md">
            <div className="md:w-1/2">
              <img
                src="path/to/image.jpg"
                alt={title}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-1/2 md:pl-6 mt-4 md:mt-0">
              <h2 className="text-indigo-600 font-semibold tracking-wide uppercase">
                {title}
              </h2>
              <p className="mt-4 text-gray-500">{description}</p>
              <div className="mt-6">
                <a
                  href="/signin"
                  className="inline-block px-5 py-3 text-base font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors duration-300"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
