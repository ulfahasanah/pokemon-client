<template>
  <div class="container-fluid">
    <div v-if="$auth.isAuthenticated">
        <side-bar/>
        <pokemon-list/>
    </div>
    <div v-if="!$auth.isAuthenticated">
      <not-login/>
    </div>
  </div>
  
</template>
<script>
import SideBar from "../components/SideBar.vue";
import PokemonList from '../components/PokemonList.vue'
import NotLogin from '../components/NotLogin.vue'

export default {
    name: 'type',
    components: {
        SideBar,
        PokemonList,
        NotLogin
    }
}
</script>