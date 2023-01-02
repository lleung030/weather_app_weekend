import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider"

export default function Login() {
    const { login } = useContext(AuthContext)

    return (
        <div className="Login">
            <div className="row justify-content-center gap-5">
                <div className="text-center text-light pt-5">
                    <h1><strong>Welcome</strong>☀️</h1>
                    <br />
                    <h3>Please login</h3>
                </div>
            
                <button onClick={login} className="col-1 btn btn-warning fs-4 py-3"><strong>Login</strong></button>
            </div>
        </div>
    )
}