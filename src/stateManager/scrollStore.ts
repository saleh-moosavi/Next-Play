import { create } from "zustand";

type state = {
  scrollHeight: number;
};
type actions = {
  setScrollHeight: (state: number) => void;
};

const scrollStore = create<state & actions>((set) => ({
  scrollHeight: 0, // Default state
  setScrollHeight: (state) => set(() => ({ scrollHeight: state })), // Toggles the mode
}));

export default scrollStore;
