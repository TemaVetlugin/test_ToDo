import {Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider.tsx";
import axiosClient from "../axios-client.ts";

export default function MainLayout() {
    const {setToken, token} = useStateContext()
    if(!token) {
        return <Navigate to="/login"/>
    }

    const handleClick = (ev:any) => {
        ev.preventDefault();
        axiosClient.post('/logout')
            .then(()=> {
                // console.log(res);
                setToken(null)
            })
            .catch(err => {
                console.log(err);
            })




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
                        <button onClick={handleClick} type="submit" className="btn btn-primary">Выйти</button>
                    </div>
                </header>
            </div>
            <Outlet />
        </div>
    )
}
