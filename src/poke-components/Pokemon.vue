<template>
	<div>
		{{ specie.name }}
		<div v-if="pokemon" class="pokemon">
			<img :src="pokemon.sprites.front_default" width="96" height="96"/>
		</div>
		<div v-else>
			<svg width="90" height="90" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" id="Layer_1" style="enable-background:new 0 0 100 100;" version="1.1" viewBox="0 0 100 100" xml:space="preserve">
				<g>
					<g>
						<path d="M40.3,47.6c1.1-4.4,5-7.6,9.7-7.6c4.7,0,8.6,3.2,9.7,7.6C78.2,47.9,94.5,49,95,51.1c0-0.4,0-0.7,0-1.1 C95,25.1,74.9,5,50,5S5,25.1,5,50c0,0.4,0,0.7,0,1.1C5.5,49.1,21.8,47.9,40.3,47.6z"/>
						<path d="M37.1,57.6C39.7,62.1,44.6,65,50,65c5.4,0,10.2-2.9,12.9-7.4c13.9,0.3,21.9,1,26,1.6C84.7,77.1,68.7,90,50,90 c-18.7,0-34.7-12.9-38.9-30.7C15.2,58.6,23.2,57.9,37.1,57.6 M40.3,52.6c-17.2,0.3-32.5,1.3-35,3.1C8.2,77.8,27.1,95,50,95 c22.9,0,41.8-17.1,44.6-39.3c-2.5-1.8-17.7-2.8-35-3.1c-1.1,4.3-5,7.4-9.7,7.4C45.4,60,41.5,56.8,40.3,52.6L40.3,52.6z"/>
					</g>
					<circle cx="50" cy="50" r="7"/>
				</g>
			</svg>
		</div>
	</div>
</template>
<script>
	import Utils from './../libs/Utils.js';
	export default {
		props: {
			specie: null
		},
		data() {
			return {
				pokemon: null
			}
		},
		mounted : function() {
			Utils.requests.get({
				data: this.specie,
				callback: (response) => {
					for (var variety in response.varieties) {
						variety = response.varieties[variety];
						if (!variety.is_default) {
							continue;
						}
						Utils.requests.get({
							data: variety.pokemon,
							callback: (item) => {
								this.pokemon = item
							}
						});
						break;
					}
				}
			});
		}
	};
</script>