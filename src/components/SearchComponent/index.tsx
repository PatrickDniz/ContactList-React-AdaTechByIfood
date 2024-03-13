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
      <div className="relative">
        <input
          id="search"
          type="text"
          className=" h-9  min-w-14 appearance-none rounded-md  border-2 border-input
          bg-transparent px-3 py-3 text-sm focus:border-primary focus:outline-none focus:ring-0"
          placeholder="Pesquisar pelo nome"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {search.length >= 3 && (
          <button
            type="button"
            className="absolute right-6 top-3 flex items-center pr-2"
            onClick={handleSearch}
          >
            <IoMdSearch />
          </button>
        )}
        {search.length >= 3 && (
          <button
            type="button"
            className="absolute right-0 top-3 flex items-center pr-2"
            onClick={() => {
              clearSearch()
              setHasSearch(false)
            }}
          >
            <IoMdClose />
          </button>
        )}
      </div>
      {hasSearch && <p>Você buscou {search}</p>}
    </>
  )
}

export { SearchComponent }
