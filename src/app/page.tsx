'use client'
import { useEffect, useMemo, useState } from 'react'
import data from '../books.json'

export interface Book {
  title: string
  pages: number
  genre: string
  cover: string
  synopsis: string
  year: number
  ISBN: string
}
const books: Book[] = data.library.map((data) => data.book)

const genres: string[] = Array.from(new Set(books.map((book) => book.genre)))

export default function Home () {
  const [genre, setGenre] = useState<string>('')
  const matches = useMemo(() => {
    if (genre === '') return books
    return books.filter((book) => {
      if (book.genre !== genre) return false

      return true
    })
  }, [genre])
  const [readList, setReadList] = useState<Set<Book['ISBN']>>(() => new Set())
  const handleBookClick = (book: Book['ISBN']) => {
    const draft = structuredClone(readList)
    draft.has(book) ? draft.delete(book) : draft.add(book)
    setReadList(draft)
    api.readList.update(draft)
    // setReadList(readList => readList.includes(book)
    //   ? readList.filter((item) => item !== book)
    //   : [...readList, book])
  }

  const api = {
    readList: {
      update: (readList: Set<Book['ISBN']>) =>
        localStorage.setItem('readList', JSON.stringify(Array.from(readList))),
      // localStorage.setItem('readList', JSON.stringify(Array.from(readList))),

      onChange: (callback: (readList: Set<Book['ISBN']>) => void) => {
        const getReadList = () => {
          const readList = new Set(JSON.parse(localStorage.getItem('readList') ?? '[]') as Set<Book['ISBN']>) // 1 get data
          // 1 return new Set(JSON.parse(localStorage.getItem('readList') ?? '[]') as Set<Book['ISBN']>)
          callback(readList) // 2 return to callback
        }
        // 1 const readList = getReadList()
        // 1 callback(readList)
        window.addEventListener('storage', getReadList) // 3 listen to storage
        getReadList() // 4 get data
        return () => window.removeEventListener('storage', getReadList) // 5 unsuscribe
        // 1 window.addEventListener('storage', (e) => {
        // 1   if (e.key === 'readList') callback(getReadList())
        // 1 })
      }
    }
  }

  useEffect(() => {
    const unsuscribe = api.readList.onChange(setReadList)
    return () => unsuscribe()
    // setReadList(new Set(JSON.parse(localStorage.getItem('readList') ?? '[]')))
    // setReadList(JSON.parse(localStorage.getItem('readList') ?? '[]'))  as Array<Book['ISBN']>
  }, [])

  return (
    <section className='grid gap-4'>
      <nav>
        <select onChange={(e) => setGenre(e.target.value)}>
          <option value="">Todos</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
      </nav>
      <ul className='grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-4'>
        {matches.map((book) => (
          <li key={book.ISBN} onClick={() => handleBookClick(book.ISBN)}>
            <img src={book.cover} alt={book.title} className='aspect-[9/14] object-cover'/>
            <p>{readList.has(book.ISBN) && (<span>❤️</span>)}{book.title}</p>
          </li>
        ))}
      </ul>

    </section>
  )
}
