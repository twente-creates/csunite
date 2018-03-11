import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/pages/Home.vue";
import Requests from "../components/pages/Requests.vue";
import Community from "../components/pages/Community.vue";
import Inclusion from "../components/pages/Inclusion.vue";
import Accept from "../components/pages/Accept.vue";
import Error404 from "../components/pages/Error404.vue";
const routes = [
	{
		path: "/",
		component: Home,
		meta: {
			title: "Learn"
		}
	},
	{
		path: "/requests",
		component: Requests,
		meta: {
			title: "Requests"
		}
	},
	{
		path: "/community",
		component: Community,
		meta: {
			title: "Community"
		}
	},
	{
		path: "/inclusion",
		component: Inclusion,
		meta: {
			title: "Inclusion"
		}
	},
	{
		path: "/accept",
		component: Accept,
		meta: {
			title: "Accept"
		}
	},
	{
		path: "*",
		component: Error404,
		meta: {
			title: "404 Error"
		}
	},
];

Vue.use(VueRouter);
const router = new VueRouter({
	routes,
	mode: "history",
	scrollBehavior(to, from, savedPosition) {
		const position = savedPosition || {
			x: 0,
			y: 0
		}
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve({ x: 0, y: 0 });
			}, 200);
		})
	}
});
router.afterEach((to, from) => {
	if (document.querySelectorAll("#abc9c1elt").length > 0) {
		if (to.path === "/inclusion") {
			document.querySelector("#abc9c1elt").style.display = "block";
		} else {
			document.querySelector("#abc9c1elt").style.display = "none";
		}
	}
});

export default router;