import { useNavigate } from "react-router-dom";
import Fetch from "../components/Fetch";
import { useEffect, useState } from "react";
import SmallButton from "../components/smallButton";

const Dashboard = ({ user }) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const navToAgent = () => {
        navigate("/agent");
    }

    useEffect(() => {
        if (user === null) {
            console.log("user: ", user);
            navigate('/login');
        } else {
            setIsLoading(false);
        }
    }, [user, navigate]);

    if (isLoading) {
        return <div>Loading...</div>; // Or any loading indicator
    }

    return (
        <section className="min-h-screen bg-white dark:bg-gray-900 mt-12">
            <div className="text-lg text-center mt-44">
                No Triggers found...
            </div>
            <div className="mt-44 flex flex-col items-center m-auto">
                <SmallButton name="Add Trigger" action={navToAgent} width="8rem"/>
            </div>
        </section>
    );
};

export default Dashboard;