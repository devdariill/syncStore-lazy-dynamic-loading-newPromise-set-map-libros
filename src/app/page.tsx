'use client'
import { useMemo, useState } from 'react'
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
  const [readList, setReadList] = useState<Array<Book['ISBN']>>([])
  const handleBookClick = (book: Book['ISBN']) => {
    setReadList(readList => readList.includes(book)
      ? readList.filter((item) => item !== book)
      : [...readList, book])
  }
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
            <p>{book.title}</p>
          </li>
        ))}
      </ul>

    </section>
  )
}
