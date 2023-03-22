const burner_abi = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "toSendToSender",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "toSendToContract",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "toSendToContractNftId",
          "type": "uint256"
        }
      ],
      "name": "burnTicket",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]

  module.exports = { burner_abi }