import React, { useState } from "react";

interface Contract {
    title: string;
    description: string;
}

const ContractCard: React.FC<{
    title: string;
    description: string;
    isExpanded: boolean;
    onExpand: () => void;
}> = ({ title, description, isExpanded, onExpand }) => {
    return (
        <div
            className={`p-4 border border-gray-300 rounded-md flex flex-col ${isExpanded ? "h-96" : "h-96"
                }`}
            onClick={onExpand}
        >
            <h3 className="text-lg font-medium mb-2">{title}</h3>
            {isExpanded && <p>{description}</p>}
        </div>
    );
};

const ChooseContract: React.FC = () => {
    const contracts: Contract[] = [
        { title: "Bill Murray", description: "Description of Contract 1" },
        { title: "EarthLight", description: "Description of Contract 2" },
        // { title: "Contract 3", description: "Description of Contract 3" },
    ];

    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const handleExpand = (index: number) => {
        // If the clicked contract card is already expanded, collapse it
        // Otherwise, expand the clicked contract card and collapse any other expanded contract cards
        if (expandedIndex === index) {
            setExpandedIndex(null);
        } else {
            setExpandedIndex(index);
        }
    };

    return (
        <div className="flex h-full my-auto items-center">
            <div className="flex  text-white ">
                <div className="flex flex-wrap">
                    {contracts.map((contract, index) => (
                        <div className="flex-grow p-2" key={index}>
                            <ContractCard
                                title={contract.title}
                                description={contract.description}
                                isExpanded={index === expandedIndex}
                                onExpand={() => handleExpand(index)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ChooseContract;
