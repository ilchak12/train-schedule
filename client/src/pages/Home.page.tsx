import { SectionContainer } from "../components/common/SectionContainer.tsx";
import { Header } from "../components/common/Header.tsx";
import { Main } from "../components/home/Main.tsx";

export const HomePage = () => {
    return (
        <SectionContainer>
            <div className="flex h-screen flex-col font-sans">
                <Header />
                <Main />
            </div>
        </SectionContainer>
    )
}