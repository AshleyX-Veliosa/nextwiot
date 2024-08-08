'use client';
import React from 'react';

export default function Footer() {
    return (
        <footer className="flex flex-col items-center text-center text-white relative py-4">
            {/* Background gradient animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-200 via-orange-200 to-green-200 background-animate z-[-1]"></div>
            <div className="container pt-1 relative">
                {/* Social media icons container */}
                <div className="mb-4 flex justify-center space-x-2">
                    <a
                        href="https://www.facebook.com/profile.php?id=100089456015839"
                        type="button"
                        className="rounded-full bg-transparent p-2 font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-white/20 focus:outline-none focus:ring-0"
                        data-twe-ripple-init>
                        <span className="[&>svg]:h-4 [&>svg]:w-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 320 512">
                                <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
                            </svg>
                        </span>
                    </a>

                    <a
                        href="https://www.instagram.com/sonthaya.x/"
                        type="button"
                        className="rounded-full bg-transparent p-2 font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-white/20 focus:outline-none focus:ring-0"
                        data-twe-ripple-init>
                        <span className="mx-auto [&>svg]:h-4 [&>svg]:w-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 448 512">
                                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                            </svg>
                        </span>
                    </a>

                    {/* GitHub button */}
                    <a
                        href="https://github.com/AshleyX-Veliosa"
                        type="button"
                        className="rounded-full bg-transparent p-2 font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-white/20 focus:outline-none focus:ring-0"
                        data-twe-ripple-init>
                        <span className="[&>svg]:h-4 [&>svg]:w-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 448 512">
                                <path d="M224 0C100.3 0 0 100.3 0 224c0 99.8 64.6 184.4 153.8 214.7 11.2 2.1 15.3-4.9 15.3-10.8 0-5.3-.2-22.9-.3-41.4-62.7 13.7-75.8-30.2-75.8-30.2-10.2-26.1-24.9-33-24.9-33-20.4-13.9 1.6-13.6 1.6-13.6 22.5 1.6 34.3 23 34.3 23 20 34.2 52.5 24.4 65.3 18.7 2-14.5 7.8-24.4 14.2-30-49.7-5.6-102.1-24.8-102.1-110.2 0-24.4 8.7-44.5 23-60.3-2.3-5.6-9.9-28.1 2.2-58.8 0 0 18.9-6.1 62.1 23.3 18.1-5.1 37.6-7.7 56.8-7.7 19.2 0 38.7 2.6 56.8 7.7 43.2-29.4 62.1-23.3 62.1-23.3 12.1 30.7 4.6 53.2 2.2 58.8 14.2 15.8 23 35.9 23 60.3 0 85.5-52.4 104.6-102.1 110.2 8 6.8 15.2 20.2 15.2 40.7 0 29.3-.3 52.9-.3 60.2 0 6.1 4.1 12.9 15.3 10.8C359.4 408.4 448 323.8 448 224 448 100.3 347.7 0 224 0z" />
                            </svg>
                        </span>
                    </a>
                </div>
                <div className="text-sm">Made By AshleyX</div>
            </div>
        </footer>
    );
}
