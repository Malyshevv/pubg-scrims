import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  GiStoneSphere,
  GiMetalScales,
  GiEmerald,
  GiCrystalBars,
  GiDiamondTrophy,
  GiRoyalLove,
  GiLaurels,
  GiTrophy,
  GiPodiumWinner,
  GiCrownedSkull,
} from "react-icons/gi";


export default function PlayerLeaderboard({ auth, players }) {
  const [playersList, setPlayers] = useState([]);
  const [reactionLoading, setReactionLoading] = useState(null); // playerId который грузится
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  
  const rankIcons = {
    bronze: GiStoneSphere,
    silver: GiMetalScales,
    gold: GiEmerald,
    platinum: GiCrystalBars,
    crystal: GiCrystalBars,
    diamond: GiDiamondTrophy,
    elite: GiLaurels,
    master: GiTrophy,
    ace: GiPodiumWinner,
    conqueror: GiCrownedSkull,
    survivor: GiRoyalLove,
  };

  const tierColor = (tier) => {
    if (!tier) return "text-gray-400";

    switch (tier.toLowerCase()) {
      case "bronze":
        return "text-[#cd7f32]";
      case "silver":
        return "text-gray-300";
      case "gold":
        return "text-yellow-400";
      case "platinum":
        return "text-blue-300";
      case "diamond":
        return "text-cyan-300";
      case "crystal":
        return "text-purple-300";
      case "elite":
        return "text-green-300";
      case "master":
        return "text-red-400";
      case "ace":
        return "text-orange-400";
      case "conqueror":
        return "text-red-500 font-bold";

      default:
        return "text-gray-400";
    }
  };

  // --- NEW states ---
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    nickname: "",
    contact: "",
    platform: "psn",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (players) {
      setPlayers(players);
    }
  }, []);


  const RankIcon = ({ tier, className = "w-5 h-5" }) => {
    if (!tier) return null;

    const key = tier.toLowerCase();
    const Icon = rankIcons[key];

    if (!Icon) return null;

    return <Icon className={className} />;
  };

  // --- NEW submit handler ---
  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(route("pubg.leaderboard.add"), form);

      setShowModal(false);
      setForm({ nickname: "", contact: "", platform: "psn" });
      loadLeaderboard(); // обновить таблицу

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const sendReaction = async (playerId, type) => {
    setErrorMessage("");
    setSuccessMessage("");
    setReactionLoading(playerId);

    try {
      const res = await axios.post(route("players.reaction"), {
        player_id: playerId,
        type: type,
      });

      // успешный ответ
      setSuccessMessage("Реакция успешно сохранена!");

      // обновляем список реакций у игрока
      setPlayers((prev) =>
        prev.map((pl) =>
          pl.id === playerId
            ? {
              ...pl,
              reactions: res.data, // pro, noob, report
            }
            : pl
        )
      );
    } catch (e) {
      if (e.response?.data?.error === "self") {
        setErrorMessage("Вы не можете голосовать за самого себя!");
      } else if (e.response?.status === 409) {
        setErrorMessage("Вы уже ставили эту реакцию!");
      } else {
        setErrorMessage("Ошибка при отправке реакции.");
      }
    } finally {
      setReactionLoading(null);
    }
  };



  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Рейтинг игроков</h2>}
    >
      <Head title="PUBG Leaderboard" />

      <div className="py-10">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

          {/* -------------- NEW button -------------- */}
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setShowModal(true)}
              className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Хочу в список
            </button>
          </div>

          <div className="rounded-lg">
            <div className="overflow-x-auto p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              {errorMessage && (
                <div className="mt-4 p-3 bg-red-700 text-white rounded">
                  {errorMessage}
                </div>
              )}

              {successMessage && (
                <div className="mt-4 p-3 bg-green-700 text-white rounded">
                  {successMessage}
                </div>
              )}
              
              <table className="w-full border-collapse">
                <thead>
                <tr className="text-left text-gray-300 text-sm">
                  <th className="px-4 py-3 border-b border-gray-700">#</th>
                  <th className="px-4 py-3 border-b border-gray-700">Никнейм</th>
                  <th className="px-4 py-3 border-b border-gray-700">Ранг</th>
                  <th className="px-4 py-3 border-b border-gray-700">RP</th>
                  <th className="px-4 py-3 border-b border-gray-700">KDA</th>
                  <th className="px-4 py-3 border-b border-gray-700">Реакции</th>
                </tr>
                </thead>

                <tbody>
                {playersList.map((p, i) => {
                  const squad = p.ranked?.data?.attributes?.rankedGameModeStats?.squad;

                  const tier = squad?.currentTier;
                  const rp = squad?.currentRankPoint;
                  const kda = squad?.kda;

                  return (
                    <tr
                      key={i}
                      className="text-gray-200 text-sm hover:bg-gray-800/40 transition"
                    >
                      <td className="px-4 py-3 border-b border-gray-800">{i + 1}</td>

                      <td className="px-4 py-3 border-b border-gray-800 font-semibold">
                        {p.nickname}
                      </td>

                      <td className={`px-4 py-3 border-b border-gray-800 flex items-center gap-2 ${tierColor(tier?.tier)}`}>
                        <RankIcon tier={tier?.tier} />
                        {tier?.tier} {tier?.subTier}
                      </td>

                      <td className="px-4 py-3 border-b border-gray-800 text-yellow-400 font-bold">
                        {rp ?? "–"}
                      </td>

                      <td className="px-4 py-3 border-b border-gray-800">
                        { kda ? kda.toFixed(2) : "–" }
                      </td>

                      <td className="px-4 py-3 border-b border-gray-800 flex gap-3">

                        {/* ПРО */}
                        <button
                          disabled={reactionLoading === p.id}
                          onClick={() => sendReaction(p.id, "pro")}
                          className={`flex items-center gap-1 ${
                            reactionLoading === p.id ? "opacity-50" : "hover:text-green-300"
                          } text-green-400`}
                        >
                          👍 {p.reactions?.pro}
                          {reactionLoading === p.id && <span className="animate-spin">⏳</span>}
                        </button>

                        {/* НУБ */}
                        <button
                          disabled={reactionLoading === p.id}
                          onClick={() => sendReaction(p.id, "noob")}
                          className={`flex items-center gap-1 ${
                            reactionLoading === p.id ? "opacity-50" : "hover:text-yellow-300"
                          } text-yellow-400`}
                        >
                          💩 {p.reactions?.noob}
                          {reactionLoading === p.id && <span className="animate-spin">⏳</span>}
                        </button>

                        {/* РЕПОРТ */}
                        <button
                          disabled={reactionLoading === p.id}
                          onClick={() => sendReaction(p.id, "report")}
                          className={`flex items-center gap-1 ${
                            reactionLoading === p.id ? "opacity-50" : "hover:text-red-300"
                          } text-red-500`}
                        >
                          🚫 {p.reactions?.report}
                          {reactionLoading === p.id && <span className="animate-spin">⏳</span>}
                        </button>

                      </td>

                    </tr>
                  );
                })}
                </tbody>

              </table>
              
              {players.length === 0 && (
                <p className="text-gray-400 text-center py-10">
                  Нет данных
                </p>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* =============== MODAL =============== */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-4 z-50">
          <div className="bg-gray-900 border border-gray-700 p-6 rounded-lg w-full max-w-md shadow-xl">
            <h3 className="text-xl text-white font-bold mb-4">
              Добавить себя в список
            </h3>

            <form onSubmit={submitForm} className="space-y-4">

              <div>
                <label className="text-gray-300 text-sm">Ник</label>
                <input
                  required
                  type="text"
                  className="w-full mt-1 px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded"
                  value={form.nickname}
                  onChange={(e) =>
                    setForm({ ...form, nickname: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="text-gray-300 text-sm">Telegram / VK</label>
                <input
                  required
                  type="text"
                  className="w-full mt-1 px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded"
                  placeholder="@username или ссылка"
                  value={form.contact}
                  onChange={(e) =>
                    setForm({ ...form, contact: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="text-gray-300 text-sm">Платформа</label>
                <select
                  className="w-full mt-1 px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded"
                  value={form.platform}
                  onChange={(e) =>
                    setForm({ ...form, platform: e.target.value })
                  }
                >
                  <option value="psn">PSN</option>
                  <option value="xbox">Xbox</option>
                  <option value="stadia">Stadia</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
                >
                  Отмена
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? "Добавление..." : "Добавить"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </AuthenticatedLayout>
  );
}
