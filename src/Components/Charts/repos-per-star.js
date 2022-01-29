import { useContext } from 'react'
import userDataContext from '../../hooks/userDataContext'
import { Bar } from 'react-chartjs-2'
import getColors from '../../hooks/generate-chart-colors'

const ReposStarsChart = () => {
  const { starGazers } = useContext(userDataContext)
  const stars = starGazers.map((item) => item.stars)
  const repo_name = starGazers.map((item) => item.name)

  let delayed

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        display: false,
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
  }
  const data = {
    labels: repo_name,
    datasets: [
      {
        label: 'Stars',
        backgroundColor: getColors(repo_name.length),
        data: stars,
        minBarLength: 5,
      },
    ],
  }
  return (
    <div>
      <Bar options={options} data={data} />
    </div>
  )
}

export default ReposStarsChart
