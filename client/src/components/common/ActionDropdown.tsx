import { MouseEventHandler } from "react";

interface ActionDropdown {
    options: ActionDropdownOptions[]
}

export interface ActionDropdownOptions {
    name: string,
    onClickFunc: MouseEventHandler
}

export const ActionDropdown = (
    { options }: ActionDropdown
) => {
    return (
        <div className="absolute right-0 bottom-[100%] z-10 bg-white divide-y divide-gray-100 rounded-lg shadow group-first:bottom-[auto] group-first:top-[100%]">
            <ul className="py-2 text-sm text-gray-700">
                {options.map((option, index) => (
                    <li
                        key={index}
                        className="cursor-pointer"
                        onClick={option.onClickFunc}>
                        <p className="block px-4 py-2 hover:bg-gray-100">{option.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}