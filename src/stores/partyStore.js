import { defineStore } from 'pinia';

export const usePartyStore = defineStore('party', {
  state: () => ({
    party: JSON.parse(localStorage.getItem('party') || '[]'),
  }),
  actions: {
    addPokemon(pokemon) {
      if (!this.party.some(p => p.id === pokemon.id)) {
        this.party.push(pokemon);
        localStorage.setItem('party', JSON.stringify(this.party));
      }
    },
    removePokemon(pokemonId) {
      this.party = this.party.filter(p => p.id !== pokemonId);
      localStorage.setItem('party', JSON.stringify(this.party));
    },
    isInParty(pokemonId) {
      return this.party.some(p => p.id === pokemonId);
    },
  },
});
