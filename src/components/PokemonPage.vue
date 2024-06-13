<template>
  <div>
    <div v-if="isLoading">
      <PokebolaLoading />
    </div>
    <div v-else>
      <div :style="{ backgroundColor: backgroundColor }" class="flex justify-between items-center h-80 px-11">
        <div class="flex justify-center items-center flex-wrap">
          <div class="pokecard flex items-center max-w-60 max-h-60 sm:h-40 sm:w-40 bg-[#fff]">
            <img class="p-10" :src="pokemonImg">
          </div>
          <div class="mx-5 mt-24 sm:mt-2">
            <h2 class="name text-6xl sm:text-3xl">{{ pokemon.name }}</h2>
            <button @click="toggleParty" class="addPokemon text-xl sm:text-sm mt-2 bg-[#fff] hover:bg-[#333] hover:text-[#fff] transition-all duration-500">
              {{ isPokemonInParty ? 'Remover do time' : 'Adicionar ao time' }}
            </button>
          </div>
        </div>
        <div class="flex self-start mt-8 text-[#fff] gap-x-10 md:gap-x-2">
          <button @click="goToPreviousPokemon" class="text-3xl md:text-xl bg-transparent text-[#fff] shadow-none">{{'< #' + previousPokemonId }}</button>
          <button @click="goToNextPokemon" class="text-3xl md:text-xl bg-transparent text-[#fff] shadow-none">{{ '#' + nextPokemonId + ' >' }}</button>
        </div>
      </div>
      <div class="mt-10 ml-10 gap-10">
        <div class="flex gap-2 bg-red-500 items-center">
          <p>Tipo: </p>
          <ul class="flex bg-red-500">
            <li v-for="(type, index) in pokemonTypes" :key="index" :style="{ backgroundColor: backgroundColorTypes[index] }">{{ type }}</li>
          </ul>
        </div>
        <div class="flex gap-8 my-8">
          <p>Altura: <span class="mx-8">{{ pokemon.height }}</span></p>
          <p>Peso: <span class="mx-8">{{ pokemon.weight }}</span></p>
        </div>
        <p>Estatísticas:</p>
        <div v-for="(stat, index) in pokemonStats" :key="index" class="stat-bar">
          <div class="bar-container">
            <div class="bar flex items-center justify-center" :style="{ width: `${stat.base_stat}%`, backgroundColor: backgroundColorTypes[0] }">
              <span class="m-auto max-w-full">{{ stat.stat.name }}: {{ stat.base_stat }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref, computed, watch } from 'vue';
  import { useRouter } from 'vue-router';
  import { getPokemonById } from '../service/pokemon.service';
  import { usePartyStore } from '../stores/party';

  import PokebolaLoading from './PokebolaLoading.vue';
  import { PokeColors } from '../types/colors.enum';

  const isLoading = ref(true);
  const router = useRouter();
  const pokemonId = ref(Number(router.currentRoute.value.params.id));
  const pokemon = ref({} as any);
  const partyStore = usePartyStore();

  const getCurrentPokemon = async () => {
    const response = await getPokemonById(pokemonId.value);
    pokemon.value = response;
    isLoading.value = false;
  };

  const goToPreviousPokemon = () => {
    const previousId = previousPokemonId.value;
    if (previousId) {
      router.push(`/pokemon/${previousId}`);
    }
  };

  const goToNextPokemon = () => {
    router.push(`/pokemon/${nextPokemonId.value}`);
  };

  const pokemonTypes = computed(() => {
    return pokemon.value.types?.map((type: any) => type.type.name) || [];
  });

  const pokemonImg = computed(() => {
    return pokemon.value.sprites?.other.home.front_default || '';
  });

  const backgroundColor = computed(() => {
    if (pokemonTypes.value.length === 0) return '#333';
    const type = pokemonTypes.value[0] as keyof typeof PokeColors;
    return PokeColors[type] || '#333';
  });

  const backgroundColorTypes = computed(() => {
    if (pokemonTypes.value.length === 0) return '#333';
    return pokemonTypes.value.map((type: keyof typeof PokeColors) => PokeColors[type] || '#333');
  });

  const pokemonStats = computed(() => {
    return pokemon.value.stats || [];
  });

  const previousPokemonId = computed(() => {
    return pokemonId.value > 1 ? pokemonId.value - 1 : null;
  });

  const nextPokemonId = computed(() => {
    return pokemonId.value ? pokemonId.value + 1 : null;
  });

  const isPokemonInParty = computed(() => {
    return partyStore.isInParty(pokemonId.value);
  });

  const toggleParty = () => {
    const { id, name, sprites, types } = pokemon.value;
    const image = sprites?.front_default || '';
    const type = types?.map((type: any) => type.type.name).join(', ') || '';
    const pokemonData = { id, name, image, type };

    if (isPokemonInParty.value) {
      partyStore.removePokemon(pokemonId.value); 
    } else {
      partyStore.addPokemon(pokemonData);
    }
  };

  watch(() => router.currentRoute.value.params.id, (newId) => {
    pokemonId.value = Number(newId);
    getCurrentPokemon();
  });

  onMounted(() => {
    pokemonId.value = Number(router.currentRoute.value.params.id);
    getCurrentPokemon();
  });
</script>

<style scoped>
  .pokecard, .addPokemon {
    box-shadow: 0px 18px 88px -4px #18274B24;
    border-radius: 8px;
  }

  .addPokemon {
    padding: 10px 20px;
    cursor: pointer;
  }

  .name {
    text-transform: capitalize;
    color: #fff;
  }

  span {
    font-weight: 400;
  }

  li {
    padding: 5px 15px;
    margin: 0 15px;
    border-radius: 10px;
    color: #fff;
    text-transform: capitalize;
  }

  .stat-bar {
    margin: 10px 0;
    max-width: 31.25rem;
  }

  .bar-container {
    background-color: #ddd;
    border-radius: 3px;
    flex: 1;
    margin: 0 10px;
    height: 23px;
  }

  .bar {
    height: 100%;
    border-radius: 3px;
    text-transform: capitalize;
  }
</style>
