"use client";

interface ButtonProps {
  children: React.ReactNode;
  classname?: string;
  onClick: () => void;
}

export const Button = ({ children, classname, onClick }: ButtonProps) => {
  return (
    // <button
    //   className={`rounded-md bg-sky-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 ${classname}`}
    //   onClick={onClick}
    // >
    //   {children}
    // </button>
    <button
      className={`text-white bg-blue-700 hover:bg-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 ${classname}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
