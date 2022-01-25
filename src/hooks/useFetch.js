import { useEffect, useState } from 'react'
import axios from 'axios'
import format from 'date-fns/format'

const useFetch = (url) => {
  const [isLoading, setIsLoading] = useState(true)
  const [apiData, setApiData] = useState(null)
  const [serverError, setServerError] = useState(null)
  const [overAllLanguages, setoverAllLanguages] = useState()
  const [commitsTimeline, setcommitsTimeline] = useState()
  const [reposPerLanguage, setReposPerLanguage] = useState(null)
  const [reposLanguagesUrl, setReposLanguagesUrl] = useState(null)

  const TOKEN = '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'
  useEffect(() => {
    setIsLoading(true)
    fetchData()
  }, [url])

  const langURL = url + '/repos?per_page=100'
  const config = {
    Authorization: `Bearer ${TOKEN}`,
  }

  const fetchData = async () => {
    try {
      const reqone = await axios.get(url, { headers: config })
      const reqtwo = await axios.get(langURL, { headers: config })

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
    let countNull = 0

    for (const key in data) {
      if (data[key].language) {
        lang.push(data[key].language)
      } else countNull++
    }

    const a = lang.filter((item, i, ar) => ar.indexOf(item) === i)
    setoverAllLanguages(a)

    //Get Repo Per Language
    //Count individual language from array 'a' in array lang

    const countRepoLang = lang.reduce(
      (acc, value) => ({
        ...acc,
        [value]: (acc[value] || 0) + 1,
      }),
      {}
    )
    countRepoLang['Unknowns'] = countNull
    setReposPerLanguage(countRepoLang)
  }

  const overallCommits = async (data) => {
    const allRepos = []
    const allReposLanguagesURL = [] //stores all repos language_url

    for (let i in data) {
      // !if (data[i].size != 0 ) {
      if (data[i].size !== 0 && data[i].fork === false) {
        // if (data[i].size !== 0) {
        let repo = data[i].commits_url
        let newRepo = repo.replace('{/sha}', '')
        allRepos.push(newRepo)

        // TIME.push(data[i].pushed_at)
        // console.log(TIME);

        const timeline = []
        let finalTimeline = []

        // updateTimeline(finalTimeline, timeline)
        // setcommitsTimeline(finalTimeline)
        // console.log(TIME)

        allReposLanguagesURL.push(data[i].languages_url)
      }
    }

    //Get data for commits timeline chart
    getTimeline(allRepos)
    // getReposPerLanguages(allReposLanguagesURL)
  }

  const getTimeline = async (allRepos) => {
    const timeline = []
    axios
      .all(allRepos.map((l) => axios.get(l, { headers: config })))
      .then(
        axios.spread((...response) => {
          for (let i of response) {
            let innerData = i.data
            for (let inn of innerData) {
              const author = inn.commit.author.name
              const fetchedTime = inn.commit.committer.date
              const formattedDate = format(new Date(fetchedTime), 'MM-yyyy')
              timeline.push({ date: formattedDate })
            }
          }
          timeline.sort((a, b) => a.date.localeCompare(b.date))
          let finalTimeline = []

          updateTimeline(finalTimeline, timeline)
          setcommitsTimeline(finalTimeline)
          // console.log(finalTimeline)
        })
      )
      .catch((error) => {
        setServerError(error)
        console.log(error)
      })
  }

  //Data a commits per quarter timeline

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
    // const newww = finalTimeline.sort((a, b) => a.date.localeCompare(b.date))
    finalTimeline.sort(function (a, b) {
      a = a.date.split('-')
      b = b.date.split('-')
      return new Date(a[1], a[0], 1) - new Date(b[1], b[0], 1)
    })
    // console.log(finalTimeline);
  }

  return {
    isLoading,
    apiData,
    serverError,
    overAllLanguages,
    commitsTimeline,
    reposPerLanguage,
  }
}
export default useFetch
