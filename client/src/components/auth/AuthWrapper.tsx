import { AboutSection } from "./AboutSection.tsx";
import { AuthHeader } from "./AuthHeader.tsx";
import { ComponentOptions } from "../../types/global.types.ts";

interface AuthWrapper extends ComponentOptions {}

export const AuthWrapper = (
    { children }: AuthWrapper
) => {
    return (
        <section className="min-h-[100vh] flex items-center bg-neutral-200 dark:bg-neutral-700">
            <div className="max-w-[1280px] mx-auto h-full p-6">
                <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
                    <div className="w-full">
                        <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
                            <div className="g-0 lg:flex lg:flex-wrap">
                                <div className="px-4 py-4 md:px-0 md:py-0 lg:w-6/12">
                                    <div className="md:mx-6 md:p-12">
                                        <AuthHeader />

                                        {children}
                                    </div>
                                </div>

                                <AboutSection />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}