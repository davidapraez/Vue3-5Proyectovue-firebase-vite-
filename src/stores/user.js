import {defineStore} from 'pinia'
import {createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import { auth } from '../firebaseConfig';
import router from '../router'
import {useDatabaseStore} from './database'


export const useUserStore=defineStore('userStore',{
    state : ()=>({
        userData:null,
        loadingUser:false,
        loadgingSession:false,
    }),
    actions:{
        async registerUser(email,password){
            this.loadingUser=true
            try{
                const {user}=await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password);
                    this.userData={email:user.email,uid:user.uid};
                    router.push('/');
            }catch(error){
                console.log(error);
            }finally{
                this.loadingUser=false
            }
        },
        async loginUser(email,password){
            this.loadingUser=true
            try {
                const {user}=await  signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                    );
                this.userData={email:user.email,uid:user.uid};
                router.push('/');
            } catch (error) {
                console.log(error);
            }finally{
                this.loadingUser=true
                
            }
        },
        async logoutUser(){
            const databaseStore=useDatabaseStore();
            databaseStore.$reset();
            try {
                await signOut(auth)
                this.userData=null
                router.push('/login')
            } catch (error) {
                console.log(error);
            }finally{
                this.loadingUser=false
            }
        },
        currentUser(){
            return new Promise((resolve,reject)=>{
                const unsuscribe=onAuthStateChanged(auth,user=>{
                    if(user){
                        this.userData={email:user.email,uid:user.uid};
                    }else{
                        const databaseStore=useDatabaseStore();
                        databaseStore.$reset();
                        this.userData=null
                    }
                    resolve(user)
                }, e=>reject(e))
                unsuscribe()
            })
        }
    },
    }
)
