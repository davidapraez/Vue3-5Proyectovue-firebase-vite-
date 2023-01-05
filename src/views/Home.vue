<template>
    <div>
        <h1>Home </h1>
        <p>{{ userStore.userData?.email}}</p>
    </div>
</template>

<script setup >
import {onAuthStateChanged} from 'firebase/auth'
import { auth } from '../firebaseConfig';
import {useUserStore} from '../stores/user'

const userStore=useUserStore()

onAuthStateChanged(auth,(user)=>{
    console.log(user)
})
</script>
