<script>
import CountryFlag from "../components/CountryFlag.vue";

import { mapStores } from "pinia";
import { usePersonaStore } from "../store.js";

export default {
	mounted() {
		// If store havent allready fetched api then to fetch it.
		if (this.personasStore.personasArr.length === 0) {
			this.personasStore.fetchPersonas();
		}
	},
	data() {
		return {
			persona: [],
			searchNameText: "",
		};
	},
	computed: {
		...mapStores(usePersonaStore),
		// Looks if search field is used and look trough array with keys what fits. Otherwise returns entire array.
		nameSearched() {
			if (this.searchNameText) {
				return this.personasStore.personasArr.filter((per) =>
					["firstname", "lastname", "birthday"].some((key) =>
						String(per[key] || "")
							.toLowerCase()
							.includes(this.searchNameText.toLowerCase()),
					),
				);
			} else {
				return this.personasStore.personasArr;
			}
		},
	},
	components: {
		CountryFlag,
	},
};
</script>

<style>
#loadingScreen {
	display: flex;
	flex-direction: column;
	align-items: center;
}

#loadingScreen img {
	width: 128px;
}

.personCard {
	box-shadow: 6px 8px 8px rgba(3, 3, 28, 0.6);
	margin: 1.5em;
	width: 100%;
	max-width: 250px;
	height: 235px;
}

#countryFlag {
	display: flex;
	justify-content: space-between;
}

#countryFlag img {
	margin: 10px;
}

button {
	width: 150px;
}
</style>

<template>
	<section class="search-section py-5 text-white">
		<div class="container text-center">
			<h2 class="mb-3">Hitta rätt person</h2>
			<p class="mb-4">Sök efter namn eller födelsedatum.</p>

			<div class="d-flex justify-content-center">
				<div
					class="search-box d-flex p-3 rounded cream-bg"
					style="max-width: 700px; width: 100%">
					<input
						v-model="searchNameText"
						type="text"
						class="form-control form-control-lg"
						placeholder="Herman Saumelsson, 1993" />
				</div>
			</div>
		</div>
	</section>

	<div id="personaDisplay" class="d-flex justify-content-center flex-wrap">
		<div v-if="this.personasStore.loading" id="loadingScreen">
			<img src="/public/earth-24613_256.gif" alt="Loading content, gif" />
			<p>Loading...</p>
			<p class="smallText">
				(På grund av långsammare API så kan laddning ta längre tid)
			</p>
		</div>

		<div
			class="personCard cream-bg p-4 d-flex flex-column rounded-4"
			v-for="person in nameSearched"
			:key="person.id">
			<div class="d-flex flex-column text-start flex-gow-1">
				<p class="fw-bold fs-5">
					{{ person.firstname }} {{ person.lastname }}
				</p>
				<p>{{ person.birthday }}</p>
				<div id="countryFlag">
					<p>
						<em> {{ person.address.country }} </em>
					</p>
					<CountryFlag
						:code="person.address.country_code.toLowerCase()" />
				</div>
			</div>
			<div class="d-flex justify-content-center mt-auto">
				<router-link :to="{ path: '/profile/' + person.id }">
					<BButton variant="primary" type="button">
						Profil <i class="bi bi-arrow-right"></i>
					</BButton>
				</router-link>
			</div>
		</div>
	</div>
</template>
