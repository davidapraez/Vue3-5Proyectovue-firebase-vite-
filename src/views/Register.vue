<template>
    <div>
        <h1>Register</h1>
        <form @submit.prevent="handleSubmit">
            <input type="email" placeholder="ingrese email" v-model.trim="email">
            <input type="password" placeholder="Ingrese contraseña" v-model.trim="password">
            <button type="submit" :disabled="userStore.loadingUser">Crear usuario</button>
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
    await userStore.registerUser(email.value,password.value)

     //router.push('/')
}
 

</script>

