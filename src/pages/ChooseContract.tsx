// import React, { useState } from "react";
// import Bill from "@assets/bill/Bill-Murray-Applied-at-P.F.-Changs-scaled.jpg";
// // import Earth from "@assets/earth/earth.jpg";
// import ELF from "@assets/images/rkt164.jpg"
// interface Contract {
//     title: string;
//     description: string;
//     image: string;
// }

// const ContractCard: React.FC<{
//     title: string;
//     description: string;
//     image: string;
//     isExpanded: boolean;
//     onExpand: () => void;
// }> = ({ title, description, image, isExpanded, onExpand }) => {
//     return (
//         <div
//             className={`p-4 border border-gray-300 rounded-md flex ${isExpanded ? "h-96 w-full" : "h-96 w-[200px]"
//                 }`}
//             onClick={onExpand}
//         >
//             <div className="flex flex-row max-w-[100%]">
//                 <div className="flex-grow">
//                     <h3 className="text-lg text-center font-medium mb-8">{title}</h3>
//                     <img className="w-[150px]" src={image} alt={title} />
//                 </div>
//                 {isExpanded && (
//                     <div className="flex flex-col flex-grow">
//                         <h3 className="text-lg text-center font-medium ml-8 mb-8">Description</h3>
//                         <p className="ml-8 mb-4">{description}</p>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// const ChooseContract: React.FC = () => {
//     const contracts: Contract[] = [
//         { title: "Bill Murray", description: "Description of Contract 1", image: Bill },
//         { title: "EarthLight", description: "Description of Contract 2", image: ELF },
//     ];

//     const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

//     const handleExpand = (index: number) => {
//         // If the clicked contract card is already expanded, collapse it
//         // Otherwise, expand the clicked contract card and collapse any other expanded contract cards
//         if (expandedIndex === index) {
//             setExpandedIndex(null);
//         } else {
//             setExpandedIndex(index);
//         }
//     };

//     return (
//         <div className="flex h-full my-auto items-center">
//             <div className="flex  text-white ">
//                 <div className="flex flex-wrap">
//                     {contracts.map((contract, index) => (
//                         <div className="flex-grow p-2" key={index}>
//                             <ContractCard
//                                 title={contract.title}
//                                 description={contract.description}
//                                 image={contract.image}
//                                 isExpanded={index === expandedIndex}
//                                 onExpand={() => handleExpand(index)}
//                             />
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

import { useState } from 'react'
// import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/solid'

interface AccordionData {
    title: string;
    description: string;
}

interface AccordionProps {
    data: AccordionData[];
}

const Accordion: React.FC<AccordionProps> = ({ data }) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null)

    const toggleAccordion = (index: number) => {
        if (activeIndex === index) {
            setActiveIndex(null)
        } else {
            setActiveIndex(index)
        }
    }

    return (
        <div className="border rounded-lg">
            {data.map((item, index) => (
                <div
                    key={index}
                    className="border-b"
                >
                    <div
                        className="flex items-center justify-between px-4 py-3 cursor-pointer"
                        onClick={() => toggleAccordion(index)}
                    >
                        <h3 className="text-lg font-medium">{item.title}</h3>
                        {activeIndex === index ? (
                            // <ChevronUpIcon className="w-5 h-5 text-gray-500" />
                            <p>hi</p>
                        ) : (
                            // <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                            <p>hello</p>
                        )}
                    </div>
                    {activeIndex === index && (
                        <div className="px-4 py-3 bg-gray-50">{item.description}</div>
                    )}
                </div>
            ))}
        </div>
    )
}

export default Accordion


