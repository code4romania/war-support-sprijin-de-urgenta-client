import useSwr from 'swr'
import endpoints from 'endpoints.json'

const baseUrl = process.env.NEXT_PUBLIC_PUBLIC_API
const fetcher = (url: string) => fetch(url).then((r) => r.json())

const configFetcher = (url: string) =>
  fetch(url, { method: 'OPTIONS' }).then((r) => r.json())

export const useData = (path: string) => {
  if (!path) {
    throw new Error('Path is required')
  }

  const { data, error } = useSwr(`${baseUrl}${path}`, fetcher)

  return { data, error }
}

export const useFormSchema = (path: string) => {
  if (!path) {
    throw new Error('Path is required')
  }

  const { data, error } = useSwr(`${baseUrl}${path}`, configFetcher)

  return { data: data?.actions?.POST, error }
}

export const useProductsForm = () => useFormSchema(endpoints['donate/item'])
export const useServicesForm = () =>
  useFormSchema(endpoints['donate/transport_service'])
export const useVolunteeringForm = () =>
  useFormSchema(endpoints['donate/volunteering'])
