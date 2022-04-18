import React from 'react'
import './HomePage.css'
import Calendar from '../Calendar/Calendar'
import MiniProgressBar from '../MiniProgressBar/MiniProgressBar'
import { useNavigate } from "react-router-dom"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import dayIndexes from '../.././helpers/dayIndexes.json'
import weeks from '../.././helpers/weeks.json'


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)


const HomePage = ({ tasks, courses, date, handleIndexChange, reRender }) => {

  const countHours = (startDay, endDay, task) => {
    let list = []
    let startDayIndex = dayIndexes[startDay]
    let endDayIndex = dayIndexes[endDay]
    let taskHoursDividedPerDay = task.estimatedHours / (endDayIndex - startDayIndex + 1)
    let weekStartIndex
    let weekEndIndex
    console.log(taskHoursDividedPerDay)

    let weekIndex = 0
    
    for (let item in weeks) {
      let week = weeks[item].split("-")
      weekStartIndex = dayIndexes[week[0]]
      weekEndIndex = dayIndexes[week[1]]
      if (startDayIndex >= weekStartIndex && startDayIndex <= weekEndIndex && endDayIndex <= weekEndIndex) {
        list.push({ "weekIndex": weekIndex, "hours": taskHoursDividedPerDay * (endDayIndex - startDayIndex + 1) })
      } else if (startDayIndex >= weekStartIndex && startDayIndex <= weekEndIndex && endDayIndex > weekEndIndex) {
        list.push({ "weekIndex": weekIndex, "hours": taskHoursDividedPerDay * (weekEndIndex - startDayIndex + 1) })
      } else if (startDayIndex < weekStartIndex && endDayIndex > weekEndIndex) {
        list.push({ "weekIndex": weekIndex, "hours": taskHoursDividedPerDay * 7 })
      } else if (startDayIndex < weekStartIndex && endDayIndex <= weekEndIndex && endDayIndex >= weekStartIndex) {
        list.push({ "weekIndex": weekIndex, "hours": taskHoursDividedPerDay * (endDayIndex - weekStartIndex + 1) })
      }
      weekIndex = weekIndex + 1
    }

    return list
  }

  const calculateEstimatedWorkingHoursPerWeek = () => {
    let weekHours = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    tasks.forEach(day => 
      day.tasks.forEach(task => {
        let list = countHours(task.start, day.date, task)
        list.forEach(item => {
          console.log(list)
          weekHours[item.weekIndex] = weekHours[item.weekIndex] + item.hours
        })
      })
    )

    console.log(weekHours)
  
    return weekHours
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
      },
    },
  }

  const labels = ['Week 52', 'Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8', 'Week 9']

  const data = {
    labels,
    datasets: [
      {
        label: 'Estimated working hours per week',
        data: calculateEstimatedWorkingHoursPerWeek(),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  }

  const navigate = useNavigate()

  const handleClick = (course) => {
    navigate(`/course/${course.id}/courseInformation`)
  }

  return (
    <div className="homepage-container">
      <div className="homepage-courses-container">
        <div style={{width: "100%", height: "180px", backgroundColor: "white", boxShadow: "2px 2px 5px 2px #d1d1d1", display: "flex"}}>
          <div style={{width: "100%", height: "100%"}}>
            <Line
              style={{margin: "10px"}}
              height={"auto"}
              width={"100%"}
              data={data}
              options={options}
            />
          </div>
        </div>
        <div>
        <h1 style={{marginTop: "50px"}}>Your Courses</h1>
          <div className="course-card-container">
            {courses.map(course => 
              <div style={{backgroundColor: "#white", height: "auto", display: "block", justifyContent: "bottom", boxShadow: "2px 2px 5px 2px #d1d1d1"}} key={course.courseCode}>
                <button className="homepage-course-buttons" onClick={() => handleClick(course)}>{course.title} {course.courseCode}</button>
                {course.courseCompleted === false && <div style={{width: "100%", height: "40px"}}><p style={{margin: "0", padding: "0", color: "#969696", paddingTop: "10px", paddingLeft: "8px", fontSize: "13px"}}>Course in progress</p></div>}
                {course.courseCompleted === true && <div style={{width: "100%", height: "40px"}}><p style={{margin: "0", padding: "0", color: "#969696", paddingTop: "10px", paddingLeft: "8px", fontSize: "13px"}}>Course completed</p></div>}
                <MiniProgressBar course={course}></MiniProgressBar>
              </div>
            )}
          </div>
        </div>
        <div style={{marginLeft: "auto", marginRight: "auto", marginTop: "100px", marginBottom: "30px", height:"20px", display:"flex"}}>
          <button style={{height: "40px", width: "100px"}} onClick={() => handleIndexChange("previous")}>
            Demo previous
          </button>
          <h4 style={{margin:"0px", marginLeft:"10px", marginRight:"10px"}}>Current date: {date}</h4>
          <button style={{height: "40px", width: "100px"}} onClick={() => handleIndexChange("next")}>
            Demo next
          </button>
        </div>
      </div>
      <div className="homepage-widget-container">
        <div className="homepage-calendar-container">
          <Calendar courses={courses} tasks={tasks} date={date} reRender={reRender}></Calendar>
        </div>
      </div>
    </div>
  )
}

export default HomePage