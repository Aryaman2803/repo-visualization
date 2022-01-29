
import { useEffect, useState } from 'react'
import axios from 'axios'
import format from 'date-fns/format'
import { useQuery } from 'react-query'
import CACHE from 'localstorage-ttl'

const useFetch = (name) => {
  const [isLoading, setIsLoading] = useState(true)
  const [apiData, setApiData] = useState(null)
  const [serverError, setServerError] = useState(null)
  const [overAllLanguages, setoverAllLanguages] = useState()
  const [commitsTimeline, setcommitsTimeline] = useState()
  const [reposPerLanguage, setReposPerLanguage] = useState(null)
  const [starGazers, setStarGazers] = useState(null)
  const [reposBySizeForkStars, setReposBySizeForkStars] = useState(null)

  const url = `https://api.github.com/users/${name} `

  const TOKEN = `${process.env.REACT_APP_TOKEN}`

  const langURL = url + '/repos?per_page=100'
  const config = {
    Authorization: `Bearer ${TOKEN}`,
  }

  const {
    isLoading: isLoading1,
    data: reqone,
    isError: error1,
  } = useQuery('reqone', async () => axios.get(url, { headers: config }), {
    refetchOnWindowFocus: false,
  })
  const {
    isLoading: isLoading2,
    data: reqtwo,
    isError: error2,
  } = useQuery('reqtwo', async () => axios.get(langURL, { headers: config }), {
    refetchOnWindowFocus: false,
  })

  const _isError = error1 || error2
  const _isLoading = isLoading1 || isLoading2

  useEffect(() => {
    setIsLoading(true)
    // fetchData()

    if (_isLoading === false) {
      setApiData(reqone?.data)
      overallLanguage(reqtwo?.data)
      overallCommits(reqtwo?.data)
      overallStargazers(reqtwo?.data)
      overallReposBySizeForkStars(reqtwo?.data)
      // setTimeout(() => {
      //   setIsLoading(false)
      // }, 1700)
    } else if (_isError === true) {
      setIsLoading(false)
      setServerError(true)
    }
  }, [url, _isLoading, _isError])

  const overallReposBySizeForkStars = (data) => {
    const repos = []
    for (const key in data) {
      const obj = {
        name: data[key].name,
        size: data[key].size,
        url: data[key].html_url,
        language: data[key].language,
        forks: data[key].forks,
        stars: data[key].stargazers_count,
        desc: data[key].description,
      }
      repos.push(obj)
    }

    setReposBySizeForkStars(repos)
  }

  const overallStargazers = (data) => {
    const stargazers = []

    for (const key in data) {
      const obj = { name: data[key].name, stars: data[key].stargazers_count }
      stargazers.push(obj)
    }

    stargazers.sort((a, b) => b.stars - a.stars)
    if (stargazers.length >= 10) stargazers.splice(10)
    setStarGazers(stargazers)
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
      if (data[i].size !== 0 && data[i].fork === false) {
        let repo = data[i].commits_url
        let newRepo = repo.replace('{/sha}', '')
        allRepos.push(newRepo)

        const timeline = []
        let finalTimeline = []
        allReposLanguagesURL.push(data[i].languages_url)
      }
    }

    //Get data for commits timeline chart
    getTimeline(allRepos, name)
    // getReposPerLanguages(allReposLanguagesURL)
  }

  // const getALL = async (repos) => {
  //   const data = await axios.all(
  //     repos.map((l) => axios.get(l, { headers: config }))
  //   )
  //   return data
  // }
  const getTimeline = async (allRepos, name) => {
    //If user already searched, fetch its data from cache
    if (CACHE.get(name)) {
      const check = CACHE.get(name)
      setcommitsTimeline(check)
      setIsLoading(false)
    } else {
      const timeline = []
      let finalTimeline = []
      await axios
        .all(allRepos.map((l) => axios.get(l, { headers: config })))
        .then(
          axios.spread((...response) => {
            for (let i of response) {
              let innerData = i.data
              for (let inn of innerData) {
                const fetchedTime = inn.commit.committer.date
                const formattedDate = format(new Date(fetchedTime), 'MM-yyyy')
                timeline.push({ date: formattedDate })
              }
            }
            timeline.sort((a, b) => a.date.localeCompare(b.date))

            updateTimeline(finalTimeline, timeline)
            setcommitsTimeline(finalTimeline)
            setIsLoading(false)
            // console.log(finalTimeline)
          })
        )
        .catch((error) => {
          setServerError(error)
          console.log(error)
        })

      //Storing final timeline into local storage to avoid fetch, with cache expiry of 5 hours
      CACHE.set(name, finalTimeline, 60000 * 60 * 5)
    }
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
    starGazers,
    reposBySizeForkStars,
  }
}
export default useFetch
