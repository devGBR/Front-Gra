import { useState } from "react"
import React from 'react'

import Textarea from "./subcomponents/Textarea"
import axios from "axios"

const TodoForm = ({ abas }) => {
    const [value, setValue] = useState("")
    const [category, setCategory] = useState("")
    const [todos, setTodos] = useState({
        aba: "",
        titulo: "",
        categoria: "",
        iscompleted: false,
        button: "Completar",
        descricao: "",
    })


    const handleChange = (e) => {
        const key = e.target.id;
        const tarefa = e.target.value
        setTodos(todos => ({
            ...todos,
            [key]: tarefa,
        }))
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!todos.titulo || !todos.categoria) return alert("Prenencha todos os campos!!")
        console.log(todos);
        await axios.post('https://grazi-list.up.railway.app/api/create-tarefa', todos);
        window.location.reload();
        // Limpa campos
        setTodos(() => ({ titulo: "", categoria: "", aba: "", descricao: "" }));

    }
    return (
        <div className="todo-form">
            <h2>Criar Tarefa</h2>
            <form onSubmit={handleSubmit}>

                <div className="Inputitle">
                    <input type="text" value={todos.titulo} id="titulo" onChange={handleChange} />
                    <label className="Label" htmlFor="titulo">
                        Título
                    </label>
                </div>
                <div className="">
                    <select value={todos.aba} className="lista" id="aba" onChange={handleChange}>
                        <option value="" >Selecione uma Aba</option>
                        {abas.map((abas) => (
                            <option value={abas.titulo} key={abas.id} >{abas.titulo}</option>
                        ))

                        }
                    </select>

                </div>
                <div className="List">
                    <select value={todos.categoria} className="lista" id="categoria" onChange={handleChange}>

                        <option value="">Selecione uma categoria</option>
                        <option value="Trabalho">Trabalho</option>
                        <option value="Pessoal">Pessoal</option>
                        <option value="Estudos">Estudos</option>

                    </select>

                </div>
                <div className="Inputitle">
                    <textarea value={todos.descricao} id="descricao" onChange={handleChange} className='Descricao'>
                    </textarea>
                    <label className="label2" >
                        Descrição
                    </label>
                </div>
                <button type="submit" style={{ width: '100px', height: '40px' }}>Criar Tarefa</button>
            </form>
        </div>
    )
}

export default TodoForm