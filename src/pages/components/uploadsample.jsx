import signup from "./auth/dbmanager";





// import React, { useState } from 'react';
// import firebase from '../../firebase';
// import 'firebase/storage';

// const ImageUploader = () => {
//     const [selectedImage, setSelectedImage] = useState(null);

//     const handleImageUpload = () => {
//         if (selectedImage) {
//             const storageRef = firebase.storage().ref();
//             const imagesRef = storageRef.child('users/${user.uid}/profile-pic');

//             const uploadTask = imagesRef.child(selectedImage.name).put(selectedImage);

//             uploadTask.on(
//                 'state_changed',
//                 (snapshot) => {
//                     // Observe state change events such as progress, pause, and resume
//                     // You can update the progress bar or display messages to the user
//                 },
//                 (error) => {
//                     // Handle unsuccessful uploads
//                 },
//                 () => {
//                     // Handle successful uploads on complete
//                     // The uploaded image can now be accessed using its download URL
//                     uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
//                         console.log('File available at', downloadURL);
//                     });
//                 }
//             );
//         }
//     };

//     const handleImageSelect = (event) => {
//         const file = event.target.files[0];
//         setSelectedImage(file);
//     };

//     return (
//         <div>
//             <input type="file" accept="image/*" onChange={handleImageSelect} />
//             <button onClick={handleImageUpload}>Upload Image</button>
//         </div>
//     );
// };

// export default ImageUploader;
