<template>
	<div>
		<gmap-map v-bind:options="mapStyle" :center="center" :zoom="13" map-type-id="roadmap" class="bg-map">
			<gmap-marker :position="center2" :clickable="true" :draggable="true" @click="center=center2"></gmap-marker>
		</gmap-map>
		<v-card style="background: #fff" ref="card">
			<v-card-media :src="imageURL" height="125px">
			</v-card-media>
			<v-card-title primary-title>
				<div>
					<h3 class="mb-3">
						{{request.name}} <span color="orange">★★★★☆</span>
					</h3>
					<div>Clean before {{request.time}}</div>
					<div>{{parseInt(parseInt(request.distance) * 2.23606797749978969640917366873127623)}} mins ({{request.distance}}) away, leave in {{request.leaveIn}} minutes</div>
					<div class="mt-3">{{parseInt(Math.random()*10000)}} Eindhoven &middot; {{Math.floor(Math.random() * 3) + 1}} rooms</div>
				</div>
			</v-card-title>
			<v-card-actions>
				<v-btn flat color="grey" v-on:click="updateRequest"><v-icon class="mr-2">close</v-icon>Decline</v-btn>
				<v-btn flat color="teal" v-on:click="acceptRequest"><v-icon class="mr-2">check</v-icon>Accept for €{{Math.floor(Math.random() * 40) + 40}}</v-btn>
			</v-card-actions>
		</v-card>
	</div>
</template>

<script>
	import Vue from "vue";
	import router from "../../modules/router";
	let image = 1;
	export default {
		data: () => {
			return {
				mapStyle: {
					mapTypeControl: false,
					zoomControl: false,
					styles: [ { "elementType": "geometry", "stylers": [ { "color": "#f5f5f5" } ] }, { "elementType": "labels.icon", "stylers": [ { "visibility": "off" } ] }, { "elementType": "labels.text.fill", "stylers": [ { "color": "#616161" } ] }, { "elementType": "labels.text.stroke", "stylers": [ { "color": "#f5f5f5" } ] }, { "featureType": "administrative.land_parcel", "elementType": "labels.text.fill", "stylers": [ { "color": "#bdbdbd" } ] }, { "featureType": "poi", "elementType": "geometry", "stylers": [ { "color": "#eeeeee" } ] }, { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [ { "color": "#757575" } ] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [ { "color": "#d8ebd4" } ] }, { "featureType": "poi.park", "elementType": "labels.text.fill", "stylers": [ { "color": "#9e9e9e" } ] }, { "featureType": "road", "elementType": "geometry", "stylers": [ { "color": "#ffffff" } ] }, { "featureType": "road.arterial", "elementType": "labels.text.fill", "stylers": [ { "color": "#757575" } ] }, { "featureType": "road.highway", "elementType": "labels.text.fill", "stylers": [ { "color": "#616161" } ] }, { "featureType": "road.local", "elementType": "labels.text.fill", "stylers": [ { "color": "#9e9e9e" } ] }, { "featureType": "transit.line", "elementType": "geometry", "stylers": [ { "visibility": "off" } ] }, { "featureType": "transit.station", "elementType": "geometry", "stylers": [ { "visibility": "off" } ] }, { "featureType": "water", "elementType": "geometry", "stylers": [ { "color": "#cedfe0" } ] }, { "featureType": "water", "elementType": "labels.text.fill", "stylers": [ { "color": "#9e9e9e" } ] } ]},
				request: {
					name: "Hessel Bosma",
					time: "8 pm today",
					distance: "7 km",
					leaveIn: "23 mins"
				},
				center: {
					lat: 51.439589,
					lng: 5.469528
				},
				center2: {
					lat: 51.439589 + 0.0205,
					lng: 5.469528
				},
				show: true,
				sent: false,
				error: null,
				imageURL: null
			}
		},
		mounted() {
			if (localStorage.getItem("request")) {
				router.push("/accept");
			} else {
				this.changeValues();
			}
		},
		methods: {
			changeValues() {
				if (image > 11) {
					image = 1;
				}
				let firstNames = ["Lisa", "Jan", "Anne", "David", "Julia", "Lars", "Sanne", "Max", "Laura", "Jesse", "Emma", "Daniël", "Fleur", "Tim", "Tessa", "Stan", "Merel", "Rick", "Kirsten", "Nick"],
				lastNames = ["Baas", "Bakker", "van Beek", "van der Bijl", "Bos", "van der Berg", "de Boer", "Boswel", "van der Boor", "Braam", "Brouwer", "de (Bruijn Bruin", "van Buskirk", "van der Byl", "van Coevorden", "Citroen", "Cornelissen", "Dekker", "Deijck Dijk", "Dijkstra", "de Graaf", "de Groot", "de Haan", "de Haas", "Hendriksen Hendriks", "van den Heuvel", "Hoebeek Hoebee", "van het Hoff", "van der Kleij", "van Leeuwen", "de Jaager", "Janssen Jansen", "de Jong", "Koningh Koning", "de Lange", "van der Linden", "Meyer Meijer", "van der Meer", "mes = knife (maker) Mesman", "Meulenbelt", "van der Molen", "Muis", "Molenaar Mulder", "Maarschalkerweerd", "Peters", "Prins", "Ruys Ruis", "Rynsburger", "Smits Smit", "Spaans", "Stegenga", "Teuling", "Tuinstra", "Vinke", "Visser", "van Vliet", "de Vries", "Vos", "Vroom", "de Wees", "van der Westhuizen", "Willemsen Willems", "de Wit"];
				this.$refs.card.$el.classList.remove("move-enter-active");
				this.$refs.card.$el.classList.remove("move-enter");
				this.$refs.card.$el.classList.add("move-leave-active");
				this.$refs.card.$el.classList.add("move-leave");
				this.request.name = firstNames[Math.floor(Math.random() * firstNames.length)] + " " + lastNames[Math.floor(Math.random() * lastNames.length)];
				this.request.time = (parseInt(Math.random()*10) || 9) + [" am", " pm"][Math.floor(Math.random() * 2)] + [" today", " tomorrow"][Math.floor(Math.random() * 2)];
				this.request.distance = ([0, 1, 2][Math.floor(Math.random() * 3)] || "") + parseInt(Math.random()*10) + " km";
				let n = parseInt(Math.random()*100);
				this.request.leaveIn = n > 60 ? n - 60 : n;
				let a = 51.439589, b = 5.469528;
				a += Math.random()*100/1000, b += Math.random()*100/1000;
				this.center.lat = a;
				this.center.lng = b;
				this.center2.lat = a + 0.0205;
				this.center2.lng = b;
				this.imageURL = "/cluttered/cluttered-" + image + ".jpg";
			},
			updateRequest() {
				image++;
				this.$refs.card.$el.classList.add("move-enter-active");
				this.$refs.card.$el.classList.add("move-enter");
				setTimeout(() => {
					this.changeValues();
					setTimeout(() => {
						this.$refs.card.$el.classList.remove("move-leave-active");
						this.$refs.card.$el.classList.remove("move-leave");
					}, 300);
				}, 300);
			},
			acceptRequest() {
				localStorage.setItem("request", JSON.stringify(this.request));
				router.push("/accept");
			}
		}
	}
</script>

<style lang="scss" scoped>
	#content {
		position: relative;
	}
	.bg-map {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		z-index: 0;
	}
	.high-zindex {
		position: relative;
		z-index: 1;
	}
	.card {
		position: absolute;
		bottom: 76px;
		left: 20px;
		right: 20px;
	}
</style>