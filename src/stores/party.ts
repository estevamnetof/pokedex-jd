import { ref } from 'vue';
import { defineStore } from 'pinia';

export const usePartyStore = defineStore('party', () => {
  const party = ref([] as any[]);

  function addPokemon(pokemon: any) {
    if (!party.value.some(p => p.id === pokemon.id)) {
      party.value.push(pokemon);
      localStorage.setItem('party', JSON.stringify(party.value));
    }
  }

  function removePokemon(pokemonId: number) {
    party.value = party.value.filter(p => p.id !== pokemonId);
    localStorage.setItem('party', JSON.stringify(party.value));
  }

  function isInParty(pokemonId: number) {
    return party.value.some(p => p.id === pokemonId);
  }

  return { party, addPokemon, removePokemon, isInParty };
});
