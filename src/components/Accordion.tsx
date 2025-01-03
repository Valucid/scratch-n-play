import { Minus, Plus } from "lucide-react";
import React, { useState } from "react";

interface AccordionItemProps {
    title: string;
    content: (string | string[])[];
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, content }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="font-polySans w-full mx-auto bg-[#F5F5F5] p-5 rounded-xl ">
            <div className="relative flex items-center  gap-4 w-full transition-all duration-300  cursor-pointer">
                <button
                    className={`w-full text-left `}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span className="text-dark font-bold">
                        {title}
                    </span>
                </button>

                <div
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <Minus /> : <Plus />}
                </div>
            </div>
            {isOpen && (
                <div className="text-gray1 text-sm md:text-base text-left mt-4">
                    {content.map((item, idx) =>
                        Array.isArray(item) ? (
                            <ul key={idx} className=" ml-8">
                                {item.map((listItem, i) => (
                                    <li key={i}>{listItem}</li>
                                ))}
                            </ul>
                        ) : (
                            <p key={idx}>{item}</p>
                        )
                    )}
                </div>
            )}
        </div>
    );
};

export default AccordionItem;
