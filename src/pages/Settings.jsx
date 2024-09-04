import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SettingsAttribute from "../components/SettingsAttribute";
import { auth, getUserDetailsByUid, getTriggerStatus } from "../config/firebase";
import axios from "axios";
import { updateUserKeywordsAndAttributes } from '../config/firebase';
import SmallButton from "../components/SmallButton";
import { Audio } from 'react-loader-spinner';
import { useSnackbar } from 'notistack'

const Settings = ({ user }) => {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [gmailAccount, setGmailAccount] = useState("No connected account");
    const [sheetsAccount, setSheetsAccount] = useState("No connected account");
    const [enableTrigger, setEnableTrigger] = useState(false);
    const [enableTriggerLoading, setEnableTriggerLoading] = useState(false);
    const [gmailAccountLoading, setGmailAccountLoading] = useState(false);
    const [sheetsAccountLoading, setSheetsAccountLoading] = useState(false);
    const [userDetails, setUserDetails] = useState(null);
    const [sheetTitle, setSheetTitle] = useState();
    const [emailKeywords, setEmailKeywords] = useState();
    const [attributes, setAttributes] = useState();
    const [addingAgent, setAddingAgent] = useState(false);

    const fetchUserDetails = async () => {
        try {
            const details = await getUserDetailsByUid(user.uid);
            setUserDetails(details);
            return details;
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };

    const handleAddAgent = async (e) => {
        e.preventDefault();
        setAddingAgent(true);
        if (!emailKeywords || !attributes || !sheetTitle) {
            enqueueSnackbar("Please fill in all fields: Email Keywords, Attributes, and Sheet Title.", { variant: 'warning' });
            setAddingAgent(false);
            return;
        }
        enqueueSnackbar('Creating new google sheet with title: ' + sheetTitle, { variant: 'success' });
        await updateUserKeywordsAndAttributes(user.uid, emailKeywords, attributes, sheetTitle);
        try {
            const idToken = await user.getIdToken(true);
            const createsheetURL = import.meta.env.VITE_BACKEND_URL + "/createsheet"
            const response = await axios.post(createsheetURL, {
                username: user.email.split("@")[0]
            }, {
                headers: {
                    'Authorization': `Bearer ${idToken}`,
                    'Content-Type': 'application/json'
                }
            })

            if (response.data) {
                await updateUserKeywordsAndAttributes(user.uid, emailKeywords, attributes, sheetTitle);
                enqueueSnackbar('Sheet created successfully and attributes updated.', { variant: 'success' });
                enqueueSnackbar('A test email has been sent to your gmail, wait & watch the magic!', { variant: 'success' });
                const details = await fetchUserDetails();
                const spreadsheetId = details.sheetsConfig.spreadsheet_id;
                const spreadsheetUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}`;
                window.open(spreadsheetUrl, '_blank');
            } else {
                enqueueSnackbar('Failed to create sheet.', { variant: 'error' });
            }
        } catch (error) {
            console.error('Error:', error);
            enqueueSnackbar('An error occurred while creating sheet.', { variant: 'error' });
        } finally {
            setAddingAgent(false);
        }
    }

    useEffect(() => {
        const checkConnectionStatus = async (appType, setAccountStatus) => {
            try {
                const idToken = await auth.currentUser.getIdToken(true);
                const data = {
                    username: user.email.split("@")[0],
                    appType: appType
                };
                const checkconnectionURL = import.meta.env.VITE_BACKEND_URL + "/checkconnection"
                const response = await axios.post(checkconnectionURL, data, {
                    headers: {
                        'Authorization': `Bearer ${idToken}`,
                        'Content-Type': 'application/json'
                    }
                });
                if (response.data.authenticated === "yes") {
                    setAccountStatus("Connected");
                }
            } catch (error) {
                console.error(`Error checking ${appType} connection status:`, error);
            }
        };

        fetchUserDetails();

        const checkTriggerStats = async () => {
            const res = await getTriggerStatus(user.email.split("@")[0])
            setEnableTrigger(res)
        }

        checkConnectionStatus("GMAIL", setGmailAccount);
        checkConnectionStatus("GOOGLESHEETS", setSheetsAccount);
        checkTriggerStats();
        setUsername(user.email.split("@")[0]);
        fetchUserDetails();
    }, [user.email, user.uid]);

    const enableTriggerFun = async () => {
        try {
            setEnableTriggerLoading(true);
            const idToken = await auth.currentUser.getIdToken(true);
            const data = {
                username: user.email.split("@")[0],
            };
            const enableTriggerURL = import.meta.env.VITE_BACKEND_URL + "/enabletrigger"
            const response = await axios.post(enableTriggerURL, data, {
                headers: {
                    'Authorization': `Bearer ${idToken}`,
                    'Content-Type': 'application/json'
                }
            });
            enqueueSnackbar("Trigger enabled", { variant: 'success' });
        } catch (error) {
            enqueueSnackbar("Error enabling trigger", { variant: 'error' });
            console.error('Error enabling trigger:', error);
        } finally {
            setEnableTriggerLoading(false);
        }
    }

    const linkAccount = async (appType) => {
        const loadingStateSetter = appType === "GMAIL" ? setGmailAccountLoading : setSheetsAccountLoading;
        try {
            loadingStateSetter(true);
            const idToken = await auth.currentUser.getIdToken(true);
            const data = {
                username: user.email.split("@")[0],
                appType: appType,
                redirectUrl: window.location.href
            };
            const newEntityURL = import.meta.env.VITE_BACKEND_URL + "/newentity"
            const response = await axios.post(newEntityURL, data, {
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
            loadingStateSetter(false);
        }
    }

    const linkGmailAccount = () => linkAccount("GMAIL");
    const linkSheetsAccount = () => linkAccount("GOOGLESHEETS");

    return <div className="flex flex-1 flex-col gap-6 min-h-screen py-8 px-4 mx-auto mt-10 max-w-screen-md text-center lg:py-16 lg:px-12">
        <div className="flex items-center mb-6">
            <hr className="flex-grow border-t border-gray-300 dark:border-gray-700" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center mx-4">Connect Accounts</h1>
            <hr className="flex-grow border-t border-gray-300 dark:border-gray-700" />
        </div>
        <SettingsAttribute type="username" displayName="Composio Account" value={username} linkAction={() => { enqueueSnackbar("Account already connected", { variant: 'success' }) }} loading={false} />
        <SettingsAttribute type="gmail" displayName="Gmail Account" value={gmailAccount} linkAction={linkGmailAccount} loading={gmailAccountLoading} />
        <SettingsAttribute type="sheets" displayName="Sheets Account" value={sheetsAccount} linkAction={linkSheetsAccount} loading={sheetsAccountLoading} />
        <SettingsAttribute type="trigger" displayName="Enable Gmail Trigger" value={enableTrigger ? "Enabled" : "Disabled"} linkAction={enableTriggerFun} loading={enableTriggerLoading} buttonName={"Enable"} />
        <br />
        <div className="flex items-center mb-6">
            <hr className="flex-grow border-t border-gray-300 dark:border-gray-700" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center mx-4">Add Agent</h1>
            <hr className="flex-grow border-t border-gray-300 dark:border-gray-700" />
        </div>
        <SettingsAttribute type="sheetid" displayName="Sheet ID" value={userDetails?.sheetsConfig?.spreadsheet_id || "No sheet ID"} linkAction={() => {
            if (userDetails?.sheetsConfig?.spreadsheet_id) {
                window.open(`https://docs.google.com/spreadsheets/d/${userDetails.sheetsConfig.spreadsheet_id}`, '_blank');
            } else {
                alert("No sheet ID available");
            }
        }} loading={false} buttonName="Open" />
        <SettingsAttribute
            type="sheettitle"
            displayName="Sheet Title"
            value={userDetails?.sheetsConfig?.sheetTitle || "e.g., Invoices from gmail"}
            loading={false}
            buttonName="View"
            showButton={false}
            textArea={true}
            onChangeFunction={setSheetTitle}
        />
        <SettingsAttribute type="keywords" displayName="Keywords" value={userDetails?.sheetsConfig?.keywords || "e.g., Apple TV, Invoice"} loading={false} buttonName="View" showButton={false} textArea={true} onChangeFunction={setEmailKeywords} />
        <SettingsAttribute type="attributes" displayName="Attributes" value={userDetails?.sheetsConfig?.attributes || "e.g., Invoice Number, Invoice Amount"} loading={false} buttonName="View" showButton={false} textArea={true} onChangeFunction={setAttributes} />
        <div className="flex justify-center mt-8">
            <SmallButton width="14rem" name={addingAgent ? <Audio
                height="15"
                width="200"
                color="white"
                ariaLabel="loading"
            /> : "Activate My Gmail Genius!"} action={handleAddAgent} />
        </div>
    </div>
};

export default Settings;
