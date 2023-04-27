import React, { useState } from "react";

interface AccordionData {
    title: string;
    description: string;
    image: string;
    header: string;
    button?: {
        element: JSX.Element;
        onClick: () => void;
    };
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
                    <div
                        id="expand"
                        key={`desc-${index}`}
                        className="px-4 mt-[25%] py-3 bg-black flex-grow flex flex-col"
                    >
                        <h3 className="mb-7 text-lg text-center font-medium text-white">{item.header}</h3>
                        <p className="text-sm text-white px-7">{item.description}</p>
                        {item.button && (
                            <div className="mt-auto flex justify-center bg-white w-40 mx-auto mb-40 min-h-[48px] ">
                                <button className="px-1" onClick={item.button.onClick}>{item.button.element}</button>
                            </div>
                        )}
                    </div>
                ),
            ])}
        </div>
    );
};

export default Accordion;
