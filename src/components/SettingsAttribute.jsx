import SmallButton from "./SmallButton";
import { Audio } from 'react-loader-spinner'
const SettingsAttribute = ({ type, displayName, value, linkAction, loading, buttonName="Link", showButton=true, textArea=false, onChangeFunction }) => {
    return <div className="flex items-center gap-4">
        <label htmlFor={type} className="text-left block text-lg font-medium text-gray-900 dark:text-white">{displayName}: </label>
        {textArea ? <textarea
            id={type}
            className="ml-auto focus:outline-none block py-1.5 px-3 w-1/2 text-md text-gray-500 bg-gray-50 rounded-lg border border-gray-300 "
            placeholder={value}
            onChange={(e) => {
                onChangeFunction(e.target.value);
            }}
        ></textarea> : <input
            id={type}
            className="ml-auto focus:outline-none cursor-default block py-1.5 px-3 w-1/2 text-md text-gray-500 bg-gray-50 rounded-lg border border-gray-300 "
            value={value}
            readOnly
        ></input>}
        {showButton && <SmallButton
            name={loading ? <Audio
                height="15"
                width="70"
                radius="20"
                color="white"
                ariaLabel="loading"
                wrapperStyle
                wrapperClass
            /> : buttonName}
            action={linkAction}
        />}
    </div>
}

export default SettingsAttribute;