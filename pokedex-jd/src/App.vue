<template>
  <nav class="bg-white h-24 gap-10 flex justify-center align-center py-10">
    <RouterLink to="/" :class="['nav-item', { active: isActiveRoute('/') || isPokemonPage }]">Pokedex</RouterLink>
    <RouterLink to="/party" :class="['nav-item', { active: isActiveRoute('/party') }]">Party</RouterLink>
    <RouterLink to="/trainerCard" :class="['nav-item', { active: isActiveRoute('/trainerCard') }]">Trainer Card</RouterLink>
  </nav>
  <RouterView />
</template>

<script setup>
  import { RouterLink, RouterView, useRoute } from 'vue-router'

  const route = useRoute();

  const isActiveRoute = (path) => {
    if (path === '/') {
      return route.path === '/' || route.path.startsWith('/pokemon');
    }
    return route.path === path;
  }

  const isPokemonPage = route.path.startsWith('/pokemon');

</script>

<style scoped>
  nav {
    box-shadow: 0px 18px 88px -4px #18274B24;
  }

  .nav-item {
    position: relative;
    transition: .3s all;
  }

  .nav-item.active::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 5px;
    background-color: #6666BB;
    left: 0;
    bottom: -15px;
  }
</style>
