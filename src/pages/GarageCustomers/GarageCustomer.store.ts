import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { IGarageCustomerStore } from './GarageCustomers.types';

export const useGarageForm = create(
  devtools<IGarageCustomerStore>(
    (set, _get) => ({
      user: undefined,
      contact: undefined,
      setUser: (data) => set(() => ({ user: data.user })),
      setContact: (data) => set(() => ({ contact: data.contact })),
    }),
    {
      name: 'garage-customer', // unique name
    }
  )
);
