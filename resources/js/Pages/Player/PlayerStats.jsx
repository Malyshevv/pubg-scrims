import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head} from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import axios from "axios";
import {useState} from "react";

export default function PlayerStats({ auth }) {
    const [nickname, setNickname] = useState('');
    const [platform, setPlatform] = useState('xbox');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true)
            const res = await axios.get(route("get-player-ranked-stats"), {
                params: {
                    nickname,
                    platform,
                    api_key: ""
                }
            });

            const parsed = JSON.parse(res.data.result); // ← ВАЖНО!
            setResult(parsed);
            setLoading(false)
        } catch (err) {
            console.error(err);
            setLoading(false)
            setResult({ error: "Request failed" });
        }
    };

    const stats =
      result?.data?.attributes?.rankedGameModeStats?.squad ?? null;

    return (
      <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Проверка статистики</h2>}
      >
          <Head title="Проверка статистики"/>

          <div className="py-12">
              <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex">

                  {/* Форма */}
                  <div
                    className="w-1/4 mr-5 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                      <h5
                        className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Введите данные</h5>

                      <form className="mx-auto mt-5" onSubmit={handleSubmit}>
                          <div>
                              <label htmlFor="nickname"
                                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                  Никнейм игрока
                              </label>
                              <input
                                type="text"
                                id="nickname"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                placeholder="nickname"
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)}
                              />
                          </div>

                          <div className="mt-5">
                              <label htmlFor="platform"
                                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                  Платформа
                              </label>
                              <select
                                id="platform"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                value={platform}
                                onChange={(e) => setPlatform(e.target.value)}
                              >
                                  <option value="xbox">Xbox</option>
                                  <option value="psn">Playstation</option>
                                  <option value="stadia">Stadia</option>
                              </select>
                          </div>

                          <div className="mt-5">
                              <PrimaryButton type="submit" disabled={loading}>Проверить</PrimaryButton>
                          </div>
                      </form>
                  </div>

                  {/* Результат */}
                  <div
                    className="ml-5 w-3/4 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                          Результат
                      </h5>

                      {!result && (
                        <p className="text-black dark:text-gray-400">
                            Данные отсутствуют
                        </p>
                      )}

                      {result && !stats && (
                        <p className="text-red-600 dark:text-red-400">Игрок не найден или не играл в текущем сезоне</p>
                      )}

                      {stats && (
                        <div className="grid grid-cols-2 gap-4 text-gray-900 dark:text-gray-200">

                            <div className="p-4 rounded bg-gray-100 dark:bg-gray-700">
                                <h3 className="font-bold text-lg">Ранг</h3>
                                <p>{stats.currentTier.tier} {stats.currentTier.subTier}</p>
                                <p className="text-sm">RP: {stats.currentRankPoint}</p>
                            </div>

                            <div className="p-4 rounded bg-gray-100 dark:bg-gray-700">
                                <h3 className="font-bold text-lg">Лучший ранг</h3>
                                <p>{stats.bestTier.tier} {stats.bestTier.subTier}</p>
                                <p className="text-sm">RP: {stats.bestRankPoint}</p>
                            </div>

                            <div className="p-4 rounded bg-gray-100 dark:bg-gray-700">
                                <h3 className="font-bold text-lg">Игры</h3>
                                <p>Кол-во игр: {stats.roundsPlayed}</p>
                                <p>Победы: {stats.wins}</p>
                                <p>Топ 10: {Math.round(stats.top10Ratio * 100)}%</p>
                            </div>

                            <div className="p-4 rounded bg-gray-100 dark:bg-gray-700">
                                <h3 className="font-bold text-lg">Статистика</h3>
                                <p>Килы: {stats.kills}</p>
                                <p>Ассисты: {stats.assists}</p>
                                <p>KDA: {stats.kda}</p>
                            </div>

                            <div className="p-4 rounded bg-gray-100 dark:bg-gray-700 col-span-2">
                                <h3 className="font-bold text-lg">Урон</h3>
                                <p>Общее кол-во: {stats.damageDealt}</p>
                            </div>
                        </div>
                      )}

                      {/* DEBUG JSON — можно оставить для разработки */}
                      {result && (
                        <details className="mt-5">
                            <summary className="cursor-pointer text-gray-500 dark:text-gray-400">
                                Raw JSON
                            </summary>
                            <pre className="text-sm text-gray-900 dark:text-gray-400 overflow-auto mt-2">
                                    {JSON.stringify(result, null, 2)}
                                </pre>
                        </details>
                      )}
                  </div>

              </div>
          </div>
      </AuthenticatedLayout>
    );
}
