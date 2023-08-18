

<template>
    <!-- <p v-if="databaseStore.loadingDoc"> Loading docs ..</p> -->

    <a-space direction="vertical" style="width: 100%" >
       <a-card v-for="item of databaseStore.documents" :title="item.short" style="width: 100%"  :key="item.id">
    <template #extra>
        <a-space>
            <a-popconfirm
    title="Estas seguro que quieres eliminarlo?"
    ok-text="Si"
    cancel-text="No"
    @confirm="confirm(item.id)"
    @cancel="cancel"
  >
  <a-button danger html-type="submit" :disabled="databaseStore.loading" :loading="databaseStore.loading">
                            Eliminar
                    </a-button>
  </a-popconfirm>
                    <a-button type="primary" html-type="submit" @click="router.push(`/editar/${item.id}`)">
                            Editar
                    </a-button>
                    <a-button   @click="copiarPortapapeles(item.id)">
                        Copiar
                </a-button>
        </a-space>
     
    </template>
    <p>{{ item.name }}</p>
  </a-card>
    </a-space>
    
  <br />
    </template> 
<script setup>
import { reactive, ref, onMounted } from 'vue';
import {useDatabaseStore} from '../../stores/database'
import { message } from 'ant-design-vue';
import {useRouter} from 'vue-router'

const router=useRouter()
    const databaseStore=useDatabaseStore()

const copiarPortapapeles=async(item)=>{

    if(!navigator.clipboard){
        return message.error("No se pudo copiar")
    }
    const path=`${window.location.href}${item}` 
    
    // const res = await navigator.clipboard.writeText(path)
    // if(res){
    //     message.error("No se pudo copiar al portapapeles")
    // }else{
    //     message.success("se copio con exito")
    // }
    navigator.clipboard.writeText(path)
  .then(() => {
    message.success("Se copio con exito")
  })
  .catch(err => {
    message.error("No se pudo copiar")
  })
}

const confirm=async(id)=>{
    const error=await databaseStore.deleteUrl(id)
    if(!error){
        return message.success(`Se elimino la Url satisfactoriamente` , 3);
    }
    switch(error){
        case 'auth/email-already-in-use':
                message.error('El email ya esta en uso');
            break;
        default:
                message.error('Algo fallo desde Firebase ');
            break;
    }
}
databaseStore.getUrls();

const cancel=()=>{
    message.error('No se elimino');
}

</script>