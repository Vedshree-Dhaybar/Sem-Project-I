import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBkDrnGbiG7Mx_RbKEKAifknkDNj02t03M",
    authDomain: "collaboartive-document-editor.firebaseapp.com",
    projectId: "collaboartive-document-editor",
    storageBucket: "collaboartive-document-editor.firebasestorage.app",
    messagingSenderId: "351517923644",
    appId: "1:351517923644:web:26ad0236ff3d6e77a36639",
    measurementId: "G-6KM46Q9T2E"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword };
