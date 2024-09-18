import { UserStoreProps } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const userStore = create<UserStoreProps>()(
  persist(
    (set) => ({
      user: null,
      fields: [],
      setUser: (newUser) => set(() => ({ user: newUser })),
      setFields: (newFields) => set(() => ({ fields: newFields })),
      deleteField: (id) => set(({fields}) => {
        const filterFields = fields.filter((field) => field.id !== id )
        return { fields: filterFields }
      }),
      closeSesion: () => set(() => {
        return { fields: [], user: null }
      }),
      addField: (newField) =>
        set((state) => ({ fields: [...state.fields, newField] })),
      editField: (updatedField) =>
        set((state) => ({
          fields: state.fields.map((field) =>
            field.id === updatedField.id ? updatedField : field
          ),
        })),
    }),
    { name: "userStore" }
  )
);
