import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SettingsAttribute from "../components/SettingsAttribute";
import { auth } from "../config/firebase";
import axios from "axios";


const Settings = ({ user }) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [username, setUsername] = useState("abishkpatil");
    const [gmailAccount, setGmailAccount] = useState("");
    const [sheetsAccount, setSheetsAccount] = useState("");

    const [usernameLoading, setUsernameLoading] = useState(false);
    const [gmailAccountLoading, setGmailAccountLoading] = useState(false);
    const [sheetsAccountLoading, setSheetsAccountLoading] = useState(false);

    const linkComposioAccount = async () => {
    }
    const linkGmailAccount = async () => {
        try {
            setGmailAccountLoading(true);
            const idToken = await auth.currentUser.getIdToken(/* forceRefresh */ true);
            const data = {
                username: "abishkpatil",
                appType: "GMAIL"
            };
            const response = await axios.post('http://localhost:8000/newentity', data, {
                headers: {
                    'Authorization': `Bearer ${idToken}`,
                    'Content-Type': 'application/json'
                }
            });
            if (response.data.authenticated === "yes") {
                alert(response.data.message);
            } else if (response.data.authenticated === "no") {
                window.open(response.data.url, '_blank');
            }
        } catch (error) {
            console.error('Error sending data:', error);
        } finally {
            setGmailAccountLoading(false);
        }
    }
    const linkSheetsAccount = async () => {
        try {
            setSheetsAccountLoading(true);
            const idToken = await auth.currentUser.getIdToken(/* forceRefresh */ true);
            const data = {
                username: "abishkpatil",
                appType: "GOOGLESHEETS"
            };
            const response = await axios.post('http://localhost:8000/newentity', data, {
                headers: {
                    'Authorization': `Bearer ${idToken}`,
                    'Content-Type': 'application/json'
                }
            });
            if (response.data.authenticated === "yes") {
                alert(response.data.message);
            } else if (response.data.authenticated === "no") {
                window.open(response.data.url, '_blank');
            }
        } catch (error) {
            console.error('Error sending data:', error);
        } finally {
            setSheetsAccountLoading(false);
        }
    }

    useEffect(() => {
        if (user === null) {
            console.log("user: ", user);
            navigate('/login');
        } else {
            setIsLoading(false);
        }
    }, [user, navigate]);

    if (isLoading) {
        return <div>Loading...</div>; // Or any loading indicator
    }

    return <div className="flex flex-1 flex-col gap-6 min-h-screen py-8 px-4 mx-auto mt-10 max-w-screen-md text-center lg:py-16 lg:px-12">
        <SettingsAttribute type="username" displayName="Composio Account" value={username} linkAction={linkComposioAccount} loading={usernameLoading} />
        <SettingsAttribute type="gmail" displayName="Gmail Account" value={gmailAccount} linkAction={linkGmailAccount} loading={gmailAccountLoading} />
        <SettingsAttribute type="sheets" displayName="Sheets Account" value={sheetsAccount} linkAction={linkSheetsAccount} loading={sheetsAccountLoading} />
    </div>
};

export default Settings;