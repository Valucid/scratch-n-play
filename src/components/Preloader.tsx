const Preloader = () => {
  return (
    <div className="flex space-x-2 justify-center items-center bg-inherit h-screen w-full">
      <span className="sr-only">Loading...</span>
      <div className="h-6 w-6 bg-[#87131B] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-6 w-6 bg-[#87131B] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-6 w-6 bg-[#87131B] rounded-full animate-bounce"></div>
    </div>
  )
}

export default Preloader
