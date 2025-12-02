import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head} from "@inertiajs/react";
import Pagination from "@/Components/Pagination.jsx";

export default function ScrimsList({ auth, result }) {
    return (
      <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Список скримов</h2>}
      >
          <Head title="Список скримов" />

          <div className="py-12">
              <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                  <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                          <caption
                            className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                              Список кастомок
                              <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                                  Здесь вы можете увидеть список всех кастомок
                              </p>
                              <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                                  Вы можете
                                  <a className={'text-[#437bffee]'} href={route('scrims.make')}> СОЗДАТЬ СВОЮ КАСТОМКУ</a>
                              </p>
                          </caption>

                          <thead
                            className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                              <th scope="col" className="px-6 py-3">
                                  Название турнира
                              </th>
                              <th scope="col" className="px-6 py-3">
                                  Описание
                              </th>
                              <th scope="col" className="px-6 py-3">
                                  Ник организатора
                              </th>
                              <th scope="col" className="px-6 py-3">
                                  Дивизион
                              </th>
                              <th scope="col" className="px-6 py-3">
                                  Карты
                              </th>
                              <th scope="col" className="px-6 py-3">
                                  Дата начала — Дата окончания
                              </th>
                              <th scope="col" className="px-6 py-3">
                                  Статус
                              </th>
                              <th scope="col" className="px-6 py-3">
                                  <span className="sr-only">Просмотр</span>
                              </th>
                          </tr>
                          </thead>

                          <tbody>
                          {result && result.data && (
                            result.data.map((el) => (
                              <tr key={`scrims_${el.id}`} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
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
                                      <a href={`/scrims/view/${el.id}`}
                                         className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                          Открыть
                                      </a>
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
