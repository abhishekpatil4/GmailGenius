const SmallButton = ({ name, action, color, width = "5rem" }) => {
    const handleClick = () => {
        console.log("button clicked");
    }
    return <button
        style={{ width: width }}
        onClick={action ? action : handleClick}
        type="button"
        className='focus:outline-none text-white bg-purple-700 hover:bg-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 h-[2.4rem]'>
        {name}
    </button>
}

export default SmallButton;