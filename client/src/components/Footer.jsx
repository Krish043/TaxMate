// import React from 'react';

// export default function Footer() {
//   return (
//     <footer className="bg-gray-800">
//       <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center">
//           <div className="flex justify-center space-x-6 md:order-2">
//             <a href="#" className="text-gray-400 hover:text-gray-300">
//               About
//             </a>
//             <a href="#" className="text-gray-400 hover:text-gray-300">
//               Contact
//             </a>
//             <a href="#" className="text-gray-400 hover:text-gray-300">
//               Terms
//             </a>
//             <a href="#" className="text-gray-400 hover:text-gray-300">
//               Privacy
//             </a>
//           </div>
//           <div className="mt-8 md:mt-0 md:order-1">
//             <p className="text-center text-base text-gray-400">
//               &copy; 2023 GST Solutions. All rights reserved.
//             </p>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }


import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 w-full absolute  ">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex justify-center space-x-6 md:order-2">
            <a href="#" className="text-gray-400 hover:text-gray-300">
              About
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-300">
              Contact
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-300">
              Terms
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-300">
              Privacy
            </a>
          </div>
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-base text-gray-400">
              &copy; 2023 GST Solutions. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
