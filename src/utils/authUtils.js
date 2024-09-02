import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../config/firebase";
import { addUserData } from "../config/firebase";

export const signUpWithGoogle = async (navigate) => {
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        await addUserData(user.uid, user.email.split("@")[0], user.email);
        navigate("/settings");
    } catch (error) {
        alert(error);
        console.error("Error during Google sign-up:", error);
    }
};