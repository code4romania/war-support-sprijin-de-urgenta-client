import useSwr from 'swr'

const baseUrl = process.env.NEXT_PUBLIC_PUBLIC_API;
export const useData = (path: string) => {
  if (!path) {
    throw new Error('Path is required')
  }

  const { data, error } = useSwr(`${baseUrl}${path}`)

  return { data, error }
}
