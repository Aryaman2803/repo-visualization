import { useContext } from 'react'
import userDataContext from '../../hooks/userDataContext'
import { eachMonthOfInterval, eachQuarterOfInterval, format } from 'date-fns'
import { Line } from 'react-chartjs-2'
import Chart from 'chart.js/auto'
import _ from 'lodash'

const CommitChart = () => {
  const { isLoading, apiData, commitsTimeline } = useContext(userDataContext)
  // const dateStart = format(new Date(apiData.created_at), 'yyyy-MM')
  // const dateEnd = format(new Date(), 'yyyy-MM')

  // const getTimeline = eachQuarterOfInterval({
  //   start: new Date(dateStart),
  //   end: new Date(dateEnd),
  // })

  //Grouping commitsTimeline in quarters
  const groupedByYear = _.groupBy(commitsTimeline, function (item) {
    return item.date.substring(3)
  })

  //Group together all months in quarters for each available year
  const groupedByMonths = []

  for (let i in groupedByYear) {
    const getYearData = groupedByYear[i]

    for (let j in getYearData) {
      const date = getYearData[j].date
      const count = getYearData[j].datesCount
      const month = date.substring(0, 2)
      const year = date.substring(3)

      //First, check the month, that will decide the quarter
      if (month >= 1 && month <= 3) {
        //Second, find if that year's quarter is present in our groupedByMonth array,

        if (
          groupedByMonths.find(
            (item) => item.time.substring(3) === year && item.quarter === 'Q4'
          )
        ) {
          //If that year's quarter is present, then we simply update its count

          groupedByMonths.map((x) => {
            if (x.quarter === 'Q1' && x.time.substring(3) === year) {
              x.counts = x.counts + count
            }
          })
        } else {
          //Otherwise, we create that year's quarter and push the latest obj in groupedByMonths

          const _time = `Q1-${year}`
          const obj = { counts: count, time: _time, quarter: 'Q1' }
          groupedByMonths.push(obj)
        }
      } else if (month >= 4 && month <= 6) {
        if (
          groupedByMonths.find(
            (item) => item.time.substring(3) === year && item.quarter === 'Q4'
          )
        ) {
          groupedByMonths.map((x) => {
            if (x.quarter === 'Q2' && x.time.substring(3) === year) {
              x.counts = x.counts + count
            }
          })
        } else {
          const _time = `Q2-${year}`
          const obj = { counts: count, time: _time, quarter: 'Q2' }
          groupedByMonths.push(obj)
        }
      } else if (month >= 7 && month <= 9) {
        if (
          groupedByMonths.find(
            (item) => item.time.substring(3) === year && item.quarter === 'Q4'
          )
        ) {
          groupedByMonths.map((x) => {
            if (x.quarter === 'Q3' && x.time.substring(3) === year) {
              x.counts = x.counts + count
            }
          })
        } else {
          const _time = `Q3-${year}`
          const obj = { counts: count, time: _time, quarter: 'Q3' }
          groupedByMonths.push(obj)
        }
      } else if (month >= 10 && month <= 12) {
        if (
          groupedByMonths.find(
            (item) => item.time.substring(3) === year && item.quarter === 'Q4'
          )
        ) {
          groupedByMonths.map((x) => {
            if (x.quarter === 'Q4' && x.time.substring(3) === year) {
              x.counts = x.counts + count
            }
          })
        } else {
          const _time = `Q4-${year}`
          const obj = { counts: count, time: _time, quarter: 'Q4' }
          groupedByMonths.push(obj)
        }
      }
    }
  }

  //Prepare Data for Line Graph

  //Extract only time- quarter-years from groupedByMonths
  const timeline = groupedByMonths.map((item) => item.time)

  //Extract only commits count from groupedByMonths
  const commits = groupedByMonths.map((item) => item.counts)

  /*Since we started our first commit say 2 years after creating the account, then we wont have a balanced line graph,
  we will show zero commits for that time period,*/

  /*We create another timeline between Github account created and the first ever commit done by the user,
  timeline will be same as our main timeline like, quarters-year format*/

  const fetchedFirstCommit = commitsTimeline[0].date
  const reverseDate = (date) => {
    const month = date.substring(0, 2)
    const year = date.substring(3)
    const newDate = year + '-' + month
    return newDate
  }
  const dateCreated = format(new Date(apiData.created_at), 'yyyy-MM')
  const fetchedFirstCommitConverted = reverseDate(fetchedFirstCommit)
  const getEmptyTimeline = eachQuarterOfInterval({
    start: new Date(dateCreated),
    end: new Date(fetchedFirstCommitConverted),
  })
  const updatedZeros = getEmptyTimeline.map((time) => format(time, 'MM-yyyy'))
  updatedZeros.pop()
  const quarteredUpdatedZeros = []
  let numberOfZeros = getEmptyTimeline.length - 1
  for (let time of updatedZeros) {
    const month = time.substring(0, 2)
    const year = time.substring(3)
    let date = ''
    if (month >= 1 && month <= 3) {
      date = `Q1-${year}`
    } else if (month >= 4 && month <= 6) {
      date = `Q2-${year}`
    } else if (month >= 7 && month <= 9) {
      date = `Q3-${year}`
    } else if (month >= 10 && month <= 12) {
      date = `Q4-${year}`
    }
    quarteredUpdatedZeros.push(date)
  }

  //Add zero commits for our empty timeline period

  const updatedCommits = new Array(numberOfZeros)
  for (let i = 0; i < numberOfZeros; i++) updatedCommits[i] = 0

  //Merge the zero commits array with original commits array
  const mergerdCommits = [...updatedCommits, ...commits]
  //Merge Empty timeline array with commits timeline array
  const mergetTimeline = [...quarteredUpdatedZeros, ...timeline]


  let delayed
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Commits per quarter',
        font: {
          size: 14,
          style: 'normal',
        },
      },
    },
    animation: {
      onComplete: () => {
        delayed = true
      },
      delay: (context) => {
        let delay = 0
        if (context.type === 'data' && context.mode === 'default' && !delayed) {
          delay = context.dataIndex * 100 + context.datasetIndex * 100
        }
        return delay
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
    scales: {
      y: {
        display: true,
        title: {
          display: true,
          text: 'No. of commits',

          font: {
            size: 12,
          },
          padding: { top: 0, left: 0, right: 0, bottom: 0 },
        },
      },
    },
  }

  const data = {
    labels: mergetTimeline,
    datasets: [
      {
        label: 'Commits',
        backgroundColor: 'rgb(91,163,255)',
        borderColor: 'rgb(214,120,255)',
        data: mergerdCommits,
      },
    ],
  }
  return (
    <div>
      <Line options={options} data={data} />
    </div>
  )
}

export default CommitChart
