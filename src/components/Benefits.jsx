import BenefitCard from "./BenefitCard";

const benefits = [
    {
        "title": "Time-Saving",
        "body": "Eliminate the need for manual email searching and attachment management, freeing up valuable time for other tasks"
    },
    {
        "title": "Improved Productivity",
        "body": "Focus on important projects while Attachments Extractor handles the data extraction process, boosting overall productivity"
    },
    {
        "title": "Enhanced Organization",
        "body": "Keep valuable information neatly organized in a spreadsheet, making it easy to access and reference whenever needed"
    },
    {
        "title": "Informed Decision Making",
        "body": "Quickly access key data extracted from attachments to make well-informed decisions that drive success"
    }
]

const Benefits = () => {
    return <div className="my-36 px-4 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg xl:px-28 lg:px-16">
        <span className="font-semibold text-3xl text-gray-900 ">Benefits</span>
        <div className="text-left gap-y-8 flex flex-wrap justify-center items-center mt-8 text-gray-500 sm:justify-between">
            {
                benefits.map((benefit, idx) =>
                    <BenefitCard key={idx} title={benefit.title} body={benefit.body} />
                )
            }
        </div>
    </div>
}

export default Benefits;