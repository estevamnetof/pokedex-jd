<template>
	<div class="flex m-auto w-40 h-40 my-5">
		<img class="pokeball flex justify-center" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/800px-Pok%C3%A9_Ball_icon.svg.png">
	</div>
</template>

<style scoped>
    .pokeball {
		width: 80px;
		position: absolute;
		transform-origin: center;
		animation: rotate 2s ease-in-out infinite;
	}

	@keyframes rotate {
		0% {
			transform: rotate(0deg) scale(1);
		}
		15% {
			transform: rotate(-10deg) scale(1.05);
		}
		35% {
			transform: rotate(360deg) scale(1.15);
		}
		65% {
			transform: rotate(740deg) scale(0.95);
		}
		100% {
			transform: rotate(720deg) scale(1);
		}
	}

</style>