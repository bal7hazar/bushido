import { Game } from "@/dojo/models/game";
import { create } from "zustand";

interface InterfaceStore {
  selection: Game;
  setSelection: (selection: Game) => void;
  resetSelection: () => void;
}

export const useInterfaceStore = create<InterfaceStore>()((set, get) => ({
  selection: Game.default(),
  setSelection: (selection) => set({ selection }),
  resetSelection: () => set({ selection: Game.default() }),
}));
