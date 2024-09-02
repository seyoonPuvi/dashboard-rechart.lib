import {PieChart, Pie, Legend, Cell} from 'recharts'
import './index.css'

const VaccinationByAge = props => {
  const {vaccinationByAgeList} = props
  return (
    <PieChart width={1000} height={300}>
      <Pie
        data={vaccinationByAgeList}
        cx="50%"
        cy="50%"
        outerRadius="60%"
        dataKey="count"
      >
        <Cell name="18-44" fill="#5a8dee" />
        <Cell name="44-60" fill="#a3df9f" />
        <Cell name="Above 60" fill=" #2cc6c6" />
      </Pie>
      <Legend
        iconType="circle"
        layout="horizontal"
        verticalAlign="bottom"
        align="center"
      />
    </PieChart>
  )
}

export default VaccinationByAge
