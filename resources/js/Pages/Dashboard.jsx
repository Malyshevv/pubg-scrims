import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Pagination from "@/Components/Pagination";

export default function Dashboard({ auth, result }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Главная</h2>}
        >
            <Head title="Главная" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        {!result || !result.data || !result.data.length && (
                            <p className={'text-gray dark:text-white p-10 text-center'}> Новости не найдены</p>
                        )}
                        <ul className={'divide-y divide-gray-200 dark:divide-gray-700'}>
                            {result && result.data && (
                                result.data.map((el) => (
                                    <>
                                        <li className="py-12" key={`news_${el.id}`}>
                                            <article>
                                                <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                                                    <div className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                                                        <p className={'pl-10'}>Author: {el.username} | {el.created_at}</p>
                                                    </div>
                                                    <div className="space-y-5 xl:col-span-3">
                                                        <div className="space-y-6">
                                                            <div><h2 className="text-2xl font-bold leading-8 tracking-tight"><a
                                                                className="text-gray-900 dark:text-gray-100"
                                                                href={`/news/${el.id}`}>{el.title}</a></h2>
                                                            </div>
                                                            <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                                                                {el.description}
                                                            </div>
                                                        </div>
                                                        <div className="text-base font-medium leading-6"><a
                                                            className="text-primary-500 dark:text-gray-500 hover:text-primary-600 dark:hover:text-gray-300"
                                                            aria-label="Read more: &quot;Release of Tailwind Nextjs Starter Blog v2.0&quot;"
                                                            href={`/news/${el.id}`}>Читать далее →</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </article>
                                        </li>
                                    </>
                                ))
                            )}
                        </ul>
                    </div>
                    <Pagination links={result.links}/>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
