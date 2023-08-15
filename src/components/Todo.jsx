import React, { useState } from 'react'

const Todo = ({tarefas,  completeTodo, RemoveTodo }) => {
  const [estilo, setEstilo] = useState("semDescricao");
  const [desc, setDesc] = useState(true);
  const [principal, setPrincipal] = useState('notdesc');

   const ativarDesc = () => {
    console.log(desc)
    setDesc(!desc)
    if(desc === true){
      setEstilo("campoDesc");
      setPrincipal('ondesc')
    }else{
      setEstilo("semDescricao");
      setPrincipal('notdesc')
    }

   }
  return (
    <div className={principal}>
      <div className="todo" onClick={() => ativarDesc()} >
          <div className="content"  style={{textDecoration: tarefas.iscompleted ? "line-through" : ""}} >
            <p>{tarefas.titulo}</p>
            <p className="category">({tarefas.categoria})</p>
          </div>
          <div className='buttons'>
              <button className="complete" onClick={() => completeTodo(tarefas.id, tarefas.button)}>{tarefas.button}</button>
              <button className="remove" onClick={() => RemoveTodo(tarefas.id)}>x</button>
            </div>
        </div>
        <div className={estilo}>
          <p>
            {tarefas.descricao}
          </p>
        </div>
    </div>
  )
}

export default Todo