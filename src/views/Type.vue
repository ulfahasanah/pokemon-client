<template>
  <div class="container-fluid">
    <div v-if="$auth.isAuthenticated">
        <side-bar/>
        <pokemon-list/>
    </div>
    <div v-if="!$auth.isAuthenticated">
      <b-row class="mt-5">
        <b-col>
          <b-card>
              <h4 class="text-center">Nothing to display, Please Sign in first! </h4>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
  
</template>
<script>
import SideBar from "../components/SideBar.vue";
import PokemonList from '../components/PokemonList.vue'

export default {
    name: 'type',
    components: {
        SideBar,
        PokemonList
    }
}
</script>