import { Book } from '@/types'
import data from '../books.json'
import IndexClienPage from './client'

const books: Book[] = data.library.map((data) => data.book)
const genres: string[] = Array.from(new Set(books.map((book) => book.genre)))

function page () {
  return (
   <IndexClienPage books={books} genres={genres}/>
  )
}

export default page
