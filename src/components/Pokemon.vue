<template>
    <div>
        <div class="mt-5" v-if="isLoading">
            <loading/>
        </div>
        <div v-if="!isLoading">
            <b-card no-body class="mx-auto overflow-hidden mt-4">
                <b-row no-gutters>
                <b-col md="7" class="text-center mx-auto">
                    <b-card-body :title="pokemon.name">
                    <b-card-img :src="pokemon.sprites.front_default" alt="Image" class="rounded-0"></b-card-img>
                     <GChart
                        type="BarChart"
                        :settings="{packages: ['bar']}"
                        :data="pokemon.stats"
                        :options="chartOptions"
                        :createChart="(el, google) => new google.charts.Bar(el)"
                        @ready="onChartReady"
                    />
                    </b-card-body>
                </b-col>
                </b-row>
            </b-card>
        </div>
    </div>
</template>

<script>
import axios from 'axios' 
import loading from '../components/Loading.vue'
import { GChart } from 'vue-google-charts'


export default {
    data() {
        return {
            pokemon: {},
            isLoading: true,
            chartsLib: null
        }
    },
    components: {
        loading,
        GChart
    },
    created: function () {
        this.getRandomPokemon();
    },
    methods: {
        async getRandomPokemon() {
        const accessToken = await this.$auth.getTokenSilently()
        let res = await axios.get("http://localhost:3000/api/v1/pokemon", {
            headers: {
            Authorization: `Bearer ${accessToken}`
            }
        });
        this.pokemon = res.data
        console.log(res.data);
        let temp = [[], []]
        this.pokemon.stats.forEach(el => {
            temp[1].push(el.base_stat) 
        });
        this.pokemon.stats.forEach(el => {
            temp[0].push(el.stat.name) 
        });
        this.pokemon.stats = temp
        const temp1 = ['stat performance'].concat(temp[0])
        const temp2 = ['stat'].concat(temp[1])
        this.pokemon.stats = [temp1, temp2]

        this.isLoading = false
        },
         onChartReady (chart, google) {
            this.chartsLib = google
        },
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