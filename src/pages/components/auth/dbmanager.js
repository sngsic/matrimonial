import { auth, firestore } from "../../../firebase.js";

const signin = async (e,email,password) => {
    e.preventDefault();
    try{
        await auth.signInWithEmailAndPassword(email,password);
    }catch{
        alert("Invalid credentials");
    }
}

export const signup = async (e,forwho,name,dob,email,password,district,caste,maritalStatus,gender,occupation,downloadurl) => {
    try {
        const { user } = await auth.createUserWithEmailAndPassword(email, password);
        if (user) {
            await firestore.collection('user-details').doc(name).set({
                ForWho: forwho,
                Name: name,
                Gender: gender,
                MaritalStatus: maritalStatus,
                Caste: caste,
                Email: email,
                DoB: dob,
                District: district,
                Occupation: occupation,
                DownloadURL:downloadurl
            });
            
        }
    } catch (error) {
        alert(error.message);
    }
}

export default signin;
export const getUserDataByEmail = async (email) => {
    try {
        const querySnapshot = await firestore.collection('user-details').where('email', '==', email).get();
        console.log(querySnapshot)
        if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            const name = userData.name; // Retrieve the name from the userData object
            return name;
        }

        return null; // User not found
    } catch (error) {
        throw new Error('Failed to fetch user data.');
    }
};



