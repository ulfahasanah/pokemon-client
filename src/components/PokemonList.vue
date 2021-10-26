<template>
    <div>
        <div class="mt-5" v-if="isLoading">
            <loading/>
        </div>
        <div v-if="!isLoading">
            <b-row md="10">
                <b-col class="text-center mt-5">
                    <b-jumbotron>
                    <template #header>{{ capitalize(pokemonType) }}</template>
                    </b-jumbotron>
                </b-col>
            </b-row>
            <b-row v-if="pokemonList.length > 0" no-gutters>
                <b-col md="5" class="mx-5 my-5" v-for="(el, i) in pokemonList" :key="i">
                    <b-card no-body class="overflow-hidden mt-4">
                        <b-card-body class="d-flex">
                            <b-col md="4">
                                <b-card-img :src="el.sprites.front_default" alt="Image" class="rounded-0"></b-card-img>
                                <b-card-text class="text-center text-muted h4">{{capitalize(el.name)}}</b-card-text>
                            </b-col>
                            <b-col md="4">
                                <GChart
                                    type="BarChart"
                                    :settings="{packages: ['bar']}"
                                    :data="el.stats"
                                    :options="chartOptions"
                                    :createChart="(el, google) => new google.charts.Bar(el)"
                                    @ready="onChartReady"
                                />
                            </b-col>
                        </b-card-body>
                    </b-card>
                </b-col>
            </b-row>
            <b-row class="mt-5" v-if="pokemonList.length == 0">
                <b-col>
                    <b-card>
                        <h4 class="text-center">No pokemon list for {{ pokemonType }} type </h4>
                    </b-card>
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script>
import loading from "../components/Loading.vue"
import { GChart } from 'vue-google-charts'
import axios from "axios";
import baseUrl from '../config/server'

export default {
    data() {
        return {
            pokemonList: [],
            isLoading: true,
            chartsLib: null,
            pokemonType: ''
        }
    },
    components: {
        loading,
        GChart
    },
    created : function() {
        this.getPokemontListByType()
    },
    watch: {
        "$route.params.id": function () {
            this.getPokemontListByType()
        }
    },
    methods: {
        async getPokemontListByType () {
            this.isLoading = true
            const urlPath = this.$route.path.split('/')
            const typeId = urlPath[urlPath.length-1]
            const accessToken = await this.$auth.getTokenSilently()
            let res = await axios.get(`${baseUrl}/api/v1/pokemon/type/${typeId}`, {
                headers: {
                Authorization: `Bearer ${accessToken}`
                }
            });
            this.pokemonType = res.data.name
            let pokemon = res.data.pokemon
            let data = []
            pokemon.forEach(async el => {
                const urlSplit = el.pokemon.url.split('/')
                const id = urlSplit[urlSplit.length-2]
                let pokemon = await this.getPokemon(id)
                data.push(pokemon)
            })
                this.pokemonList = data
                this.isLoading = false
        },
        async getPokemon(id) {
            const accessToken = await this.$auth.getTokenSilently()
            let res = await axios.get(`${baseUrl}/api/v1/pokemon/` + id, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            let pokemon = res.data
            let temp = [[], []]
            pokemon.stats.forEach(el => {
                    temp[1].push(el.base_stat) 
                });
            pokemon.stats.forEach(el => {
                    temp[0].push(el.stat.name) 
                });
                const temp1 = ['stat performance'].concat(temp[0])
                const temp2 = ['stat'].concat(temp[1])
            pokemon.stats = [temp1, temp2]
            return pokemon
        },
         onChartReady (chart, google) {
            this.chartsLib = google
        },
        capitalize(string) {
           return string.charAt(0).toUpperCase() + string.slice(1)
        }
    },
    computed: {
        chartOptions () {
        if (!this.chartsLib) return null
        return this.chartsLib.charts.Bar.convertOptions({
            chart: {
            title: 'Stat Performance',
            },
            bars: 'vertical', // Required for Material Bar Charts.
            hAxis: { format: 'decimal' },
            height: 450,
            width: 350
            })
        }
    }
}
</script>

<style>

</style>