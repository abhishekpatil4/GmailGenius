const SmallButton = ({ name, action, color }) => {
    const handleClick = () => {
        console.log("button clicked");
    }
    return <button
        onClick={handleClick}
        type="button"
        class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 font-medium rounded-lg text-sm px-5 py-2.5">
        {name}
    </button>
}

export default SmallButton;