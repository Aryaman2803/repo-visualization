import { useEffect, useState } from 'react'
import axios from 'axios'

const useFetch = (url) => {
  const [isLoading, setIsLoading] = useState(true)
  const [apiData, setApiData] = useState(null)
  const [serverError, setServerError] = useState(null)

  useEffect(() => {
    setIsLoading(true)
    const fetchData = async () => {
      try {
        const resp = await axios.get(url)
        const data = await resp?.data

        setTimeout(() => {
          setApiData(data)
          setIsLoading(false)
        }, 700)
      } catch (error) {
        setServerError(error)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [url])

  return { isLoading, apiData, serverError }
}
export default useFetch
