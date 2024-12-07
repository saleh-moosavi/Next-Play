import { create } from "zustand";

type state = {
  isDarkMode: boolean;
};
type actions = {
  toggleDarkMode: () => void;
};

const darkmodStore = create<state & actions>((set) => ({
  isDarkMode: false, // Default state
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })), // Toggles the mode
}));

export default darkmodStore;
