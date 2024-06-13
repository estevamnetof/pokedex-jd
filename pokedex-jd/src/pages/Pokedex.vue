<template>
    <div>
        <div v-if="isLoading">
            <PokebolaLoading />
        </div>
        <div v-else class="flex flex-wrap justify-center items-center mx-3 mt-10 gap-5">
            <RouterLink
            v-for="(pokemon, index) in pokemonList" :key="index"
            :to="{ name: 'PokemonPage', params: { id: index + 1 } }">
            <PokemonCard 
                :data="pokemon"
                :name="pokemon.name"
                :url="pokemon.url"
                :id="index + 1"
            />
            </RouterLink>
        </div>
    </div>
</template>
<script setup lang='ts'>
    import { ref, watch, onMounted } from 'vue';
    import PokebolaLoading from '../components/PokebolaLoading.vue';
    import { RouterLink } from 'vue-router';
    import { getPokemonByName, getAllPokemon } from '../service/pokemon.service';
    import PokemonCard from '../components/PokemonCard.vue';

    const isLoading = ref(true);
    const pokemon = ref('');
    const pokemonData = ref({} as any);
    const pokemonList = ref([] as any[]);

    const getPokemons = async () => {
        const response = await getAllPokemon();
        pokemonList.value = response.results;
        isLoading.value = false;
    }

    const getTypedPokemon = async () => {
        const response = await getPokemonByName(pokemon.value);
        pokemonData.value = response;
    } 

    watch(pokemon, () => {
        getTypedPokemon();
    });

    onMounted(() => {
        getPokemons();
    })
</script>