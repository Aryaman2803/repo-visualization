import { useContext } from 'react'
import userDataContext from '../../hooks/userDataContext'
import { Doughnut } from 'react-chartjs-2'
import useWindowDimensions from '../../hooks/useWindowDimensions'
import getColors from '../../hooks/generate-chart-colors'
const ReposPerLanguage = () => {
  const { reposPerLanguage } = useContext(userDataContext)
  const { width } = useWindowDimensions()

  const languages = Object.keys(reposPerLanguage)
  const counts = Object.values(reposPerLanguage)
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: width < 500 ? 'bottom' : 'left',
      },
    },
  }
  const data = {
    labels: languages,
    datasets: [
      {
        label: 'Commits',
        backgroundColor: getColors(languages.length),
        data: counts,
      },
    ],
  }
  return <Doughnut data={data} options={options} />
}

export default ReposPerLanguage
