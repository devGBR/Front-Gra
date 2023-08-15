
import React, { useState } from 'react'
import '../css/Login.css'
import axios from 'axios'

const Login = () => {

    const [users, setUser] = useState({
        email: "",
        password: "",
    })
    const handleChange = (e) => {
        const key = e.target.id;
        const user = e.target.value
        setUser(users => ({
            ...users,
            [key]: user,
        }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!users.email || !users.password) return alert("Prenencha todos os campos!!")
        console.log(users);
        const response = await axios.post('https://grazi-list.up.railway.app/api/login', {
            email: users.email,
            password: users.password,
        });
        console.log(response.data)
        if (response.data.token) {
            const {token} = response.data.token
            localStorage.setItem('token', token);
            window.location.reload();
            
        }

        // Limpa campos
        setUser(() => ({ email: "", password: "" }));

    }
    return (

        <React.StrictMode>
            <div className='Body'>
                <div className='back'>

                </div>
                <div className="appLogin">
                    <div className='formLogin'>
                        <h1 style={{ textAlign: "start", color: "white" }}>Sign In</h1>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <div>
                                    <input type="email" className='Email' value={users.email} id='email' placeholder='@gmail.com' onChange={handleChange} />
                                    <input type="password" className='senha' value={users.password} id='password' placeholder='Senha' onChange={handleChange} />
                                </div>
                                <div>
                                    <button className='buttonLogin' style={{ position: "relative", paddingRight: "0px" }}><p style={{ margin: "0 auto" }}>CONTINUE</p><span style={{ fontSize: "30px" }} className="mdi mdi-chevron-right"></span></button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

            </div>

        </React.StrictMode>


    )
}

export default Login