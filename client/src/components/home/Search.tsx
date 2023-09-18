import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { search } from "../../store/features/train/scheduleSlice.ts";

export const Search = () => {
    const dispatch = useDispatch();

    const [fromCity, setFromCity] = useState<string>('');
    const [toCity, setToCity] = useState<string>('');

    useEffect(() => {
        dispatch(search({ fromCity, toCity }))
    }, [fromCity, toCity]);

    return (
        <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div className="grid grid-cols-[max-content_1fr] gap-4">
                <label htmlFor="from-city" className="self-center block text-sm font-medium text-black">From station</label>
                <input
                    type="text"
                    id="from-city"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="From"
                    value={fromCity}
                    onChange={(e) => setFromCity(e.target.value)}
                />
            </div>
            <div className="grid grid-cols-[max-content_1fr] gap-4">
                <label htmlFor="to-city" className="self-center block text-sm font-medium text-black">To station</label>
                <input
                    type="text"
                    id="to-city"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="To"
                    value={toCity}
                    onChange={(e) => setToCity(e.target.value)}
                />
            </div>
        </div>
    )
}