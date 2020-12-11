<template>
	<ul>
		<li v-for="group in groups" :key="group.name">
			<poke-group :group="group" ></poke-group>
		</li>
	</ul>
</template>
<script>
	import PokeGroup from './Group.vue';
	export default {
		components: {
			PokeGroup: PokeGroup
		},
		props: {
			groups: null
		}
	};
</script>