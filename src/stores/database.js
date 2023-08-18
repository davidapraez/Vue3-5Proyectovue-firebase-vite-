import { setDoc, collection,deleteDoc, getDocs, query, where, doc, getDoc,updateDoc } from 'firebase/firestore/lite'
import {defineStore} from 'pinia'
import { db,auth } from '../firebaseConfig'
import {nanoid} from 'nanoid'
import router from '../router'


export const useDatabaseStore=defineStore('database',{
    state : ()=>({
        documents:[],
        loadingDoc:false,
        loading:false
    }),
    actions:{
        async getURL(id){
            try {
                const docRef = doc(db, "urls", id);
                const docSnap=await getDoc(docRef);
                if (!docSnap.exists()) {
                    return false
                }
    
                return docSnap.data().name;
            } catch (error) {
                return false
            }finally{

            }
        }
        ,
        async getUrls(){
            if(this.documents.length!==0){
                return;
            }

            this.loadingDoc=true; 
            try {

                this.documents=[]
                const q=query(collection(db,"urls"),
                where("user", "==", auth.currentUser.uid)
                );
                const querySnapshot=await getDocs(q);
                querySnapshot.forEach((doc)=>{
                    this.documents.push({
                        id:doc.id,
                        ...doc.data(),
                    });
                });
            } catch (error) {
                console.log(error)
            }finally{
                this.loadingDoc=false;
            }
        },
        async leerUrl(id){
            try {
                const docRef = doc(db, "urls", id);
                const docSnap=await getDoc(docRef);
                if (!docSnap.exists()) {
                    throw new Error("no existe el doc")
                }
                    if(docSnap.data().user!=auth.currentUser.uid){
                        throw new Error("no le pertenece ese documento")
                   }
                return docSnap.data().name;
            } catch (error) {
                console.log(error.message)
            }finally{

            }
        },
        async updateUrl(id,name){
            this.loading=true
            try {
            const docRef = doc(db, "urls", id);
            const docSnap=await getDoc(docRef)
         if (!docSnap.exists()) {
            throw new Error("no existe el doc")
        }
            if(docSnap.data().user!=auth.currentUser.uid){
                throw new Error("no le pertenece ese documento")
           }
           await updateDoc(docRef, {
            name
          });
            this.documents=this.documents.map(item=>item.id===id?({...item,name:name}):item)
            router.push('/')
            } catch (error) {
                console.log(error.message)
                return error.message
            }finally{
                this.loading=false
            }
        },
        async addUrl(name){
            this.loading=true
            try {
                const objetoDoc={
                    name:name,
                    short:nanoid(6),
                    user:auth.currentUser.uid
                }
                await setDoc(doc(db,"urls",objetoDoc.short),objetoDoc);
                this.documents.push({
                    ...objetoDoc,
                    id:objetoDoc.short
                })
            } catch (error) {
                console.log(error.code)
                return error.code
            }finally{
                this.loading=false
            }
        },
        async deleteUrl(id){
            this.loading=true
            try {
        const docRef = doc(db, "urls", id);
        const docSnap=await getDoc(docRef)
 
        if (!docSnap.exists()) {
            throw new Error("no existe el doc")
        }
            if(docSnap.data().user!=auth.currentUser.uid){
                throw new Error("no le pertenece ese documento")
           }
           await deleteDoc(docRef);
            this.documents=this.documents.filter(item=>item.id!==id)
          }  catch (error) {
                console.log(error.code)
                return error.message
            }finally{
                this.loading=false
            }

        }
    }
})