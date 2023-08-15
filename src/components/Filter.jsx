import React from 'react'
const Filter = ({filter, setFilter, setSort}) => {
  return (
        <div className="filter">
            <h2>Filtrar</h2>
            <div className="filter-options">
                <div className="">
                    <p>Status:</p>
                    <select value={filter} onChange={(e) => setFilter(e.target.value)} >
                        <option value="All" style={{textAlign: "start"}}>Todas</option>
                        <option value="Completed" style={{textAlign: "start"}}>Completas</option>
                        <option value="Incomplete" style={{textAlign: "start"}}>Incompletas</option>
                    </select>
                </div>
                <div>
                    <p>Ordem alfabética:</p>
                    <button onClick={() => setSort("A-Z")}>A-Z</button>
                    <button onClick={() => setSort("Z-A")}>Z-A</button>
                </div>
            </div>
        </div>
  )
}

export default Filter