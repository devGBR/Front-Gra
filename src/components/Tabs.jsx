import React, { useState } from 'react'
import Todo from './Todo';
import Button from './subcomponents/Button';
import axios from 'axios';




const Tabs = ({ aba, botao, abas, filter, tarefas, search, completeTodo, RemoveTodo, sort }) => {
    const [activeTab, setActiveTab] = useState("GERAL");

    function Delete(){
        
        if(activeTab !== "GERAL"){
            return <Button funcao={excluirAba} nome={"Excluir Selecionada"} />
        }
        return null
    }

    const excluirAba = async () => {
        const abaExcluir = abas.find((aba) => aba.titulo === activeTab);

        if (abaExcluir) {
            // Aqui, você obtém o ID da aba e, em seguida, chama a rota de exclusão
            await axios.get("https://grazi-list.up.railway.app/api/excluir-aba/" + abaExcluir.id);
            window.location.reload();
        }
    }
    return (
        <div className="Tabs">
            <Button funcao={aba} nome={botao} /> <Delete/>
            <ul className="nav">
                {
                    abas.map((aba) => (
                        <li className={activeTab === aba.titulo ? "active" : ""} key={aba.id} onClick={() => setActiveTab(aba.titulo)}>{aba.titulo}</li>
                    ))
                }


            </ul>
            <div className="outlet">

                {tarefas.filter((tarefa) => tarefa.aba.toUpperCase() === activeTab)
                    .filter((tarefa) => filter === "All" ? true : filter === "Completed" ? tarefa.iscompleted : !tarefa.iscompleted)
                    .filter((tarefa) => tarefa.titulo.toLowerCase().includes(search.toLowerCase()))
                    .sort((a, b) => sort === "A-Z" ? a.titulo.localeCompare(b.titulo) : b.titulo.localeCompare(a.titulo))
                    .map((tarefas) => (
                        <Todo key={tarefas.id} tarefas={tarefas} RemoveTodo={RemoveTodo} completeTodo={completeTodo} />
                    ))}

            </div>

            <div className='info'>
                <p>
                    Clique em uma tarefa da lista para ver a descrição!!!
                </p>
            </div>
        </div>
    )
}

export default Tabs