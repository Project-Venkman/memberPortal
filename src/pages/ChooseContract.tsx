import React, { useEffect, useState } from "react";

export const ChooseContract = (props) => {
    // api gethat gets the list of all contracts a user has 

    // well loop throught the array of contracts and display them
    // when a user clicks on a contract we will set the redux state to that contract
    for (let i = 0; i < contracts.length; i++) {
        // display the contracts
        return (
            <div>
                <h1>Choose Contract</h1>
                <div>
                    <h2>{contracts[i].name}</h2>
                    <p>{contracts[i].description}</p>
                    <button onClick={() => {
                        // set the redux state to the contract
                    }
        )
    }
};