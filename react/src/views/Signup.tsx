import {useRef} from "react";
import axiosClient from "../axios-client.ts"
import {useStateContext} from "../context/ContextProvider.tsx";

export default function Signup() {
    const nameRef: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
    const emailRef: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
    const passwordRef: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
    const passwordConfirmationRef: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

    const {setToken} = useStateContext()

    const onSubmit = (ev:any) => {
        ev.preventDefault();
        const payload = {
            name: nameRef.current ? nameRef.current.value : '',
            email: emailRef.current ? emailRef.current.value : '',
            password: passwordRef.current ? passwordRef.current.value : '',
            password_confirmation: passwordConfirmationRef.current ? passwordConfirmationRef.current.value : '',
        };
        axiosClient.post('/users', payload)
            .then((res)=> {
                // console.log(res);
                setToken(res.data.access_token)
            })
            .catch(err => {
                const response = err.response;
                // console.log(err);
                if(response && response.status===422){
                    console.log(response.data.errors);
                }
            })




    }

    return(
        <div>
            <h3>Регистрация</h3>
            <form className="form form-control" onSubmit={onSubmit}>
                <div className="form-group m-3">
                    <label htmlFor="name">Никнейм:</label>
                    <input required ref={nameRef} type="text" className="form-control" name="name" id="name"></input>
                </div>
                <div className="form-group m-3">
                    <label htmlFor="email">Email:</label>
                    <input required ref={emailRef} type="email" className="form-control" name="email" id="email"></input>
                </div>
                <div className="form-group m-3">
                    <label htmlFor="password">Пароль:</label>
                    <input required ref={passwordRef} type="password" className="form-control" name="password" id="password"></input>
                </div>
                <div className="form-group m-3">
                    <label htmlFor="password_confirmation">Повторите пароль:</label>
                    <input required ref={passwordConfirmationRef} type="password" className="form-control" name="password_confirmation"
                           id="password_confirmation"></input>
                </div>
                <button className="btn btn-success m-3" type={"submit"} id="registration-btn">Зарегистрироваться</button>
            </form>
        </div>
    )
}
