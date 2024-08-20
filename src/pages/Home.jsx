import Hero from "../components/Hero";
import Benefits from "../components/Benefits";
import FAQ from "../components/FAQ";
import Working from "../components/Working";
import ActionButton from "../components/ActionButton";
const Home = () => {
    return <section className="bg-white dark:bg-gray-900 mt-12">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
            <Hero />
            <Benefits />
            <Working />
            <FAQ />
            <div className="mt-20">
                <ActionButton displayName={"Get started"} link={"#"} />
            </div>
        </div>
    </section>
}

export default Home;