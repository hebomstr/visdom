import React from 'react'
import './UpcomingTasks.css'
import dayIndexes from '../.././helpers/dayIndexes.json'
import AccessTime from '@material-ui/icons/AccessTime'
import Clear from '@material-ui/icons/Clear'

const UpcomingTasks = ({ tasks, date }) => {
  let taskList = []

  const getUpcomingTasks = () => {

    const checkIfUpcoming = (startDate, endDate, currentDate, task) => {
      let startDateIndex = dayIndexes[startDate]
      let endDateIndex = dayIndexes[endDate]
      let currentDateIndex = dayIndexes[currentDate]
      if ((startDateIndex - currentDateIndex) <= 7 && (startDateIndex - currentDateIndex) >= 1 && task.status !== "completed") {
        console.log(startDateIndex - currentDateIndex)
        taskList.push(
          <div style={{display: "flex",marginBottom:"10px"}} key={task.title}>
            {task.status !== "failed" && <AccessTime style={{fontSize:"20px", marginLeft:"5px", marginRight:"5px", marginTop:"5px", color:"#e5ad00"}}></AccessTime>}
            {task.status === "failed" && <Clear style={{fontSize:"20px", marginLeft:"5px", marginRight:"5px", marginTop:"5px", color:"red"}}></Clear>}
            <div style={{marginTop:"6px", textAlign:"left"}}>
              <h5 style={{margin:"0"}}>{task.title}</h5>
              <p style={{margin:"0", fontSize:"13px"}}>Recommended starting date for the task is {task.start}. Deadline {endDate} at {task.dueTime}. Estimated duration {task.estimatedHours} hours.</p>
            </div>
          </div>
        )
      }
    }

    tasks.forEach(day => 
      day.tasks.forEach(task => {
        if (task.courseId !== null) {
          checkIfUpcoming(task.start, day.date, date, task)
        }}
      )
    )
  }

  getUpcomingTasks()

  return (
    <div style={{display:"block"}}>
      {taskList.length === 0 && <p style={{fontSize: "12px", textAlign: "left", marginLeft: "8px"}}>No upcoming tasks.</p>}
      {taskList.length !== 0 && <p style={{fontSize: "12px", textAlign: "left", marginLeft: "8px"}}>Here are upcoming tasks. Starting date is set by the teacher but feel free to start earlier!</p>}
      {taskList}
    </div>
  )
}

export default UpcomingTasks