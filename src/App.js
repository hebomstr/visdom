import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import CoursePage from './components/CoursePage/CoursePage'
import HomePage from './components/HomePage/HomePage'
import Footer from './components/Footer/Footer'
import AppBar from './components/AppBar/AppBar'
import courses from './courses.json'
import tasks from './tasks.json'
import dayIndexes from './helpers/dayIndexes.json'

const App = () => {

  const [dayIndex, setDayIndex] = useState(14)
  const [render, setRender] = useState(1)

  console.log('App render')

  const date = Object.keys(dayIndexes).find(key => dayIndexes[key] === dayIndex)

  const handleIndexChange = (action) => {
    if (action === "next") {
      setDayIndex(dayIndex + 1)
    } else if (action === "previous") {
      setDayIndex(dayIndex - 1)
    }
  }

  const reRender = () => {
    render === 1 ? setRender(2) : setRender(1)
  }

  return (
    <Router>
      <AppBar date={date}></AppBar>
      <Routes>
        <Route path="/" element={<HomePage tasks={tasks} courses={courses} date={date} handleIndexChange={handleIndexChange} reRender={reRender}></HomePage>}/>
        <Route path="/course/:cid/courseInformation" element={<CoursePage reRender={reRender} tasks={tasks} courses={courses} toggle={"courseInformation"} date={date}></CoursePage>}/>
        <Route path="/course/:cid/lectures" element={<CoursePage reRender={reRender} tasks={tasks} courses={courses} toggle={"lectures"} date={date}></CoursePage>}/>
        <Route path="/course/:cid/exercises" element={<CoursePage reRender={reRender} tasks={tasks} courses={courses} toggle={"exercises"} date={date}></CoursePage>}/>
        <Route path="/course/:cid/projects" element={<CoursePage reRender={reRender} tasks={tasks} courses={courses} toggle={"projects"} date={date}></CoursePage>}/>
        <Route path="/course/:cid/exams" element={<CoursePage reRender={reRender} tasks={tasks} courses={courses} toggle={"exams"} date={date}></CoursePage>}/>
        <Route path="/course/:cid/lecture/:lid" element={<CoursePage reRender={reRender} tasks={tasks} courses={courses} toggle={"lectures"} date={date}></CoursePage>}/>
        <Route path="/course/:cid/exercise/:eid" element={<CoursePage reRender={reRender} tasks={tasks} courses={courses} toggle={"exercises"} date={date}></CoursePage>}/>
      </Routes>
      <Footer></Footer>
    </Router>
  )
}

export default App