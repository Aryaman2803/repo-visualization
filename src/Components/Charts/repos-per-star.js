import { useContext } from 'react'
import userDataContext from '../../hooks/userDataContext'
import { Bar } from 'react-chartjs-2'
import Chart from 'chart.js/auto'
import getColors from '../../hooks/generate-chart-colors'
import styled from 'styled-components/macro'

const ReposStarsChart = () => {
  const { isLoading, apiData, starGazers } = useContext(userDataContext)
  const stars = starGazers.map((item) => item.stars)
  const repo_name = starGazers.map((item) => item.name)

  const Div = styled.div`
    //   width:650px;
  `
  let delayed

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        display: false,
      },
      // title: {
      //   display: true,
      //   text: 'Most Starred',
      //   font: {
      //     size: 16,
      //     style: 'normal',
      //   },
      // },
    },
  }
  const data = {
    labels: repo_name,
    datasets: [
      {
        label: 'Commits',
        backgroundColor: getColors(repo_name.length),
        data: stars,
        minBarLength: 5,
      },
    ],
  }
  console.log(stars, repo_name)
  return (
    <Div>
      <Bar options={options} data={data} />
    </Div>
  )
}

export default ReposStarsChart
