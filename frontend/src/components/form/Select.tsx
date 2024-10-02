"use client";
import { useState } from "react";

type Option = {
  value: string;
  label: string;
};

type Props = {
  name: string;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
  label?: string;
  options: Option[];
};

export const Select = ({
  name,
  handleChange,
  value,
  label,
  options,
}: Props) => {
  const [newOption, setNewOption] = useState('');
  const [optionsList, setOptionsList] = useState(options);
  const [showDetails, setShowDetails] = useState(false);

  const handleAddOption = () => {
    if (newOption.trim() !== '') {
      setOptionsList([...optionsList, { value: newOption, label: newOption }]);
      options.push({ value: newOption, label: newOption });
      setNewOption('');

    }
  };
  return (
    <div className="font-[400]
                 
                   text-[14px]
                   md:text-[16px]
                   placeholder-[#515866]
                   text-[#515866]">
      <div className="flex">
        {/* fields option selector */}
        <select
          required
          className="m-auto
                     w-full
                     px-[10px]
                     py-[12px]
                     border
                     border-gray-300
                     rounded-[5px]
                     focus:outline-seconday-green
                     focus:ring-seconday-green
                     focus:border-seconday-green
                     focus:z-10"
          name={name}
          value={value}
          onChange={handleChange}
        >
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* hide & show details button */}
        <button
          className="
               py-1
               px-1
               border
              border-gray-300
              rounded-[5px]
              focus:outline-seconday-green
              focus:ring-seconday-green
              focus:border-seconday-green
               focus:ring-2 bg-slate-200"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? '-' : '+'}
        </button>
      </div>

      {showDetails && (
        <div className="py-1 space-y-1">
          {/* <summary>Agregar {options[0].label}</summary> */}
          <input
          className="border border-gray-300
              rounded-[5px]"
            type="text"
            value={newOption}
            onChange={(e) => setNewOption(e.target.value)}
            placeholder={"Escriba nuevo(a) " + options[0].label}
          />
          <button
            className="w-[178px]
               py-2
               px-4
               bg-primary-green
               text-[16px]
               font-[500]
               rounded-lg
               text-white
               hover:bg-green-700
               focus:outline-none
               focus:ring-2"
            onClick={handleAddOption}
          >
            Agregar
          </button>
        </div>
      )}
    </div>
  );
};
