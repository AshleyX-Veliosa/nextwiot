'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function NavBar() {
  const { data: session } = useSession();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="flex flex-col items-center text-center text-white relative py-4">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-300 via-orange-300 to-sky-300 background-animate z-[-1]"></div>
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center text-white font-bold text-2xl hover:text-gray-200 transition-colors duration-300">
            <Image
              src="/logo/icon.gif"
              alt="Logo"
              width={50}
              height={50}
              className="mr-2 rounded-full border-2 border-white"
              unoptimized
            />
            Weather App
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          {session ? (
            <>
              <div className="flex items-center space-x-2">
                {session.user?.image && (
                  <Image
                    src={session.user.image}
                    alt={session.user.name || 'User Image'}
                    width={40}
                    height={40}
                    className="rounded-full border-2 border-white"
                    unoptimized
                  />
                )}
                <span className="text-white font-bold">{session.user?.name}</span>
              </div>
              <button
                onClick={() => signOut()}
                className="hover:text-gray-200 text-white font-bold"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => signIn('discord')}
              className="hover:text-gray-200 text-white font-bold flex items-center space-x-2"
            >
              <svg
                className="w-5 h-5 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12H9m6 0V8m0 4v4"></path>
              </svg>
              Login
            </button>
          )}
        </div>
        <button className="md:hidden flex items-center text-white" onClick={toggleMobileMenu}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden flex flex-col items-center mt-4 space-y-4">
          {session ? (
            <>
              <div className="flex items-center space-x-2">
                {session.user?.image && (
                  <Image
                    src={session.user.image}
                    alt={session.user.name || 'User Image'}
                    width={30}
                    height={30}
                    className="rounded-full border-2 border-white"
                    unoptimized
                  />
                )}
                <span className="text-white font-bold">{session.user?.name}</span>
              </div>
              <button
                onClick={() => signOut()}
                className="hover:text-gray-200 text-white font-bold"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => signIn('discord')}
              className="hover:text-gray-200 text-white font-bold flex items-center space-x-2"
            >
              <svg
                className="w-5 h-5 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12H9m6 0V8m0 4v4"></path>
              </svg>
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
