import React from 'react';
import { Coin } from '@customtypes/Coin';
import { useSelector } from 'react-redux';
import { RootState } from '@state/store';

export const Crown = () => {
    const crown: Array<Coin> = useSelector((state: RootState) => state.crown);
    return (
        <>
            <div className=" min-h-full justify-center bg-gray-900">
                <div className="bg-gray-900">
                    <div className="mx-auto ">
                        <div className="bg-gray-900 py-10">
                            <div className="px-4 sm:px-6 lg:px-8">
                                <div className="sm:flex sm:items-center">
                                    <div className="sm:flex-auto">
                                        <h1 className="text-base font-semibold leading-6 text-white">
                                            Users Crown List
                                        </h1>
                                    </div>
                                </div>
                                <div className="mt-8 flow-root">
                                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                            <table className="min-w-full divide-y divide-gray-700">
                                                <thead>
                                                    <tr>
                                                        <th
                                                            scope="col"
                                                            className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                                                        >
                                                            Email
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                                                        >
                                                            Quantity Remaining
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-800">
                                                    {crown.map((crown) => (
                                                        <tr key={crown.id}>
                                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                                                                {crown.email}
                                                            </td>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                                                                {
                                                                    crown.qtyRemaining
                                                                }
                                                            </td>
                                                            {/*<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">*/}
                                                            {/*    {person2.email}*/}
                                                            {/*</td>*/}
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Crown;
