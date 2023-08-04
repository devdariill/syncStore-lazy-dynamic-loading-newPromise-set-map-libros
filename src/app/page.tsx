import { Book } from '@/types'
import dynamic from 'next/dynamic'
import IndexLoading from './loading'

// const IndexClienPage = lazy(async () => await import('./client'))
const IndexClienPage = dynamic(async () => await import('./client'), { ssr: false, loading: IndexLoading }) // ssr: execute in prerender server side

const api = {
  books: {
    list: async (): Promise<Book[]> => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(import('../books.json').then((data) => data.library.map((data) => data.book)))
        }, 100)
      })
    }
  }
}

async function page () {
  // const books: Book[] = await import('../books.json').then((data) => data.library.map((data) => data.book))
  const books = await api.books.list()
  const genres: string[] = Array.from(new Set(books.map((book) => book.genre)))

  return (
  // <Suspense fallback={<IndexLoading/>}>
      <IndexClienPage books={books} genres={genres}/>
  // </Suspense>
  )
}

export default page
