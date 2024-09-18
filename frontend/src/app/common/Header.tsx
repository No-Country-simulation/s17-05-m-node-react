"use client";
import React, { useState } from "react";
import Link from "next/link";
import { userStore } from "@/context/zustand";
import MenuButton from "@/components/MenuButton";
import { NotificationLogo } from "@/svg/NotificationLogo";
import { useRouter } from "next/navigation";

const Header: React.FC = () => {
  const { user, closeSesion } = userStore.getState();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const router = useRouter();

  const removeUser = () => {
    if (window) localStorage.removeItem("userStore");
    closeSesion();
  };
  return (
    <header
      className="bg-primary-green
                 h-[50px]
                 lg:h-[75px]
                 px-6
                 flex
                 justify-between
                 items-center
                 shadow-md
                 relative
                 z-[100]
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
          src="/AgroSmart.webp"
          alt="Logo AgroSmart"
          onClick={() => router.push("/")}
          className="lg:w-[200px]
                     -mb-2
                     w-[150px]
                     cursor-pointer"
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
                   items-center
                   ${isMenuVisible ? "translate-x-0" : "-translate-x-full"}
                   lg:translate-x-0
                   transition-transform
                   transition-opacity
                   ease-in-out`}
      >
        <Link
          href="/home"
          className="w-[135px]
                     h-[43px]
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
          href="/myFields"
          className="w-[135px]
                     h-[43px]
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
          Mis campos
        </Link>
        <Link
          href="/market"
          className="w-[135px]
                     h-[43px]
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
        {/* <Link
          href="/about"
          className="w-[135px]
                     h-[43px]
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
        </Link> */}
        <Link
          href="/agroMentor"
          className="w-[135px]
                     h-[43px]
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
          AgroMentor
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
            className="w-[135px]
                       md:w-fit
                       h-[43px]
                       px-2
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
            className="w-[135px] h-[43px]
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
            href="/"
            onClick={removeUser}
            className="hidden
                       lg:flex
                       lg:h-[43px]
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
                       focus:ring-yellow-500
                       transition-colors"
          >
            Cerrar sesion
          </Link>

          <Link href="/register" className="lg:hidden">
            <NotificationLogo />
          </Link>

          <Link
            href="/register"
            className="w-11
                       h-11
                       lg:w-14
                       lg:h-14
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
                       focus:ring-yellow-500
                       bg-[url('/avatar.webp')]"
          >
            {/* <img src="/avatar.webp" alt="avatar" className="w-full" /> */}
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
