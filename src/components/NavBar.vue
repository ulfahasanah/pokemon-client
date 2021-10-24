<template>
  <div>
      <b-navbar type="dark" variant="dark">
        <b-navbar-nav class="mx-auto"> 
          <b-nav-item to="/">Random</b-nav-item>
          <b-nav-item  v-b-toggle.sidebar-variant v-if="$auth.isAuthenticated">
            Types
          </b-nav-item>
          <!-- Check that the SDK client is not currently loading before accessing is methods -->
          <b-nav-item v-if="!$auth.loading">
            <!-- show login when not authenticated -->
            <a v-if="!$auth.isAuthenticated" @click="login"
              >Sign in</a
            >
            <!-- show logout when authenticated -->
            <a v-if="$auth.isAuthenticated" @click="logout"
              >Log out</a
            >
          </b-nav-item>
        </b-navbar-nav>
      </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  components: {},
  methods: {
    // Log the user in
    login() {
      this.$auth.loginWithRedirect();
    },
    // Log the user out
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin
      });
    }
  }
}
</script>