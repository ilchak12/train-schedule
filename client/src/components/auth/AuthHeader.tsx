import { Logo } from "../common/Logo.tsx";

export const AuthHeader = () => {
    return (
        <div className="text-center">
            <div className='max-w-[180px] mx-auto'>
                <Logo />
            </div>

            <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                Train Schedule
            </h4>
        </div>
    )
}