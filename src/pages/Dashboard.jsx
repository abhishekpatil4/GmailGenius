// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import SmallButton from "../components/smallButton";
// import { auth, getUserDetailsByUid } from "../config/firebase";

// const Dashboard = ({ user }) => {
//     const navigate = useNavigate();
//     const [isLoading, setIsLoading] = useState(true);
//     const [userDetails, setUserDetails] = useState(null);

//     useEffect(() => {
//         const fetchUserDetails = async () => {
//             try {
//                 const details = await getUserDetailsByUid(user.uid);
//                 setUserDetails(details);
//                 setIsLoading(false);
//             } catch (error) {
//                 console.error("Error fetching user details:", error);
//                 setIsLoading(false);
//             }
//         };

//         fetchUserDetails();
//     }, [user.uid]);

//     const navToAgent = () => {
//         navigate("/agent");
//     }

//     const openSheet = () => {
//         if (userDetails && userDetails.sheetsConfig && userDetails.sheetsConfig.spreadsheet_id) {
//             window.open(`https://docs.google.com/spreadsheets/d/${userDetails.sheetsConfig.spreadsheet_id}`, '_blank');
//         }
//     }

//     if (isLoading) {
//         return <div className="min-h-screen bg-white dark:bg-gray-900 flex justify-center items-center">Loading...</div>;
//     }

//     return (
//         <section className="min-h-screen bg-white dark:bg-gray-900 mt-12 p-8">
//             <div className="max-w-3xl mx-auto">
//                 {userDetails && userDetails.sheetsConfig ? (
//                     <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
//                         <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Sheet Configuration</h2>
//                         <p className="mb-2 text-gray-700 dark:text-gray-300">
//                             <span className="font-medium">Sheet ID:</span> {userDetails.sheetsConfig.spreadsheet_id}
//                         </p>
//                         <SmallButton name="View Sheet" action={openSheet} width="12rem" />
//                     </div>
//                 ) : (
//                     <div className="text-lg text-center mb-8 text-gray-700 dark:text-gray-300">
//                         No Sheet Configuration found...
//                     </div>
//                 )}

//                 <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
//                     <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Configured Keywords and Attributes</h2>
//                     <div className="mb-4">
//                         <h3 className="text-xl font-medium mb-2 text-gray-700 dark:text-gray-300">Keywords:</h3>
//                         <p className="text-gray-600 dark:text-gray-400">{userDetails?.sheetsConfig?.keywords || "No keywords configured"}</p>
//                     </div>
//                     <div>
//                         <h3 className="text-xl font-medium mb-2 text-gray-700 dark:text-gray-300">Attributes:</h3>
//                         <p className="text-gray-600 dark:text-gray-400">{userDetails?.sheetsConfig?.attributes || "No attributes configured"}</p>
//                     </div>
//                 </div>

//                 <div className="flex justify-center">
//                     <SmallButton name="Add/Edit Agent" action={navToAgent} width="12rem" />
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default Dashboard;