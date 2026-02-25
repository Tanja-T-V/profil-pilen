<script>
import CountryFlag from "../components/CountryFlag.vue";
import GiftTab from "../components/GiftTab.vue";

import { mapStores } from "pinia";
import { usePersonaStore } from "../store.js";
import { nextTick } from "vue";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default {
	mounted() {
		// If store havent allready fetched api then to fetch it.
		if (this.personasStore.personasArr.length === 0) {
			this.personasStore.fetchPersonas();
		}
		// Creates the map
		if (!this.personasStore.loading) {
			this.createMapLocation();
		}
	},
	data() {
		return {
			persona: [],
			personaID: this.$route.params.id,
			showGigtTab: false,
			btnGiftDisabled: false,
			map: null,
			marker: null,
		};
	},
	methods: {
		onClickGift() {
			this.showGigtTab = true;
			this.btnGiftDisabled = true;
		},
		closeGiftTab() {
			this.showGigtTab = false;
			this.btnGiftDisabled = false;
		},
		createMapLocation() {
			// Makes sure it dont load two maps. If map exist/true then ddont do annything.
			if (this.map) return;

			// Deletes marker form node-_modules and deines them from images.
			delete L.Icon.Default.prototype._getIconUrl;
			L.Icon.Default.mergeOptions({
				iconRetinaUrl: "./public/marker-icon-2x.png",
				iconUrl: "./public/marker-icon.png",
				shadowUrl: "./public/marker-shadow.png",
			});

			//Map Settings. First sets map [lat, long], Zoom level. Lower number - less zoom.
			this.map = L.map("map").setView(
				[this.profileMap.profileLati, this.profileMap.profileLong],
				6,
			);
			// Creates image layer
			L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
				maxZoom: 19,
				attribution:
					'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
			}).addTo(this.map);
			// Adds pinn to [lat, long]
			this.marker = L.marker([
				this.profileMap.profileLati,
				this.profileMap.profileLong,
			]).addTo(this.map);
		},
	},
	computed: {
		...mapStores(usePersonaStore),
		// Gets store fetch array to look for ID in browserbar
		profileID() {
			const profileUser =
				this.personasStore.personasArr.find(
					(per) => per.id === Number(this.$route.params.id),
				) || null;

			return profileUser;
		},
		profileMap() {
			//Gets latitude and logitude from the persona. Stores it for easer accsess.
			const profileLati = this.profileID.address.latitude;
			const profileLong = this.profileID.address.longitude;
			return { profileLati, profileLong };
		},
	},
	watch: {
		// Looks of loading is done to call on map function.
		"personasStore.loading"(newVal) {
			if (newVal === false && !this.map) {
				// Next tick makes sure DOM is loaded before calling cunction. Otherwise function runs before DOM is loaded and cant find map id.
				nextTick(() => {
					this.createMapLocation();
				});
			}
		},
	},
	components: {
		CountryFlag,
		GiftTab,
	},
};
</script>

<style>
#pageContent {
	z-index: 1;
}

#profileInformation {
	width: 70%;
}

#map {
	height: 300px;
	width: 550px;
}

.tab-slide-enter-from,
.tab-slide-leave-to {
	transform: translateX(-100%);
	opacity: 0;
}

.tab-slide-enter-to,
.tab-slide-leave-from {
	transform: translateX(0);
	opacity: 1;
}

.tab-slide-enter-active,
.tab-slide-leave-active {
	transition:
		transform 0.35s cubic-bezier(0.25, 0.8, 0.25, 1),
		opacity 0.25s ease;
}

@media screen and (min-width: 414px) and (max-width: 810px) {
	#map {
		height: 300px;
		width: 400px;
	}
}
</style>

<template>
	<div id="pageContent">
		<div v-if="this.personasStore.loading" id="loadingScreen">
			<img src="/public/earth-24613_256.gif" alt="Loading content, gif" />
			<p>Loading profile...</p>
			<p class="smallText">
				(På grund av långsammare API så kan laddning ta längre tid)
			</p>
		</div>
		<Transition name="tab-slide">
			<GiftTab
				v-if="showGigtTab"
				:firstname="profileID.firstname"
				:lastname="profileID.lastname"
				@close-tab="closeGiftTab" />
		</Transition>

		<div v-if="profileID" id="profile">
			<div
				id="profileInformation"
				class="cream-bg mt-5 mx-auto p-4 d-flex flex-column rounded-4">
				<div
					id="headerInfo"
					class="d-flex justify-content-between align-items-center mb-2">
					<p id="profileName" class="fs-2 fw-bold mb-0">
						{{ profileID.firstname }} {{ profileID.lastname }}
					</p>
					<BButton
						pill
						class="border-3"
						variant="outline-primary"
						id="giftBtn"
						@click="onClickGift"
						:disabled="btnGiftDisabled">
						Skicka <i class="bi bi-gift"></i>
					</BButton>
				</div>
				<div id="mainInfo" class="mt-3 me-4 d-flex flex-column p-2">
					<div class="d-flex justify-content-between">
						<p>
							<i class="bi bi-gender-ambiguous blue-color"></i>
							{{ profileID.gender }}
						</p>
						<div class="d-flex gap-2">
							<p>
								<strong>Födelsedag:</strong>
							</p>
							<p>
								{{ profileID.birthday }}
							</p>
						</div>
					</div>
					<div>
						<p class="fw-bold fs-5">Kontakt:</p>
						<div class="d-flex gap-2">
							<i class="bi bi-telephone-fill blue-color"></i>
							<p>
								{{ profileID.phone }}
							</p>
						</div>
						<div class="d-flex gap-2">
							<i class="bi bi-envelope-at-fill blue-color"></i>
							<p>
								{{ profileID.email }}
							</p>
						</div>
						<p><strong>Hemsida: </strong>{{ profileID.website }}</p>
					</div>
				</div>

				<div id="streeiInfo" class="cream-dark-bg p-3 pe-4 rounded-3">
					<div
						class="d-flex justify-content-between align-items-center mb-2">
						<p class="fw-bold">{{ profileID.address.country }}</p>
						<CountryFlag
							:code="
								profileID.address.country_code.toLowerCase()
							" />
					</div>
					<p class="fw-bold fs-5">
						<i class="bi bi-buildings blue-color"></i> Adress:
					</p>
					<div class="ms-4 d-flex flex-column">
						<p>
							<em>
								{{ profileID.address.street }},
								{{ profileID.address.buildingNumber }}
							</em>
						</p>
						<p>
							<em>
								{{ profileID.address.zipcode }}
								{{ profileID.address.city }}
							</em>
						</p>
					</div>
					<p>
						<strong>Latitude: </strong
						>{{ profileID.address.latitude }}
					</p>
					<p>
						<strong>Longitude: </strong
						>{{ profileID.address.longitude }}
					</p>
				</div>
				<div class="d-flex flex-column align-items-center mt-4">
					<div id="map"></div>
				</div>
			</div>
		</div>
	</div>
</template>
