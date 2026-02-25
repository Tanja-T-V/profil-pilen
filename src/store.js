import { defineStore } from "pinia";
import axios from "axios";

export const usePersonaStore = defineStore("personas", {
	actions: {
		async fetchPersonas() {
			if (this.personasArr.length > 0) return;
			this.loading = true;

			try {
				const response = await axios.get(
					"https://fakerapi.it/api/v2/persons?_quantity=30&_seed=133742&_locale=sv_SE",
				);
				this.personasArr = response.data.data;
				console.log("inside store, fetched: ", this.personasArr);
			} catch (err) {
				console.error(err);
			} finally {
				this.loading = false;
			}
		},
	},
	state: () => ({
		personasArr: [],
		loading: false,
	}),
});
