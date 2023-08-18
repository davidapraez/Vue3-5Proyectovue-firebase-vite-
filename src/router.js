import {createRouter,createWebHistory} from 'vue-router'
import {useUserStore} from './stores/user'

import  Home  from './views/Home.vue'
import  Editar from './views/Editar.vue'
import  Login  from './views/Login.vue'
import  Register  from './views/Register.vue'
import  Perfil from './views/Perfil.vue'
import  NotFound from './views/NotFound.vue'
import {useDatabaseStore} from './stores/database'


const requireAuth=async(to, from, next)=>{
    const userStore=useUserStore()
    userStore.loadgingSession=true
    const user=await userStore.currentUser()
    if(user){
        next()
    }else{
        next('/login')
    }
    userStore.loadgingSession=false
}
const redireccion= async(to,from,next)=>{
        const dbStore=useDatabaseStore()
        const userStore=useUserStore()
        userStore.loadgingSession=true
        //console.log(to.params.pathMatch[0])
        const name=await dbStore.getURL(to.params.pathMatch[0])
        if(!name){
            next()
            userStore.loadgingSession=false
        }else{
            window.location.href=name
            userStore.loadgingSession=true
            next()
        }
        

}


const routes=[
    {path:'/',component:Home, beforeEnter: requireAuth,name:'home'},
    {path:'/editar/:id',component:Editar, beforeEnter: requireAuth,name:'editar'},
    {path:'/perfil',component:Perfil, beforeEnter: requireAuth,name:'perfil'},
    {path:'/login',component:Login,name:'login'},
    {path:'/register',component:Register,name:'register'},
    {path:'/:pathMatch(.*)*',component:NotFound,name:'404',beforeEnter:redireccion},
]

const router=createRouter({
    routes,
    history: createWebHistory()
})

export default router