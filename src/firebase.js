
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyAVVLVdc-sMABkXUTvqT5x8fYImzntmSWU",
  authDomain: "netflix-clone-fa913.firebaseapp.com",
  projectId: "netflix-clone-fa913",
  storageBucket: "netflix-clone-fa913.firebasestorage.app",
  messagingSenderId: "596712777298",
  appId: "1:596712777298:web:2178972bc68d749d63a18b",
    measurementId: "G-7JCYP6S78K"
};



const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password)
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email
        })
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '))
    }
}


const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(' '))
    }
}

const logout = () =>{
    signOut(auth)
}


export {auth,db,login,signup,logout}