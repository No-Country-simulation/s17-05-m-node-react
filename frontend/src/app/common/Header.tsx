import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
    return (
        <header className="bg-[#82C16F] p-4 flex justify-between items-center shadow-md">
            {/* Logo */}
            <div className="flex items-center space-x-4">
                <Link href="/" className="text-4xl font-bold text-white">
                    <span className="text-[#4B5840]">A</span>
                    <span className="text-[#D2A23A]">gro</span>
                    <span className="text-[#4B5840]">S</span>
                    <span className="text-[#D2A23A]">mart</span>
                </Link>
            </div>

            {/* Navigation Links */}
            <nav className="flex space-x-6">
                <Link href="/services" className="w-[135px] h-[47px] bg-[#F4E2C7] text-gray-800 text-lg text-center flex items-center justify-center rounded-lg shadow-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500">
                    Servicios
                </Link>
                <Link href="/market" className="w-[135px] h-[47px] bg-[#F4E2C7] text-gray-800 text-lg text-center flex items-center justify-center rounded-lg shadow-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500">
                    Mercado
                </Link>
                <Link href="/forecast" className="w-[135px] h-[47px] bg-[#F4E2C7] text-gray-800 text-lg text-center flex items-center justify-center rounded-lg shadow-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500">
                    Clima
                </Link>
                <Link href="/about" className="w-[135px] h-[47px] bg-[#F4E2C7] text-gray-800 text-lg text-center flex items-center justify-center rounded-lg shadow-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500">
                    Sobre nosotros
                </Link>
            </nav>

            {/* Login and Register Buttons */}
            <div className="flex space-x-6">
                <Link href="/login" className="w-[135px] h-[47px] bg-[#D2A23A] text-gray-800 text-lg text-center flex items-center justify-center rounded-lg shadow-md border border-gray-800 hover:bg-[#b4862a] focus:outline-none focus:ring-2 focus:ring-yellow-500">
                    Inicia sesión
                </Link>
                <Link href="/register" className="w-[135px] h-[47px] bg-[#D2A23A] text-gray-800 text-lg text-center flex items-center justify-center rounded-lg shadow-md border border-gray-800 hover:bg-[#b4862a] focus:outline-none focus:ring-2 focus:ring-yellow-500">
                    Regístrate
                </Link>
            </div>
        </header>
    );
};

export default Header;
