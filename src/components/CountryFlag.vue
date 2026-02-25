<script>
export default {
	data() {
		return {
			// Gets flag link with flag code that it gets from parent.
			apiLink: "https://flagcdn.com/48x36/" + this.code + ".png",
		};
	},
	props: {
		code: String,
	},
};
</script>

<template>
	<img :src="apiLink" width="36px" height="27px" alt="Landets flagga" />
</template>
