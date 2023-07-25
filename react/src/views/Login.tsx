import {useRef} from "react";
import {useStateContext} from "../context/ContextProvider.tsx";
import axiosClient from "../axios-client.ts";

export default function Login() {
    const emailRef: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
    const passwordRef: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

    const {setToken} = useStateContext()

    const onSubmit = (ev:any) => {
        ev.preventDefault();
        const payload = {
            email: emailRef.current ? emailRef.current.value : '',
            password: passwordRef.current ? passwordRef.current.value : '',
            };
        axiosClient.post('/login', payload)
            .then((res)=> {
                // console.log(res);
                setToken(res.data.access_token)
            })
            .catch(err => {
                // const response = err.response;
                console.log(err);
                // if(response && response.status===422){
                //     console.log(response.data.errors);
                // }
            })
    }
    return(
    <div>
        <h3>Вход</h3>
        <form className="form form-control" onSubmit={onSubmit}>
            <div className="form-group m-3">
                <label htmlFor="email">Email:</label>
                <input required ref={emailRef} type="email" className="form-control" name="email" id="email"></input>
            </div>
            <div className="form-group m-3">
                <label htmlFor="password">Пароль:</label>
                <input required ref={passwordRef} type="password" className="form-control" name="password" id="password"></input>
            </div>
            <button className="btn btn-success m-3" type="submit">Войти</button>
        </form>
    </div>
    )
}
