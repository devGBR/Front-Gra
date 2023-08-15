import { useState, useEffect } from 'react'
import '../css/App.css'
import React from 'react'
import Todo from '../components/Todo'
import TodoForm from '../components/TodoForm'
import Search from '../components/Search'
import Filter from '../components/Filter'
import Tabs from '../components/Tabs'
import NovaAba from '../components/NovaAba'
import Button from '../components/subcomponents/Button'

import axios from 'axios'
import Loading from '../components/Loading'
import Login from './Login'


function App({ logged }) {

  
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [abas, setAbas] = useState("")
  const [loading, setLoading] = useState(true)
  const [tarefas, setTarefas] = useState("")
  const [botao, setBotao] = useState("Nova Aba")
  const [nova, setNova] = useState(false)
  const [sort, setSort] = useState("A-Z")

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(logged)
        const response = await axios.get('https://grazi-list.up.railway.app/api/todo');
        const tarefasData = response.data;
        const abasData = response.data;
        setAbas(abasData.abas)
        setTarefas(tarefasData.tarefas)
        if (tarefasData.tarefas.length === 0) {
          setLoading(response.data.loading)
        }

        console.log(abas)
        console.log(tarefas)
        // Atualize o estado com os dados obtidos, por exemplo, setTodos(tarefas);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, []);




  // const removeTodo = (id) => {
  //   const newTodo = [...todos];
  //   const filterTodo = newTodo.filter(
  //     (todos) => todos.id !== id ? todos : null
  //   );
  //   setTodos(filterTodo)
  // }
  const completeTodo = async (id, tipo) => {
    if (tipo.toLowerCase() === "refazer") {
      if (logged) {
        await axios.get('https://grazi-list.up.railway.app/api/refazer-task/' + id)
        setLoading(true)
        setAbas("")
        setTarefas("")
        window.location.reload();
      }

    } else if (tipo.toLowerCase() === "completar") {
      if (logged) {
      await axios.get('https://grazi-list.up.railway.app/api/completar-task/' + id)
      setLoading(true)
      setAbas("")
      setTarefas("")
      window.location.reload();
    }
    }
    // 
  };
  const RemoveTodo = async (id) => {
    if (logged) {
    await axios.get('https://grazi-list.up.railway.app/api/excluir-task/' + id)
    setLoading(true)
    setAbas("")
    setTarefas("")
    window.location.reload();
    }
  }
  const sair = () => {
    localStorage.setItem('token', '')
    window.location.reload();
  }
  const aba = (e) => {
    setNova(!nova)


  }

  function NewAba() {
    if (nova === true) {
      setBotao("Fechar")
      return <NovaAba />
    } else {
      setBotao("Nova Aba")
    }
    return null
  }

  function NotNULL() {
    if (abas != "" && tarefas != "") {

      return <div>
        <div className="listTodo">
          <NewAba />
          <Tabs aba={aba} sort={sort} completeTodo={completeTodo} RemoveTodo={RemoveTodo} abas={abas} botao={botao} filter={filter} tarefas={tarefas} search={search} />
        </div>
        <TodoForm abas={abas} />
      </div>


    } else if (loading != false) {

      return <Loading />

    } else {
      return <div>
        <div className="listTodo">
          <NewAba />
          <Tabs aba={aba} sort={sort} completeTodo={completeTodo} RemoveTodo={RemoveTodo} abas={abas} botao={botao} filter={filter} tarefas={tarefas} search={search} />
        </div>
        <TodoForm abas={abas} />
      </div>
    }



  }




  return (
    <div className="app">
      <button style={{ position: "absolute", right: "5px", width: "70px", height: "33px", fontSize: "15px" }} className='remove' onClick={sair}>Sair</button>
      <h1>Lista de Tarefas</h1>

      <Search search={search} setSearch={setSearch} />
      <Filter filter={filter} setFilter={setFilter} setSort={setSort} />

      <NotNULL />

    </div>
  )
}

export default App

