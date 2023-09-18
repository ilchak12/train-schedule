import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface Protected {
    element: JSX.Element
}

export const Protected = (
    { element }: Protected
) => {
    const { user } = useSelector((state: any) => state.auth);

    if (!user) {
        return <Navigate to="/signin" />;
    }

    return element;
}