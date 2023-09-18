import { ScheduleTable } from "./ScheduleTable.tsx";
import { Search } from "./Search.tsx";
import { TrainScheduleModal } from "../modals/TrainScheduleModal.tsx";
import { useEffect, useState } from "react";
import { Schedule } from "../../types/schedule.types.ts";
import { useDispatch, useSelector } from "react-redux";
import { getAll } from "../../store/features/train/scheduleSlice.ts";

export const Main = () => {
    const dispatch = useDispatch();

    const { sortedSchedule, schedule }: { sortedSchedule: Schedule[], schedule: Schedule[] } = useSelector((state: any) => state.schedule);

    const [availableItems, setAvailableItems] = useState<Schedule[]>(sortedSchedule || []);
    const [disabledItems, setDisableItems] = useState<Schedule[]>(schedule.filter(item => !item.isActive) || []);

    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

    useEffect(() => {
        setAvailableItems(sortedSchedule.filter(item => item.isActive));
    }, [sortedSchedule]);

    useEffect(() => {
        setDisableItems(schedule.filter(item => !item.isActive));
    }, [schedule]);

    useEffect(() => {
        // @ts-ignore
        dispatch(getAll());
    }, []);

    const openModal = (): void => setModalIsOpen(true);
    const closeModal = (): void => setModalIsOpen(false);

    return (
        <>
            <div className="pb-6">
                <div className="space-y-2 pb-8 pt-6 md:space-y-5">
                    <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
                        Train schedule
                    </h1>
                </div>
                <Search />

                <div className="mb-4">
                    <button
                        onClick={openModal}
                        type="button"
                        className="px-3 py-2 text-sm font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg viewBox="0 0 24 24" width={18} height={18} fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 12H20M12 4V20" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                        Create new route
                    </button>
                </div>

                {!!availableItems.length
                    ? <ScheduleTable withSorting={true} data={availableItems} />
                    : <h2 className="mt-6 mb-4 text-xl font-extrabold leading-9 tracking-tight text-gray-900 sm:text-2xl sm:leading-10 md:text-4xl md:leading-14">{!schedule.length ? "No schedule yet!" : 'No such trains!'}</h2>
                }

                {!!disabledItems.length && (
                    <>
                        <h2 className="mt-6 mb-4 text-xl font-extrabold leading-9 tracking-tight text-gray-900 sm:text-2xl sm:leading-10 md:text-4xl md:leading-14">Disabled routes</h2>
                        <ScheduleTable withSorting={false} data={disabledItems} />
                    </>
                )}

                {modalIsOpen && <TrainScheduleModal onClose={closeModal} />}
            </div>
        </>
    )
}