import { TERipple } from "tw-elements-react"
import * as Yup from "yup";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage } from "../store/features/message/messageSlice.ts";
import { login } from "../store/features/auth/authSlice.ts";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Auth } from "../types/auth.types.ts";
import { AuthWrapper } from "../components/auth/AuthWrapper.tsx";

export const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState<boolean>(false);

    const { isLoggedIn }: { isLoggedIn: boolean } = useSelector((state: any) => state.auth);
    const { message }: { message: string } = useSelector((state: any) => state.message);

    useEffect(() => {
        if (message) {
            toast.error(message);
            dispatch(clearMessage());
        }
    }, [message]);

    const initialValues: Auth = {
        email: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().required("This field is required!"),
        password: Yup.string().required("This field is required!"),
    });

    const handleLogin = (formValue: Auth) => {
        const { email, password } = formValue;
        setLoading(true);

        // @ts-ignore
        dispatch(login({ email, password }))
            .unwrap()
            .then(() => {
                toast.success('You successfully logged in');
                navigate("/");
            })
            .catch(() => {
                setLoading(false);
            });
    };

    if (isLoggedIn) {
        return <Navigate to="/" />;
    }

    return (
        <AuthWrapper>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleLogin}
            >
                <Form>
                    <p className="mb-4">Please login to your account</p>

                    <div className="mb-4">
                        <Field placeholder="Email" name="email" type="email" className="mb-1 form-control dark:bg-neutral-800 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-white leading-tight focus:outline-none focus:border-purple-500" id="email" />
                        <ErrorMessage
                            name="email"
                            component="div"
                            className="alert alert-danger"
                        />
                    </div>

                    <div className="mb-4">
                        <Field placeholder="Password" name="password" type="password" className="mb-1 form-control dark:bg-neutral-800 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-white leading-tight focus:outline-none focus:border-purple-500" id="password" />
                        <ErrorMessage
                            name="password"
                            component="div"
                            className="alert alert-danger"
                        />
                    </div>

                    <div className="mb-12 pb-1 pt-1 text-center">
                        <TERipple rippleColor="light" className="w-full">
                            <button
                                className="inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                                type="submit"
                                disabled={loading}
                                style={{
                                    background:
                                        "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                                }}
                            >
                                Log in
                            </button>
                        </TERipple>
                    </div>

                    <div className="flex items-center justify-between pb-6">
                        <p className="mb-0 mr-2">Don't have an account?</p>
                        <TERipple rippleColor="light">
                            <Link to={'/signup'} className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10">
                                Register
                            </Link>
                        </TERipple>
                    </div>
                </Form>
            </Formik>
        </AuthWrapper>
    )
}