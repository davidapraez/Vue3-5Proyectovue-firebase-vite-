<template>
    <h1 class="text-center">Login</h1>
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
                <a-form-item>
                    <a-button type="primary" html-type="submit" :loading="userStore.loadingUser" :disabled="userStore.loadingUser">
                            Log in
                            
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
import { reactive, ref } from 'vue';
import {useUserStore} from '../stores/user'
import { message } from 'ant-design-vue';
//import {useRouter} from 'vue-router'

const userStore=useUserStore()
//const router=useRouter()
const formState=reactive({
    email:'omar@gmail.com',
    password:'asdass',
});

// const email=ref('omar@gmail.com')
// const password=ref('asdass')


const handleSubmit=async()=>{
    if(!formState.email || formState.password.length<6){
        return alert("La contraseña es muy pequeña")
    }
    
     //router.push('/')
}


 const moastrarBoton=()=>{
    console.log(email.value)
 }
 const handleFinish= async(values) => {
    const respuesta=await userStore.loginUser(formState.email,formState.password)
    if(!respuesta){
        message.success(`Bienvenido: ${formState.email}` , 2);
        return
    }
    switch(respuesta){
        case 'auth/user-not-found':
                message.error('Usuario no encontrado');
            break;
        case 'auth/wrong-password':
            message.error('La contraseña es incorrecta');
        default:
                message.error('Fallo algo desde Firebase ', respuesta);
            break;
    }
    // console.log(userStore.loadingUser)

};
const handleFinishFailed = errors => {
  console.log(errors);
};

</script>


