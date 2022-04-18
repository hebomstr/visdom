import React from 'react'
import './OngoingTasks.css'
import dayIndexes from '../.././helpers/dayIndexes.json'
import Notification from '@material-ui/icons/NotificationsOutlined'
import NotificationActive from '@material-ui/icons/NotificationsActive'
import Clear from '@material-ui/icons/Clear'

const OngoingTasks = ({ courses, tasks, date, reRender }) => {

  let taskList = []

  const setTaskDone = (task) => {
    const course = courses.find(course => course.id === task.courseId)
    const courseTask = course.exercises.find(exercise => exercise.exerciseId === task.title.replace(/\s/g, ''))
    task.status = "completed"
    courseTask.status = "completed"
    reRender()
  }

  const getOngoingTasks = () => {

    const checkIfHurry = (task, deadline) => {
      let daysCount = dayIndexes[deadline] - dayIndexes[date]
      if (daysCount < 2) {
        return true
      } else {
        return false
      }
    }

    const checkIfOngoing = (startDate, endDate, currentDate, task) => {
      let startDateIndex = dayIndexes[startDate]
      let endDateIndex = dayIndexes[endDate]
      let currentDateIndex = dayIndexes[currentDate]
      if ((currentDateIndex >= startDateIndex && task.status !== "completed") || (currentDateIndex >= startDateIndex && task.status === "failed")) {
        taskList.push(
          <div style={{display: "flex",marginBottom:"10px"}} key={task.title}>
            {task.status !== "failed" && checkIfHurry(task, endDate) === false && <Notification style={{fontSize:"20px", marginLeft:"5px", marginRight:"5px", marginTop:"5px", color:"#e5ad00"}}></Notification>}
            {task.status !== "failed" && checkIfHurry(task, endDate) === true && <NotificationActive style={{fontSize:"20px", marginLeft:"5px", marginRight:"5px", marginTop:"5px", color:"#D22B2B"}}></NotificationActive>}
            {task.status === "failed" && <Clear style={{fontSize:"20px", marginLeft:"5px", marginRight:"5px", marginTop:"5px", color: "#D22B2B"}}></Clear>}
            <div style={{marginTop:"6px", textAlign:"left"}}>
              <h5 style={{margin:"0"}}>{task.title}</h5>
              <div style={{display:"flex"}}>
                <p style={{margin:"0", fontSize:"13px"}}>Deadline {endDate} at {task.dueTime}. Estimated duration {task.estimatedHours} hours.</p>
                {task.type === "exercise" && <button style={{marginLeft: "20px"}} onClick={() => setTaskDone(task)}>Demo set done</button>}
              </div>
            </div>
          </div>
        )
      }
    }

    tasks.forEach(day => 
      day.tasks.forEach(task => {
        if (task.courseId !== null) {
          checkIfOngoing(task.start, day.date, date, task)
        }}
      )
    )
  }

  getOngoingTasks()

  return (
    <div style={{display:"block"}}>
      {taskList.length === 0 && <p style={{fontSize: "12px", textAlign: "left", marginLeft: "8px"}}>No ongoing tasks.</p>}
      {taskList.length !== 0 && <p style={{fontSize: "12px", textAlign: "left", marginLeft: "8px"}}>These are the tasks you should be working on currently. Recommended starting date for these tasks has been passed.</p>}
      {taskList}
    </div>
  )
}

export default OngoingTasks