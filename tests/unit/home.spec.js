import { shallowMount } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
import Home from "../../src/views/Home.vue"
import axios from 'axios'
import flushPromises from 'flush-promises'
import { nextTick } from 'vue'
import Vue from 'vue'

describe("Testando a Home Page", () => {
	let wrapper = shallowMount(Home);
	// let wrapper;
	// beforeEach(() => {
	// 	wrapper = shallowMount(Home)
	// });

	test("Verificando se a listagem está sendo preenchida", async () => {
		let data = await Home.data();
		//todo use a get
		await axios.get('https://pokeapi.co/api/v2/generation').then(response => (data.generations = response.data.results));
		await wrapper.setData(data);
		expect(wrapper.vm.generations.length > 0).toBe(true);
		await flushPromises();
	});

	test("Selecionando a geração", async () => {
		await flushPromises();
		const select = wrapper.find('select');
		expect(select.exists()).toBe(true);
		const options = select.findAll('option');
		expect(options.exists()).toBe(true);
		options.at(0).setSelected();
		expect(wrapper.vm.generations[0]).toBe(wrapper.vm.generation);
	});

	test("Verificando a quantidade de Pokemóns", async () => {
		await flushPromises();
		await Vue.nextTick(async () => {
			const total = wrapper.find('#numerosPokemons');
			expect(total.exists()).toBe(true);
			expect(total.element.innerText).toBe('151');
		});
	});
})