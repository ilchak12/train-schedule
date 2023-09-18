import {useNavigate } from "react-router-dom";
import { Logo } from "./Logo.tsx";
import { useDispatch } from "react-redux";
import { logout } from "../../store/features/auth/authSlice.ts";

export const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logOut = (): void => {
        dispatch(logout())
        navigate('/signin');
    }

    return (
        <header className="flex items-center justify-between py-10">
            <div className='flex items-center justify-between'>
                <div className='max-w-[50px] mr-3'>
                    <Logo />
                </div>

                <div className="hidden h-6 text-2xl font-semibold sm:block">
                    Train
                </div>
            </div>

            <div className="flex items-center leading-5 space-x-4 sm:space-x-6">
                <div
                    onClick={logOut}
                    className="flex w-full rounded-md shadow-sm bg-primary-500 w-full rounded-md py-2 cursor-pointer transition-all px-4 font-medium text-white hover:bg-primary-700 dark:hover:bg-primary-400 focus:ring-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:ring-offset-black">Logout</div>
            </div>
        </header>
    )
}