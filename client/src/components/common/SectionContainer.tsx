import { ComponentOptions } from "../../types/global.types.ts";

interface SectionContainer extends ComponentOptions {}

export const SectionContainer = (
    { children }: SectionContainer
) => {
    return (
        <section className="mx-auto max-w-5 xl px-4 sm:px-6 xl:max-w-6xl xl:px-0">
            {children}
        </section>
    )
}