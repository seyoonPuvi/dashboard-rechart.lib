// Write your code here
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'

import './index.css'

const VaccinationCoverage = props => {
  const {vaccinationCoverageList} = props
  console.log(vaccinationCoverageList)

  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }

  return (
    <BarChart
      width={1000}
      height={400}
      data={vaccinationCoverageList}
      margin={{
        top: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="vaccineDate"
        tick={{
          stroke: 'white',
          strokeWidth: 1,
        }}
      />
      <YAxis
        tickFormatter={DataFormatter}
        tick={{
          stroke: 'gray',
          strokeWidth: 0,
        }}
      />
      <Tooltip />
      <Legend
        wrapperStyle={{
          paddingTop: 20,
          textAlign: 'center',
          fontSize: 12,
        }}
      />
      <Bar dataKey="dose1" name="Dose1" fill="#2cc6c6" />
      <Bar dataKey="dose2" name="Dose2" fill="#f54394" />
    </BarChart>
  )
}

export default VaccinationCoverage
