import React from 'react'

const Button = ({nome, funcao}) => {
  return (
    <button type="submit" onClick={ () => funcao()} style={{ height: '40px'}}>{nome}</button>
  )
}

export default Button