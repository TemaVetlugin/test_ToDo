import {Link, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider.tsx";

export default function GuestLayout() {
    const { token} = useStateContext()

    if(token) {
        return <Navigate to="/list"/>
    }
    return(
        <div className="px-5">
            <div>
                <header
                    className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                    <a href="/"
                       className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
                    </a>
                    <div className="col-md-3 text-end">
                        <Link to="/login" type="button" className="btn btn-outline-primary me-2">Войти</Link>
                        <Link to="/signup" type="button" className="btn btn-primary">Регистрация</Link>
                    </div>
                </header>
            </div>
            <Outlet />
        </div>
    )
}
