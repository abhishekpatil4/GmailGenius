import { useNavigate } from "react-router-dom";
import { signUpWithGoogle } from "../utils/authUtils";
import { auth } from "../config/firebase";
import { useEffect, useState } from "react";

const ActionButton = ({ displayName }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });

        return () => unsubscribe();
    }, []);

    const handleClick = async () => {
        if (user) {
            navigate("/settings");
        } else {
            try {
                await signUpWithGoogle(navigate);
            } catch (error) {
                console.error("Error during sign up:", error);
            }
        }
    };

    return (
        <button
            onClick={handleClick}
            className="bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
        >
            {displayName}
            <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
        </button>
    );
};

export default ActionButton;