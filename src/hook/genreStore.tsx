// src/store/genreStore.ts
import { create } from 'zustand';

interface GenreState {
  selectedGenreId: string | null;
  selectedGenreName: string | null;
  setGenre: (id: string | null, name?: string) => void;
}

export const useGenreStore = create<GenreState>((set) => ({
  selectedGenreId: null,
  selectedGenreName: null,
  setGenre: (id, name) =>
    set({ selectedGenreId: id, selectedGenreName: name || null }),
}));
