import FetchStore from "../components/FetchStore";
const Dashboard = () => {
    return <section className="bg-white dark:bg-gray-900 mt-12">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
            <span className="font-semibold text-3xl text-gray-900">Enter Keywords (Crisp & Concise)</span>
            <FetchStore />
        </div>
    </section>
}

export default Dashboard;