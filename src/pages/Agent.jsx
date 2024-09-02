import { useNavigate } from "react-router-dom";
import AddAgent from "../components/AddAgent";
import { useEffect, useState } from "react";

const Agent = ({ user }) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    return (
        <section className="bg-white dark:bg-gray-900 mt-12">
            <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
                <span className="font-semibold text-3xl text-gray-900">Enter Keywords (Crisp & Concise)</span>
                <AddAgent user={user}/>
            </div>
        </section>
    );
};

export default Agent;