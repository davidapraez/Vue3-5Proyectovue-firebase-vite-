<template>
    <h1 class="text-center">Perfil de usuario</h1>
    <!-- <p>{{userStore.userData}}</p> -->
    <div class="text-center mb-5">
        <a-avatar :src='userStore.userData.photoURL' :size="120" style="align-items: center;">
        <template #icon><UserOutlined /></template>
    </a-avatar>
    </div>
    
    <a-row>
        <a-col span="12" offset="6">
            <a-form name="basicPerfil" automcomplete="off" layout="vertical" :model="userStore.userData" @finish="handleFinish"
                >
                <a-form-item name="email"  label="Tu Correo (No modificable)" :rules="[{ required: true,type:'email', whitespace:true, message: 'Ingrese un email valido!' }]">
                    <a-input disabled v-model:value="userStore.userData.email"></a-input>
                </a-form-item>
                <a-form-item name="displayName" label="Ingrese su NickName" :rules="[{ required: true, whitespace:true, message: 'Ingrese un nick valido!' }]">
                    <a-input v-model:value="userStore.userData.displayName"></a-input>
                </a-form-item>
                <a-upload v-model:file-list="fileList" list-type="picture" :before-upload="beforeUpload" :max-count="1" @change="handleChange">
                    <a-button>
                      <upload-outlined></upload-outlined>
                      subir foto de perfil
                    </a-button>
                  </a-upload>
                  <br>
                  <br>
                  <div class="text-center">
                    <a-form-item>
                    <a-button type="primary" html-type="submit" :loading="userStore.loadingUser" :disabled="userStore.loadingUser">
                            Actualizar
                            
                    </a-button>
                </a-form-item>
                  </div>
                 
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
import { UserOutlined } from '@ant-design/icons-vue';
const fileList=ref([])
const userStore=useUserStore()


const beforeUpload=(file)=>{
    fileList.value=[...fileList.value,file]
    return false;
}

const handleRemove=(file)=>{
    const index=fileList.value.indexOf(file)
    const newFileLIST=fileList.value.slice()
    newFileLIST.splice(index,1)
    fileList.value=newFileLIST
}

const handleChange =info=>{
    //validar los tipos de imagenes
    if(info.file.status!=='uploading'){
        const isJpgOrPng=info.file.type==='image/jpeg' || info.file.type==='image/png'
        if(!isJpgOrPng){
            handleRemove(info.file)
            return message.error("Solo puedes subir Jpg o Png")
        }
        const isLT2M=info.file.size/1024/1024<2
        if(!isLT2M){
            message.error("La imagen debe ser mas pequeña que 2 Mb")
            handleRemove(info.file)
            return
        }
    }
    //Valida que sea solo una imagen si el user sube otra

    let resFileList=[...info.fileList]
    resFileList=resFileList.slice(-1)
    resFileList=resFileList.map(file=>{
        if(file.response){
            file.url=file.response.url
        }
    })
}


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
 const handleFinish= async() => {
    fileList.value[0]
    const respuesta= await userStore.updateUser(userStore.userData.displayName)
    if(fileList.value[0]){
        const error=await userStore.updateImg(fileList.value[0])
        if(error){
            return message.error('Problemas al subir tu imagen')
        }
        message.success('Se actualizo tu informacion DisplayName')
    }
    // console.log(userStore.loadingUser)

};
const handleFinishFailed = errors => {
  console.log(errors);
};

</script>

<style>
.mb-5{
    margin: 2rem;
}
</style>
