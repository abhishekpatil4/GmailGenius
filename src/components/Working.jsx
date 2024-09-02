const Working = () => {
    return <div className="my-36 px-4 mx-auto text-cente md:max-w-screen-md lg:max-w-screen-lg lg:px-28">
        <span className="font-semibold text-3xl text-gray-900">How does this work?</span>
        <div className="text-left text-xl gap-y-8 flex flex-wrap justify-center items-center mt-8 text-gray-500 sm:justify-between">
            <ol className="space-y-6 text-gray-500 list-decimal list-inside dark:text-gray-400">
                <li>
                    <span className="font-semibold text-gray-900 dark:text-white">Get Started:</span> Connect your Gmail & Google Sheets and enable the trigger
                </li>
                <li>
                    <span className="font-semibold text-gray-900 dark:text-white">Configure GmailGenius:</span> Add keywords and attributes you want to track
                </li>
                <li>
                    <span className="font-semibold text-gray-900 dark:text-white">Automatic Processing:</span> When a new email arrives, GmailGenius checks for your configured keywords
                </li>
                <li>
                    <span className="font-semibold text-gray-900 dark:text-white">Information Extraction:</span> If keywords are found, GmailGenius extracts information from both the email content and attachments
                </li>
                <li>
                    <span className="font-semibold text-gray-900 dark:text-white">Data Storage:</span> Extracted information is stored in your connected Google Sheets
                </li>
            </ol>
        </div>
    </div>
}

export default Working;