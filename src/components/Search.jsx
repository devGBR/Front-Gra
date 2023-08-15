import React from 'react'
const Search = ({search, setSearch}) => {
  return (
    <div className="search">
        
        <div>
            <input type="text" className="Search" id='Seach' value={search} onChange={(e) => setSearch(e.target.value)} />
            <label className="label2" htmlFor="Seach">
                    Pesquisar
                </label>
        </div>
       

    </div>
  )
}

export default Search