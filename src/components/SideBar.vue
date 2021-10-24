<template>
   <div>
    <!-- <b-button v-b-toggle.sidebar-variant>Select Type of Pokemon</b-button> -->
    <b-sidebar id="sidebar-variant" title="Pokemon Types" bg-variant="dark" text-variant="light" shadow>
        <b-list-group  v-for="(type, i) in pokemonTypes" :key="i">
            <b-list-group-item class="text-center" :to="type.url"  variant="info">
                {{type.name.toUpperCase()}}
                <!-- <router-link :to="{ path: '/', query: { type: type.url }}">{{type.name}}</router-link> -->
            </b-list-group-item>
        </b-list-group>
    </b-sidebar>
  </div>
</template>
<script>
import axios from 'axios'

export default {
    data() {
        return {
            pokemonTypes: []
        }
    },
    methods: {
        async getPokemonTypeList() {
            const accessToken = await this.$auth.getTokenSilently()
            let res = await axios.get("http://localhost:3000/api/v1/pokemon/type", {
                headers: {
                Authorization: `Bearer ${accessToken}`
                }
            });

            res.data.results.forEach(element => {
                const splitUrl = element.url.split('/')
                const typeId = splitUrl[splitUrl.length-2]
                element.url = `type/${typeId}`
            })

            this.pokemonTypes = res.data.results
        }
    },
    created() {
        this.getPokemonTypeList()
    }
}
</script>
