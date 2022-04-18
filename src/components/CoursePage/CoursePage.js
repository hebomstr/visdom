import React, { useState } from 'react'
import './CoursePage.css'
import Calendar from '../Calendar/Calendar'
import ProgressBar from '../ProgressBar/ProgressBar'
import CourseInformation from '../CourseTextContainer/CourseInformation'
import Exercises from '../CourseTextContainer/Exercises'
import Exercise from '../CourseTextContainer/Exercise'
import Lecture from '../CourseTextContainer/Lecture'
import Lectures from '../CourseTextContainer/Lectures'
import Check from '@material-ui/icons/Check'
import Clear from '@material-ui/icons/Clear'
import { useParams, useNavigate } from "react-router-dom"
import Loading from '../Loading/Loading'

const CoursePage = ({ reRender, months, tasks, toggle, courses, date }) => {

  const demoCommit = {
    "submissionNumber": 4,
    "commit":{
      "status": "completed",
      "commitTime": "00.00 at 00.00",
      "message": "Code is committed successfully.",
      "link": "https://link.to.commit"
    },
    "build": {
      "status": "completed",
      "buildTime": "00.00 at 00.00",
      "message": "Build was successful.",
      "link": "https://link.to.build"
    },
    "tests": {
      "status": "completed",
      "testTime": "00.00 at 00.00",
      "failedTests": [],
      "message": "All tests passed.",
      "link": "https://link.to.tests"
    },
    "results": {
      "status": "completed",
      "message": "Exercise completed!"
    }
  }

  ///null | inProgress | completed
  const [submissionStatus, setSubmissionStatus] = useState("null")
  ///for submission demo
  const [loading, setLoading] = useState("build")
  const [messageSent, setMessageSent] = useState(false)

  const params = useParams()
  const navigate = useNavigate()

  const course  = courses.find(c => c.id === params.cid)

  const handleNavigate = (string) => {
    navigate(`/course/${params.cid}/${string}`)
  }

  const getExercise = () => {
    return course.exercises.find(e => e.exerciseId === params.eid)
  }

  const handleInput = (event) => {
    inputValue = event.target.value
  }

  const getSubmissionColor = (status) => {
    if (status === "completed") {
      return "#9cad11"
    } else if (status === "failed") {
      return "#D22B2B"
    }
  }

  const getFailMessage = () => {
    let object = getExercise().gitSubmissions[0]
    if (object.commit.status === "failed") {
      return `Commit time: ${object.commit.commitTime}. Error message: ${object.commit.message} Link: ${object.commit.link}`
    } else if (object.build.status === "failed") {
      return `Build time: ${object.build.buildTime}. Error message: ${object.build.message} Link: ${object.build.link}`
    } else if (object.tests.status === "failed") {
      return `Test time: ${object.tests.testTime}. Error message: ${object.tests.message} Tests that failed: ${object.tests.failedTests}. Link: ${object.tests.link}`
    } else if (object.results.status === "failed") {
      return `Error message: ${object.results.message}`
    }
  }

  const demoSuccessfulCommit = () => {
    setSubmissionStatus("inProgress")
  }

  const setExerciseDone = () => {
    const c = courses.find(c => c.id === "EC")
    const e = c.exercises.find(e => e.exerciseId === "ECE2")
    e.gitSubmissions.unshift(demoCommit)
    setSubmissionStatus("null")
  }

  const sendMessage = () => {
    setMessageSent(true)
  }

  let inputValue = ""

  if (params.eid === "ECE2" && messageSent === false) {
    if (getExercise().gitSubmissions.length !== 0 && getExercise().status === "failed" && loading !== "completed") {
      inputValue = `Hi! I need some help with Exercise ${getExercise().exerciseNumber}. ${getFailMessage()}`
    }
  } 

  if (course === null) {
    return (
      <div>No Course Selected</div>
    )
  }

  return (
    <div className="coursepage-container">
      <div className="coursepage-course">
        <div className="coursepage-title-container">
          <h1>{course.title}</h1>
        </div>
        <div className="togglebutton-container">
          <button style={{width: "auto", borderRadius: "0", border: "none", backgroundColor: toggle === "courseInformation" ? "#7a9fc0" : "#becedf", height: "auto", cursor: "pointer", boxShadow: "2px 2px 5px 0px #d1d1d1", marginRight: "10px"}} onClick={() => handleNavigate("courseInformation")}>
            <div style={{fontSize: "14px", marginLeft: "5px", marginRight: "5px", marginTop: "5px", marginBottom: "5px", color: "white"}}>Course Information</div>
          </button>
          {course.lectures && <button style={{width: "auto", borderRadius: "0", border: "none", backgroundColor: toggle === "lectures" ? "#7a9fc0" : "#becedf", height: "auto", cursor: "pointer", boxShadow: "2px 2px 5px 0px #d1d1d1", marginRight: "10px"}} onClick={() => handleNavigate("lectures")}>
            <div style={{fontSize: "14px", marginLeft: "5px", marginRight: "5px", marginTop: "5px", marginBottom: "5px", color: "white"}}>Lectures</div>
          </button>}
          {course.exercises && <button style={{width: "auto", borderRadius: "0", border: "none", backgroundColor: toggle === "exercises" ? "#7a9fc0" : "#becedf", height: "auto", cursor: "pointer", boxShadow: "2px 2px 5px 0px #d1d1d1", marginRight: "10px"}} onClick={() => handleNavigate("exercises")}>
            <div style={{fontSize: "14px", marginLeft: "5px", marginRight: "5px", marginTop: "5px", marginBottom: "5px", color: "white"}}>Exercises</div>
          </button>}
          {course.projects && <button style={{width: "auto", borderRadius: "0", border: "none", backgroundColor: toggle === "projects" ? "#7a9fc0" : "#becedf", height: "auto", cursor: "pointer", boxShadow: "2px 2px 5px 0px #d1d1d1", marginRight: "10px"}} onClick={() => handleNavigate("projects")}>
            <div style={{fontSize: "14px", marginLeft: "5px", marginRight: "5px", marginTop: "5px", marginBottom: "5px", color: "white"}}>Projects</div>
          </button>}
          {course.exams && <button style={{width: "auto", borderRadius: "0", border: "none", backgroundColor: toggle === "exams" ? "#7a9fc0" : "#becedf", height: "auto", cursor: "pointer", boxShadow: "2px 2px 5px 0px #d1d1d1", marginRight: "10px"}} onClick={() => handleNavigate("exams")}>
            <div style={{fontSize: "14px", marginLeft: "5px", marginRight: "5px", marginTop: "5px", marginBottom: "5px", color: "white"}}>Exams</div>
          </button>}
        </div>
        <div className="course-text-container">
          {toggle === "courseInformation" && <CourseInformation></CourseInformation>}

          {toggle === "lectures" && params.lid === undefined && <Lectures course={course}></Lectures>}
          {toggle === "lectures" && params.lid !== undefined && <Lecture course={course}></Lecture>}
          {toggle === "exercises" && params.eid === undefined && <Exercises course={course}></Exercises>}
          {toggle === "exercises" && params.eid !== undefined && <Exercise course={course}></Exercise>}
        </div>
      </div>
      <div className="coursepage-widget-container">
        {params.eid === undefined &&
        <div className="coursepage-calendar-container">
          <ProgressBar course={course}></ProgressBar>
          <Calendar reRender={reRender} courses={courses} tasks={tasks} months={months} date={date}></Calendar>
        </div>}
        
        {params.eid !== undefined && getExercise().gitSubmissions &&
        <div className="coursepage-returnbox-container">
          <h2>Submission status for {getExercise().exerciseTitle} {getExercise().exerciseNumber}</h2>
          <h4>Deadline {getExercise().deadline}</h4>
          <p style={{marginBottom: "40px", textAlign: "justify"}}>Git submission instructions for this task are here. Git submission instructions for this task are here. Git submission instructions for this task are here. Git submission instructions for this task are here. Git submission instructions for this task are here.</p>
          {getExercise().gitSubmissions.length !== 0 && submissionStatus === "null" && <h3 style={{marginTop: "50px"}}>{getExercise().gitSubmissions[0].submissionNumber}. Submission</h3>}
          {getExercise().gitSubmissions.length !== 0 && submissionStatus === "inProgress" && <h3 style={{marginTop: "50px"}}>{getExercise().gitSubmissions[0].submissionNumber + 1}. Submission</h3>}
          {getExercise().exerciseId === "ECE2" && <button style={{marginBottom: "20px"}} onClick={() => demoSuccessfulCommit()}>Demo successful commit</button>}
          
          {submissionStatus === "null" && <div>
            <div style={{backgroundColor: getExercise().gitSubmissions.length === 0 ? "white" : getSubmissionColor(getExercise().gitSubmissions[0].commit.status), width: "100%", height: "45px",  borderRadius: "0.3rem", display: "flex"}}>
              {getExercise().gitSubmissions.length === 0 && <div style={{paddingTop: "10px", paddingLeft: "8px", color: "black"}}>1. Commit to git</div>}
              {getExercise().gitSubmissions.length !== 0 && <div style={{paddingTop: "10px", paddingLeft: "8px", color: "white"}}>1. Commit to git</div>}
              {getExercise().gitSubmissions.length !== 0 && getSubmissionColor(getExercise().gitSubmissions[0].commit.status) === "#9cad11" && <Check style={{color: "white", paddingTop: "10px", paddingLeft: "5px"}}></Check>}
              {getExercise().gitSubmissions.length !== 0 && getSubmissionColor(getExercise().gitSubmissions[0].commit.status) === "#D22B2B" && <Clear style={{color: "white", paddingTop: "10px", paddingLeft: "5px"}}></Clear>}
            </div>
            <p style={{fontSize: "14px", marginBottom:"30px", marginTop:"8px"}}>{getExercise().gitSubmissions.length === 0 ? "Exercise is not returned. See instructions on the top." : `${getExercise().gitSubmissions[0].commit.commitTime}. ${getExercise().gitSubmissions[0].commit.message} Link to git pipeline: ${getExercise().gitSubmissions[0].commit.link}`}</p>
          </div>}
          
          
          {submissionStatus === "null" && <div>
            <div style={{backgroundColor: getExercise().gitSubmissions.length === 0 ? "white" : getSubmissionColor(getExercise().gitSubmissions[0].build.status), width: "100%", height: "45px",  borderRadius: "0.3rem", display: "flex"}}>
              {getExercise().gitSubmissions.length === 0 && <div style={{paddingTop: "10px", paddingLeft: "8px", color: "black"}}>2. Build</div>}
              {getExercise().gitSubmissions.length !== 0 && <div style={{paddingTop: "10px", paddingLeft: "8px", color: "white"}}>2. Build</div>}
              {getExercise().gitSubmissions.length !== 0 && getSubmissionColor(getExercise().gitSubmissions[0].build.status) === "#9cad11" && <Check style={{color: "white", paddingTop: "10px", paddingLeft: "5px"}}></Check>}
              {getExercise().gitSubmissions.length !== 0 && getSubmissionColor(getExercise().gitSubmissions[0].build.status) === "#D22B2B" && <Clear style={{color: "white", paddingTop: "10px", paddingLeft: "5px"}}></Clear>}
            </div>
            <p style={{fontSize: "14px", marginBottom:"30px", marginTop:"8px"}}>{getExercise().gitSubmissions.length === 0 ? "N/A" : `${getExercise().gitSubmissions[0].build.buildTime}. ${getExercise().gitSubmissions[0].build.message} Link to git pipeline: ${getExercise().gitSubmissions[0].build.link}`}</p>
          </div>}


          {submissionStatus === "null" && <div>
            <div style={{backgroundColor: getExercise().gitSubmissions.length === 0 ? "white" : getSubmissionColor(getExercise().gitSubmissions[0].tests.status), width: "100%", height: "45px",  borderRadius: "0.3rem", display: "flex"}}>
              {getExercise().gitSubmissions.length === 0 && <div style={{paddingTop: "10px", paddingLeft: "8px", color: "black"}}>3. Tests</div>}
              {getExercise().gitSubmissions.length !== 0 && <div style={{paddingTop: "10px", paddingLeft: "8px", color: "white"}}>3. Tests</div>}
              {getExercise().gitSubmissions.length !== 0 && getSubmissionColor(getExercise().gitSubmissions[0].tests.status) === "#9cad11" && <Check style={{color: "white", paddingTop: "10px", paddingLeft: "5px"}}></Check>}
              {getExercise().gitSubmissions.length !== 0 && getSubmissionColor(getExercise().gitSubmissions[0].tests.status) === "#D22B2B" && <Clear style={{color: "white", paddingTop: "10px", paddingLeft: "5px"}}></Clear>}
            </div>
            {getExercise().gitSubmissions.length !== 0 && getSubmissionColor(getExercise().gitSubmissions[0].tests.status) === "#9cad11" && <p style={{fontSize: "14px", marginBottom:"30px", marginTop:"8px"}}>{`${getExercise().gitSubmissions[0].tests.testTime}. ${getExercise().gitSubmissions[0].tests.message} Link to git pipeline: ${getExercise().gitSubmissions[0].tests.link}`}</p>}
            {getExercise().gitSubmissions.length !== 0 && getSubmissionColor(getExercise().gitSubmissions[0].tests.status) === "#D22B2B" && <p style={{fontSize: "14px", marginBottom:"30px", marginTop:"8px"}}>{`${getExercise().gitSubmissions[0].tests.testTime}. ${getExercise().gitSubmissions[0].tests.message} Tests that failed: ${getExercise().gitSubmissions[0].tests.failedTests}. Link to git pipeline: ${getExercise().gitSubmissions[0].tests.link}`}</p>}
            {getExercise().gitSubmissions.length === 0 && <p>N/A</p>}
          </div>}


          {submissionStatus === "null" && <div>
            <div style={{backgroundColor: getExercise().gitSubmissions.length === 0 ? "white" : getSubmissionColor(getExercise().gitSubmissions[0].results.status), width: "100%", height: "45px",  borderRadius: "0.3rem", display: "flex"}}>
              {getExercise().gitSubmissions.length === 0 && <div style={{paddingTop: "10px", paddingLeft: "8px", color: "black"}}>4. Finals results</div>}
              {getExercise().gitSubmissions.length !== 0 && <div style={{paddingTop: "10px", paddingLeft: "8px", color: "white"}}>4. Final results</div>}
              {getExercise().gitSubmissions.length !== 0 && getSubmissionColor(getExercise().gitSubmissions[0].results.status) === "#9cad11" && <Check style={{color: "white", paddingTop: "10px", paddingLeft: "5px"}}></Check>}
              {getExercise().gitSubmissions.length !== 0 && getSubmissionColor(getExercise().gitSubmissions[0].results.status) === "#D22B2B" && <Clear style={{color: "white", paddingTop: "10px", paddingLeft: "5px"}}></Clear>}
            </div>
            <p style={{fontSize: "14px", marginBottom:"30px", marginTop:"8px"}}>{getExercise().gitSubmissions.length === 0 ? "N/A" : getExercise().gitSubmissions[0].results.message}</p>
          </div>}

          {submissionStatus === "inProgress" &&
          <div>
            <div style={{backgroundColor: "#9cad11", width: "100%", height: "45px",  borderRadius: "0.3rem", display: "flex"}}>
              <div style={{paddingTop: "10px", paddingLeft: "8px", color: "white"}}>1. Commit to git</div>
              <Check style={{color: "white", paddingTop: "10px", paddingLeft: "5px"}}></Check>
            </div>
            <p style={{fontSize: "14px", marginBottom:"30px", marginTop:"8px"}}>{demoCommit.commit.commitTime} {demoCommit.commit.message} Link to git pipeline: {demoCommit.commit.link}</p>

            <div style={{backgroundColor: loading === "build" ? "white" : "#9cad11", width: "100%", height: "45px",  borderRadius: "0.3rem", display: "flex"}}>
              <div style={{paddingTop: "10px", paddingLeft: "8px", color: loading === "build" ? "black" : "white"}}>2. Build</div>
              {loading === "build" && <Loading onClick={setTimeout(function(){setLoading("tests")}, 5000)}></Loading>}
              {loading !== "build" && <Check style={{color: "white", paddingTop: "10px", paddingLeft: "5px"}}></Check>}
            </div>
            {loading === "build" && <p style={{fontSize: "14px", marginBottom:"30px", marginTop:"8px"}}>In progress.</p>}
            {loading !== "build" && <p style={{fontSize: "14px", marginBottom:"30px", marginTop:"8px"}}>{demoCommit.build.buildTime}. {demoCommit.build.message} Link to git pipeline: {demoCommit.build.link}</p>}

            <div style={{backgroundColor: loading !== "tests" && loading !== "build" ? "#9cad11" : "white", width: "100%", height: "45px",  borderRadius: "0.3rem", display: "flex"}}>
              <div style={{paddingTop: "10px", paddingLeft: "8px", color: loading !== "tests" && loading !== "build" ? "white" : "black"}}>3. Tests</div>
              {loading === "tests" && <Loading onClick={setTimeout(function(){setLoading("completed")}, 5000)}></Loading>}
              {loading !== "tests" && <Check style={{color: "white", paddingTop: "10px", paddingLeft: "5px"}}></Check>}
            </div>
            {loading !== "completed" && <p style={{fontSize: "14px", marginBottom:"30px", marginTop:"8px"}}>In progress.</p>}
            {loading === "completed" && <p style={{fontSize: "14px", marginBottom:"30px", marginTop:"8px"}}>{demoCommit.tests.testTime}. {demoCommit.tests.message} Link to git pipeline: {demoCommit.tests.link}</p>}

            <div style={{backgroundColor: loading === "completed" ? "#9cad11" : "white", width: "100%", height: "45px",  borderRadius: "0.3rem", display: "flex"}}>
              <div style={{paddingTop: "10px", paddingLeft: "8px", color: loading === "completed" ? "white" : "black"}}>4. Final results</div>
              {loading === "completed" && <Check style={{color: "white", paddingTop: "10px", paddingLeft: "5px"}} onClick={setExerciseDone()}></Check>}
            </div>
            {loading !== "completed" && <p style={{fontSize: "14px", marginBottom:"30px", marginTop:"8px"}}>In progress.</p>}
            {loading === "completed" && <p style={{fontSize: "14px", marginBottom:"30px", marginTop:"8px"}}>{demoCommit.results.message}</p>}
          </div>}

          <h3 style={{marginTop: "50px"}}>Previous submissions</h3>
          {getExercise().gitSubmissions.length > 1 && <div style={{overflow: "scroll", height: "230px"}}>{getExercise().gitSubmissions.map(s => {
          if (s.submissionNumber !== getExercise().gitSubmissions[0].submissionNumber || submissionStatus !== "null") {
             return (
              <div key={s.submissionNumber}>
                <h5 style={{marginBottom: "1px", marginTop: "30px"}}>
                  {`${s.submissionNumber}. Submission`}
                </h5>
                {s.commit.status === "failed" && <div><p>{`At ${s.commit.commitTime}`}<br></br>
                {`Link to git: ${s.commit.link}`}</p></div>}

                {s.build.status === "failed" && s.commit.status === "completed" && <div><p>{`At ${s.build.buildTime}`}<br></br>
                {`Link to git pipeline: ${s.build.link}`}</p></div>}

                {s.tests.status === "failed" && s.commit.status === "completed" && s.build.status === "completed" && <div><p>{`At ${s.tests.testTime}`}<br></br>
                {`Tests that failed: ${s.tests.failedTests}`}<br></br>
                {`Link to git pipeline: ${s.tests.link}`}</p></div>}
              </div>
             )
            }
          })}</div>}
          
          {getExercise().gitSubmissions.length < 2 && <div style={{fontSize: "13px"}}>No previous submissions.</div>}

          <h3 style={{marginTop: "50px"}}>Ask your assistant about this exercise</h3>
          <div style={{backgroundColor: "white",borderRadius: "0.3rem", height: "200px", width: "100%", marginTop: "3px", paddingTop: "10px"}}>
            {messageSent === true && <div style={{backgroundColor: "#cdd688", height: "auto", width: "400px", marginLeft: "auto", padding: "10px", borderRadius: "0.4rem", marginRight: "10px"}}>Hi! I need some help with Exercise {getExercise().exerciseNumber}. {getFailMessage()}</div>}
          </div>
          <textarea style={{borderRadius: "0.3rem", resize: "none", backgroundColor: "white", height: "70px", width: "100%", border: "none", padding: "0", margin: "0", marginTop: "3px", paddingTop: "8px", paddingBottom: "8px"}} 
          value={messageSent === false ? inputValue : ""} type="text" onChange={handleInput}>
          </textarea>
          <button style={{height: "30px", backgroundColor: "#9bad11", color: "white", border: "none", cursor: "pointer", paddingLeft: "20px", paddingRight: "20px", marginLeft: "auto"}} onClick={() => sendMessage()}>Send</button>
        </div>}


        {params.eid !== undefined && getExercise().submissions &&
        <div className="coursepage-returnbox-container">
          <h3>Return box for {getExercise().exerciseTitle} {getExercise().exerciseNumber}</h3>
          <h4>Deadline {getExercise().deadline}</h4>
        </div>}
      </div>
    </div>
  )
}

export default CoursePage
