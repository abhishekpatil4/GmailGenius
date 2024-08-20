import React, { useState } from 'react';

// Sample JSON data
const faqData = [
    {
        id: 1,
        question: "What is GmailGenius?",
        answer: "GmailGenius is an AI-powered tool designed to enhance your email management by extracting valuable information from your Gmail account and optimizing email deliverability."
    },
    {
        id: 2,
        question: "How do I sign up for GmailGenius?",
        answer: "To sign up for GmailGenius, visit our website and click on the 'Sign Up' button. You will need to link your Gmail account to start using the features."
    },
    {
        id: 3,
        question: "What features does GmailGenius offer?",
        answer: "GmailGenius offers features like keyword-based email searching, automatic attachment downloads, and the ability to store extracted data in an organized format, such as Excel sheets."
    },
    {
        id: 4,
        question: "Is my data safe with GmailGenius?",
        answer: "Yes, GmailGenius prioritizes user data security. We implement encryption and secure protocols to ensure your information is protected and remains private."
    },
    {
        id: 5,
        question: "Can I use GmailGenius on mobile devices?",
        answer: "Yes, GmailGenius is designed to be responsive and can be accessed on mobile devices, allowing you to manage your emails conveniently on the go."
    }
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="mt-36 mb-10 px-4 mx-auto text-cente md:max-w-screen-md lg:max-w-screen-lg lg:px-28">
            <span className="font-semibold text-3xl text-gray-900">FAQs</span>
            <div className='mt-8'  id="accordion-collapse" data-accordion="collapse">
                {faqData.map((faq, index) => (
                    <div key={faq.id}>
                        <h2 id={`accordion-collapse-heading-${faq.id}`}>
                            <button
                                type="button"
                                className={`flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 
                ${index === 0 ? 'rounded-t-xl border-b-0' : ''} 
                ${index === faqData.length - 1 ? '' : ''} 
                ${index > 0 && index < faqData.length - 1 ? 'border-b-0' : ''} 
                focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3`}
                                onClick={() => toggleAccordion(faq.id)}
                                aria-expanded={openIndex === faq.id}
                                aria-controls={`accordion-collapse-body-${faq.id}`}
                            >
                                <span>{faq.question}</span>
                                <svg
                                    className={`w-3 h-3 transition-transform duration-200 ${openIndex === faq.id ? '' : 'rotate-180'}`}
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 10 6"
                                >
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
                                </svg>
                            </button>
                        </h2>
                        <div
                            id={`accordion-collapse-body-${faq.id}`}
                            className={`${openIndex === faq.id ? '' : 'hidden'}`}
                            aria-labelledby={`accordion-collapse-heading-${faq.id}`}
                        >
                            <div className={`p-5 border border-gray-200 dark:border-gray-700 dark:bg-gray-900  ${index === faqData.length - 1 ? 'rounded-b-xl' : ''}`}>
                                <p className="text-left mb-2 text-gray-500 dark:text-gray-400">{faq.answer}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQ;