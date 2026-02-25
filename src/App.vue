<script>
import HeaderBar from "./components/HeaderBar.vue";

export default {
	components: {
		HeaderBar,
	},
};
</script>

<template>
	<HeaderBar />

	<main>
		<RouterView />
	</main>

	<footer></footer>
</template>
