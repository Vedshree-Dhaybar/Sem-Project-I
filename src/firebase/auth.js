// src/firebase/auth.js
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const auth = getAuth();

export const signInWithEmail = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
};
