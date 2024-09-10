"use client";

import React, { useState } from "react";
import { SubmitButton } from "@/components/form/SubmitButton";
import { Input } from "@/components/form/Input";
import { Select } from "@/components/form/Select";
import { newFieldInputFields, newFieldSelectFields } from "@/utils/inputFields";
import useFetchData from "@/hooks/useFetchData";
import { createCampo } from "@/services";
import { toast } from "sonner";
import { userStore } from "@/context/zustand";
import { useRouter } from "next/navigation";
import useFormState from "@/hooks/useFormState";
import { findInputErrors, getFieldFormRules } from "@/utils/validationRules";
import { ErrorMessage } from "@/components/form/ErrorMessage";

const CreateField: React.FC = () => {
  const { fetchData } = useFetchData();
  const { user, addField } = userStore((data) => data);
  const router = useRouter();
  const { formState, setFormState } = useFormState({
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

  const [showInputErrors, setShowInputErrors] = useState(false);

  const validationRules = getFieldFormRules(
    formState.latitude,
    formState.longitude,
    formState.size,
    formState.workersAmount
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (findInputErrors(validationRules).length > 0) {
      setShowInputErrors(true);
      return;
    }
    setShowInputErrors(false);

    const newField = {
      userId: user?.user.id,
      name: formState.name,
      latitude: parseFloat(formState.latitude),
      longitude: parseFloat(formState.longitude),
      size: parseFloat(formState.size),
      workersAmount: parseFloat(formState.workersAmount),
      mainCrop: formState.mainCrop,
      weatherType: formState.weatherType,
      administration: formState.administration,
      season: formState.season,
    };

    const { ok, data } = await fetchData(createCampo, { body: newField });

    ok
      ? (toast.success("Se creo el campo correctamente!!"),
        addField(data),
        router.push("/myFields"))
      : toast.error("No se pudo crear el campo!!");

    console.log(data);
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
        Agregar Campo
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
        {newFieldInputFields.map((field, index) => (
          <div className="relative" key={index}>
            <Input
              label={field.label}
              name={field.name}
              value={formState[field.name as keyof typeof formState]}
              type={"text"}
              handleChange={setFormState}
            />
            <ErrorMessage
              validationRules={
                showInputErrors
                  ? validationRules.filter(
                      (validationRule) => validationRule.field === field.name
                    )
                  : []
              }
            />
          </div>
        ))}

        {newFieldSelectFields.map((field, index) => (
          <Select
            key={index}
            name={field.name}
            handleChange={setFormState}
            value={formState[field.name as keyof typeof formState]}
            options={field.options}
          />
        ))}

        <div className="pt-4">
          <SubmitButton value="Agregar" />
        </div>
      </form>
    </div>
  );
};

export default CreateField;
