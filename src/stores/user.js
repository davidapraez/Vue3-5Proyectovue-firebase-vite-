import {defineStore} from 'pinia'
import {createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile} from 'firebase/auth'
import { auth,db,storage } from '../firebaseConfig';
import {doc,getDoc,setDoc} from 'firebase/firestore/lite'
import router from '../router'
import {useDatabaseStore} from './database'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';


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
                    //Validaciones firebase 129 :// 17:29
            }catch(error){
                console.log(error.code);
                return error.code
            }finally{
                this.loadingUser=false
            }
        },
        async updateUser(displayName,imagen){
            try {
                this.loadingUser=true;
                if(imagen){
                const storageRef=ref(storage,`perfiles/${auth.currentUser.uid}`)
                await uploadBytes(storageRef,imagen.originFileObj)
                const photoURL=await getDownloadURL(storageRef)
                await updateProfile(auth.currentUser,{
                    photoURL,displayName,
                })
                }
                await updateProfile(auth.currentUser,{
                    displayName,
                })
                
                this.setUser(auth.currentUser)
            } catch (error) {
                console.log(error)
                return error.code
            }finally{
                this.loadingUser=false;
            }
            
        },
        async setUser(user){
            const docRef=doc(db,'users',user.uid)
            try {
            
                this.userData={
                        email:user.email,
                        uid:user.uid,
                        displayName:user.displayName,
                        photoURL:user.photoURL
               
         } 

                await setDoc(docRef,this.userData)
                    
            } catch (error) {
                console.log(error)
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
                await this.setUser(user)
            router.push('/');
            } catch (error) {
                console.log(error.code);
                return error.code
                
            }finally{
                this.loadingUser=false
                
            }
        },
        async logoutUser(){
            const databaseStore=useDatabaseStore();
            databaseStore.$reset();
            try {
                router.push('/login')
                await signOut(auth)
                
            } catch (error) {
                console.log(error);
            }finally{
                this.loadingUser=false
            }
        },
        currentUser(){
            return new Promise((resolve,reject)=>{
                const unsuscribe=onAuthStateChanged(auth,async(user)=>{
                    if(user){
                        console.log(user)
                        //await this.setUser(user)
                        this.userData={
                            email:user.email,
                            uid:user.uid,
                            displayName:user.displayName,
                            photoURL:user.photoURL
                   
             } 
                    }else{
                        this.userData=null
                        const databaseStore=useDatabaseStore();
                        databaseStore.$reset();
                        
                    }
                    resolve(user)
                }, e=>reject(e))
                unsuscribe()
            })
        }
    },
    }
)
