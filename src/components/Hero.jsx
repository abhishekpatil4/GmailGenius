import Benefits from "./Benefits";
const Hero = () => {
    return <section className="bg-white dark:bg-gray-900 my-5">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Supercharge your Gmail</h1>
            <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Effortlessly find emails, extract attachments, and organize key data in a spreadsheet!</p>
            <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                <a href="#" className=" bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">
                    Get started
                    <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </a>
                <a href="#" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                    <svg className="mr-2 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path></svg>
                    Watch video
                </a>
            </div>

            {/* <video className="w-full h-auto max-w-full" controls>
                <source src="https://drive.google.com/file/d/1aoKGYiq5QKr037Q5A9v58JERe0aGjXiC/preview" type="video/mp4" />
                Your browser does not support the video tag.
            </video> */}
            {/* need to make this responsive */}
            <iframe className="m-auto" src="https://drive.google.com/file/d/1aoKGYiq5QKr037Q5A9v58JERe0aGjXiC/preview" width="854" height="480" allow="autoplay"></iframe>

            <Benefits />
        </div>
    </section>
}

export default Hero;