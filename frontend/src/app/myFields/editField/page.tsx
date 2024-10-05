"use client";

import React, { useEffect, useState } from "react";
import { SubmitButton } from "@/components/form/SubmitButton";
import { Input } from "@/components/form/Input";
import { Select } from "@/components/form/Select";
import { newFieldInputFields, newFieldSelectFields } from "@/utils/inputFields";
import useFetchData from "@/hooks/useFetchData";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { isDecimal, isPositiveInteger } from "@/utils/validators";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { userStore } from "@/context/zustand";
import withAuth from "@/app/auth/withAuth";

const MapView = dynamic(() => import("../../../components/MapView"), {
  ssr: false,
});

const EditField: React.FC = () => {
  const searchParams = useSearchParams();
  const fieldId = searchParams.get("id");
  const router = useRouter();

  const { editField } = userStore((data) => data);

  const { fetchData } = useFetchData();
  const [form, setForm] = useState({
    id: "",
    userId: "",
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

    if (!fieldId) return;

    const updatedField = {
      userId: form.userId,
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

    // const { status, response } = await fetchData("editCampo", {
    //   url: fieldId,
    //   body: updatedField,
    // });

    // status
    //   ? (toast.success("Se editó el campo correctamente!!"),
    //     editField(response),
    //     router.push("/myFields"))
    //   : toast.error("No se pudo editar el campo!!");

    // console.log(data)
    toast.error("No se pudo editar el campo!!");
  };

  useEffect(() => {
    if (!fieldId) {
      router.push("/myFields");
      return;
    }
    console.log("Fetching field data");
    const getFieldData = async () => {
      const { status, response } = await fetchData("getCampoById", fieldId );

      status
        ? setForm({
            id: response.id,
            userId: response.userId,
            name: response.name,
            latitude: response.latitude + "",
            longitude: response.longitude + "",
            size: response.size + "",
            workersAmount: response.workersAmount + "",
            mainCrop: response.mainCrop,
            weatherType: response.weatherType,
            administration: response.administration,
            season: response.season,
          })
        : toast.error("No se pudieron cargar los datos del campo");
    };

    getFieldData();
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
                   md:text-[25px]
                   font-[400]
                   mt-[42px]"
      >
        Editar Campo
      </h3>

      <form
        className="w-[298px]
                   m-auto
                   mt-[36px]
                   md:mt-[77px]
                   space-y-3
                   md:space-y-4"
        onSubmit={handleSubmit}
      >
        {newFieldInputFields.slice(0, 3).map((field, index) => (
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

        <MapView
          latitude={parseFloat(form.latitude)}
          longitude={parseFloat(form.longitude)}
        />

        {newFieldInputFields.slice(3, 5).map((field, index) => (
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

        <div className="pt-4">
          <SubmitButton value="Editar" />
        </div>
      </form>
    </div>
  );
};

export default withAuth(EditField);
