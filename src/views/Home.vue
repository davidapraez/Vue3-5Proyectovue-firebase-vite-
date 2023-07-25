<template>
    <div>
        <h1>Home </h1>
        <p>{{ userStore.userData?.email}}</p>

        <form @submit.prevent="handleSubmit">
            <input type="text" placeholder="Ingrese URL" v-model="url">
            <button type="submit">Agregar</button>

        </form>


        <p v-if="databaseStore.loadingDoc"> Loading docs ..</p>
        <ul v-else>
            <li v-for="item of databaseStore.documents" :key="item.id">
                {{ item.id }}
                <br>
                {{ item.name }}
                <br>
                {{ item.short }}
                <br>
                <Button @click="databaseStore.deleteUrl(item.id)">Eliminar</Button>
                <Button @click="router.push(`/editar/${item.id}`)">Editar</Button>
            </li>
        </ul>
    </div>
</template>

<script setup >
import {useUserStore} from '../stores/user'
import {useDatabaseStore} from '../stores/database'
import { ref } from 'vue';
import {useRouter} from 'vue-router'

const userStore=useUserStore()
const databaseStore=useDatabaseStore()
const router=useRouter()

databaseStore.getUrls()
const url=ref('');

const handleSubmit=()=>{
    if(validarURL(url.value)){
        databaseStore.addUrl(url.value)

    }else{
        console.log(" no es url")
    }
}
 
function validarURL(miurl) {
  try {
 
    new URL(miurl);
    return true;
 
  } catch (err) {
 
    return false;
 
  }
}


</script>
