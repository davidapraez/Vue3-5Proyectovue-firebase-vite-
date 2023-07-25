<template>
<div>
    <h1>Editar id: route.params</h1>
    <form @submit.prevent="handleSubmit">
    <input type="text" name="" placeholder="Ingrese URL" id="" v-model="url">
        <button type="submit" >
            Agregar
        </button>
</form>

</div>
</template>

<script setup>
import {useRoute} from 'vue-router'
import { onMounted, ref} from 'vue'
import {useDatabaseStore} from '../stores/database'

const storeDatabase=useDatabaseStore()


const route=useRoute()
const url=ref('')
console.log(route.params.id)

const handleSubmit=async()=>{
    await storeDatabase.updateUrl(route.params.id,url.value)
}
onMounted(async()=>{
    url.value=await storeDatabase.leerUrl(route.params.id)
})
//14:39 

</script>