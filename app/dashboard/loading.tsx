"use client";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="relative flex flex-col items-center">
        {/* Shopping Cart */}
        <div className="relative w-20 h-20 flex justify-center items-center">
          <div className="w-16 h-16  rounded-md flex justify-center items-center animate-bounce">
            🛒
          </div>
          {/* Wheels */}
          <div className="absolute bottom-[-10px] left-4 w-4 h-4 bg-gray-700 rounded-full animate-spin"></div>
          <div className="absolute bottom-[-10px] right-4 w-4 h-4 bg-gray-700 rounded-full animate-spin"></div>
        </div>

        {/* Loading Text */}
        <p className="mt-4 text-gray-800 text-lg font-semibold animate-pulse">
          Finding the best deals...
        </p>
      </div>
    </div>
  );
};

export default Loader;
