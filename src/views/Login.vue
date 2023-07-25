<template>
    <div>
        <h1>Login</h1>
        <form @submit.prevent="handleSubmit">
            <input type="email" placeholder="ingrese email" v-model.trim="email">
            <input type="password" placeholder="Ingrese contraseña" v-model.trim="password">
            <!-- <button type="submit" :disabled="userStore.loadingUser" @click="moastrarBoton">Acceso</button> -->
            <button @click="moastrarBoton">Acceso</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import {useUserStore} from '../stores/user'
//import {useRouter} from 'vue-router'

const userStore=useUserStore()
//const router=useRouter()

const email=ref('omar@gmail.com')
const password=ref('asdass')


const handleSubmit=async()=>{
    if(!email.value || password.value.length<6){
        return alert("Por favirllena los campos")
    }
    await userStore.loginUser(email.value,password.value)

     //router.push('/')
}
 const moastrarBoton=()=>{
    console.log(email.value)
 }

</script>


