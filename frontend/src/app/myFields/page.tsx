"use client";

import { userStore } from "@/context/zustand";
import { useRouter } from "next/navigation";
import Field from "../../components/field/Field";
import Header from "../common/Header";
import Footer from "../common/Footer";
import withAuth from "../auth/withAuth";
// import { useState } from "react";

// interface FieldData {
//   id: number;
//   userId : number;
//   name: string;
//   location: string;
//   size: number;
//   employees: number;
//   mainCrop: string;
//   climate: string;
//   administration: string;
//   season: string;
// }
const MyFields = () => {
  // const dbFields = ;
  const fields= userStore((user) => user.fields);
  const router = useRouter();
  console.log(fields)
  return (
    <>
    <Header/>
    <div className=" min-h-custom bg-primary p-10 flex flex-col justify-between items-center text-black">
      {fields.length ? (
            <div className="h-full w-full max-w-[600px]">  
            <h1 className="text-3xl font-bold mb-6 text-center">Mis campos</h1>
            <div className="space-y-4 ">
              {fields.map((field) => (
                <Field key={field.id} field={field} />
              ))}
            </div>

          </div>
      ) : (
        <h3 className="text-2xl font-semibold">No hay campos creados!!</h3>
      )}
      <button
        onClick={() => router.push("myFields/createField")}
        className="mt-4 bg-[#2f6c3d] text-white px-4 py-2 rounded"
      >
        Crear campo
      </button>
    </div>
    <Footer/>
    </>
  );
};

export default  withAuth(MyFields);
