import React, { useState } from 'react';
import Image from "next/image";
import dynamic from 'next/dynamic';
import useFetchData from '@/hooks/useFetchData';
import { toast } from 'sonner';
import { userStore } from '@/context/zustand';
const MapView = dynamic(() => import("./../MapView"), {
  ssr: false,
});
interface FieldProps {
  field: {
    id: number;
    name: string;
    // location: string;
    latitude: string;
    longitude: string;
    size: number;
    workersAmount: number;
    mainCrop: string;
    weatherType: string;
    administration: string;
    season: string;
  };
}

const Field: React.FC<FieldProps> = ({ field }) => {
  const [isExpanded, setIsExpanded] = useState(field.id === 1);
  const {fetchData} = useFetchData()
  const deleteField = userStore.getState().deleteField


const deleteOneField = async(id:number) => {
    const {status} = await fetchData("deleteCampo",id)

    if(status){
    toast.success("Campo eliminado correctamente")
    deleteField(id)
    } else toast.error("No se puedo eliminar el campo")

}  

  return (
    <div className="bg-white w-full rounded-lg shadow-md ">
      <div
        className="flex justify-between items-center p-4 cursor-pointer"

      >
        <h2 className="text-xl font-semibold">{field.name}</h2>
        <span className='flex gap-2 items-center'>
          {/* <button className="text-green-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button> */}
          <button className="text-red-600" onClick={() => deleteOneField(field.id)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
          <button onClick={() => setIsExpanded(!isExpanded)}>{isExpanded ? <Image src="/downarrow.svg" width={20} height={20} alt="" /> : <Image src="/uparrow.svg" width={20} height={20} alt="" />}
          </button>
        </span>
      </div>
      {isExpanded && (
        <div className="p-4 border-t">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p><strong>Ubicación:</strong> {field.latitude}, {field.longitude}</p>
              <p><strong>Tamaño (hectáreas):</strong> {field.size}</p>
              <p><strong>Cantidad de empleados:</strong> {field.workersAmount}</p>
              <p><strong>Cultivo principal:</strong> {field.mainCrop}</p>
              <p><strong>Tipo de clima:</strong> {field.weatherType}</p>
              <p><strong>Administración:</strong> {field.administration}</p>
              <p><strong>Temporada:</strong> {field.season}</p>
            </div>
            <div className="relative h-64">
              {/* <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Map placeholder</span>
              </div> */}
              <div className="flex h-full">
                <MapView
                  latitude={parseFloat(field.latitude)}
                  longitude={parseFloat(field.longitude)}
                  name={field.name}
                />
              </div>
            </div>
          </div>
          <div className="mt-4 flex justify-end space-x-2">

          </div>
        </div>
      )}
    </div>
  );
};

export default Field;