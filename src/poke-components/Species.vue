<template>
<div>
	<ul id="especies" :class="{ shadow : shadow}">
		<li v-for="specie in species" :key="specie.name" :class="{ hidde: (letter && letter.toLowerCase() != specie.name[0]) || (search && specie.name.toLowerCase().indexOf(search.toLowerCase()) == -1)}" >
			<poke-mon :specie="specie"></poke-mon>
		</li>
	</ul>
</div>
</template>
<script>
	import PokeMon from './../poke-components/Pokemon.vue';
	export default {
		components: {
			PokeMon:PokeMon
		},
		props: {
			species: {},
			letter: null,
			search: null,
			shadow: null
		},
		mounted : function() {
			this.species.sort((a, b) => {
				if (a.name < b.name) { return -1; }
				if (a.name > b.name) { return 1; }
				return 0;
			});
		}
	};
</script>