// Write your code here
import {PieChart, Pie, Legend, Cell} from 'recharts'
import './index.css'

const VaccinationByGender = props => {
  const {vaccinationByGenderList} = props

  return (
    <PieChart width={1000} height={300}>
      <Pie
        cx="50%"
        cy="50%"
        data={vaccinationByGenderList}
        startAngle={0}
        endAngle={180}
        innerRadius="30%"
        outerRadius="60%"
        dataKey="count"
      >
        <Cell name="Male" fill="#f54394" />
        <Cell name="Female" fill="#5a8dee" />
        <Cell name="Others" fill="#a3df9f" />
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

export default VaccinationByGender
