<template>
    <div>
        <b-card v-for="(el, i) in pokemon" :key="i" no-body class="overflow-hidden" style="max-width: 540px;">
            <b-row no-gutters>
            <b-col md="6">
                <b-card-img src="https://picsum.photos/400/400/?image=20" alt="Image" class="rounded-0"></b-card-img>
            </b-col>
            <b-col md="6">
                <b-card-body title="Horizontal Card">
                <b-card-text>
                    This is a wider card with supporting text as a natural lead-in to additional content.
                    This content is a little bit longer.
                </b-card-text>
                </b-card-body>
            </b-col>
            </b-row>
        </b-card>
    </div>
</template>

<script>
import axios from 'axios' 
export default {
    data() {
        return {
            pokemon: []
        }
    },
    mounted: function () {
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
        this.pokemon = res.data.results
        }
    }
}
</script>

<style>

</style>