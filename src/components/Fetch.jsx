import React, { useState } from 'react';
import axios from 'axios';

const Fetch = () => {
    const [emailKeywords, setEmailKeywords] = useState('');
    const [attributes, setAttributes] = useState('');
    const [sheetId, setSheetId] = useState('');

    const handleFetch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/fetch', {
                emailKeywords,
                attributes,
                sheetId
            });
            console.log('Response:', response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <form onSubmit={handleFetch} className="max-w-sm mx-auto my-16">
            <div className="mb-10">
                <label htmlFor="sheetId" className="text-left block mb-2 text-lg font-medium text-gray-900 dark:text-white">Enter google sheet id</label>
                <input 
                    id="sheetId" 
                    className="block p-2.5 w-full text-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    placeholder="1UEzR3FG9Jk6Vl_2R..."
                    value={sheetId}
                    onChange={(e) => setSheetId(e.target.value)}
                ></input>
            </div>
            <div className="mb-10">
                <label htmlFor="emailKeywords" className="text-left block mb-2 text-lg font-medium text-gray-900 dark:text-white">Enter keywords to search for in your Gmail</label>
                <textarea 
                    id="emailKeywords" 
                    rows="4" 
                    className="block p-2.5 w-full text-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    placeholder="Invoice, Apple TV..."
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
                    placeholder="Invoice number, invoice date, total amount..."
                    value={attributes}
                    onChange={(e) => setAttributes(e.target.value)}
                ></textarea>
            </div>
            <button type="submit" className="w-36 bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 inline-flex justify-center items-center py-1.5 px-5 text-base font-medium text-center text-white rounded-lg dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">Fetch</button>
        </form>
    );
}

export default Fetch;