<template>
    <div class="flex mt-9 gap-10 relative">
        <div class="max-w-48 max-h-48 sm:h-28 sm:w-28 ml-48 sm:ml-10 relative">
            <img class="rounded-lg border-2 border-ghost" :src="FotoPerfil" alt="Foto do treinador Pokémon">
            <div class="pokemon-image-container sm:w-16"> 
                <img class="rounded-full border-2 border-ghost bg-[#fff]" :src="FotoPokemon" alt="Foto do seu Pokémon preferido">
            </div>
        </div>
        <div class="about max-w-xs">
            <h1 class="text-4xl">Sobre</h1>
            <p class="font-normal mt-5">Meu foco é nas linguagens voltadas ao Front-End. Atualmente aprendendo ainda mais tecnologias que vão me potencializar como Programador. Ainda em progresso com Vue.</p>
            <a href="https://github.com/estevamnetof" target="_blank">
                <i class="pi pi-github mt-4" style="font-size: 2rem"></i>
            </a>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import { getPokemonByName } from '../service/pokemon.service';

    import 'primeicons/primeicons.css'

    import FotoPerfil from '../assets/perfil-pokemon.png';
    const FotoPokemon = ref('');

    onMounted(async () => {
        try {
            const pokemonName = 'gengar';
            const pokemonData = await getPokemonByName(pokemonName);
            const imageUrl = pokemonData.sprites.front_default; 
            FotoPokemon.value = imageUrl;
        } catch (error) {
            console.error(error);
        }
    });
</script>

<style>
    .pokemon-image-container {
        position: absolute;
        bottom: 0;
        top: 135%;
        right: 0;
        transform: translate(50%, 50%);
    }

    @media (max-width: 450px) {
        div {
            flex-wrap: wrap;
        }

        .about {
            margin-top: 100px;
            margin-left: 40px;
        }
    }
</style>
