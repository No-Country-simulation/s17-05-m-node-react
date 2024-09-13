"use client";
import React, { useState } from "react";
import Link from "next/link";
import { userStore } from "@/context/zustand";
import MenuButton from "@/components/MenuButton";
import { NotificationLogo } from "@/svg/NotificationLogo";

const Header: React.FC = () => {
  const user = userStore((data) => data.user);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  return (
    <header
      className="bg-primary-green
                 lg:p-4
                 h-[60px]
                 lg:h-full
                 flex
                 justify-between
                 items-center
                 shadow-md

                 relative
                 "
    >
      {/* Logo */}
      <div
        className="w-full
                   lg:w-fit
                   lg:block
                   flex
                   justify-center"
      >
        <img
          src="/AgroSmart.png"
          alt="Logo AgroSmart"
          className="lg:w-[250px]
                     -mb-2
                     w-[200px]"
        />
      </div>

      <div
        className="lg:hidden
                   absolute
                   z-[100]"
      >
        <MenuButton
          setIsMenuVisible={setIsMenuVisible}
          isMenuVisible={isMenuVisible}
        />
      </div>

      {/* Navigation Links */}
      <nav
        className={`lg:flex
                    lg:space-x-6

                   absolute
                   lg:relative
                   flex-col
                   lg:flex-row
                   top-0
                   left-0
                   px-4
                   lg:px-0
                   ${!user ? "pt-[214px] lg:pt-0" : "pt-[80px] lg:pt-0"}
                   pb-[40px]
                   lg:pb-0
                   bg-primary-green
                   lg:bg-transparent
                   shadow-md
                   lg:shadow-none
                   space-y-6
                   lg:space-y-0
                   min-h-screen
                   lg:min-h-full
                   h-max-content
                   lg:h-full
                   ${isMenuVisible ? "translate-x-0" : "-translate-x-full"}
                   lg:translate-x-0
                   transition-transform
                   transition-opacity
                   ease-in-out`}
      >
        <Link
          href="/services"
          className="w-[135px]
                     h-[47px]
                     bg-[#F4E2C7]
                     text-gray-800
                     text-lg
                     text-center
                     flex items-center
                     justify-center
                     rounded-lg shadow-md
                     hover:bg-gray-200
                     focus:outline-none
                     focus:ring-2
                     focus:ring-green-500"
        >
          Servicios
        </Link>
        <Link
          href="/market"
          className="w-[135px]
                     h-[47px]
                     bg-[#F4E2C7]
                     text-gray-800
                     text-lg text-center
                     flex items-center
                     justify-center
                     rounded-lg
                     shadow-md
                     hover:bg-gray-200
                     focus:outline-none
                     focus:ring-2
                     focus:ring-green-500"
        >
          Mercado
        </Link>
        <Link
          href="/home"
          className="w-[135px]
                     h-[47px]
                     bg-[#F4E2C7]
                     text-gray-800
                     text-lg text-center
                     flex items-center
                     justify-center
                     rounded-lg
                     shadow-md
                     hover:bg-gray-200
                     focus:outline-none
                     focus:ring-2
                     focus:ring-green-500"
        >
          Clima
        </Link>
        <Link
          href="/about"
          className="w-[135px]
                     h-[47px]
                     bg-[#F4E2C7]
                     text-gray-800
                     text-lg text-center
                     flex items-center
                     justify-center
                     rounded-lg
                     shadow-md
                     hover:bg-gray-200
                     focus:outline-none
                     focus:ring-2
                     focus:ring-green-500"
        >
          Sobre nosotros
        </Link>
      </nav>

      {/* Login and Register Buttons */}
      {!user ? (
        <div
          className={`flex
                      lg:space-x-6
                     
                     absolute
                     lg:relative
                     pt-[79px]
                     lg:pt-0
                     top-0
                     left-0
                     flex-col
                     lg:flex-row
                     px-4
                     lg:px-0
                     w-full
                     lg:w-fit
                     space-y-5
                     lg:space-y-0
                     ${
                       isMenuVisible
                         ? "translate-x-0 lg:translate-x-0"
                         : "-translate-x-full lg:translate-x-0"
                     }
                     transition-transform
                     transition-opacity
                     ease-in-out`}
        >
          <Link
            href="/login"
            className="w-[135px] h-[47px]
                       bg-[#D2A23A]
                       text-gray-800
                       text-lg
                       text-center
                       flex items-center
                       justify-center
                       rounded-lg
                       shadow-md
                       border
                       border-gray-800
                       hover:bg-[#b4862a]
                       focus:outline-none
                       focus:ring-2
                       focus:ring-yellow-500"
          >
            Inicia sesión
          </Link>
          <Link
            href="/register"
            className="w-[135px] h-[47px]
                       bg-[#D2A23A]
                       text-gray-800
                       text-lg text-center
                       flex items-center
                       justify-center
                       rounded-lg
                       shadow-md
                       border border-gray-800
                       hover:bg-[#b4862a]
                       focus:outline-none
                       focus:ring-2
                       focus:ring-yellow-500"
          >
            Regístrate
          </Link>
        </div>
      ) : (
        <div
          className="flex
                     items-center
                     lg:space-x-6

                     space-x-3
                     
                     absolute
                     lg:relative
                     right-2
                     lg:right-0"
        >
          <Link
            href="/register"
            className="hidden
                       lg:flex
                       lg:h-[47px]
                       px-5
                       bg-[#D2A23A]
                       text-gray-800
                       text-lg
                       text-center
                       items-center
                       justify-center
                       rounded-full
                       shadow-md border
                       border-gray-800
                       hover:bg-[#b4862a]
                       focus:outline-none
                       focus:ring-2
                       focus:ring-yellow-500"
          >
            notificaciones
          </Link>

          <Link href="/register" className="lg:hidden">
            <NotificationLogo />
          </Link>

          <Link
            href="/register"
            className="w-12
                       h-12
                       lg:w-16
                       lg:h-16
                       bg-[#D2A23A]
                       text-gray-800
                       text-lg
                       text-center
                       flex items-center
                       justify-center
                       rounded-full
                       shadow-md
                       border
                       border-gray-800
                       hover:bg-[#b4862a]
                       focus:outline-none
                       focus:ring-2
                       focus:ring-yellow-500"
          >
            img
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
