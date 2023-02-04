import { create, StateCreator } from "zustand";

interface IUIState {
  navBarVisible: boolean;
}

interface IUIMethods {
  setNavBarVisible: (navBarVisible: boolean) => void;
}

const store: StateCreator<IUIState & IUIMethods> = (set) => ({
  navBarVisible: true,
  setNavBarVisible: (navBarVisible) => set({ navBarVisible }),
});

const useUIStore = create(store);

export default useUIStore;
