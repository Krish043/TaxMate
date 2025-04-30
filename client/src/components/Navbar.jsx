// import { useState, useEffect } from 'react';
// import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
// import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
// import { NavLink, useNavigate } from 'react-router-dom';
// import logo from '/logo.jpg'
// const navigation = [
//   { name: 'Reconciliation', href: '/mismatch', anchor: '#mismatch-detection' },
//   { name: 'Real-Time Wallet', href: '/wallet', anchor: '#real-time-wallet' },
//   { name: 'Blocked Credits', href: '/ai', anchor: '#ai-identification' },
//   { name: 'ITC Adjustment', href: '/itc', anchor: '#inter-departmental-transfer' },
//   { name: 'Visual Tax Management', href: '/tax', anchor: '#visual-tax-management' },
//   { name: 'Chat With AI', href: '/chat', anchor: '#visual-tax-management' },
// ];

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ');
// }

// export default function Navbar() {
//   const navigate = useNavigate();
//   const [auth, setAuth] = useState({ auth: false }); // Default auth state

//   useEffect(() => {
//     const localAuth = localStorage.getItem('auth');
//     if (!localAuth) {
//       localStorage.setItem("auth", JSON.stringify({ name: '', email: '', auth: false, role: '' }));
//     }
//     setAuth(JSON.parse(localAuth));
//   }, []);

//   const signOut = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("auth");
//     setAuth({ auth: false });
//     navigate('/');
//     window.location.reload();
//   };

//   const handleNavigation = (item) => {
//     if (auth.auth) {
//       navigate(item.href);
//     } else {
//       const element = document.querySelector(item.anchor);
//       if (element) {
//         element.scrollIntoView({ behavior: 'smooth' });
//       }
//     }
//   };

//   return (
//     <Disclosure as="nav" className="bg-black bg-opacity-30 backdrop-blur-md shadow-md fixed top-0 left-0 w-full z-10">
//       <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
//         <div className="relative flex h-18 items-center justify-between">
//           <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
//             <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-200 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-600">
//               <span className="sr-only">Open main menu</span>
//               <Bars3Icon aria-hidden="true" className="block h-6 w-6" />
//               <XMarkIcon aria-hidden="true" className="hidden h-6 w-6" />
//             </DisclosureButton>
//           </div>
//           <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
//             <div className="flex flex-shrink-0 items-center">
//               <img
//                 alt="Your Company"
//                 src={logo}
//                 className="h-[60px] w-[60px] rounded-full p-1 m-1 object-cover hover:cursor-pointer"
//                 onClick={() => navigate('/')}
//               />
//             </div>
//             <div className="hidden sm:ml-6 sm:flex items-center">
//               <div className="flex space-x-4">
//                 {navigation.map((item) => (
//                   <a
//                     key={item.name}
//                     onClick={() => handleNavigation(item)}
//                     className="cursor-pointer text-white hover:text-black hover:bg-white rounded-full px-3 py-2 text-sm font-medium transition-all duration-300"
//                   >
//                     {item.name}
//                   </a>
//                 ))}
//               </div>
//             </div>
//           </div>
//           <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
//             {auth.auth ? (
//               <>
//                 <button
//                   type="button"
//                   className="relative rounded-full bg-white p-1 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
//                 >
//                   <span className="sr-only">View notifications</span>
//                   <BellIcon aria-hidden="true" className="h-6 w-6" />
//                 </button>
//                 <Menu as="div" className="relative ml-3">
//                   <div>
//                     <MenuButton className="relative flex rounded-full bg-white object-contain text-sm focus:outline-none focus:ring-2 focus:ring-gray-600">
//                       <span className="sr-only">Open user menu</span>
//                       <img
//                         alt=""
//                         src={auth.img}
//                         className="h-12 w-12 rounded-full p-0 m-0 object-cover"
//                       />
//                     </MenuButton>
//                   </div>
//                   <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//                     <MenuItem disabled>
//                       <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-bold">
//                         Hi!, {auth.name}
//                       </div>
//                     </MenuItem>
//                     <MenuItem>
//                       <NavLink to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
//                         Your Profile
//                       </NavLink>
//                     </MenuItem>
//                     <MenuItem>
//                       <a href="#" onClick={signOut} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
//                         Sign out
//                       </a>
//                     </MenuItem>
//                   </MenuItems>
//                 </Menu>
//               </>
//             ) : (
//               <NavLink to="/signin" className="text-white hover:text-black">
//                 <button className="py-2 bg-[#25941f] text-white hover:text-black">Sign In</button>
//               </NavLink>
//             )}
//           </div>
//         </div>
//       </div>

//       <DisclosurePanel className="sm:hidden">
//         <div className="space-y-1 px-2 pb-3 pt-2">
//           {navigation.map((item) => (
//             <DisclosureButton
//               key={item.name}
//               as="a"
//               onClick={() => handleNavigation(item)}
//               className="block rounded-md px-3 py-2 text-base font-medium text-white hover:text-black transition-all duration-300"
//             >
//               {item.name}
//             </DisclosureButton>
//           ))}
//         </div>
//       </DisclosurePanel>
//     </Disclosure>
//   );
// }


import { useState, useEffect } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "/logo.jpg";

const navigation = [
  { name: "Blocked Credits", href: "/ai", anchor: "#ai-identification" },
  { name: "Reconciliation", href: "/mismatch", anchor: "#mismatch-detection" },
  { name: "Real-Time Wallet", href: "/wallet", anchor: "#real-time-wallet" },
  { name: "Chat With AI", href: "/chat", anchor: "#visual-tax-management" },
  { name: "Visual Tax Management", href: "/tax", anchor: "#visual-tax-management" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const navigate = useNavigate();
  const [auth, setAuth] = useState({ auth: false }); // Default auth state

  useEffect(() => {
    const localAuth = localStorage.getItem("auth");
    if (!localAuth) {
      localStorage.setItem("auth", JSON.stringify({ name: "", email: "", auth: false, role: "" }));
    }
    setAuth(JSON.parse(localAuth));
  }, []);

  const signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("auth");
    setAuth({ auth: false });
    navigate("/");
    window.location.reload();
  };

  const handleNavigation = (item) => {
    if (auth.auth) {
      navigate(item.href);
    } else {
      navigate("/signin"); // Redirect unauthenticated users to the sign-in page
    }
  };

  return (
    <Disclosure as="nav" className="bg-black bg-opacity-30 backdrop-blur-md shadow-md fixed top-0 left-0 w-full z-10">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-18 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-200 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-600">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block h-6 w-6" />
              <XMarkIcon aria-hidden="true" className="hidden h-6 w-6" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img
                alt="Your Company"
                src={logo}
                className="h-[60px] w-[60px] rounded-full p-1 m-1 object-cover hover:cursor-pointer"
                onClick={() => navigate("/")}
              />
              <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-white">
              TaxMate
            </h2>
            </div>
            <div className="hidden sm:ml-6 sm:flex items-center">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    onClick={() => handleNavigation(item)}
                    className="cursor-pointer text-white hover:text-black hover:bg-white rounded-full px-3 py-2 text-sm font-medium transition-all duration-300"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {auth.auth ? (
              <>
                <button
                  type="button"
                  className="relative rounded-full bg-white p-1 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon aria-hidden="true" className="h-6 w-6" />
                </button>
                <Menu as="div" className="relative ml-3">
                  <div>
                    <MenuButton className="relative flex rounded-full bg-white object-contain text-sm focus:outline-none focus:ring-2 focus:ring-gray-600">
                      <span className="sr-only">Open user menu</span>
                      <img
                        alt=""
                        src={auth.img}
                        className="h-12 w-12 rounded-full p-0 m-0 object-cover"
                      />
                    </MenuButton>
                  </div>
                  <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <MenuItem disabled>
                      <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-bold">
                        Hi!, {auth.name}
                      </div>
                    </MenuItem>
                    <MenuItem>
                      <NavLink to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Your Profile
                      </NavLink>
                    </MenuItem>
                    <MenuItem>
                      <a href="#" onClick={signOut} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Sign out
                      </a>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              </>
            ) : (
              <NavLink to="/signin" className="text-white hover:text-black">
                <button className="py-2 bg-[#25941f] text-white hover:text-black">Sign In</button>
              </NavLink>
            )}
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              onClick={() => handleNavigation(item)}
              className="block rounded-md px-3 py-2 text-base font-medium text-white hover:text-black transition-all duration-300"
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
