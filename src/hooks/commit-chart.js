import { useContext } from 'react'
import userDataContext from './userDataContext'
import { eachQuarterOfInterval, format } from 'date-fns'
import { Line } from 'react-chartjs-2'
import Chart from 'chart.js/auto'

const CommitChart = () => {
  const { isLoading, apiData, commitsTimeline } = useContext(userDataContext)
  const dateStart = format(new Date(apiData.created_at), 'yyyy-MM')
  const dateEnd = format(new Date(), 'yyyy-MM')

  const getTimeline = eachQuarterOfInterval({
    start: new Date(dateStart),
    end: new Date(dateEnd),
  })
  const timeline = getTimeline.map((time) => format(time, 'M-yyyy'))
  const commits = commitsTimeline.map((item) => item.datesCount)

  if (commits.length < timeline.length) {
    while (commits.length <= timeline.length) {
      commits.unshift(0)
    }
  }

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
    labels: timeline,
    datasets: [
      {
        label: 'Commits',
        backgroundColor: 'rgb(91,163,255)',
        borderColor: 'rgb(214,120,255)',
        data: commits,
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
