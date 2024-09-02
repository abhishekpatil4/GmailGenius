import LogoComponent from "./LogoComponent";
const Footer = () => {
    return <footer className="bg-white dark:bg-gray-900">
        <div className="mx-auto w-full max-w-screen-2xl p-4 py-6 lg:py-8">
            <div className="md:flex md:justify-between">
                <div className="mb-6 md:mb-0">
                    <LogoComponent />
                </div>
                <div className="grid grid-cols-2 gap-8 sm:gap-16 sm:grid-cols-2">
                    <div>
                        <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Resources</h2>
                        <ul className="text-gray-500 dark:text-gray-400 font-medium">
                            <li className="mb-3">
                                <a href="https://github.com/ComposioHQ/cookbook/tree/master/gmail-assistant/gmail-assistant-firebase" className="hover:underline">Source Code</a>
                            </li>
                            <li className="mb-3">
                                <a href="https://replit.com/@abishkpatil/gmail-assistant-fb" className="hover:underline">Replit</a>
                            </li>
                            <li className="mb-3">
                                <a href="https://composio.dev/gallery" className="hover:underline">Other Projects</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Follow us</h2>
                        <ul className="text-gray-500 dark:text-gray-400 font-medium">
                            <li className="mb-3">
                                <a href="https://github.com/ComposioHQ" className="hover:underline ">Github</a>
                            </li>
                            <li className="mb-3">
                                <a href="https://x.com/composiohq" className="hover:underline">X</a>
                            </li>
                            <li className="mb-3">
                                <a href="https://www.linkedin.com/company/composiohq" className="hover:underline">LinkedIn</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <div className="flex justify-center">
                <span className="text-sm text-gray-500 text-center dark:text-gray-400">© 2024 GmailGenius | Made with ❤️ by <a href="https://composio.dev" className="hover:underline" target="_blank" rel="noopener noreferrer">Composio</a></span>
            </div>
        </div>
    </footer>

}

export default Footer;