import { create, StateCreator } from "zustand";

interface IParticipantState {
  name: string | null;
  email: string | null;
  room: string | null;
}

interface IParticipantMethods {
  setName: (name: string | null) => void;
  setEmail: (email: string | null) => void;
  setRoom: (room: string | null) => void;
}

const store: StateCreator<IParticipantState & IParticipantMethods> = (set) => ({
  name: "",
  email: "",
  room: "",
  setName: (name) => set({ name }),
  setEmail: (email) => set({ email }),
  setRoom: (room) => set({ room }),
});

const useIParticipantStore = create(store);

export default useIParticipantStore;
