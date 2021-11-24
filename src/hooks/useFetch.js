import { useEffect, useState } from 'react'
import axios from 'axios'
import format from 'date-fns/format'

const useFetch = (url) => {
  const [isLoading, setIsLoading] = useState(true)
  const [apiData, setApiData] = useState(null)
  const [serverError, setServerError] = useState(null)
  const [overAllLanguages, setoverAllLanguages] = useState()
  const [commitsTimeline, setcommitsTimeline] = useState()

  const TOKEN = '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'

  useEffect(() => {
    setIsLoading(true)
    fetchData()
  }, [url])

  const langURL = url + '/repos'

  const fetchData = async () => {
    try {
      const reqone = await axios.get(url)
      const reqtwo = await axios.get(langURL)

      axios
        .all([reqone, reqtwo])
        .then(
          axios.spread((...responses) => {
            const respOne = responses[0]?.data
            const respTwo = responses[1]?.data

            setApiData(respOne)
            overallLanguage(respTwo)
            overallCommits(respTwo)

            setTimeout(() => {
              setIsLoading(false)
            }, 1700)
          })
        )
        .catch((error) => {
          setServerError(error)
          setIsLoading(false)
        })
    } catch (error) {
      setServerError(error)
      setIsLoading(false)
    }
  }

  const overallLanguage = (data) => {
    const lang = []
    for (const key in data) {
      if (data[key].language) {
        lang.push(data[key].language)
      }
    }
    const a = lang.filter((item, i, ar) => ar.indexOf(item) === i)
    setoverAllLanguages(a)
  }

  const overallCommits = async (data) => {
    const allRepos = []
    for (let i in data) {
      // !if (data[i].size != 0 ) {
      if (data[i].size != 0 && data[i].fork === false) {
        let repo = data[i].commits_url
        let newRepo = repo.replace('{/sha}', '')
        allRepos.push(newRepo)
      }
    }
    const timeline = []
    axios
      .all(
        allRepos.map((l) => axios.get(l, { headers: { Authorization: TOKEN } }))
      )
      .then(
        axios.spread((...response) => {
          for (let i of response) {
            let innerData = i.data
            for (let inn of innerData) {
              const fetchedTime = inn.commit.committer.date
              const formattedDate = format(new Date(fetchedTime), 'yyyy-MM')
              timeline.push({ date: formattedDate })
            }
          }
          timeline.sort((a, b) => a.date.localeCompare(b.date))

          let finalTimeline = []

          updateTimeline(finalTimeline, timeline)
          setcommitsTimeline(finalTimeline)
          console.log(commitsTimeline)
        })
      )
      .catch((error) => {
        setServerError(error)
        console.log(error)
      })
  }

  const updateTimeline = (finalTimeline, timeline) => {
    for (let i in timeline) {
      const search = timeline[i].date
      if (finalTimeline.find((item) => item.date === search)) {
        for (let j in finalTimeline) {
          if (finalTimeline[j].date === search) {
            finalTimeline[j].datesCount = finalTimeline[j].datesCount + 1
          }
        }
      } else {
        const obj = { datesCount: 1, date: search }
        finalTimeline.push(obj)
      }
    }
  }

  // const fetchData = async () => {
  //   try {
  //     const resp = await axios.get(url)
  //     const data = await resp?.data

  //     setTimeout(() => {
  //       setApiData(data)
  //       setIsLoading(false)
  //     }, 700)
  //   } catch (error) {
  //     setServerError(error)
  //     setIsLoading(false)
  //   }
  // }

  // const overallLanguage = async () => {
  //   try {
  //     const resp = await axios.get(langURL)
  //     const data = await resp?.data

  // const lang = []
  // for (const key in data) {
  //   if (data[key].language) {
  //     lang.push(data[key].language)
  //   }
  // }
  // const a = lang.filter((item, i, ar) => ar.indexOf(item) === i)
  // setoverAllLanguages(a)
  //   } catch (error) {}
  // }

  // const overallCommits = async () => {
  //   const allRepos = []
  //   try {
  //     const resp = await axios.get(langURL)
  //     const data = await resp?.data

  //     for (let i in data) {
  //       let repo = data[i].commits_url

  //       repo = repo.replace('{/sha}', '')

  //       allRepos.push(repo)
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }

  //   for (let i of allRepos) {
  //     const repoFetch = await axios.get(i)
  //     console.log(repoFetch)
  //      // const repoData = await repoFetch?.data
  //     // for (let rep in repoData) {
  //     //   const commitTime = repoData[rep].commit.committer.date
  //     //   console.log(commitTime)
  //     // }
  //   }
  // }
  // overallCommits()

  return {
    isLoading,
    apiData,
    serverError,
    overAllLanguages,
    commitsTimeline,
  }
}
export default useFetch
