<template>

    <a-row>
        <a-col span="12" offset="6">
            <a-form name="basicLogin" automcomplete="off" layout="vertical" :model="formState" @finish="handleFinish"
                @finishFailed="handleFinishFailed">
                <a-form-item name="email" label="Ingrese un correo" :rules="[{ required: true,type:'email', whitespace:true, message: 'Ingrese un email valido!' }]">
                    <a-input v-model:value="formState.email"></a-input>
                </a-form-item>
                <a-form-item name="password" label="Ingrese una contraseña" :rules="[{ required: true,min:6 ,message: 'Ingrese un password' }]">
                    <a-input-password v-model:value="formState.password"></a-input-password>
                </a-form-item>
                <a-form-item name="repassword" label="Repita la contraseña" :rules="[{ required: true,message: 'las contraseñas no coinciden',validator:validatePass}]">
                    <a-input-password v-model:value="formState.repassword"></a-input-password>
                </a-form-item>
                <a-form-item>
                    <a-button type="primary" html-type="submit" :loading="userStore.loadingUser" :disabled="userStore.loadingUser">
                            Ingresar
                    </a-button>
                </a-form-item>
            <!-- <input type="password" placeholder="Ingrese contraseña" v-model.trim="password"> -->
            <!-- <button type="submit" :disabled="userStore.loadingUser" @click="moastrarBoton">Acceso</button> -->
            <!-- <button @click="moastrarBoton">Acceso</button> -->
        </a-form>
        </a-col>
        
    </a-row>
</template>


<script setup>
import { ref,reactive } from 'vue';
import {useUserStore} from '../stores/user'
//import {useRouter} from 'vue-router'
import { message } from 'ant-design-vue';

const userStore=useUserStore()
//const router=useRouter()

const formState=reactive({
    email:'omar@gmail.com',
    password:'asdass',
    repassword:'asdass',
});
const validatePass=async(_rule,value)=>{
    if(value===''){
        return Promise.reject('Repita contraseña')
    }
    if(value!==formState.password){
        return Promise.reject('No coniciden las contraseñas')
    }
    return Promise.resolve()
}

const handleFinish= async(values) => {
    const respuesta=await userStore.registerUser(formState.email,formState.password)
    if(!respuesta){
        message.success(`Revusa tu correo electronico ${formState.email}` , 3);
        return
    }
    switch(respuesta){
        case 'auth/email-already-in-use':
                message.error('El email ya esta en uso');
            break;
        default:
                message.error('Fallo algo desde Firebase ');
            break;
    }

};

// const handleSubmit=async()=>{
//     if(!email.value || password.value.length<6){
//         return alert("Por favirllena los campos")
//     }
    

//      //router.push('/')
// }
 

</script>

