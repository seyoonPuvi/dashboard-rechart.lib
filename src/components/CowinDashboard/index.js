// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CowinDashboard extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    cowinDataList: {},
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const vaccinationDataApiUrl = 'https://apis.ccbp.in/covid-vaccination-data'

    const response = await fetch(vaccinationDataApiUrl)

    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        last7DaysVaccination: data.last_7_days_vaccination.map(each => ({
          vaccineDate: each.vaccine_date,
          dose1: each.dose_1,
          dose2: each.dose_2,
        })),
        vaccinationByGender: data.vaccination_by_gender.map(each => ({
          gender: each.gender,
          count: each.count,
        })),
        vaccinationByAge: data.vaccination_by_age.map(each => ({
          age: each.age,
          count: each.count,
        })),
      }

      this.setState({
        cowinDataList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onRenderVaccinationCoverage = () => {
    const {cowinDataList} = this.state
    console.log(cowinDataList)

    return (
      <div className="dashboard-cont">
        <h1 className="sub-heading">Vaccination Coverage</h1>
        <VaccinationCoverage
          vaccinationCoverageList={cowinDataList.last7DaysVaccination}
        />
      </div>
    )
  }

  onRenderVaccinationByGender = () => {
    const {cowinDataList} = this.state

    return (
      <div className="dashboard-cont">
        <h1 className="sub-heading">Vaccination by gender</h1>
        <VaccinationByGender
          vaccinationByGenderList={cowinDataList.vaccinationByGender}
        />
      </div>
    )
  }

  onRenderVaccinationByAge = () => {
    const {cowinDataList} = this.state

    return (
      <div className="dashboard-cont">
        <h1 className="sub-heading">Vaccination by age</h1>
        <VaccinationByAge
          vaccinationByAgeList={cowinDataList.vaccinationByAge}
        />
      </div>
    )
  }

  onRenderSuccess = () => (
    <div className="CowinDashboard-cont">
      {this.onRenderVaccinationCoverage()}
      {this.onRenderVaccinationByGender()}
      {this.onRenderVaccinationByAge()}
    </div>
  )

  onRenderLoader = () => (
    <div data-testid="loader" className="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  onDisplayContainers = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.onRenderLoader()

      case apiStatusConstants.success:
        return this.onRenderSuccess()

      case apiStatusConstants.failure:
        return this.onRenderFailure()

      default:
        return null
    }
  }

  onRenderFailure = () => (
    <div className="failure">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png "
        alt="failure view"
      />
      <h1 className="sub-title">Something went wrong</h1>
    </div>
  )

  render() {
    return (
      <div className="app-cont">
        <div className="main-cont">
          <div className="logo-cont">
            <img
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
              alt="website logo"
            />

            <p className="title">Co-WIN</p>
          </div>
          <h1 className="sub-title">CoWIN Vaccination in India</h1>
          {this.onDisplayContainers()}
        </div>
      </div>
    )
  }
}

export default CowinDashboard
