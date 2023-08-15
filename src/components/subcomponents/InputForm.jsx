import React from 'react'

const input = ({title, value, funcao, id}) => {
  return (
    <div className="Inputitle">
    <input type="text"  id={id} value={value} onChange={funcao}/>
       <label className="label2" htmlFor={id}>
            {title}
       </label>
   </div>
  )
}

export default input