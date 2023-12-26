import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head} from "@inertiajs/react";
import Pagination from "@/Components/Pagination";

export default function TournamentsList({ auth, result }) {
    console.log(result)
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Tournaments List</h2>}
        >
            <Head title="Tournaments List" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <caption
                                className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                                Tournaments List
                                <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                                    Here you can see a list of all tournaments
                                </p>
                                <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                                    You can
                                    <a className={'text-[#437bffee]'} href={route('tournament.make')}> MAKE YOUR TOURNAMENT</a>
                                </p>
                            </caption>
                            <thead
                                className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Tournaments name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Description
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Org. nickname
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Tier
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Maps
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Date St. - Date En.
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {result && result.data && (
                                result.data.map((el) => (
                                    <tr key={`tournament_${el.id}`} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {el.title}
                                        </th>
                                        <td className="px-6 py-4">
                                            {el.description}
                                        </td>
                                        <td className="px-6 py-4">
                                            {el.org_nickname}
                                        </td>
                                        <td className="px-6 py-4">
                                            {el.division}
                                        </td>
                                        <td className="px-6 py-4">
                                            {el.maps}
                                        </td>
                                        <td className="px-6 py-4">
                                            {el.start_date} - {el.end_date}
                                        </td>
                                        <td className="px-6 py-4">
                                            {el.status}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <a href={`/tournament/view/${el.id}`}
                                               className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Show</a>
                                        </td>
                                    </tr>
                                ))
                            )}
                            </tbody>
                        </table>
                        <Pagination links={result.links}/>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
