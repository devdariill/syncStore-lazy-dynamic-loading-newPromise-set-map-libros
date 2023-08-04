import { Book } from '@/types'
import IndexClienPage from './client'

async function page () {
  const books: Book[] = await import('../books.json').then((data) => data.library.map((data) => data.book))
  const genres: string[] = Array.from(new Set(books.map((book) => book.genre)))

  return (
   <IndexClienPage books={books} genres={genres}/>
  )
}

export default page
