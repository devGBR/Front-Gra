import React from 'react'

const Textarea = ({title, funcao, value}) => {
  return (
    <div className="Inputitle">
        <textarea value={value} onChange={funcao} className='Descricao'>

        </textarea>
        <label className="label2" >
            {title}
       </label>
    </div>
  )
}

export default Textarea