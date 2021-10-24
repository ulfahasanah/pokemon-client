<template>
  <div class="container">
    <div v-if="$auth.isAuthenticated">
        <side-bar/>
    </div>
    <div v-if="!$auth.isAuthenticated">
      <span>Please Sign in first</span>
    </div>
  </div>
  
</template>
<script>
import SideBar from "../components/SideBar.vue";
import axios from "axios";

export default {
    name: 'type',
    components: {
        SideBar
    },
    mounted : function() {
        this.getPokemontListByType()
    },
    watch: {
        "$route.params.id": function () {
            this.getPokemontListByType()
        }
    },
    methods: {
        async getPokemontListByType () {
            const urlPath = this.$route.path
            const typeId = urlPath[urlPath.length-1]


            const accessToken = await this.$auth.getTokenSilently()
            let res = await axios.get(`http://localhost:3000/api/v1/pokemon/type/${typeId}`, {
                headers: {
                Authorization: `Bearer ${accessToken}`
                }
            });

            console.log(res.data.pokemon, "<><><><")
            // this.pokemon = res.data.results
            
        }
    }
}
</script>