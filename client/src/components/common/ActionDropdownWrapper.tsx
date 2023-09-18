import { useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import { ComponentOptions } from "../../types/global.types.ts";

interface ActionDropdownWrapper extends ComponentOptions {}

export const ActionDropdownWrapper = (
    { children }: ActionDropdownWrapper
) => {
    const [menuIsOpened, setMenuIsOpened] = useState<boolean>(false);

    const toggleMenu = () => setMenuIsOpened(!menuIsOpened);
    const closeMenu = () => setMenuIsOpened(false);

    const ref = useDetectClickOutside({ onTriggered: closeMenu })

    return (
        <div className="relative" ref={ref}>
            <span
                className="cursor-pointer"
                onClick={toggleMenu}>
                <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6C12.5523 6 13 5.55228 13 5Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
            </span>

            {menuIsOpened && children}
        </div>
    )
}