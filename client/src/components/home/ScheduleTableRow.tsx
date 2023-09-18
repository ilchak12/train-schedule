import { Schedule } from "../../types/schedule.types.ts";
import { formattedDate } from "../../utils/date.util.ts";
import { ActionDropdownWrapper } from "../common/ActionDropdownWrapper.tsx";
import { ActionDropdown, ActionDropdownOptions } from "../common/ActionDropdown.tsx";
import { useState } from "react";
import { TrainScheduleModal } from "../modals/TrainScheduleModal.tsx";
import { ConfirmationModal } from "../modals/ConfirmationModal.tsx";
import { useDispatch } from "react-redux";
import { changeTrainStatus, deleteTrainSchedule } from "../../store/features/train/scheduleSlice.ts";
import { toast } from "react-toastify";

interface ScheduleTableRow {
    routeData: Schedule
}

export const ScheduleTableRow = (
    { routeData }: ScheduleTableRow
) => {
    const {
        id,
        trainNumber,
        trainRoute,
        frequency,
        startStation,
        startArrivalTime,
        startDepartureTime,
        endStation,
        endArrivalTime,
        endDepartureTime,
        isActive
    } = routeData;

    const dispatch = useDispatch();

    const [editIsOpened, setEditIsOpened] = useState<boolean>(false);
    const [confirmationModalIsOpened, setConfirmationModalIsOpened] = useState<boolean>(false);

    const onEditModalOpen = (): void => setEditIsOpened(true);
    const onEditModalClose = (): void => setEditIsOpened(false);

    const onConfirmModalOpen = (): void => setConfirmationModalIsOpened(true);
    const onConfirmModalClose = (): void => setConfirmationModalIsOpened(false);

    const deleteSchedule = (): void => {
        // @ts-ignore
        dispatch(deleteTrainSchedule(id))
            .unwrap()
            .then(() => {
                toast.success('Deleted!');
                onConfirmModalClose();
            }).
            catch(() => {
                toast.error('No such id')
            })
    }

    const changeStatus = (): void => {
        // @ts-ignore
        dispatch(changeTrainStatus({ id, status: !isActive }))
            .unwrap()
            .then(() => {
                toast.success('Updated!');
            }).
        catch(() => {
            toast.error('No such id')
        })
    }

    const options: ActionDropdownOptions[] = [
        { name: 'Edit', onClickFunc: onEditModalOpen },
        { name: isActive ? 'Disable' : 'Enable', onClickFunc: changeStatus },
        { name: 'Delete', onClickFunc: onConfirmModalOpen }
    ]

    return (
        <>
            <tr className="bg-white border-b group">
                <th scope="row" className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {trainNumber}
                </th>
                <td className="px-4 py-4">
                    {trainRoute}
                </td>
                <td className="px-4 py-4">
                    {frequency.join(', ')}
                </td>
                <td className="px-4 py-4">
                    {startStation}
                </td>
                <td className="px-4 py-4">
                    {formattedDate(startArrivalTime!, 'MMM Do YY, h:mm a')}
                </td>
                <td className="px-4 py-4">
                    {formattedDate(startDepartureTime, 'MMM Do YY, h:mm a')}
                </td>
                <td className="px-4 py-4">
                    {endStation}
                </td>
                <td className="px-4 py-4">
                    {formattedDate(endArrivalTime, 'MMM Do YY, h:mm a')}
                </td>
                <td className="px-4 py-4">
                    {formattedDate(endDepartureTime!, 'MMM Do YY, h:mm a')}
                </td>
                <td className="px-2 py-4 text-right">
                    <ActionDropdownWrapper>
                        <ActionDropdown options={options} />
                    </ActionDropdownWrapper>
                </td>
            </tr>

            {editIsOpened && <TrainScheduleModal
                data={routeData}
                title={`Update schedule for Train №: ${trainNumber}`}
                onClose={onEditModalClose} />}

            {confirmationModalIsOpened && <ConfirmationModal
                title={`Are you sure that you want to delete ${trainNumber} train?`}
                onSubmit={deleteSchedule}
                onClose={onConfirmModalClose} />}
        </>
    )
}