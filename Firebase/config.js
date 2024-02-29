import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js'


const firebaseConfig = {
    apiKey: "AIzaSyBzGLohu4cQVTdB9kBCGPFN3AVnT5eyeHI",
    authDomain: "fir-eba48.firebaseapp.com",
    projectId: "fir-eba48",
    storageBucket: "fir-eba48.appspot.com",
    messagingSenderId: "316656891183",
    appId: "1:316656891183:web:19c80a73275d7551b41dda",
    measurementId: "G-XCS92351S3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

//Authentication setup
auth.languageCode = 'en';
const provider = new GoogleAuthProvider();

const googleLogin = document.getElementById("google-login-btn");
googleLogin && googleLogin.addEventListener("click", () => {
    const radioButton = document.getElementsByClassName("client");

    signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const user = result.user;
            console.log(user);
            if (radioButton[0].checked) {
                // alert('lead to doc page')
                window.location.href = "../doctorSide/docPage.html";
            }
            else {
                // alert('lead to paitents page')
                window.location.href = "../patientSide/info/surveyandmap.html";
            }


        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

        });
})

const user = auth.currentUser;

// After login user details can be taken as shown below, ID are not working replace it according to our patient page okay.
function updateUserProfile(user) {
    const userName = user.displayName;
    const userEmail = user.email;
    const userProfilePicture = user.photoURL;

    document.getElementById("userName").textContent = userName;
    // document.getElementById("userEmail").textContent = userEmail;
    // document.getElementById("userProfilePicture").src = userProfilePicture;
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        updateUserProfile(user);
        const uid = user.uid;
        return uid;
    }
});
//Database Setup
const db = getFirestore(app);

const patientBtn = document.getElementById('patientBtn');
patientBtn && patientBtn.addEventListener('click', (e)=>{
    const form  = document.getElementById('patientInfo');
    console.log(form.data());
})

// try {
//     const docRef = await addDoc(collection(db, "users"), {
//         first: "Ada",
//         last: "Lovelace",
//         born: 1815
//     });
//     console.log("Document written with ID: ", docRef.id);
// } catch (e) {
//     console.error("Error adding document: ", e);
// }



