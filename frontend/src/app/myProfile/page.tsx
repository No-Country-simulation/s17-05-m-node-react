"use client";

import React, { useEffect, useState } from "react";

import { AvatarUploader } from "@/components/AvatarUploader";
import useFormState from "@/hooks/useFormState";
import { icons } from "@/utils/icons";
import { useRouter } from "next/navigation";
import { userStore } from "@/context/zustand";
import withAuth from "../auth/withAuth";

const MyProfile: React.FC = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    newPassword: "",
    image: "",
  });

  const { user } = userStore((state) => ({
    user: state.user,
  }));

  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        firstName: user.user.firstName,
        lastName: user.user.lastName,
        email: user.user.email,
      }));
    }
  }, [user]);

  const [image, setImage] = useState(form.image);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO handleSubmit logic
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-loginBg bg-cover bg-no-repeat  py-2 px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-lg w-full space-y-8 z-20 bg-white p-10 rounded-lg">
          <button
            onClick={() => router.push("/")}
            className="space-x-2 absolute left-5 top-5 text-black rounded-full shadow-md font-semibold px-3 py-2 bg-[#F7E2D4] flex justify-center items-center"
          >
            {icons.flecha}
            <span>Volver</span>
          </button>
          <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">
            Mi Perfil
          </h2>
          <AvatarUploader image={image} setImage={setImage} />
          <form className="mt-8 space-y-8" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label htmlFor="firstName" className="sr-only">
                  Nombre
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-seconday-green focus:border-seconday-green focus:z-10 sm:text-sm"
                  placeholder="Nombre "
                  value={form.firstName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="lastName" className="sr-only">
                  Apellido
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-seconday-green focus:border-seconday-green focus:z-10 sm:text-sm"
                  placeholder="Apellido"
                  value={form.lastName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-seconday-green focus:border-seconday-green focus:z-10 sm:text-sm"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="password" className="sr-only">
                  Nueva Contraseña
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-seconday-green focus:border-seconday-green focus:z-10 sm:text-sm"
                  placeholder="Nueva Contraseña"
                  value={form.newPassword}
                  onChange={handleChange}
                />
              </div>
            </div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-green hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-seconday-green transition-colors"
            >
              Guardar Cambios
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default withAuth(MyProfile);
