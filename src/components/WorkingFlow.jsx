import { Mail, Paperclip, FileSpreadsheet, ArrowRight } from "lucide-react"
import Logo from "../assets/brain.svg";

const WorkingFlow = () => {
    return (
        <div className="bg-gray-100 my-16 rounded-xl shadow-inner">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col lg:flex-row items-center justify-center gap-4">
                    {/* Inbox UI */}
                    <div className="w-full lg:w-2/5 bg-white rounded-lg shadow-lg p-6">
                        <div className="flex items-center mb-4">
                            <Mail className="h-6 w-6 text-blue-600 mr-2" />
                            <h2 className="text-xl font-semibold text-gray-800">Gmail</h2>
                        </div>
                        <div className="border border-gray-200 rounded-md overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Subject
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Attachment
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Apple Tv Invoice</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            <div className="flex items-center">
                                                <Paperclip className="h-4 w-4 text-gray-400 mr-2" />
                                                Apple_Invoice_2024.pdf
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Composio Invoice</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            <div className="flex items-center">
                                                <Paperclip className="h-4 w-4 text-gray-400 mr-2" />
                                                composio_invoice_2024_08.pdf
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Arrow and Brain Logo */}
                    <div className="flex flex-row items-center justify-center">
                        <ArrowRight className="h-8 w-8 text-gray-600" />
                        <div className="bg-white rounded-full px-1 py-2 shadow-lg mx-2">
                            <img src={Logo} className="logo mx-3" alt="GmailGenius logo" width={50} />
                        </div>
                        <ArrowRight className="h-8 w-8 text-gray-600" />
                    </div>

                    {/* Invoice Tracker UI */}
                    <div className="w-full lg:w-2/5 bg-white rounded-lg shadow-lg p-6">
                        <div className="flex items-center mb-4">
                            <FileSpreadsheet className="h-6 w-6 text-green-600 mr-2" />
                            <h2 className="text-xl font-semibold text-gray-800">Sheets</h2>
                        </div>
                        <div className="border border-gray-200 rounded-md overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Invoice #
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Amount
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Due Date
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">AP24-8291</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$1099.41</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2024-09-30</td>
                                    </tr>
                                    <tr className="bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">CMP-5721364</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$30.00</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2024-08-01</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WorkingFlow;
