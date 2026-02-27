<script>
import HeaderBar from "./components/HeaderBar.vue";

export default {
	components: {
		HeaderBar,
	},
};
</script>

<template>
	<div class="d-flex flex-column min-vh-100">
		<HeaderBar />

		<main class="flex-fill">
			<RouterView />
		</main>

		<footer></footer>
	</div>
</template>
