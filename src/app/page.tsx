'use client'
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
  return (
    <section className='grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-4'>
      {books.map((book) => (
        <div key={book.ISBN}>
          <img src={book.cover} alt={book.title} className='aspect-[9/14] object-cover'/>
          <p>{book.title}</p>
        </div>
      ))}
    </section>
  )
}
