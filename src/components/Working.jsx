const Working = () => {
    return <div className="my-36 px-4 mx-auto text-cente md:max-w-screen-md lg:max-w-screen-lg lg:px-28">
        <span className="font-semibold text-3xl text-gray-900">How does this work?</span>
        <div className="text-left text-xl gap-y-8 flex flex-wrap justify-center items-center mt-8 text-gray-500 sm:justify-between">
            <ol className="space-y-6 text-gray-500 list-decimal list-inside dark:text-gray-400">
                <li>
                    <span className="font-semibold text-gray-900 dark:text-white">Sign up on <a href="https://composio.dev/" className="underline underline-offset-2">Composio</a></span> and link your Gmail & Sheets
                </li>
                <li>
                    <span className="font-semibold text-gray-900 dark:text-white">Enter keywords</span> you want to search for in your Gmail
                </li>
                <li>
                    <span className="font-semibold text-gray-900 dark:text-white">We'll Find Emails</span> & attachments from Gmail that match your keyword criteria
                </li>
                <li>
                    <span className="font-semibold text-gray-900 dark:text-white">Store useful information</span> from attachments in sheets
                </li>
            </ol>
        </div>
    </div>
}

export default Working;