<template>
  <div>
    <div v-if="isLoading">
      <PokebolaLoading />
    </div>
    <div v-else>
      <div v-if="partyList.length === 0" class="flex justify-center mt-8">
        <p>Não tem nenhum Pokémon adicionado</p>
      </div>
      <div v-else class="flex justify-center flex-wrap gap-6 mt-10">
        <div v-for="pokemon in partyList" :key="pokemon.id" class="partyCard w-80 lg:w-72 h-28 p-3 flex justify-center items-center rounded-2xl hover:bg-[#333] transition-all duration-500">
          <img :src="pokemon.image">
          <div class="flex items-center flex-col">
            <p>{{ pokemon.id }}. {{ pokemon.name }}</p>
            <p>{{ pokemon.type }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup lang="ts">
  import { computed, ref, onMounted } from 'vue';
  import { usePartyStore } from '../stores/party';
  import PokebolaLoading from '../components/PokebolaLoading.vue';
  
  const isLoading = ref(true);

  const partyStore = usePartyStore();
  const partyList = computed(() => partyStore.party);

  onMounted(() => {
    isLoading.value = false;
  });
</script>
  
<style scoped>
  .partyCard {
    box-shadow: 0px 18px 88px -4px #18274B24;
  }

  .partyCard:hover p {
    color: #fff;
  }
</style>
  