import { createRouter, createWebHashHistory } from "vue-router";

import ProfileView from "./views/ProfileView.vue";
import HomeView from "./views/PersonasView.vue";

export default createRouter({
	history: createWebHashHistory(),
	routes: [
		{
			component: ProfileView,
			path: "/profile/:id",
		},

		{
			component: HomeView,
			path: "/",
		},
	],
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition;
		}
		return { top: 0, behavior: "smooth" };
	},
});
