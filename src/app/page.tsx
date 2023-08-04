import { Book } from '@/types'
import dynamic from 'next/dynamic'

const IndexClienPage = dynamic(async () => await import('./client'), { ssr: false }) // ssr: execute in prerender server side

const api = {
  books: {
    list: async (): Promise<Book[]> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(import('../books.json').then((data) => data.library.map((data) => data.book)))
        }, 3000)
      })
    }
  }
}

async function page () {
  // const books: Book[] = await import('../books.json').then((data) => data.library.map((data) => data.book))
  const books = await api.books.list()
  const genres: string[] = Array.from(new Set(books.map((book) => book.genre)))

  return (
   <IndexClienPage books={books} genres={genres}/>
  )
}

export default page
