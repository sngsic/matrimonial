import { auth, firestore } from "../../../firebase.js"
const signin = async (e,email,password) => {
    e.preventDefault();
    try{
        await auth.signInWithEmailAndPassword(email,password);
    }catch{
        alert("Invalid credentials");
    }
}

const signup = async (e,forwho,name,dob,email,password,district,caste,maritalStatus,religion,gender) => {
    try {
        const { user } = await auth.createUserWithEmailAndPassword(email, password);
        if (user) {
            await firestore.collection('users').doc(name).set({
                forwho: forwho,
                name: name,
                gender: gender,
                maritalStatus: maritalStatus,
                religion: religion,
                caste: caste,
                email: email,
                dob: dob,
                password: password,
                district: district,
            });
            
        }
    } catch (error) {
        alert(error.message);
    }
}

export {signup};
export default signin;
