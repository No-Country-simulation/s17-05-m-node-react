"use client";

import { useLoaderStore } from "@/context/loader.store";

export const Loader = () => {
  const isLoading = useLoaderStore((state) => state.isLoading);

  return (
    <>
      {true && (
        <div
          className="fixed w-full
                     h-screen flex
                     items-center
                     justify-center
                     bg-gray-200
                     flex-col
                     gap-y-10
                     z-[2]"
        >
          <div
            className="w-[240px]
                       h-[240px]
                       relative flex
                       justify-center
                       items-center"
          >
            <div
              className="absolute
                         w-full h-full
                         rounded-full
                         animate-spin
                         border-[20px]
                         border-dashed
                         border-[#02ADDE]
                         border-t-transparent"
            ></div>
            <div className="flex absolute">
              <p
                className="text-[#515866]
                           font-[500]"
              >
                Cargando{" "}
              </p>
              <div className="relative pl-[5px]">
                <div
                  className="flex h-[8px]
                             gap-x-[2px]
                             absolute bottom-0"
                >
                  <div
                    className="h-[3px] w-[3px]
                               bg-[#515866]
                               rounded-full
                               animate-bounce
                               [animation-delay:-0.3s]"
                  ></div>
                  <div
                    className="h-[3px] w-[3px]
                               bg-[#515866]
                               rounded-full
                               animate-bounce
                               [animation-delay:-0.15s]"
                  ></div>
                  <div
                    className="h-[3px] w-[3px]
                               bg-[#515866]
                               rounded-full
                               animate-bounce"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
