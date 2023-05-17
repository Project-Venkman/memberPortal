import React from "react";
import {useNavigate} from "react-router-dom";
export const Transfer: React.FC = () => {
    const navigate = useNavigate();
    const handleTransferToPersonalWallet = () => {
        console.log("Transfer to Personal Wallet clicked!");
        // Add your logic for transfer to personal wallet
    //     navigate to
    };

    const handleKeepInEmailWallet = () => {
        console.log("Keep in Email Wallet clicked!");
        // Add your logic for keeping in email wallet
    };

    const Card: React.FC<{ title: string; onClick: () => void }> = ({title, onClick,}) => (
        <div
            className="flex justify-center items-center min-h-[40vh] min-w-[40vw] bg-blue-500 rounded-lg p-4 w-1/2 cursor-pointer"
            onClick={onClick}
        >
            <h3 className="text-white text-center text-xl">{title}</h3>
        </div>
    );

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex space-x-4">
                <Card
                    title="Transfer to Personal Wallet"
                    onClick={handleTransferToPersonalWallet}
                />
                <Card
                    title="Keep in Email Wallet"
                    onClick={handleKeepInEmailWallet}
                />
            </div>
        </div>
    );
};

export default Transfer;
