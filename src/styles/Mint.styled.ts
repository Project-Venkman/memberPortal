import styled from "styled-components";
import tw from "twin.macro";
import Form from "devextreme-react/form";
import {FileUploader} from "devextreme-react";
import {DataGrid} from "devextreme-react/data-grid";

export const MintPage = styled.div`
	${tw`h-full`}
	.dx-texteditor-label {
		${tw`text-gray-300/25`}
	}
	.dx-state-hover {
		${tw`hover:border-red-500!`}
	}
	.dx-fileuploader-files-container {
		${tw`hidden!`}
	}
`;
export const MinterContainer = styled.div`
	${tw`py-4 h-full`}
`;
export const SelectContract = styled.select`
	${tw`p-2 rounded-none text-black mb-4`}
	option {
		${tw`p-2 rounded-none text-black`}
	}
`;
export const InputContainer = styled.div`
	${tw`w-full min-h-[200px] flex flex-col justify-center items-center`}
	.dropzone-external {
		${tw`p-4 flex-1 w-full justify-center items-center`}
		&.dropzone-active {
			${tw`border-solid! border-green-500! border-2`}
		}
	}
	.dropzone-external > * {
  		pointer-events: none;
	}
	.dx-fileuploader-wrapper {
		${tw`p-0 h-full`}
	}
	.dx-fileuploader-input-wrapper {
		${tw`flex flex-col justify-center items-center h-full border-2 border-dashed border-gray-300/25 p-2! rounded`}
	}
	.dx-fileuploader-input-container {
		${tw`text-center h-auto!`}
	}
	.dx-fileuploader-dragover .dx-fileuploader-input-wrapper {
		${tw`h-full border-2 border-dashed border-gray-500/75 p-2! rounded`}
	}
	.dx-fileuploader-dragover .dx-fileuploader-input {
		${tw`p-0!`}
	}
	.dx-fileuploader-dragover .dx-fileuploader-input-label {
		${tw`border! border-solid! border-transparent! p-0!`}
	}
`
export const FilesInput = styled(FileUploader)`
	${tw`p-0`}
`
export const FileTypeFieldset = styled.fieldset`
	${tw`py-4 flex flex-row`}
`
export const FileTypeInputContainer = styled.div`
	${tw``}
	&:not(:last-child) {
		${tw`mr-8`}
	} 
`
export const FileTypeInput = styled.input`
	${tw`py-4`}
`
export const MintContainer = styled.div`
	${tw`flex flex-row gap-4 w-full py-4 flex-wrap`}
`
export const MintCard = styled.div`
	${tw`flex flex-col justify-between w-full relative border-2 border-white/25 rounded flex-[0 0 100%] lg:flex-[0 0 46%]`}
	&.minted {
		${tw`border-green-500/50!`}
	}
`
export const MintContent = styled.div`
	${tw`w-full p-2 flex flex-col md:flex-row gap-4 md:gap-4`}
	
	.nft-description{
		.dx-texteditor-container {
			${tw``}
		}
		textarea {
			${tw`overflow-hidden`}
		}
	}
`
export const MintPreviewContainer = styled.div`
	background-image: url(${(props: any) => props.itemProp});
	${tw`flex justify-center items-stretch w-full min-h-[250px] relative border border-white/25 bg-center bg-contain bg-no-repeat`}
`
export const MintPreviewImage = styled.img`
	${tw`max-h-80`}
`
export const MintCardHeader = styled.div`
	${tw`flex justify-center font-bold my-2`}
`
export const MintDetailsContainer = styled.div`
	${tw`w-full`}
	.dx-datagrid-headers {
		${tw`border-t-2 border-t-[#4d4d4d]`}
	}
	.dx-datagrid-header-panel {
		${tw`border-none!`}
	}
`
export const MintDetails = styled(Form)`
	${tw`w-full`}
	&.attributes .dx-box-flex {
		${tw`flex flex-row! justify-between!`}
		.dx-box-item {
			${tw`p-2! md:p-0!`}
			.dx-single-column-item-content > .dx-field-item {
				${tw`p-0!`}
			}
		}
	}
	.dx-layout-manager .dx-field-item:not(.dx-first-row) {
    	${tw`md:pt-0`};
	}
	.dx-layout-manager .dx-field-item:not(.dx-last-col) {
    	${tw`md:pr-1`};
	}
	.dx-layout-manager .dx-field-item:not(.dx-first-col) {
    	${tw`md:pl-1`};
	}
`
export const MintActionContainer = styled.div`
	${tw`flex flex-row justify-end gap-2 border-t border-b border-white/25 p-2 h-8`}
`
export const AttributeGrid = styled(DataGrid)`
	.dx-datagrid-header-panel .dx-toolbar {
		${tw`mb-0`}
	}
	.dx-toolbar .dx-toolbar-items-container {
		${tw`h-8`}
	}
	.dx-button {
		${tw`border-0`}
	}
	.dx-button .dx-icon {
		${tw`w-3 h-3 text-['.75rem', '.75rem'] bg-[.75rem]`}
	}
`
