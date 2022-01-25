import { useContext } from 'react'
import userDataContext from './userDataContext'
import { Doughnut } from 'react-chartjs-2'
import useWindowDimensions from './useWindowDimensions'

const ReposPerLanguage = () => {
  const { reposPerLanguage } = useContext(userDataContext)
  const { height, width } = useWindowDimensions()

  const languages = Object.keys(reposPerLanguage)
  const counts = Object.values(reposPerLanguage)

  function getColors(length) {
    let gradient = {
      0: [255, 255, 255, 1],
      20: [255, 236, 179, 1],
      45: [232, 82, 133, 1],
      65: [106, 27, 154, 1],
      100: [0, 0, 0, 1],
    }
    //Get a sorted array of the gradient keys
    let gradientKeys = Object.keys(gradient)
    gradientKeys.sort(function (a, b) {
      return +a - +b
    })

    let setsCount = length

    //Calculate colors
    var chartColors = []
    for (let i = 0; i < setsCount; i++) {
      var gradientIndex = (i + 1) * (100 / (setsCount + 1)) //Find where to get a color from the gradient
      for (let j = 0; j < gradientKeys.length; j++) {
        var gradientKey = gradientKeys[j]
        if (gradientIndex === +gradientKey) {
          //Exact match with a gradient key - just get that color
          chartColors[i] = 'rgba(' + gradient[gradientKey].toString() + ')'
          break
        } else if (gradientIndex < +gradientKey) {
          //It's somewhere between this gradient key and the previous
          var prevKey = gradientKeys[j - 1]
          var gradientPartIndex =
            (gradientIndex - prevKey) / (gradientKey - prevKey) //Calculate where
          var color = []
          for (let k = 0; k < 4; k++) {
            //Loop through Red, Green, Blue and Alpha and calculate the correct color and opacity
            color[k] =
              gradient[prevKey][k] -
              (gradient[prevKey][k] - gradient[gradientKey][k]) *
                gradientPartIndex
            if (k < 3) color[k] = Math.round(color[k])
          }
          chartColors[i] = 'rgba(' + color.toString() + ')'
          break
        }
      }
    }
    let colors = []

    for (let i = 0; i < length; i++) {
      colors.push(chartColors[i % (chartColors.length - 1)])
    }

    return colors
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: width < 500 ? 'bottom' : 'left',
      },
      title: {
        display: true,
        text: 'Repos Per Language',
        font: {
          size: 20,
          style: 'normal',
        },
        padding: {
          top: width < 500 ? 0 : 30,
          bottom: width < 500 ? 10 : 0,
        },
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
