import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head} from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";

export default function PlayerStats({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Player Stats</h2>}
        >
            <Head title="Player Stats" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex">


                    <div
                        className="w-1/4 mr-5 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <a href="#">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                               Enter your data</h5>
                        </a>

                        <form className="mx-auto mt-5">
                            <div>
                                <label htmlFor="text"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Player nickname
                                </label>
                                <input type="text" id="text" aria-describedby="helper-text-explanation"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       placeholder="nickname" />
                            </div>
                            <div className={'mt-5'}>
                                <label htmlFor="countries"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Platform
                                </label>
                                <select id="countries"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value="xbox" selected>Xbox</option>
                                    <option value="ps">Playstation</option>
                                </select>
                            </div>
                            <div className={'mt-5'}>
                                <PrimaryButton>
                                    Search
                                </PrimaryButton>
                            </div>
                        </form>

                    </div>

                    <div
                        className="ml-5 w-3/4 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <a href="#">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                               Result
                            </h5>

                            <p className={'text-black dark:text-gray-400'}>Player not selected or not found</p>
                        </a>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
