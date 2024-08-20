import ActionButton from "./ActionButton";

const Hero = () => {
    return <>
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">⚡️Supercharge your Gmail</h1>
        <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Effortlessly find emails, extract attachments, and organize key data in a spreadsheet!</p>
        <div className="my-10">
            <ActionButton displayName={"Get started"} link={"#"} />
        </div>
        {/* <video className="w-full h-auto max-w-full" controls>
            <source src="https://drive.google.com/file/d/1aoKGYiq5QKr037Q5A9v58JERe0aGjXiC/preview" type="video/mp4" />
            Your browser does not support the video tag.
        </video> */}
        {/* need to make this responsive */}
        <iframe className="m-auto" src="https://drive.google.com/file/d/1aoKGYiq5QKr037Q5A9v58JERe0aGjXiC/preview" width="854" height="480" allow="autoplay"></iframe>
    </>
}

export default Hero;