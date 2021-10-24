<template>
  <div class="container">
    <div v-if="$auth.isAuthenticated">
      <side-bar/>
      <pokemon/>
    </div>
    <div v-if="!$auth.isAuthenticated">
      <b-row class="mt-5">
        <b-col>
          <b-card >
              <h4 class="text-center">Nothing to display, Please Sign in first! </h4>
          </b-card>
        </b-col>
      </b-row>
   </div>
  </div>
  
</template>
<script>
import Pokemon from '../components/Pokemon.vue'
import SideBar from "../components/SideBar.vue";

export default {
  name: 'home',
  components: {
    Pokemon,
    SideBar
  },
  methods: {
   
  }
}
</script>