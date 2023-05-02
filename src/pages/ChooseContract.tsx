import React, { useState } from "react";
import ELF from "@assets/images/rkt164.jpg"
import Bill from "@assets/bill/Bill-Murray-Applied-at-P.F.-Changs-scaled.jpg";

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
                    className={`border-b flex flex-row min-w-[200px] ${activeIndex !== null && activeIndex !== index ? 'shadow-lg' : ''}`}
                    style={{
                        backgroundImage: `url(${item.image})`,
                        height: "100vh",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                    onClick={() => toggleAccordion(index)}
                >
                    <div className="flex mx-auto items-center justify-between px-4 py-3 cursor-pointer">
                        <h3 className="text-lg text-center font-medium text-white">{item.title}</h3>
                    </div>
                </div>,
                activeIndex === index && (
                    <div
                        id="expand"
                        key={`desc-${index}`}
                        className="px-4 mt-[25%] py-3 bg-black flex-grow flex flex-col"
                    >
                        <h3 className="mb-7 text-lg text-center font-medium text-white">{item.header}</h3>
                        <p className="text-sm text-center text-white px-7">{item.description}</p>
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
const accordionData = [
    {
        title: 'Bill Murray',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
        image: Bill,
        header: "The Bill Murray Collection",
        button: {
            element: <span>Enter the Luminary Ballroom</span>,
            onClick: () => {
                console.log("Button for Accordion Item 1 clicked");
            }
        }
    },
    {
        title: 'EarthLight Foundation',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
        image: ELF,
        header: "The DreamShip Collection",
        button: {
            element: <span>Enter the Planetarium</span>,
            onClick: () => {
                console.log("Button for Accordion Item 1 clicked");
            }
        }
    },
]
export { accordionData };
export default Accordion;
