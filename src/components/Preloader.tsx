const Preloader = () => {
    return (
      <div className="flex space-x-2 justify-center items-center bg-white h-screen w-full dark:invert">
        <span className="sr-only">Loading...</span>
        <div className="h-6 w-6 bg-[#453DA7] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-6 w-6 bg-[#453DA7] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-6 w-6 bg-[#453DA7] rounded-full animate-bounce"></div>
      </div>
    )
  }
  
  export default Preloader
  