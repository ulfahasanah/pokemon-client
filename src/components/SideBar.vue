<template>
   <div>
    <b-sidebar id="sidebar-variant" title="Pokemon Types" bg-variant="dark" text-variant="light" shadow>
        <b-list-group  v-for="(type, i) in pokemonTypes" :key="i">
            <b-list-group-item class="text-center" :to="{ path: `/type/${type.url}` }"  variant="info" replace>
                {{type.name.toUpperCase()}}
            </b-list-group-item>
        </b-list-group>
    </b-sidebar>
  </div>
</template>
<script>
import axios from 'axios'
import baseUrl from '../config/server'

export default {
    data() {
        return {
            pokemonTypes: []
        }
    },
    methods: {
        async getPokemonTypeList() {
            const accessToken = await this.$auth.getTokenSilently()
            let res = await axios.get(`${baseUrl}/api/v1/pokemon/type`, {
                headers: {
                Authorization: `Bearer ${accessToken}`
                }
            });

            res.data.results.forEach(element => {
                const splitUrl = element.url.split('/')
                const typeId = splitUrl[splitUrl.length-2]
                element.url = `${typeId}`
            });
            let newTypeList = res.data.results.filter( el => {
                return el.name !== 'unknown'
            })
            this.pokemonTypes = newTypeList
        }
    },
    created() {
        this.getPokemonTypeList()
    }
}
</script>
