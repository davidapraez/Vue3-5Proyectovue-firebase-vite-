<template>
  <div>
    <h1>App</h1>
    <nav v-if="!userStore.loadgingSession">
      <router-link to="/" v-if="userStore.userData" >Home</router-link>
      <router-link to="/Login" v-if="!userStore.userData">Login</router-link>
      <router-link to="/Register" v-if="!userStore.userData">Register</router-link>
      <button @click="userStore.logoutUser">Logout</button>
    </nav>
    <div v-else>Loading user...</div>
    <router-view></router-view>
  </div>
</template>

<script setup >
import {useUserStore} from './stores/user'

const userStore=useUserStore()


</script>

