import React, { useState } from 'react'
import './Calendar.css'
import OngoingTasks from '../OngoingTasks/OngoingTasks'
import UpcomingTasks from '../UpcomingTasks/UpcomingTasks'
import ArrowBack  from  '@material-ui/icons/ArrowBack'
import ArrowForward from  '@material-ui/icons/ArrowForward'
import Add from '@material-ui/icons/Add'
import Clear from '@material-ui/icons/Clear'
import ArrowDropdown from '@material-ui/icons/ArrowDropDown'
import ArrowRight from '@material-ui/icons/ArrowRight'
import { useParams, useNavigate } from "react-router-dom"
import dayIndexes from '../.././helpers/dayIndexes.json'
import months from '../.././helpers/months.json'
import Check from '@material-ui/icons/Check'
import HelpOutline from '@material-ui/icons/HelpOutline'
import ReactTooltip from 'react-tooltip'
import ReactDOMServer from 'react-dom/server'
import Notification from '@material-ui/icons/NotificationsOutlined'
import NotificationActive from '@material-ui/icons/NotificationsActive'
import AccessTime from '@material-ui/icons/AccessTime'
import Delete from '@material-ui/icons/DeleteForever'

const Calendar = ({ courses, tasks, date, reRender }) => {

  const params = useParams()
  const navigate = useNavigate()

  const [showOwnNotifications, setShowOwnNotifications] = useState(true)
  const [showAllCourses, setShowAllCourses] = useState(true)
  const [monthIndex, setMonthIndex] = useState(0)
  const [newNotification, setNewNotification] = useState(false)
  const [notificationPopup, setNotificationPopup] = useState(null)
  const [ongoingTasksSelected, setOngoingTasksSelected] = useState(true)
  const [upcomingTasksSelected, setUpcomingTasksSelected] = useState(false)
  const [heatMap, setHeatMap] = useState(true)
  const [ongoingTasks, setOngoingTasks] = useState(false)
  const [showProjects, setShowProjects] = useState(true)

  const [notificationTitle, setNotificationTitle] = useState("")
  const [notificationTime, setNotificationTime] = useState("")
  const [estimatedHours, setEstimatedHours] = useState("")

  const changeMonthIndex = (string) => {
    if (string === "next" && monthIndex !== 2) {setMonthIndex(monthIndex + 1)}
    else if (string === "previous" && monthIndex !== 0) {setMonthIndex(monthIndex - 1)}
  }

  const handleNavigate = (string) => {
    navigate(`/course/${string}`)
  }

  const handleCreateNotification = (date) => {

    const object = tasks.find(t => t.date === date)

    if (object === undefined) {
      const json = {
        "date": date,
        "tasks": [
        {
            "courseId": null,
            "title": notificationTitle,
            "type": "notification",
            "status": "null",
            "start": date,
            "dueTime": notificationTime,
            "estimatedHours": estimatedHours
        }]
      }

      tasks.push(json)

    } else {
      const json = {
        "courseId": null,
        "title": notificationTitle,
        "type": "notification",
        "status": "null",
        "start": date,
        "dueTime": notificationTime,
        "estimatedHours": estimatedHours
      }
      object.tasks.push(json)
    }

    setNotificationPopup(null)
    setNewNotification(false)
    reRender()
  }

  const checkOngoingStatus = (deadline, start, currentDate, task) => {
    if (task.type !== "notification") {
      let currentDateIndex = dayIndexes[currentDate]
      let startDateIndex = dayIndexes[start]
      let endDateIndex = dayIndexes[deadline]
      if (currentDateIndex >= startDateIndex) {
        if ((endDateIndex - currentDateIndex) < 2) {
          return "hurry"
        } else {
          return "ongoing"
        }
      }
    }
    return null
  }

  const deleteNotification = (task, day) => {
      let count = 0
      let count2 = 0
     tasks.map(t => {
      if (t.date === day) {
        t.tasks.map(item => {
          if (item.dueTime === task.dueTime) {
            tasks[count].tasks.splice(count2)
          }
          count2 = count2 + 1
        })
      }
      count = count + 1
     })
    reRender()
  }

  const getNavigationString = (t) => {
    if (t.type === "exercise") {
      return `${t.type}/${t.title.replace(/\s/g, '')}`
    } else if (t.type === "project") {
      return "projects"
    } else if (t.type === "exam") {
      return "exams"
    }
  }

  const checkTasksForTheDate = (weekDay) => {
    let taskList = []
    let topColor
    let bottomColor

    let object = tasks.find((t) => t.date === weekDay)
    
    if (object !== undefined) {
      object.tasks.map((t) => {
      
      if (t.type !== "project" || showProjects === true) {
        if (t.courseId !== null || showOwnNotifications === true) {
          if (t.courseId === params.cid || t.courseId === null || showAllCourses === true) {
        
            if (t.type === "exercise") {
              topColor = "#fcd58f"
              bottomColor = "#e5ad00"
            } else if (t.type === "exam") {
              topColor = "#e3c4d7"
              bottomColor = "#c289af"
            } else if (t.type === "notification") {
              topColor = "#becedf"
              bottomColor = "#7a9fc0"
            } else if (t.type === "project") {
              topColor = "#e7be94"
              bottomColor = "#d07e28"
            }

            if (t.status === "completed") {
              topColor = "#cdd688"
              bottomColor = "#9bad11"
            } else if (t.status === "failed") {
              topColor = "#F88379"
              bottomColor = "#D22B2B"
            }

          taskList.push(
          <nav onClick={() => {t.type !== "notification" && handleNavigate(`${t.courseId}/${getNavigationString(t)}`)}} style={{cursor: t.type !== "notification" ? "pointer" : ""}}>
            <div style={{padding: "1px"}}>
              <div style={{backgroundColor: topColor, color: "#65696c", borderTopRightRadius: "0.15rem", borderTopLeftRadius: "0.15rem", display: "flex", justifyContent: "left"}}>
                <div style={{paddingTop: "2px", paddingBottom: "2px", fontSize: "9px", marginLeft: "3px"}}>{t.dueTime.includes("-") ? `${t.dueTime}` : `Deadline ${t.dueTime}`}</div>
                {t.type === "notification" && <Delete style={{fontSize: "14px", marginTop: "auto", marginBottom: "auto", marginLeft: "auto", marginRight: "1px", cursor: "pointer"}} onClick={() => deleteNotification(t, object.date)}></Delete>}
              </div>
              <div style={{backgroundColor: bottomColor, color: "white", borderBottomRightRadius: "0.15rem", borderBottomLeftRadius: "0.15rem", display: "flex", justifyContent: "left", textAlign: "left"}}>
                <div style={{paddingTop: "3px", paddingBottom: "4px", fontSize: "11px", marginLeft: "3px"}}>
                  <div style={{display: "flex"}}>
                    {t.status === "failed" && <Clear style={{fontSize: "15px"}}></Clear>}
                    {t.status === "completed" && <Check style={{fontSize: "15px"}}></Check>}
                    {checkOngoingStatus(object.date, t.start, date, t) === "ongoing" && t.status !== "failed" && t.status !== "completed" && <Notification style={{fontSize: "15px"}}>Ongoing</Notification>}
                    {checkOngoingStatus(object.date, t.start, date, t) === "hurry" && t.status !== "failed" && t.status !== "completed" && <NotificationActive style={{fontSize: "15px"}}>Hurry</NotificationActive>}
                    <div style={{marginLeft: "2px"}}>{t.title}</div>
                  </div>
                </div>
              </div>
              </div>
          </nav>
      )}}}})
      return taskList
    }
  }

  const countOngoingTasks = (startDay, endDay, weekDay, task) => {
    let startDayIndex = dayIndexes[startDay]
    let endDayIndex = dayIndexes[endDay]
    let weekDayIndex = dayIndexes[weekDay]
    let currentDayIndex = dayIndexes[date]
    if ((weekDayIndex >= startDayIndex && weekDayIndex <= endDayIndex)) {
      return task
    }
    return null
  }

  const checkOngoingTasksForTheDate = (weekDay) => {
    let ongoingCount = 0

    if (heatMap === false) {
      return "white"
    } else if (heatMap === true) {

      tasks.forEach(day => 
        day.tasks.forEach(task => {
          if (task.status !== "completed") {
            if (countOngoingTasks(task.start, day.date, weekDay, task) !== null) {
              ongoingCount = ongoingCount + 1
            }
          }}
        )
      )

      if (ongoingCount === 0) {
        return "#ffffff"
      } else if (ongoingCount === 1) {
        return "#fcf7f3"
      } else if (ongoingCount === 2) {
        return "#faefe6"
      } else if (ongoingCount === 3) {
        return "#f2d6c2"
      } else if (ongoingCount >= 4) {
        return "#eabe9d"
      }
    }
  }


  const createTaskBalls = (weekDay) => {
    let taskList = []
    let taskBalls = []
    tasks.forEach(day => 
      day.tasks.forEach(task => {
        if (task.status !== "completed" && (task.type !== "project" || showProjects === true) && (task.type !== "notification" || showOwnNotifications === true)) {
          if (task.courseId === params.cid || task.courseId === null || showAllCourses === true) {
            let returned = countOngoingTasks(task.start, day.date, weekDay, task)
            if (returned !== null) {
              taskList.push(returned)
            }
        }}}
      )
    )

    taskList.forEach(t => {
      let color = ""
      if (t.type === "notification") {color = "#7f9ec0"}
      else if (t.type === "exercise") {color = "#dbae00"}
      else if (t.type === "exam") {color = "#c189c0"}
      else if (t.type === "project") {color = "#d07e28"}
      taskBalls.push(
        <div style={{height: "7px", width: "7px", backgroundColor: color, marginLeft: "3px", marginBottom: "4px", marginTop: "3px", borderRadius: "50%"}}>
        
        </div>
      )
    })

    return (<div style={{display: "flex"}}>{taskBalls}</div>)
  }

  const createCalendarMonth = (index) => {
    let days = []
    let weekCount = 0
    
    for (let i = 0; i < 5; i++) {
      let calendarWeek = "calendar-w" + (i + 1)
      let mon = months[index].daysInCalendar[(0+weekCount)]
      let tue = months[index].daysInCalendar[(1+weekCount)]
      let wed = months[index].daysInCalendar[(2+weekCount)]
      let thu = months[index].daysInCalendar[(3+weekCount)]
      let fri = months[index].daysInCalendar[(4+weekCount)]
      let sat = months[index].daysInCalendar[(5+weekCount)]
      let sun = months[index].daysInCalendar[(6+weekCount)]
      const checkDayNumber = (weekDay) => {
        if (date === weekDay && !newNotification) {
          return {marginBottom: '3px', outline: 'solid grey 1px', backgroundColor: checkOngoingTasksForTheDate(weekDay)}
        } else if (newNotification) {
          return {marginBottom: '3px', backgroundColor: "#bfcfdf", cursor: "pointer"}
        } else {
          return {marginBottom: '3px', backgroundColor: checkOngoingTasksForTheDate(weekDay)}
        }
      }
      days.push(
        <div className={calendarWeek} key={calendarWeek}>
          <div className="calendar-day-cell"><div className="calendar-day"><div style={checkDayNumber(mon)} onClick={newNotification ? () => setNotificationPopup(mon) : null}><div>{mon.split(".")[0]}</div>{ongoingTasks === true && createTaskBalls(mon)}</div>{checkTasksForTheDate(mon)}</div></div>
          <div className="calendar-day-cell"><div className="calendar-day"><div style={checkDayNumber(tue)} onClick={newNotification ? () => setNotificationPopup(tue) : null}><div>{tue.split(".")[0]}</div>{ongoingTasks === true && createTaskBalls(tue)}</div>{checkTasksForTheDate(tue)}</div></div>
          <div className="calendar-day-cell"><div className="calendar-day"><div style={checkDayNumber(wed)} onClick={newNotification ? () => setNotificationPopup(wed) : null}><div>{wed.split(".")[0]}</div>{ongoingTasks === true && createTaskBalls(wed)}</div>{checkTasksForTheDate(wed)}</div></div>
          <div className="calendar-day-cell"><div className="calendar-day"><div style={checkDayNumber(thu)} onClick={newNotification ? () => setNotificationPopup(thu) : null}><div>{thu.split(".")[0]}</div>{ongoingTasks === true && createTaskBalls(thu)}</div>{checkTasksForTheDate(thu)}</div></div>
          <div className="calendar-day-cell"><div className="calendar-day"><div style={checkDayNumber(fri)} onClick={newNotification ? () => setNotificationPopup(fri) : null}><div>{fri.split(".")[0]}</div>{ongoingTasks === true && createTaskBalls(fri)}</div>{checkTasksForTheDate(fri)}</div></div>
          <div className="calendar-day-cell"><div className="calendar-day"><div style={checkDayNumber(sat)} onClick={newNotification ? () => setNotificationPopup(sat) : null}><div>{sat.split(".")[0]}</div>{ongoingTasks === true && createTaskBalls(sat)}</div>{checkTasksForTheDate(sat)}</div></div>
          <div className="calendar-day-cell"><div className="calendar-day"><div style={checkDayNumber(sun)} onClick={newNotification ? () => setNotificationPopup(sun) : null}><div>{sun.split(".")[0]}</div>{ongoingTasks === true && createTaskBalls(sun)}</div>{checkTasksForTheDate(sun)}</div></div>
        </div>
      )
      weekCount = weekCount + 7
    }
    return days
  }

  return (
    <div>
      <div style={{height: "auto"}}>
        <div style={{display: "flex", width: "100%"}}>
          <h3>Schedule your studies</h3>
          <HelpOutline style={{fontSize: "21px", color: "#b5b5b5", cursor: "pointer", marginTop: "auto", marginBottom: "auto", marginLeft: "5px"}} data-html={true} data-tip={ReactDOMServer.renderToString(
            <div style={{textAlign: "left"}}>
              <div style={{display: "flex", marginTop: "5px"}}><Notification style={{fontSize: "20px", color:"#e5ad00", marginRight: "3px"}}></Notification><p style={{marginTop: "auto", marginBottom: "auto"}}>Task is ongoing</p><br></br></div>
              <div style={{display: "flex", marginTop: "5px"}}><NotificationActive style={{fontSize: "20px", color:"#D22B2B", marginRight: "3px"}}></NotificationActive><p style={{marginTop: "auto", marginBottom: "auto"}}>Deadline is close</p><br></br></div>
              <div style={{display: "flex", marginTop: "5px"}}><AccessTime style={{fontSize: "20px", color:"#e5ad00", marginRight: "3px"}}></AccessTime><p style={{marginTop: "auto", marginBottom: "auto"}}>Task is upcoming</p><br></br></div>
              <div style={{display: "flex", marginTop: "5px"}}><Clear style={{fontSize: "20px", color: "#D22B2B", marginRight: "3px"}}></Clear><p style={{marginTop: "auto", marginBottom: "auto"}}>Task is failed</p><br></br></div>
            </div>
          )} data-class="my-tooltip" data-place="bottom" data-background-color={"white"} data-border={true} data-border-color="#eaeaea" data-text-color="black" data-effect="solid">
          </HelpOutline>
          <ReactTooltip/>
        </div>
        <div style={{display: "block", marginBottom:"3px", height:"auto", marginBottom:"30px"}}>
          <div style={{display: "flex", width: "100%", backgroundColor:"#eaeaea"}}>
            <h4 style={{marginTop:"5px", marginBottom:"5px", marginLeft:"3px", fontSize:"14px",display:"flex", cursor: "pointer"}} onClick={() => setOngoingTasksSelected(ongoingTasksSelected ? false : true)}>
              {ongoingTasksSelected ? <ArrowDropdown style={{fontSize:"20px"}}></ArrowDropdown> : <ArrowRight style={{fontSize:"20px"}}></ArrowRight>}
              <div>Ongoing tasks</div>
            </h4>
          </div>
          <div style={{display: "flex", width: "100%", backgroundColor:"white"}}>
            {ongoingTasksSelected === true && <OngoingTasks courses={courses} tasks={tasks} date={date} reRender={reRender}></OngoingTasks>}
          </div>
          <div style={{display: "flex", width: "100%", backgroundColor:"#eaeaea"}}>
            <h4 style={{marginTop:"5px", marginBottom:"5px", marginLeft:"3px", fontSize:"14px",display:"flex", cursor: "pointer"}} onClick={() => setUpcomingTasksSelected(upcomingTasksSelected ? false : true)}>
              {upcomingTasksSelected ? <ArrowDropdown style={{fontSize:"20px"}}></ArrowDropdown> : <ArrowRight style={{fontSize:"20px"}}></ArrowRight>}
              <div>Upcoming tasks</div>
            </h4>
          </div>
          <div style={{display: "flex", width: "100%", backgroundColor:"white"}}>
          {upcomingTasksSelected === true && <UpcomingTasks tasks={tasks} date={date}></UpcomingTasks>}
          </div>
        </div>
        {notificationPopup === null &&
        <div>
        <div style={{display: "flex", width:"100%", backgroundColor:"#eaeaea", marginBottom:"2px", height:"auto"}}>
          <div style={{display: "flex", width: "33.33%"}}>
            <h4 style={{marginTop:"5px", marginBottom:"5px", marginLeft:"5px", fontSize:"14px"}}>Calendar</h4>
          </div>
          <div style={{display: "flex", width: "33.33%"}}>
            <button className="calendar-arrow-buttons" onClick={()=>changeMonthIndex("previous")}><ArrowBack></ArrowBack></button>
            <h5 style={{marginTop:"7px", marginBottom:"5px"}}>{months[monthIndex].month}</h5>
            <button className="calendar-arrow-buttons" onClick={()=>changeMonthIndex("next")}><ArrowForward></ArrowForward></button>
          </div>
          <div style={{display: "flex", width: "33.33%", justifyContent: "right", marginRight: "3px"}}>
            <button className="new-notification-button" onClick={() => setNewNotification(newNotification ? false : true)}>
              {newNotification ? <><Clear style={{fontSize: "12px", marginTop: "auto", marginBottom: "auto"}}></Clear><div style={{marginTop: "auto", marginBottom: "auto"}}>Cancel notification</div></>
              :
              <><Add style={{fontSize: "12px", marginTop: "auto", marginBottom: "auto"}}></Add><div style={{marginTop: "auto", marginBottom: "auto"}}>New notification</div></>
              }
            </button>
          </div>
        </div>
        <div className="calendar-grid">
          <div className="calendar-h">
            <div className="calendar-h-cell">Mon</div>
            <div className="calendar-h-cell">Tue</div>
            <div className="calendar-h-cell">Wed</div>
            <div className="calendar-h-cell">Thu</div>
            <div className="calendar-h-cell">Fri</div>
            <div className="calendar-h-cell">Sat</div>
            <div className="calendar-h-cell">Sun</div>
          </div>
          {createCalendarMonth(monthIndex)}
        </div>
        <div style={{display: "flex"}}>
          <div style={{display: "flex", marginTop: "10px", justifyContent: "space-between", width: "100%"}}>
            <div style={{display: "flex"}}>
              <button className="show-all-courses-button" onClick={() => setShowAllCourses(showAllCourses ? false : true)}><div className="calendar-checkbox">{showAllCourses && <Clear style={{fontSize: "10px", marginTop: "auto", marginBottom: "auto"}}></Clear>}</div><div style={{marginTop: "auto", marginBottom: "auto", fontSize: "12px"}}>All courses</div></button>
              <HelpOutline style={{fontSize: "17px", color: "#b5b5b5", cursor: "pointer"}} data-html={true} data-tip={ReactDOMServer.renderToString(
                  <div>
                    When you are on the course page, you are able to filter out other courses if you wish.
                  </div>
                )} data-class="my-tooltip" data-place="bottom" data-background-color={"white"} data-border={true} data-border-color="#eaeaea" data-text-color="black" data-effect="solid">
              </HelpOutline>
              <ReactTooltip/>
            </div>
            <div style={{display: "flex"}}>
              <button className="show-own-notifications-button" onClick={() => setShowProjects(showProjects ? false : true)}><div className="calendar-checkbox">{showProjects && <Clear style={{fontSize: "10px", marginTop: "auto", marginBottom: "auto"}}></Clear>}</div><div style={{marginTop: "auto", marginBottom: "auto", fontSize: "12px"}}>Projects</div></button>
            </div>
            <div style={{display: "flex"}}>
              <button className="show-own-notifications-button" onClick={() => setOngoingTasks(ongoingTasks ? false : true)}><div className="calendar-checkbox">{ongoingTasks && <Clear style={{fontSize: "10px", marginTop: "auto", marginBottom: "auto"}}></Clear>}</div><div style={{marginTop: "auto", marginBottom: "auto", fontSize: "12px"}}>Ongoing tasks</div></button>
              <HelpOutline style={{fontSize: "17px", color: "#b5b5b5", cursor: "pointer"}} data-html={true} data-tip={ReactDOMServer.renderToString(
                  <div>
                    The balls show what types of tasks are ongoing on a given day.
                  </div>
                )} data-class="my-tooltip" data-place="bottom" data-background-color={"white"} data-border={true} data-border-color="#eaeaea" data-text-color="black" data-effect="solid">
              </HelpOutline>
              <ReactTooltip/>
            </div>
            <div style={{display: "flex"}}>
              <button className="show-own-notifications-button" onClick={() => setShowOwnNotifications(showOwnNotifications ? false : true)}><div className="calendar-checkbox">{showOwnNotifications && <Clear style={{fontSize: "10px", marginTop: "auto", marginBottom: "auto"}}></Clear>}</div><div style={{marginTop: "auto", marginBottom: "auto", fontSize: "12px"}}>Own notifications</div></button>
            </div>
          </div>
        </div>
        </div>}
      </div>
      {notificationPopup !== null &&
      <div style={{height: "auto"}}>
        <div style={{display: "flex"}}>
          <div style={{display: "flex"}}>
            <h3>New notification  {notificationPopup}</h3>
          </div>
          <Clear style={{marginLeft: "auto", marginTop: "auto", marginBottom: "auto", fontSize: "32px", cursor: "pointer"}} onClick={() => setNotificationPopup(null)}></Clear>
        </div>
        <div style={{width: "100%", backgroundColor: "white"}}>
        <div style={{display: "flex"}}>
          <h4 className="new-notification-title">Title</h4>
        </div>
        <div style={{display: "flex"}}>
          <input className="new-notification-input" onChange={e => setNotificationTitle(e.target.value)}></input>
        </div>
        <div style={{display: "flex"}}>
          <h4 className="new-notification-title">Time</h4>
        </div>
        <div style={{display: "flex"}}>
          <input className="new-notification-input" onChange={e => setNotificationTime(e.target.value)}></input>
        </div>
        <div style={{display: "flex"}}>
          <h4 className="new-notification-title">Estimated Hours</h4>
        </div>
        <div style={{display: "flex"}}>
          <input className="new-notification-input" onChange={e => setEstimatedHours(e.target.value)}></input>
        </div>
        <div style={{display: "flex"}}>
          <button className="create-new-notification" onClick={() => handleCreateNotification(notificationPopup)}>Create</button>
        </div>
        </div>
      </div>
      }
    </div>
  )
}

export default Calendar