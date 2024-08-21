import ActionButton from "./ActionButton";

const Hero = () => {
    return <>
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">⚡️Supercharge your Gmail</h1>
        <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Effortlessly find emails, extract data from attachments, and organize it in a spreadsheet!</p>
        <div className="my-10">
            <ActionButton displayName={"Get started"} link={"#"} />
        </div>
        <iframe className="m-auto md:min-w-[854px] md:min-h-[480px]" src="https://www.loom.com/embed/e77253d0b2b449b2a8c3fed162413ec4?sid=e68c3937-e761-4656-8ae5-663e19815811"  allow="autoplay"></iframe>
    </>
}

export default Hero;