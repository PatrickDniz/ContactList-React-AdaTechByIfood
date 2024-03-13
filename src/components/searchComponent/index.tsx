import { useCallback, useState } from 'react'
import { IoMdClose, IoMdSearch } from 'react-icons/io'

const SearchComponent = () => {
  const [search, setSearch] = useState('')
  const [hasSearch, setHasSearch] = useState(false)
  const handleSearch = useCallback(() => {
    setHasSearch(true)
  }, [])
  const clearSearch = useCallback(() => {
    setSearch('')
  }, [])

  return (
    <>
      <div className="mx-auto my-4 flex w-10/12 justify-center">
        <div className="relative flex justify-center bg-transparent ">
          <input
            id="search"
            type="text"
            className="appearance-none  rounded-md border-2 border-input
          bg-transparent px-3 py-3 focus:border-primary focus:outline-none focus:ring-0"
            placeholder="Pesquisar pelo nome"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {search.length >= 3 && (
            <button
              type="button"
              className="absolute bottom-0 right-8 top-0"
              onClick={handleSearch}
            >
              <IoMdSearch />
            </button>
          )}
          {search.length >= 3 && (
            <button
              type="button"
              className="absolute bottom-0 right-3 top-0"
              onClick={() => {
                clearSearch()
                setHasSearch(false)
              }}
            >
              <IoMdClose />
            </button>
          )}
        </div>
      </div>
      {hasSearch && <p>Você buscou {search}</p>}
    </>
  )
}

export { SearchComponent }
