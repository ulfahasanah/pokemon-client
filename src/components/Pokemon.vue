<template>
    <div>
        <div class="mt-5" v-if="isLoading">
            <loading/>
        </div>
        <div v-if="!isLoading">
            <b-card no-body class="mx-auto overflow-hidden mt-5" style="max-width: 360px;">
                <b-row no-gutters>
                <b-col md="6">
                    <b-card-img :src="pokemon.sprites.front_default" alt="Image" class="rounded-0"></b-card-img>
                </b-col>
                <b-col md="6">
                    <b-card-body :title="pokemon.name">
                    <b-card-text>
                        This is a wider card with supporting text as a natural lead-in to additional content.
                        This content is a little bit longer.
                    </b-card-text>
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

export default {
    data() {
        return {
            pokemon: {},
            isLoading: true
        }
    },
    components: {
        loading
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
        console.log(res.data, "===")
        this.pokemon = res.data
        this.isLoading = false
        }
    }
}
</script>

<style>

</style>