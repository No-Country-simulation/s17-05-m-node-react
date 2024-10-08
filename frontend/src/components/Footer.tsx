import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebookF, faPinterest, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faMapMarkerAlt, faPhoneAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-900 text-gray-400 py-10">
            <div className="container mx-auto flex flex-wrap justify-between items-center">
                {/* Logo and Description */}
                <div className="max-w-sm">
                    <h1 className="text-4xl font-bold">
                        <span className="text-green-700">A</span>
                        <span className="text-yellow-600">gro</span>
                        <span className="text-green-700">S</span>
                        <span className="text-yellow-600">mart</span>
                    </h1>
                    <p className="mt-4 text-gray-300">
                        There are many variations of passages of lorem ipsum available, but the majority suffered.
                    </p>
                    {/* Social Media Icons */}
                    <div className="flex mt-6" style={{ width: '270px', height: '40px', gap: '80px', paddingRight: '80px' }}>
                        <a href="#" className="text-gray-400 hover:text-white">
                            <div className="p-2 bg-gray-800 rounded-full">
                                <FontAwesomeIcon icon={faTwitter} className="w-4 h-4" />
                            </div>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white">
                            <div className="p-2 bg-gray-800 rounded-full">
                                <FontAwesomeIcon icon={faFacebookF} className="w-4 h-4" />
                            </div>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white">
                            <div className="p-2 bg-gray-800 rounded-full">
                                <FontAwesomeIcon icon={faPinterest} className="w-4 h-4" />
                            </div>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white">
                            <div className="p-2 bg-gray-800 rounded-full">
                                <FontAwesomeIcon icon={faInstagram} className="w-4 h-4" />
                            </div>
                        </a>
                    </div>
                </div>

                {/* Contact Info */}
                <div className="text-left">
                    <h2 className="text-xl font-semibold text-white">Contact</h2>
                    <div className="border-b-2 border-green-500 w-10 mt-2 mb-4"></div>
                    <ul className="space-y-2">
                        <li className="flex items-center">
                            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-yellow-500 w-4 h-4 mr-3" />
                            <span>80 broklyn golden street line, New York, USA</span>
                        </li>
                        <li className="flex items-center">
                            <FontAwesomeIcon icon={faPhoneAlt} className="text-yellow-500 w-4 h-4 mr-3" />
                            <span>666 888 0000</span>
                        </li>
                        <li className="flex items-center">
                            <FontAwesomeIcon icon={faEnvelope} className="text-yellow-500 w-4 h-4 mr-3" />
                            <span>needhelp@company.com</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="border-t border-gray-700 mt-10 pt-6">
                <div className="container mx-auto flex justify-between items-center">
                    <p className="text-sm text-gray-400">
                        &copy; All Copyright 2024 by shawonetc Themes
                    </p>
                    <div className="flex space-x-4 text-sm text-gray-400">
                        <a href="#" className="hover:underline">Terms of Use</a>
                        <span>|</span>
                        <a href="#" className="hover:underline">Privacy Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
