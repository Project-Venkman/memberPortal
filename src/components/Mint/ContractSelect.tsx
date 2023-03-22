import React, {useEffect} from "react";
import {Contract, ContractSetting, MintSelectComponentProps} from "@customtypes/Mint";
import { SelectContract } from "@styles/index";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@state/store";
import { changeContractTypeId } from "@state/features/CompanyUserSlice";
import { setContract } from "@state/features/ContractSlice";

export const ContractSelect: React.FC<MintSelectComponentProps> = (props) => {
	const { } = props;
	const allContracts: Array<ContractSetting> = useSelector((state: RootState) => state.allContracts);
	const contract: ContractSetting = useSelector((state: RootState) => state.contract);
	const dispatch = useDispatch();

	const handleSelectedContractClick = (e: React.ChangeEvent<HTMLSelectElement>) => {
		let sc: ContractSetting = allContracts.filter((c: ContractSetting) => c.ID === e.target.value)[0]
		dispatch(changeContractTypeId(sc.ID));
		dispatch(setContract(sc));
	}

	useEffect(() => {
		//console.log(allContracts)
	}, [allContracts])

	useEffect(() => {
		//console.log("contract", contract)
	}, [contract])

	return (
		<SelectContract id={"select-contract"} defaultValue={"default"} onChange={handleSelectedContractClick}>
			<option value={"default"} disabled={true} hidden={true}>Choose Contract</option>
			{
				allContracts!.filter((c: ContractSetting) => c.PartnerContractID !== null).map((contract: ContractSetting, i: number) => {
					return (
						<option key={i} value={contract.ID} defaultChecked={i === 0}>{contract.ContractDescription}</option>
					)
				})
			}
			{/*<option value={"new"}>...Create new</option>*/}
		</SelectContract>
	)
}
