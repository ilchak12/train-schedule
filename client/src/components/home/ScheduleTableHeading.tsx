import { useEffect, useState } from "react";
import { OrderBy, SortBy } from "../../types/schedule.types.ts";
import { useDispatch } from "react-redux";
import { sortBy } from "../../store/features/train/scheduleSlice.ts";
import { useSearchParams } from "react-router-dom";

interface ScheduleTableHeading {
    withSorting?: boolean
}

export const ScheduleTableHeading = (
    { withSorting }: ScheduleTableHeading
) => {
    const dispatch = useDispatch();

    const [queryParams, setQueryParams] = useSearchParams();
    const [sortConfig, setSortConfig] = useState<{ key: SortBy, isAsc: boolean }>(
        {
            key: queryParams.get('sortBy') as SortBy || 'trainNumber',
            isAsc: queryParams.get('orderBy') !== 'desc' ?? true
        }
    );

    useEffect(() => {
        const orderBy: OrderBy = sortConfig.isAsc ? 'asc' : 'desc';
        const params = {
            sortBy: sortConfig.key,
            orderBy
        }

        setQueryParams(params)
        dispatch(sortBy({ sortBy: sortConfig.key, orderBy }));
    }, [sortConfig]);

    const sort = (key: SortBy): void => {
        if (key === sortConfig.key) {
            setSortConfig((prevState) => ({
                ...prevState,
                isAsc: !prevState.isAsc
            }))
        } else {
            setSortConfig({ key, isAsc: true })
        }
    }

    return (
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        {withSorting
            ? (
                <tr>
                    <th scope="col" className="px-4 py-3">
                        <div
                            className="flex items-center cursor-pointer"
                            onClick={() => sort('trainNumber')}
                        >
                            Train №
                            <span><svg className="w-3 h-3 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                    </svg></span>
                        </div>
                    </th>
                    <th scope="col" className="px-4 py-3">
                        <div
                            className="flex items-center cursor-pointer"
                            onClick={() => sort('trainRoute')}
                        >
                            Route
                            <span><svg className="w-3 h-3 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                    </svg></span>
                        </div>
                    </th>
                    <th scope="col" className="px-4 py-3">
                        Frequency
                    </th>
                    <th scope="col" className="px-4 py-3">
                        <div
                            className="flex items-center cursor-pointer"
                            onClick={() => sort('startStation')}
                        >
                            Start st.
                            <span><svg className="w-3 h-3 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                    </svg></span>
                        </div>
                    </th>
                    <th scope="col" className="px-4 py-3">
                        Arrive at
                    </th>
                    <th scope="col" className="px-4 py-3">
                        <div
                            className="flex items-center cursor-pointer"
                            onClick={() => sort('startDepart')}
                        >
                            Depart at
                            <span><svg className="w-3 h-3 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                    </svg></span>
                        </div>
                    </th>
                    <th scope="col" className="px-4 py-3">
                        <div
                            className="flex items-center cursor-pointer"
                            onClick={() => sort('endStation')}
                        >
                            End st.
                            <span><svg className="w-3 h-3 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                    </svg></span>
                        </div>
                    </th>
                    <th scope="col" className="px-4 py-3">
                        <div
                            className="flex items-center cursor-pointer"
                            onClick={() => sort('endArrive')}
                        >
                            Arrive at
                            <span><svg className="w-3 h-3 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                    </svg></span>
                        </div>
                    </th>
                    <th scope="col" className="px-4 py-3">
                        Depart at
                    </th>
                    <th scope="col" className="px-4 py-3">
                        <span className="sr-only">Edit</span>
                    </th>
                </tr>
            )
            : (
                <tr>
                    <th scope="col" className="px-4 py-3">
                        Train №
                    </th>
                    <th scope="col" className="px-4 py-3">
                        Route
                    </th>
                    <th scope="col" className="px-4 py-3">
                        Frequency
                    </th>
                    <th scope="col" className="px-4 py-3">
                        Start st.
                    </th>
                    <th scope="col" className="px-4 py-3">
                        Arrive at
                    </th>
                    <th scope="col" className="px-4 py-3">
                        Depart at
                    </th>
                    <th scope="col" className="px-4 py-3">
                        End st.
                    </th>
                    <th scope="col" className="px-4 py-3">
                        Arrive at
                    </th>
                    <th scope="col" className="px-4 py-3">
                        Depart at
                    </th>
                    <th scope="col" className="px-4 py-3">
                        <span className="sr-only">Edit</span>
                    </th>
                </tr>
            )}
        </thead>
    )
}