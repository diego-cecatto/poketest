<template>
	<div id="home">
		<div :class=" { extra:!generation.data && !loaded } ">
			<h1> Bem vindo a coleção de gerações de games Pokémon </h1>
			<label>
				Para começarmos, selecione a geração
			</label>
			<select v-model="generation" @change="openGeneration">
				<option v-for="generation in generations" :key="generation.name" :value="generation"> {{ sanitize(generation.name, true) }}</option>
			</select>
			<div class="description">
				Uma geração é um agrupamento de jogos Pokémon que os separa com base no Pokémon que eles incluem. Em cada geração, um novo conjunto de Pokémon, região, movimentos e habilidades que não existiam na geração anterior são lançados.
			</div>
		</div>
		<div v-if="generation.data">
			<h2> Curiosidades </h2>
			<table id="curiosidades">
				<tbody>
					<tr>
						<td>Número de novos Pokémons</td>
						<td id="numerosPokemons"> {{ generation.data.pokemon_species.length }} </td>
					</tr>
					<tr>
						<td>Grupo de Versões</td>
						<td>
							<poke-groups :groups="generation.data.version_groups"></poke-groups>
						</td>
					</tr>
					<tr>
						<td>Região principal</td>
						<td>
							{{ sanitize(generation.data.main_region.name) }}
						</td>
					</tr>
				</tbody>
			</table>
			<h2> Pokémons </h2>
			<div id="search">
				<input type="text" v-model="search" placeholder="Digite aqui o nome do pokemon">
				<span>
					<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 32 32" id="Glyph" version="1.1" viewBox="0 0 32 32" xml:space="preserve">
						<path d="M27.414,24.586l-5.077-5.077C23.386,17.928,24,16.035,24,14c0-5.514-4.486-10-10-10S4,8.486,4,14 s4.486,10,10,10c2.035,0,3.928-0.614,5.509-1.663l5.077,5.077c0.78,0.781,2.048,0.781,2.828,0  C28.195,26.633,28.195,25.367,27.414,24.586z M7,14c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S7,17.86,7,14z" id="XMLID_223_"/>
					</svg>
				</span>
				<div id="shadow-mode">
					<label> Modo sombra </label>
					<onoff-toggle v-model="shadow" theme="material" />
				</div>
			</div>
			<ul id="alphabet">
				<li v-for="letter in letters" :key="letter" @click="setLetter(letter)" :class=" { active : searchLetter == letter } ">
					{{ letter }}
				</li>
			</ul>
		<poke-species :species="generation.data.pokemon_species" :search="search" :letter="searchLetter" :shadow="shadow"></poke-species>
		</div>
	</div>
</template>
<script>
	import axios from 'axios';
	import Vue from 'vue';
	import PokeGroups from './../poke-components/groups/Groups.vue';
	import PokeSpecies from './../poke-components/Species.vue';
	import { OnoffToggle } from 'vue-onoff-toggle'
	export default {
		components: {
			PokeGroups : PokeGroups,
			OnoffToggle: OnoffToggle,
			PokeSpecies: PokeSpecies
		},
		data() {
			return {
				generations: [],
				generation: {
					groups : {
						data : []
					}
				},
				search: '',
				searchLetter: '',
				shadow: false,
				loaded: false
			};
		},
		mounted() {
			return this.get();
		},
		computed: {
			letters() {
				let letters = []
				for (let i = "A".charCodeAt(0), tot = "Z".charCodeAt(0); i <= tot; i++) {
					letters.push(String.fromCharCode([i]))
				}
				return letters
			}
		},
		methods: {
			async get() {
				return axios
					.get('https://pokeapi.co/api/v2/generation')
					.then(response => (this.generations = response.data.results ));
			},
			openGeneration() {
				this.loaded = true;
				this.expand(this.generation, 'data', (response) => {
					return response;
				});
			},
			async expand(item, prop, callback) {
				callback = callback || (data => (data));
				return axios
						.get(item.url)
						.then(response => (Vue.set(item, prop, callback(response.data))))
						.catch(error => {
							return error;
						});
			},
			setLetter(letter) {
				if (this.searchLetter == letter) {
					this.searchLetter = '';
					return;
				}
				this.searchLetter = letter;
			},
			sanitize(str, deep) {
				if (!str) {
					return;
				}
				if (deep) {
					var strings = str.split('-');
					return this.sanitize(strings[0]) + ' ' + strings[1].toUpperCase();
				}
				return str[0].toUpperCase() + str.substring(1)
			}
		}
	};
</script>

<style lang="scss">
	.v-toggle_thumb {
		position: absolute;
		transition: all 0.3s;
		border: 1px solid #ccc;
	}
	select {
		border-radius: 10px;
		background: #fff;
		padding: 10px;
	}
	.extra {
		select {
			width: 500px;
			margin-bottom: 16px;
		}

		label {
			font-size: 30px;
			display: block;
			margin-bottom: 8px;
		}
	}
	.description {
		font-size: 13px;
		text-align: left;
	}

	#alphabet {
		display: grid;
		grid-template-columns: repeat(26, 1fr);
		list-style: none;
		padding-left: 0;

		li {
			font-weight: bold;
			cursor: pointer;
			padding: 8px;
		}

		li.active {
			background-color: #f9ca1b;
			border-radius: 10px;
			&:after {
				content: "X";
				font-size: 8px;
				border-radius: 30px;
				color: #494949;
				background: #fff;
				padding: 5px;
			}
		}
	}

	#especies {
		display: grid;
		padding-left: 0;
		list-style: none;
		max-width: 100%;
		grid-template-columns: repeat(3, 1fr);

		&.shadow {
			div.pokemon {
				img {
					filter: brightness(0);
				}
			}
		}

		li {
			border: 1px solid #ccc;
			border-radius: 10px;
			margin-left: 8px;
			margin-bottom: 8px;
			text-align: center;
		}
	}

	#search {
		display: flex;

		input {
			border-radius: 10px 0 0 10px;
			width: 500px;
		}

		span {
			background-color: #f9ca1b;
			border-radius: 0 10px 10px 0;
			padding: 8px;

			svg {
				width: 20px
			}
		}

		#shadow-mode {
			line-height: 40px;
			display: flex;
			padding-left: 20px;

			.v-toggle {
				width: 34px;
				height: 14px;
				margin-top: 10px;
				border-radius: 7px;
				background-color: rgb(159, 159, 159);
				margin-left: 8px;
			}
		}
	}

	table#curiosidades {
		tr {
			td {
				text-align: left;
				padding-left: 8px;
				&:first-child {
					background: #ccc;
					padding-right: 8px;
				}
				ul {
					list-style: none;
					padding-left: 0;
				}
			}
		}
	}

	@media screen and (max-width: 840px) {
		select,
		.extra select {
			width: 100%
		}

		#search input {
			border-radius: 10px 0 0 10px;
			width: 35%;
		}

		#alphabet {
			display: grid;
			grid-template-columns: repeat(13, 1fr);
			list-style: none;
			padding-left: 0;
		}
	}

	@media screen and (min-width: 480px) and (max-width: 840px) {

	}

	@media screen and (min-width: 840px) and (max-width:992px) {
	}

	@media screen and (min-width: 840px) {
	}
</style>