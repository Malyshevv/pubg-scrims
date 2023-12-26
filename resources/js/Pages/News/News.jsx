import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth, result }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">{result.title}</h2>}
        >
            <Head title="News" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-5">
                        <article>
                            <div className="space-y-5 xl:col-span-3">
                                <div className="space-y-6">
                                    <div><h2 className="text-5xl font-bold leading-8 tracking-tight"><p
                                        className="text-gray-900 dark:text-gray-100">{result.title}</p></h2>
                                    </div>
                                    <div className="text-base font-medium text-gray-500 dark:text-gray-400">
                                        <p>Author: {result.username} | {result.created_at}</p>
                                    </div>
                                    <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                                        {result.text}
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
