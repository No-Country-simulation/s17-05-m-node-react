"use client";
// pages/login.tsx

import React from "react";
import Head from "next/head";
import Link from "next/link";
import useFormState from "@/hooks/useFormState";
import useFetchData from "@/hooks/useFetchData";
import { registerUser } from "@/services";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { icons } from "@/utils/icons";

const Register: React.FC = () => {
  const { fetchData } = useFetchData();
  const { formState, setFormState } = useFormState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetchData(registerUser, { body: formState });
    console.log(response);

    response.ok
      ? (toast.success("Se creo el usuario correctamente"),
        router.push("login"))
      : toast.error("No se pudo crear el usuario");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-loginBg bg-cover bg-no-repeat  py-2 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Register</title>
        <meta name="description" content="Register page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="relative max-w-lg w-full space-y-8 z-20 bg-white p-10 rounded-lg">
      <button
          onClick={() => router.push("/")}
          className="space-x-2 absolute left-5 top-5 text-black rounded-full shadow-md font-semibold px-3 py-2 bg-[#F7E2D4] flex justify-center items-center"
        >
          {icons.flecha}  
          <span>Volver</span>
        </button>
        <div className="flex justify-center">
          <img
            alt="Logo AgroSmart"
            src={"/AgroSmart.webp"}
            width={250}
            height={250}
          ></img>
        </div>

        <div>
          <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">
            Registrarse
          </h2>
        </div>
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
                value={formState.firstName}
                onChange={setFormState}
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
                value={formState.lastName}
                onChange={setFormState}
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
                value={formState.email}
                onChange={setFormState}
              />
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-seconday-green focus:border-seconday-green focus:z-10 sm:text-sm"
                placeholder="Contraseña"
                value={formState.password}
                onChange={setFormState}
              />
            </div>
          </div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-green hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-seconday-green transition-colors"
          >
            Registrarse
          </button>
          <div className="flex items-center justify-between flex-col gap-4 ">
            <div className="flex items-center gap-4">
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Recordar contraseña
              </label>
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-seconday-green border-gray-300 rounded"
              />
            </div>

            <div className="text-sm">
              <Link
                href="login"
                className="font-medium text-primary-green hover:text-seconday-green"
              >
                ¿Ya tienes una cuenta? Inicia Sesión
              </Link>
            </div>
          </div>

          <div></div>
        </form>
      </div>
      <div className="bg-black absolute inset-0 opacity-40 z-0"></div>
    </div>
  );
};

export default Register;
