import React, { useState } from 'react';
import axios from 'axios';
import { updateUserKeywordsAndAttributes } from '../config/firebase';
import { Audio } from 'react-loader-spinner';

const AddAgent = ({ user }) => {
    const [emailKeywords, setEmailKeywords] = useState('');
    const [attributes, setAttributes] = useState('');
    const [sheetTitle, setSheetTitle] = useState('');
    const [saving, setSaving] = useState(false);

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
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
            });

            if (response.data) {
                await updateUserKeywordsAndAttributes(user.uid, emailKeywords, attributes, sheetTitle);
                alert('Sheet created successfully and attributes updated.');
            } else {
                alert('Failed to create sheet.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while saving.');
        } finally {
            setSaving(false);
        }
    }

    return (
        <form onSubmit={handleSave} className="min-h-screen max-w-sm mx-auto my-16">
            <div className="mb-10">
                <label htmlFor="emailKeywords" className="text-left block mb-2 text-lg font-medium text-gray-900 dark:text-white">Enter Sheet Title</label>
                <input
                    type="text"
                    id="sheetTitle"
                    className="block p-2.5 w-full text-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter sheet title"
                    value={sheetTitle}
                    onChange={(e) => setSheetTitle(e.target.value)}
                />
            </div>
            <div className="mb-10">
                <label htmlFor="emailKeywords" className="text-left block mb-2 text-lg font-medium text-gray-900 dark:text-white">Enter keywords to search for in your Gmail</label>
                <textarea
                    id="emailKeywords"
                    rows="4"
                    className="block p-2.5 w-full text-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Bugs, Server error, Complaint"
                    value={emailKeywords}
                    onChange={(e) => setEmailKeywords(e.target.value)}
                ></textarea>
            </div>
            <div className="mb-10">
                <label htmlFor="attributes" className="text-left block mb-2 text-lg font-medium text-gray-900 dark:text-white">Enter attributes you want to store in sheets</label>
                <textarea
                    id="attributes"
                    rows="4"
                    className="block p-2.5 w-full text-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Date, sender id, issue"
                    value={attributes}
                    onChange={(e) => setAttributes(e.target.value)}
                ></textarea>
            </div>
            <button type="submit" className="w-36 bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 inline-flex justify-center items-center py-1.5 px-5 text-base font-medium text-center text-white rounded-lg dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">
                {
                    saving ? <Audio
                        height="20"
                        width="20"
                        radius="9"
                        color="white"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClass="" /> : "Save"
                }
            </button>

        </form>
    );
}

export default AddAgent;