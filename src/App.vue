<template>
  <a-layout class="layout">
   <a-layout-header v-if="!userStore.loadgingSession">
      
    <a-menu  v-model:selectedKeys="selectedKeys"
        theme="dark"
        mode="horizontal"
        :style="{ lineHeight: '64px' }">

        <a-menu-item key="home" v-if="userStore.userData">
          <router-link to="/"  >Home</router-link>
        </a-menu-item>
        <a-menu-item key="perfil" v-if="userStore.userData">
          <router-link to="/perfil"  >Perfil</router-link>
        </a-menu-item>
        <a-menu-item key="login" v-if="!userStore.userData">
          <router-link to="/Login" >Login</router-link>
        </a-menu-item>
        <a-menu-item key="register" v-if="!userStore.userData">
          <router-link to="/Register" >Register</router-link>
        </a-menu-item>
        <a-menu-item v-if="userStore.userData" @click="userStore.logoutUser" key="logout">
          Logout
        </a-menu-item>
    </a-menu>
    <nav>

    </nav>
  </a-layout-header>
  <a-layout-content style="padding: 0 50px">
    <div class="container">
      
      <div v-if="userStore.loadgingSession">Loading user...</div>  
          <router-view></router-view>

    </div>
    </a-layout-content>
</a-layout>
   
</template>

<script setup >
import {useUserStore} from './stores/user'
import {ref, watch} from 'vue'
import { useRoute} from 'vue-router'

const selectedKeys=ref([''])
const route=useRoute()
const userStore=useUserStore()

selectedKeys.value.pop()
watch(()=>route.name,()=>selectedKeys.value=[route.name]
)

</script>

<style>
.container{
  background-color: rgb(246, 242, 242);
  padding: '24px';
  min-height: '500vh'
}
.text-center{
  text-align: center;
}
</style>

