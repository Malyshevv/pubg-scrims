import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head} from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import Select from 'react-select'
import {useEffect, useState} from "react";
import {getMapName} from "@/Utils/GlobalConst.jsx";

export default function TournamentEdit({ auth, result, dir }) {
    const [Maps, setMaps] = useState([]);

    const [title, setTitle] = useState('');
    const [status, setStatus] = useState();
    const [strDT, setStrDT] = useState('');
    const [endDT, setEndDT] = useState('');
    const [orgNickname, setOrgNickname] = useState('');
    const [discord, setDiscord] = useState('');
    const [telegram, setTelegram] = useState('');
    const [description, setDescription] = useState('');
    const [tier, setTier] = useState();
    const [mapsArray, setMapsArray] = useState();

    const [error, setError] = useState('');

    useEffect(() => {
        if (result) {
            setTitle(result.title);
            setStatus(result.status_id);
            setStrDT(result.start_date);
            setEndDT(result.end_date);
            setOrgNickname(result.org_nickname);
            setDiscord(result.discord_link);
            setTelegram(result.telegram_link);
            setDescription(result.description);
            setTier(result.division_id);
            setMapsArray(result.maps ? result.maps.split('/') : []);
        }
    }, [])

    useEffect(() => {
        let newArray = [];
        if (mapsArray && mapsArray?.length) {
            let mapColor;
            mapsArray.map((el) => {
                switch (el) {
                    case 'E':
                        mapColor = '#0f8739ee'
                        break;
                    case 'M':
                        mapColor = '#b7d79aee'
                        break;
                    case 'V':
                        mapColor = '#0d63e5ee'
                        break;
                    case 'T':
                        mapColor = '#43c13aee'
                        break;
                }
                newArray.push({
                    'title': el,
                    'color': mapColor
                })
            });
            setMaps(newArray);
        }
    }, [mapsArray])

    const save = () => {
        let params = {
            id: result.id,
            title: title,
            status_id: status,
            division_id: tier,
            description: description,
            start_date: strDT,
            end_date: endDT,
            org_nickname: orgNickname,
            discord_link: discord,
            telegram_link: telegram,
            maps: Maps,
            type: result.id ? 'update' : 'create'
        }

        axios.post('/tournament/update',params).then(r => {
            console.log(r)
            if (r && r?.data) {
                if (r.data.result === true) {
                    window.location = '/tournament/list';
                } else {
                    setError('error pls contact the site administration')
                }
            } else {
                setError('error pls contact the site administration')
            }
        }).catch((e) => {
            let errorsValidate = JSON.stringify(e?.response?.data);
            setError(errorsValidate)
        })
    }

    const addMaps = (color, title) => {
        let newValue = {
            'color': color,
            'title': title,
        };
        setMaps([...Maps, newValue])
    };

    const delMap = (key, title) => {
        let mapList = Maps.filter((Maps, index) => index !== key);
        setMaps(mapList)
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">{result && result.id ? 'Редактирование турнира' : 'Создание турнира'}</h2>}
        >
            <Head title={result && result.id ? 'Редактирование турнира' : 'Создание турнира'} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex">
                    <div
                        className="w-full mr-5 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <a href="#">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {result && result.id ? 'Редактирование турнира' : 'Создание турнира'}</h5>
                        </a>

                        <div className="mx-auto mt-5">
                            <div>
                                <label htmlFor="title"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Наименование турнира
                                </label>
                                <input defaultValue={title} onChange={(e) => setTitle(e?.target?.value)} type="text" id="title" aria-describedby="helper-text-explanation"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       placeholder="title" />
                            </div>
                            <div className={'mt-5'}>
                                <label htmlFor="status"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Статус
                                </label>
                                <select className={'w-full rounded'} onChange={(e) => setStatus(e?.target?.value)} defaultValue={result?.status_id || status}>
                                    {dir?.statusEvent && dir?.statusEvent?.length && (
                                        dir.statusEvent.map((el) => (
                                            <option value={el.value}>{el.label}</option>
                                        ))
                                    )}
                                </select>
                            </div>
                            <div className={'mt-5'}>
                                <label htmlFor="startdt"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Дата начала
                                </label>
                                <input defaultValue={strDT} onChange={(e) => setStrDT(e?.target?.value)} type="datetime-local" id="startdt" aria-describedby="helper-text-explanation"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>
                            <div className={'mt-5'}>
                                <label htmlFor="enddt"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Дата окончания
                                </label>
                                <input defaultValue={endDT} onChange={(e) => setEndDT(e?.target?.value)} type="datetime-local" id="enddt" aria-describedby="helper-text-explanation"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>
                            <div className={'mt-5'}>
                                <label htmlFor="org_nickname"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Организатор
                                </label>
                                <input defaultValue={orgNickname} onChange={(e) => setOrgNickname(e?.target?.value)} type="text" id="org_nickname" aria-describedby="helper-text-explanation"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       placeholder="Org. nickname" />
                            </div>
                            <div className={'mt-5'}>
                                <label htmlFor="discord"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Discord
                                </label>
                                <input defaultValue={discord} onChange={(e) => setDiscord(e?.target?.value)} type="text" id="discord" aria-describedby="helper-text-explanation"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       placeholder="discord link" />
                            </div>
                            <div className={'mt-5'}>
                                <label htmlFor="telegram"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Telegram
                                </label>
                                <input defaultValue={telegram} onChange={(e) => setTelegram(e?.target?.value)} type="text" id="telegram" aria-describedby="helper-text-explanation"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       placeholder="telegram link" />
                            </div>
                            <div className={'mt-5'}>
                                <label htmlFor="Description"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Описание
                                </label>
                                <input defaultValue={description} onChange={(e) => setDescription(e?.target?.value)} type="text" id="Description" aria-describedby="helper-text-explanation"
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       placeholder="description" />
                            </div>
                            <div className={'mt-5'}>
                                <label htmlFor="tier"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Тир
                                </label>
                                <select className={'w-full rounded'} onChange={(e) => {setTier(e?.target?.value)}} defaultValue={result?.division_id || tier}>
                                    {dir?.division && dir?.division?.length && (
                                        dir.division.map((el) => (
                                            <option value={el.value}>{el.label}</option>
                                        ))
                                    )}
                                </select>
                            </div>
                            <div className={'mt-5'}>
                                <label htmlFor="maps"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Карты
                                </label>
                                <div className={'grid grid-cols-4 gap-4'}>
                                    <div onClick={() => addMaps('#0f8739ee', 'E')} className={'cursor-pointer text-white p-3 text-center bg-[#0f8739ee] hover:bg-[#0f8739c3]'}>Erangel</div>
                                    <div onClick={() => addMaps('#b7d79aee', 'M')} className={'cursor-pointer text-white p-3 text-center bg-[#b7d79aee] hover:bg-[#b7d79ac3]'}>Miramar</div>
                                    <div onClick={() => addMaps('#0d63e5ee', 'V')} className={'cursor-pointer text-white p-3 text-center bg-[#0d63e5ee] hover:bg-[#0d63e5c3]'}>Vikendi</div>
                                    <div onClick={() => addMaps('#43c13aee', 'T')} className={'cursor-pointer text-white p-3 text-center bg-[#43c13aee]  hover:bg-[#43c13ac3]'}>Taego</div>
                                </div>
                                <div className="w-full overflow-x-auto mt-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    {Maps.length === 0 && (
                                        'Select maps'
                                    )}
                                    {Maps && Maps.length > 0 && (
                                        Maps.map((el, index) => (
                                            <>
                                                <span
                                                    key={`map_${index}`}
                                                    className={`bg-[${el.color}] text-xs font-medium me-2 p-2 rounded text-white`}>
                                                    {
                                                        getMapName(el.title)
                                                    }
                                                    <span onClick={() => delMap(index, el.title)} key={`map_del_${index}`} className={'bg-[#ef4444] p-1 cursor-pointer hover:bg-[#891b1b] rounded-xl ml-2'}>X</span>
                                                </span>
                                            </>
                                        ))
                                    )}
                                </div>
                            </div>
                            <div className={'mt-5'}>
                                <PrimaryButton onClick={() => save()}>
                                    Save
                                </PrimaryButton>
                            </div>
                        </div>

                        {error && error.length && (
                            <>
                               <div className={'rounded bg-red-500 mt-5 p-2 text-white'}>
                                   {error}
                               </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
