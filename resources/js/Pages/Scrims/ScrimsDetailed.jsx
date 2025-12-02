import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import { Head, Link, router } from "@inertiajs/react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { useState } from "react";

export default function ScrimsDetailed({ auth, result }) {

    const teams = result?.teams ?? [];
    const matches = result?.matches ?? [];
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const loadMatchData = () => {
        setLoading(true);
        setError(null);

        router.visit(route("match.find", { event_id: result.id }), {
            method: "get",
            preserveScroll: true,
            onSuccess: () => {
                setLoading(false);
                window.location.reload();
            },
            onError: (errors) => {
                setLoading(false);
                setError("Не удалось загрузить данные матча");
            }
        });
    };
    

    return (
      <AuthenticatedLayout
        user={auth.user}
        header={
            <div className="flex justify-between">
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200">
                    Кастомка: {result.title}
                </h2>

                {result.user_id === auth.user.id && (
                  <a
                    href={`/scrims/edit/${result.id}`}
                    className="px-3 text-white rounded-full bg-blue-500 text-lg"
                  >
                      Редактировать
                  </a>
                )}
            </div>
        }
      >
          <Head title="Скрим"/>

          <div className="py-12">
              <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                  <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg">
                      <div className="p-6 text-gray-900 dark:text-gray-100">

                          {/* HEADER */}
                          <h1 className="text-[40pt] font-semibold">
                              {result.title}

                              <span
                                className={`ml-5 p-2 text-xs rounded text-white ${
                                  result.status_id === 2
                                    ? "bg-green-600"
                                    : result.status_id === 3
                                      ? "bg-red-600"
                                      : "bg-blue-700"
                                }`}
                              >
                                    {result.status}
                                </span>

                              <span
                                onClick={loadMatchData}
                                className={`ml-5 bg-[#027e85ee] cursor-pointer hover:bg-[#00bac5ee] text-xs font-medium p-2 rounded text-white`}
                              >
                                    {loading ? "Загрузка..." : "Загрузить данные матча"}
                                </span>
                          </h1>

                          {loading && (
                            <p className="text-yellow-400 mt-3">Загружаем последние данные из PUBG API...</p>
                          )}

                          {error && (
                            <p className="text-red-400 mt-3">{error}</p>
                          )}

                          <p className="text-gray-400">{result.description}</p>

                          {/* INFO GRID */}
                          <div className="grid grid-cols-4 gap-4 mt-5 text-gray dark:text-gray-400">

                              <Info label="Дата начала" value={result.start_date}/>
                              <Info label="Дата окончания" value={result.end_date}/>
                              <Info label="Карты" value={result.maps}/>
                              <Info label="Организатор" value={result.org_nickname}/>
                              <Info label="Дивизион" value={result.division}/>

                              <Info
                                label="Telegram"
                                value={
                                    result.telegram_link ?
                                      <Link className="text-blue-500" href={result.telegram_link}>Открыть</Link> :
                                      "Нет данных"
                                }
                              />

                              <Info
                                label="Discord"
                                value={
                                    result.discord_link ?
                                      <Link className="text-blue-500" href={result.discord_link}>Открыть</Link> :
                                      "Нет данных"
                                }
                              />
                          </div>

                          {/* TABS */}
                          <Tabs className="mt-5 mb-4">
                              <TabList className="flex text-sm font-medium text-gray-300 dark:text-white">
                                  <Tab className="p-4 cursor-pointer hover:bg-blue-700 hover:text-white">Статистика</Tab>
                                  <Tab className="p-4 cursor-pointer hover:bg-blue-700 hover:text-white">Матчи</Tab>
                              </TabList>

                              {/* ---- TAB #1: TEAM STATS ---- */}
                              <TabPanel className="rounded-lg bg-gray-50 dark:bg-gray-800">
                                  <div className="mt-5 overflow-x-auto">
                                      <table className="w-full text-left">
                                          <thead className="text-xs bg-gray-100 dark:bg-gray-700 uppercase">
                                          <tr>
                                              <th className="px-6 py-3">Место</th>
                                              <th className="px-6 py-3">Команда</th>
                                              <th className="px-6 py-3">Киллы</th>
                                              <th className="px-6 py-3">Очки за место</th>
                                              <th className="px-6 py-3">Всего</th>
                                          </tr>
                                          </thead>

                                          <tbody>
                                          {teams.sort((a, b) => b.points - a.points).map((team, idx) => (
                                            <tr key={team.id} className="border-b dark:border-gray-700">
                                                <td className="px-6 py-4">{idx + 1}</td>
                                                <td className="px-6 py-4">{team.team_name || `Team #${team.team_lobby_number}`}</td>
                                                <td className="px-6 py-4">{team.kill_points}</td>
                                                <td className="px-6 py-4">{team.place_points}</td>
                                                <td className="px-6 py-4 font-bold">{team.points}</td>
                                            </tr>
                                          ))}
                                          </tbody>
                                      </table>
                                  </div>
                              </TabPanel>

                              {/* ---- TAB #2: MATCHES ---- */}
                              <TabPanel className="rounded-lg bg-gray-50 dark:bg-gray-800">
                                  <div className="mt-5 overflow-x-auto">
                                      <table className="w-full">
                                          <thead className="text-xs bg-gray-100 dark:bg-gray-700 uppercase">
                                          <tr>
                                              <th className="px-6 py-3">Дата</th>
                                              <th className="px-6 py-3">Карта</th>
                                              <th className="px-6 py-3">Победитель</th>
                                          </tr>
                                          </thead>
                                          <tbody>
                                          {matches.map(match => {

                                              console.log("MATCH RAW:", match);

                                              // Приводим JSON к объекту
                                              const md = typeof match.match_detailed === "string"
                                                ? JSON.parse(match.match_detailed)
                                                : match.match_detailed;

                                              console.log("PARSED:", md);

                                              const winner = md?.result?.find(
                                                t => String(t.won) === "true"
                                              );

                                              return (
                                                <tr key={match.id} className="border-b dark:border-gray-700">
                                                    <td className="px-6 py-4">{md.startInTime}</td>
                                                    <td className="px-6 py-4">{md.map}</td>
                                                    <td className="px-6 py-4 font-bold">
                                                        {winner ? `Team #${winner.teamId}` : "—"}
                                                    </td>
                                                </tr>
                                              );
                                          })}

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

function Info({ label, value }) {
    return (
      <p className="border-b pb-1 border-gray-400">
          <b>{label}:</b> {value}
      </p>
    );
}
