<template>
  <div class="home">
    <h1>Home</h1>
    <div v-if="$auth.isAuthenticated">
      <b-button variant="danger" @click="hitAPI()">Button</b-button>
    </div>
    <div v-if="!$auth.isAuthenticated">
      <span>Please Sign in first</span>
    </div>
  </div>
  
</template>
<script>
import axios from 'axios' 

export default {
  name: 'home',
  components: {},
  methods: {
    async hitAPI() {
      const accessToken = await this.$auth.getTokenSilently()
      let res = await axios.get("http://localhost:3000/api/v1/pokemon", {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      return res.data.results;
    }
  }
}
</script>