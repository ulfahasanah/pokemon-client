<template>
  <div class="container bv-example-row">
    <div v-if="$auth.isAuthenticated">
      <side-bar/>
      <b-row>
        <b-col md="6" offset-md="3"><pokemon/></b-col>
      </b-row>
    </div>
    <div v-if="!$auth.isAuthenticated">
      <not-login/>
   </div>
  </div>
  
</template>
<script>
import Pokemon from '../components/Pokemon.vue'
import SideBar from "../components/SideBar.vue";
import NotLogin from '../components/NotLogin.vue'

export default {
  name: 'home',
  components: {
    Pokemon,
    SideBar,
    NotLogin
  },
  methods: {
   
  }
}
</script>