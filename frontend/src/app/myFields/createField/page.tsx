"use client";

import React, { useEffect, useState } from "react";
import { SubmitButton } from "@/components/form/SubmitButton";
import { Input } from "@/components/form/Input";
import { Select } from "@/components/form/Select";
import {
  locationInputFields,
  newFieldInputFields,
  newFieldSelectFields,
} from "@/utils/inputFields";
import useFetchData from "@/hooks/useFetchData";
import { createCampo } from "@/services";
import { toast } from "sonner";
import { userStore } from "@/context/zustand";
import { useRouter } from "next/navigation";
import { isDecimal, isPositiveInteger } from "@/utils/validators";
import dynamic from "next/dynamic";
import withAuth from "@/app/auth/withAuth";

const MapView = dynamic(() => import("../../../components/MapView"), {
  ssr: false,
});

const CreateField: React.FC = () => {
  const { fetchData } = useFetchData();
  const { user, addField } = userStore((data) => data);
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    latitude: "",
    longitude: "",
    size: "",
    workersAmount: "",
    mainCrop: "",
    weatherType: "",
    administration: "",
    season: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newField = {
      userId: user?.user.id,
      name: form.name,
      latitude: parseFloat(form.latitude),
      longitude: parseFloat(form.longitude),
      size: parseFloat(form.size),
      workersAmount: parseFloat(form.workersAmount),
      mainCrop: form.mainCrop,
      weatherType: form.weatherType,
      administration: form.administration,
      season: form.season,
    };

    const { ok, data } = await fetchData(createCampo, { body: newField });

    ok
      ? (toast.success("Se creo el campo correctamente!!"),
        addField(data),
        router.push("/myFields"))
      : toast.error("No se pudo crear el campo!!");

    console.log(data);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        setForm((prev) => ({
          ...prev,
          latitude: coords.latitude + "",
          longitude: coords.longitude + "",
        }));
      });
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;

    if ((name === "latitude" || name === "longitude") && !isDecimal(value))
      return;

    if (
      (name === "size" || name === "workersAmount") &&
      !isPositiveInteger(value)
    )
      return;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <h3
        className="text-black
                   text-[21px]
                   md:text-2xl  
                   font-[400]
                   my-[42px]"
      >
        Agregar Campo
      </h3>

      <form
        className="
                   m-auto
                   space-y-3
                   "
        onSubmit={handleSubmit}
      >
        <div className="md:flex justify-center md:space-x-4">
          <div className="space-y-2 mb-8 md:mb-0">
            {newFieldInputFields.map((field, index) => (
              <div className="relative" key={index + 1}>
                <Input
                  label={field.label}
                  name={field.name}
                  value={form[field.name as keyof typeof form]}
                  type={"text"}
                  handleChange={handleChange}
                />
              </div>
            ))}

            {newFieldSelectFields.map((field, index) => (
              <Select
                key={index}
                name={field.name}
                handleChange={handleChange}
                value={form[field.name as keyof typeof form]}
                options={field.options}
              />
            ))}
          </div>

          <div>
            <MapView
              latitude={parseFloat(form.latitude)}
              longitude={parseFloat(form.longitude)}
            />
            <div className="flex mt-5 space-x-2 justify-center">
              {locationInputFields.map((field, index) => (
                <div className="relative" key={index + 1}>
                  <Input
                    label={field.label}
                    name={field.name}
                    value={form[field.name as keyof typeof form]}
                    type={"text"}
                    handleChange={handleChange}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="py-2">
          <SubmitButton value="Agregar" />
        </div>
      </form>
    </div>
  );
};

export default withAuth(CreateField);
