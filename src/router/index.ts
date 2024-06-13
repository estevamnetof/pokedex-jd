import { createRouter, createWebHistory } from 'vue-router'
import Pokedex from '@/pages/Pokedex.vue'
import Party from '@/pages/Party.vue'
import TrainerCard from '@/pages/TrainerCard.vue'
import PokemonPage from '@/components/PokemonPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'pokedex',
      component: Pokedex
    },
    {
      path: '/party',
      name: 'party',
      component: Party
    },
    {
      path: '/trainerCard',
      name: 'trainerCard',
      component: TrainerCard
    },
    {
      path: "/pokemon/:id/",
      name: "PokemonPage",
      component: PokemonPage,
  }
  ]
})

export default router
