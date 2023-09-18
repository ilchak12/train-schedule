import { ScheduleTableRow } from "./ScheduleTableRow.tsx";
import { ScheduleTableHeading } from "./ScheduleTableHeading.tsx";
import { Schedule } from "../../types/schedule.types.ts";

interface ScheduleTable {
    data: Schedule[],
    withSorting: boolean
}

export const ScheduleTable = (
    { data, withSorting }: ScheduleTable
) => {
    return (
        <div className="relative min-h-[300px] overflow-x-auto border-none shadow-md sm:rounded-lg">
            <table className="w-full min-w-[1024px] text-sm text-left text-gray-500">
                <ScheduleTableHeading withSorting={withSorting} />

                <tbody>
                {data?.map(route => <ScheduleTableRow key={route.id} routeData={route} />)}
                </tbody>
            </table>
        </div>
    )
}