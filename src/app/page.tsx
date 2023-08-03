'use client'
import { useState } from 'react'
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
console.log('🚀 ~ file: page.tsx:3 ~ data:', data)
const books: Book[] = data.library.map((data) => data.book)

export default function Home () {
  const [genre, setGenre] = useState<string>('')
  const matches = genre !== ''
    ? books.filter((book) => {
      if (book.genre !== genre) return false

      return true
    })
    : books
  return (
    <section className='grid gap-4'>
      <nav>
        <select onChange={(e) => setGenre(e.target.value)}>
          <option value="">Todos</option>
          <option value="Fantasía">Fantasía</option>
          <option value="Ciencia ficción">Ciencia ficción</option>
        </select>
      </nav>
      <ul className='grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-4'>
        {matches.map((book) => (
          <li key={book.ISBN}>
            <img src={book.cover} alt={book.title} className='aspect-[9/14] object-cover'/>
            <p>{book.title}</p>
          </li>
        ))}
      </ul>

    </section>
  )
}
