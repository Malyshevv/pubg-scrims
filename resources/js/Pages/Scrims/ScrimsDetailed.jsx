import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link} from "@inertiajs/react";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";

export default function ScrimsDetailed({ auth, result }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<div className={'flex justify-between'}><h2 className="justify-start font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Scrims: {result.title} </h2> {result.user_id === auth.user.id ? <a href={`/scrims/edit/${result.id}`} className={'px-3 text-white justify-end ml-4 rounded-full bg-blue-500 text-lg'}>Edit</a> : ''}</div>}
        >
            <Head title="Scrim" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h1 className={'text-[40pt] font-semibold'}>{result.title}
                                <span
                                    className={`ml-5 bg-[${
                                        result.status_id === 2 ? '#0f8739ee' : result.status_id === 3 ? '#ed3a3a' : '#0046cb'
                                    }] text-xs font-medium me-2 p-2 rounded text-white`}>
                                    {result.status}
                                </span>
                            </h1>
                            <p className={'text-gray-100 dark:text-gray-400'}>{result.description}</p>
                            <div className={'grid grid-cols-4 gap-4 text-gray mt-5 dark:text-gray-400'}>
                                <p className={'border-b pb-1 border-gray-400'}><b>Date Start:</b> {result.start_date}</p>
                                <p className={'border-b pb-1 border-gray-400'}><b>Date End:</b> {result.end_date}</p>
                                <p className={'border-b pb-1 border-gray-400'}><b>Maps:</b> {result.maps}</p>
                                <p className={'border-b pb-1 border-gray-400'}><b>Org. nickname:</b> {result.org_nickname}</p>
                                <p className={'border-b pb-1 border-gray-400'}><b>Division:</b> {result.division}</p>
                                <p className={'border-b pb-1 border-gray-400'}><b>Telegram:</b> {result.telegram_link ? <Link className={'font-medium text-blue-600 dark:text-blue-500 hover:underlin'} href={result.telegram_link}>Open Telegram</Link> : 'N/A'}</p>
                                <p className={'border-b pb-1 border-gray-400'}><b>Discord:</b> {result.discord_link ? <Link className={'font-medium text-blue-600 dark:text-blue-500 hover:underlin'} href={result.discord_link}>Open Discord</Link> : 'N/A'}</p>
                            </div>

                            <Tabs className={'mt-5 mb-4 border-b border-gray-200 dark:border-gray-700'}>
                                <TabList className={'flex flex-wrap -mb-px text-sm font-medium text-center text-gray-300 dark:text-white'}>
                                    <Tab className={'inline-block p-4 rounded-t-lg cursor-pointer hover:bg-blue-700 hover:text-white'}>Stats</Tab>
                                    <Tab className={'inline-block p-4 rounded-t-lg cursor-pointer hover:bg-blue-700 hover:text-white'}>Matches</Tab>
                                </TabList>

                                <TabPanel className={'rounded-lg bg-gray-50 dark:bg-gray-800'}>
                                    <div className={'text-sm text-gray-500 dark:text-gray-400 mt-5'}>
                                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            <thead
                                                className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
                                                <th scope="col" className="px-6 py-3">
                                                    Placement
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Team Name
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Kill points
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Placement points
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Total Points
                                                </th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {result && result.data && (
                                                result.data.map((el) => (
                                                    <tr key={`tournament_${el.id}`} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
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
                                                    </tr>
                                                ))
                                            )}
                                            </tbody>
                                        </table>
                                    </div>
                                </TabPanel>
                                <TabPanel className={'rounded-lg bg-gray-50 dark:bg-gray-800'}>
                                    <div className={'text-sm text-gray-500 dark:text-gray-400 mt-5'}>
                                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            <thead
                                                className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
                                                <th scope="col" className="px-6 py-3">
                                                    Date
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Map
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Winner
                                                </th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {result && result.data && (
                                                result.data.map((el) => (
                                                    <tr key={`tournament_${el.id}`} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                        <td className="px-6 py-4">
                                                            {el.org_nickname}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {el.division}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {el.maps}
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                            </tbody>
                                        </table>
                                    </div>
                                </TabPanel>
                            </Tabs>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
