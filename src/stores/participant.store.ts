import { create, StateCreator } from "zustand";

interface IParticipantState {
  name: string;
  email: string;
}

interface IParticipantMethods {
  setName: (name: string) => void;
  setEmail: (email: string) => void;
}

const store: StateCreator<IParticipantState & IParticipantMethods> = (set) => ({
  name: "",
  email: "",
  setName: (name) => set({ name }),
  setEmail: (email) => set({ email }),
});

const useIParticipantStore = create(store);

export default useIParticipantStore;
