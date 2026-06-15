// store/useScheduleStore.ts
import { create } from 'zustand';

interface ScheduleStore {
  generatedData: any | null;
  setGeneratedData: (data: any) => void;
  clearGeneratedData: () => void;
}

export const useScheduleStore = create<ScheduleStore>((set) => ({
  generatedData: null,
  setGeneratedData: (data) => set({ generatedData: data }),
  clearGeneratedData: () => set({ generatedData: null }),
}));