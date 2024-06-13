<template>
    <div>
        <ul class="w-80 lg:w-72 h-28 p-3 rounded-2xl hover:bg-[#333] transition-all duration-500">
            <li class="card-content flex justify-center items-center gap-x-6">
                <img :src="data.img">
                <div class="flex items-center flex-col">
                    <h2>{{ props.id }}. {{ props.name }}</h2>
                    <p>{{ data.types.join(' / ') }}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import api from '../service/api.service';

    const props = defineProps<{
        name: string;
        url: string;
        data: any;
        id: number;
    }>();

    const data = ref<{
        img: string;
        types: string[];
    }>({
        img: '',
        types: []
    });

    onMounted(() => {
        api.get(props.url).then((response: any) => {
            data.value = {
                img: response.data.sprites.front_default,
                types: response.data.types.map((type: any) => type.type.name)
            }
        })
    })
</script>

<style scoped>
    ul {
        box-shadow: 0px 18px 88px -4px #18274B24;
    }

    .card-content:hover h2,
    .card-content:hover p {
        color: #fff;
    }
</style>