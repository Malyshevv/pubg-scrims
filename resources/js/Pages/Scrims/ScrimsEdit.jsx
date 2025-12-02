import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head} from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import Select from "react-select";
import {getMapName} from "@/Utils/GlobalConst.jsx";
import {useState} from "react";

export default function ScrimsEdit({ auth, result, dir }) {
    const [Maps, setMaps] = useState([]);

    const [title, setTitle] = useState('');
    const [status, setStatus] = useState(null);
    const [strDT, setStrDT] = useState('');
    const [endDT, setEndDT] = useState('');
    const [orgNickname, setOrgNickname] = useState('');
    const [discord, setDiscord] = useState('');
    const [telegram, setTelegram] = useState('');
    const [description, setDescription] = useState('');
    const [tier, setTier] = useState(null);

    const save = () => {
        let params = {
            title: title,
            status_id: status?.value,
            division_id: tier?.value,
            description: description,
            start_date: strDT,
            end_date: endDT,
            org_nickname: orgNickname,
            discord_link: discord,
            telegram_link: telegram,
            maps: Maps,
            type: 'create'
        }

        axios.post('/scrims/create',params).then(r => {
            if (r && r.data) {
                if (r.data?.result === true) {
                    window.location = '/scrims/list';
                } else {
                    alert(r.data);
                }
            }
        })
    }

    const addMaps = (color, title) => {
        let newValue = {
            'color': color,
            'title': title,
        };
        setMaps([...Maps, newValue])
    };

    const delMap = (key) => {
        let mapList = Maps.filter((Maps, index) => index !== key);
        setMaps(mapList)
    }

    return (
      <AuthenticatedLayout
        user={auth.user}
        header={
            <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                {result && result.id ? 'Редактирование кастомки' : 'Создание кастомки'}
            </h2>
        }
      >
          <Head title={result && result.id ? 'Редактирование кастомки' : 'Создание кастомки'} />

          <div className="py-12">
              <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex">

                  <div
                    className="w-full mr-5 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                          {result && result.id ? 'Редактирование кастомки' : 'Создание кастомки'}
                      </h5>

                      <div className="mx-auto mt-5">

                          <div>
                              <label htmlFor="title"
                                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                  Название скрима
                              </label>
                              <input defaultValue={title} onChange={(e) => setTitle(e?.target?.value)} type="text" id="title"
                                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  
                                       dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                     placeholder="Введите название" />
                          </div>

                          <div className={'mt-5'}>
                              <label htmlFor="status"
                                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                  Статус
                              </label>
                              <Select defaultValue={status} onChange={setStatus} id="status" options={dir?.statusEvent} />
                          </div>

                          <div className={'mt-5'}>
                              <label htmlFor="startdt"
                                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                  Дата начала
                              </label>
                              <input defaultValue={strDT} onChange={(e) => setStrDT(e?.target?.value)} type="datetime-local" id="startdt"
                                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5  
                                       dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                              />
                          </div>

                          <div className={'mt-5'}>
                              <label htmlFor="enddt"
                                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                  Дата окончания
                              </label>
                              <input defaultValue={endDT} onChange={(e) => setEndDT(e?.target?.value)} type="datetime-local" id="enddt"
                                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5  
                                       dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                              />
                          </div>

                          <div className={'mt-5'}>
                              <label htmlFor="org_nickname"
                                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                  Ник организатора
                              </label>
                              <input defaultValue={orgNickname} onChange={(e) => setOrgNickname(e?.target?.value)} type="text" id="org_nickname"
                                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5  
                                       dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                     placeholder="Введите ник" />
                          </div>

                          <div className={'mt-5'}>
                              <label htmlFor="discord"
                                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                  Discord
                              </label>
                              <input defaultValue={discord} onChange={(e) => setDiscord(e?.target?.value)} type="text" id="discord"
                                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5  
                                       dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                     placeholder="Discord ссылка" />
                          </div>

                          <div className={'mt-5'}>
                              <label htmlFor="telegram"
                                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                  Telegram
                              </label>
                              <input defaultValue={telegram} onChange={(e) => setTelegram(e?.target?.value)} type="text" id="telegram"
                                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5  
                                       dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                     placeholder="Telegram ссылка" />
                          </div>

                          <div className={'mt-5'}>
                              <label htmlFor="Description"
                                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                  Описание
                              </label>
                              <input defaultValue={description} onChange={(e) => setDescription(e?.target?.value)} type="text" id="Description"
                                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5  
                                       dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                     placeholder="Введите описание" />
                          </div>

                          <div className={'mt-5'}>
                              <label htmlFor="tier"
                                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                  Дивизион
                              </label>
                              <Select defaultValue={tier} onChange={setTier} id="tier" options={dir?.division} />
                          </div>

                          <div className={'mt-5'}>
                              <label htmlFor="maps"
                                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                  Карты
                              </label>

                              <div className={'grid grid-cols-4 gap-4'}>
                                  <div onClick={() => addMaps('#0f8739ee', 'E')} className={'cursor-pointer text-white p-3 text-center bg-[#0f8739ee] hover:bg-[#0f8739c3]'}>Эрангель</div>
                                  <div onClick={() => addMaps('#b7d79aee', 'M')} className={'cursor-pointer text-white p-3 text-center bg-[#b7d79aee] hover:bg-[#b7d79ac3]'}>Мирамар</div>
                                  <div onClick={() => addMaps('#0d63e5ee', 'V')} className={'cursor-pointer text-white p-3 text-center bg-[#0d63e5ee] hover:bg-[#0d63e5c3]'}>Викенди</div>
                                  <div onClick={() => addMaps('#43c13aee', 'T')} className={'cursor-pointer text-white p-3 text-center bg-[#43c13aee] hover:bg-[#43c13ac3]'}>Тайго</div>
                              </div>

                              <div className="w-full overflow-x-auto mt-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5  
                                    dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                  {Maps.length == 0 && (
                                    'Выберите карты'
                                  )}
                                  {Maps && Maps.length > 0 && (
                                    Maps.map((el, index) => (
                                      <span
                                        key={`map_${index}`}
                                        className={`bg-[${el.color}] text-xs font-medium me-2 p-2 rounded text-white`}>
                                                {getMapName(el.title)}
                                          <span
                                            onClick={() => delMap(index)}
                                            className={'bg-[#ef4444] p-1 cursor-pointer hover:bg-[#891b1b] rounded-xl ml-2'}
                                          >
                                                    X
                                                </span>
                                            </span>
                                    ))
                                  )}
                              </div>
                          </div>

                          <div className={'mt-5'}>
                              <PrimaryButton onClick={() => save()}>
                                  Сохранить
                              </PrimaryButton>
                          </div>
                      </div>

                  </div>
              </div>
          </div>
      </AuthenticatedLayout>
    );
}
