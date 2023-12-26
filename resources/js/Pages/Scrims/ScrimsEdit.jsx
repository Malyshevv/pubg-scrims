import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head} from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton.jsx";

export default function ScrimsEdit({ auth, result }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">{result && result.length ? 'Scrims Edit' : 'Scrim Make'}</h2>}
        >
            <Head title={result && result.length ? 'Scrims Edit' : 'Scrim Make'} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex">


                    <div
                        className="w-full mr-5 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <a href="#">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {result && result.length ? 'Scrims Edit' : 'Scrim Make'}</h5>
                        </a>

                        <form className="mx-auto mt-5">
                            <div>
                                <label htmlFor="title"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Scrim title
                                </label>
                                <input type="text" id="title" aria-describedby="helper-text-explanation"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       placeholder="title" />
                            </div>
                            <div className={'mt-5'}>
                                <label htmlFor="status"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Status
                                </label>
                                <select id="status"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value="xbox" selected>Open</option>
                                </select>
                            </div>
                            <div className={'mt-5'}>
                                <label htmlFor="startdt"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Start Date
                                </label>
                                <input type="datetime-local" id="startdt" aria-describedby="helper-text-explanation"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        />
                            </div>
                            <div className={'mt-5'}>
                                <label htmlFor="enddt"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    End Date
                                </label>
                                <input type="datetime-local" id="enddt" aria-describedby="helper-text-explanation"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        />
                            </div>
                            <div className={'mt-5'}>
                                <label htmlFor="org_nickname"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Org. nickname
                                </label>
                                <input type="text" id="org_nickname" aria-describedby="helper-text-explanation"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       placeholder="Org. nickname" />
                            </div>
                            <div className={'mt-5'}>
                                <label htmlFor="discord"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Discord
                                </label>
                                <input type="text" id="discord" aria-describedby="helper-text-explanation"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       placeholder="discord link" />
                            </div>
                            <div className={'mt-5'}>
                                <label htmlFor="telegram"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Telegram
                                </label>
                                <input type="text" id="telegram" aria-describedby="helper-text-explanation"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       placeholder="telegram link" />
                            </div>
                            <div className={'mt-5'}>
                                <label htmlFor="Description"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Description
                                </label>
                                <input type="text" id="Description" aria-describedby="helper-text-explanation"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       placeholder="description" />
                            </div>
                            <div className={'mt-5'}>
                                <label htmlFor="tier"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Tier
                                </label>
                                <select id="tier"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value="xbox" selected>Tire 1</option>
                                    <option value="ps">Tire 2</option>
                                    <option value="ps">Tire 3</option>
                                    <option value="ps">N/A</option>
                                </select>
                            </div>
                            <div className={'mt-5'}>
                                <label htmlFor="tier"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Maps
                                </label>
                                <select id="tier"
                                        multiple={true}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value="xbox" selected>Erangel</option>
                                    <option value="ps">Miramar</option>
                                    <option value="ps">Taego</option>
                                    <option value="ps">Vikendi</option>
                                </select>
                            </div>
                            <div className={'mt-5'}>
                                <PrimaryButton>
                                    Search
                                </PrimaryButton>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
