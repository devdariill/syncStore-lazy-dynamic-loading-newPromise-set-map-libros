import { Book } from '@/types'
import IndexClienPage from './client'

async function page () {
  // const books: Book[] = await import('../books.json').then((data) => data.library.map((data) => data.book))
  const books: Book[] = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(import('../books.json').then((data) => data.library.map((data) => data.book)))
    }, 3000)
  })
  const genres: string[] = Array.from(new Set(books.map((book) => book.genre)))

  return (
   <IndexClienPage books={books} genres={genres}/>
  )
}

export default page
