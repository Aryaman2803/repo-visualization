import { useEffect, useState } from 'react'
import axios from 'axios'

const useFetch = (url) => {
  const [isLoading, setIsLoading] = useState(true)
  const [apiData, setApiData] = useState(null)
  const [serverError, setServerError] = useState(null)
  const [overAllLanguages, setoverAllLanguages] = useState()

  useEffect(() => {
    setIsLoading(true)
    fetchData()
    overallLanguage()
  }, [url])

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
  
  const langURL = url + '/repos'
  const overallLanguage = async () => {
    try {
      const resp = await axios.get(langURL)
      const data = await resp?.data

      const lang = []
      for (const key in data) {
        if (data[key].language) {
          lang.push(data[key].language)
        }
      }
      const a = lang.filter((item, i, ar) => ar.indexOf(item) === i)
      await setoverAllLanguages(a)
    } catch (error) {
      console.log(error)
    }
  }

  return { isLoading, apiData, serverError, overAllLanguages }
}
export default useFetch
