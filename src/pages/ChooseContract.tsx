import React, { useState } from "react";
interface AccordionData {
    title: string;
    description: string;
    image: string;
}

interface AccordionProps {
    data: AccordionData[];
}

const Accordion: React.FC<AccordionProps> = ({ data }) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        if (activeIndex === index) {
            setActiveIndex(null);
        } else {
            setActiveIndex(index);
        }
    };

    return (
        <div className="flex w-full">
            {data.map((item, index) => [
                <div
                    key={`item-${index}`}
                    className="border-b flex flex-row min-w-[200px]"
                    style={{
                        backgroundImage: `url(${item.image})`,
                        height: "100vh",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                    onClick={() => toggleAccordion(index)}
                >
                    <div className="flex mx-auto items-center justify-between px-4 py-3 cursor-pointer">
                        <h3 className="text-lg font-medium text-white">{item.title}</h3>
                    </div>
                </div>,
                activeIndex === index && (
                    <div key={`desc-${index}`} className="px-4 py-3 bg-black flex-grow">
                        <p className="text-sm text-gray-700">{item.description}</p>
                    </div>
                ),
            ])}
        </div>
    );
};

export default Accordion;
