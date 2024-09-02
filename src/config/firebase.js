import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, query, where, updateDoc } from "firebase/firestore";


const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);

export const logOut = () => {
    signOut(auth).then(() => {
        console.log("user signed out");
    }).catch((error) => {
        console.log("error signing user out");
    });
}

const db = getFirestore(app);

const doesUserExist = async (username) => {
    try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("username", "==", username));
        const querySnapshot = await getDocs(q);
        return !querySnapshot.empty;
    } catch (error) {
        console.error("Error checking user:", error);
        return false;
    }
}

export const addUserData = async (uid, username, email) => {
    try {
        const exist = await doesUserExist(username);
        if (exist) {
            return;
        }
        const docRef = await addDoc(collection(db, "users"), {
            uid: uid,
            username: username,
            email: email,
            gmailAccountConnected: false,
            sheetAccountConnected: false,
            gmailTriggerEnabled: false,
            sheetsConfig: {
                spreadsheet_id: "",
                sheetName: "Sheet1",
                keywords: "",
                attributes: "",
                row: "2",
            }
        });
        console.log("Document written with id: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export const updateUserKeywordsAndAttributes = async (uid, keywords, attributes, sheetTitle) => {
    try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("uid", "==", uid));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            await updateDoc(userDoc.ref, {
                "sheetsConfig.keywords": keywords,
                "sheetsConfig.attributes": attributes,
                "sheetsConfig.sheetTitle": sheetTitle
            });
            console.log("Keywords and attributes updated successfully");
        } else {
            console.log("User not found");
        }
    } catch (error) {
        console.error("Error updating keywords and attributes:", error);
    }
}

export const getUserData = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    const arr = [];
    // return querySnapshot;
    querySnapshot.forEach((doc) => {
        arr.push({
            firstName: doc.data().firstName,
            lastName: doc.data().lastName
        })
    });
    return arr;
}

export const getUserDetailsByUid = async (uid) => {
    try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("uid", "==", uid));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            return userDoc.data();
        } else {
            console.log("User does not exist.");
            return null;
        }
    } catch (error) {
        console.error("Error getting user details:", error);
        return null;
    }
}

export const getTriggerStatus = async (username) => {
    try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("username", "==", username));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            const triggerStatus = userDoc.data().gmailTriggerEnabled;
            return triggerStatus;
        } else {
            console.log("User does not exist.");
            return null;
        }
    } catch (error) {
        console.error("Error getting trigger status:", error);
        return null;
    }
}