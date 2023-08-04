

<template>
    <div>
        <a-form name="addForm" automcomplete="off" layout="vertical" :model="formState" @finish="handleFinish"
                @finishFailed="handleFinishFailed">
                <a-form-item name="url" label="Ingrese una Url" :rules="[{ required: true, whitespace:true, message: 'Ingrese una Url valida', pattern:/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/ }]">
                    <a-input v-model:value="formState.url"></a-input>
                </a-form-item>
                <a-form-item>
                    <a-button type="primary" html-type="submit" :loading="databaseStore.loading" :disabled="databaseStore.loading">
                            Agregar Url
                    </a-button>
                </a-form-item>

        </a-form>
    </div>
    </template> 
<script setup>
import { reactive, ref } from 'vue';
import {useDatabaseStore} from '../../stores/database'
import { message } from 'ant-design-vue';


const databaseStore=useDatabaseStore()

const formState=reactive({
    url:'',
});

const handleFinish= async(values) => {
    console.log("Funciona",values)
    const error=await databaseStore.addUrl(formState.url)
    if(!error){
        formState.url=""
        return message.success(`Se guardo la Url satisfactoriamente` , 3);
    }
    switch(error){
        case 'auth/email-already-in-use':
                message.error('El email ya esta en uso');
            break;
        default:
                message.error('Algo fallo desde Firebase ');
            break;
    }

};

</script>