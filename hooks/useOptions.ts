import useSwr from 'swr'

const baseUrl = process.env.NEXT_PUBLIC_PUBLIC_API;
export const useOptions = (path: string) => {
  if (!path) {
    throw new Error('Path is required')
  }

  const fetcher = (url: string) => {
    return fetch(url, {
      method: 'OPTIONS'
    }).then(res => res.json());
  }

  const { data, error } = useSwr(`${baseUrl}${path}`, fetcher)

  return { data, error }
}
