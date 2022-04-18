import React from 'react'
import './MiniProgressBar.css'
import ReactTooltip from 'react-tooltip'
import ReactDOMServer from 'react-dom/server'
import Check from '@material-ui/icons/Check'
import Clear from '@material-ui/icons/Clear'
import { useNavigate } from "react-router-dom"

const MiniProgressBar = ({ course }) => {

  const navigate = useNavigate()

  const handleNavigate = (string) => {
    navigate(`/course/${string}`)
  }

    const calculateBarLength = (hours) => {
        const portion = hours/course.estimatedHours
        return 100*portion + "%"
    }
    
    const checkExerciseStatus = (exercise) => {
        if (exercise.status === "completed") {return "#cdd688"} 
        else if (exercise.status === "failed") {return "#D22B2B"} 
        else {return "#ffffff"}
      }

      const checkExamStatus = (exam) => {
        if (exam.status === "completed") {return "#cdd688"} 
        else if (exam.status === "failed") {return "#D22B2B"} 
        else {return "#ffffff"}
      }

      const checkProjectStatus = (project) => {
        if (project.status === "completed") {return "#cdd688"} 
        else if (project.status === "failed") {return "#D22B2B"} 
        else {return "#ffffff"}
      }
    
      const checkLectureStatus = (lecture) => {
        if (lecture.status === "completed") {return "#cdd688"}
        else {return "#ffffff"}
      }

      const returnTooltipColor = (status) => {
        if (status === "completed") {return "linear-gradient(to bottom, #cdd688 0% 33px, #9bad11 33px 100%)"}
        else {return "white"}
      }

      const returnTooltipArrowColor = (status) => {
        if (status === "completed") {return "#cdd688"}
        else {return "white"}
      }

  return (
    <div className="mini-progressbar-container">
        <div className="mini-progressbar">
          {course.lectures && course.lectures.map(lecture => {
              return (
                <React.Fragment key={lecture.lectureNumber}>
                <button onClick={() => handleNavigate(`${course.id}/lecture/${lecture.lectureId}`)} data-html={true} data-tip={ReactDOMServer.renderToString(
                  <div style={{textAlign: "left"}}>
                    <div style={{marginBottom: "10px", fontSize: "14px"}}>{lecture.lectureTitle} {lecture.lectureNumber}</div>
                    {lecture.status !== "completed" && <div style={{marginBottom: "1px", marginTop: "5px", color: "black"}}>{lecture.deadline}</div>}
                    {lecture.status === "completed" && <div style={{marginBottom: "1px", color: "white"}}><Check style={{fontSize: "12px"}}></Check> Done</div>}
                  </div>
                )} data-class="my-tooltip" data-place="bottom" data-background-color={returnTooltipColor(lecture.status)} data-border-color="#9bad11" data-border={true} data-arrow-color={returnTooltipArrowColor(lecture.status)} data-text-color="black" data-effect="solid" style={{width: calculateBarLength(lecture.estimatedHours), height: "100%", cursor: "pointer", margin: "0", padding: "0", borderRadius: "0", border: "#a0a863 solid 1px", backgroundColor: checkLectureStatus(lecture)}}>
                {lecture.status === "completed" && <Check style={{fontSize: "12px", color: "white"}}></Check>}
                </button>
                <ReactTooltip/>
              </React.Fragment>
            )})}
            {course.exercises && course.exercises.map(exercise => {
              return (
              <React.Fragment key={exercise.exerciseNumber}>
                <button onClick={() => handleNavigate(`${course.id}/exercise/${exercise.exerciseId}`)} data-html={true} data-tip={ReactDOMServer.renderToString(
                  <div style={{textAlign: "left"}}>
                    <div style={{marginBottom: "10px", fontSize: "14px"}}>{exercise.exerciseTitle} {exercise.exerciseNumber}</div>
                    {exercise.status === "null" && <div style={{marginBottom: "1px", color: "black"}}>Not submitted</div>}
                    {exercise.status === "returned" && <div style={{marginBottom: "1px", color: "black"}}><Check style={{fontSize: "12px"}}></Check> Submitted</div>}
                    {exercise.status === "failed" && <div style={{marginBottom: "1px", color: "black"}}><Clear style={{fontSize: "12px"}}></Clear> Failed</div>}
                    {exercise.status !== "completed" && <div style={{marginBottom: "1px", marginTop: "5px", color: "black"}}>{exercise.deadline}</div>}
                    {exercise.status === "completed" && <div style={{marginBottom: "1px", color: "white"}}><Check style={{fontSize: "12px"}}></Check> Passed</div>}
                    {exercise.status === "completed" && <div style={{marginBottom: "1px", color: "white"}}>Points: {exercise.studentPoints}/{exercise.exercisePoints}</div>}
                  </div>
                )} data-class="my-tooltip" data-place="bottom" data-background-color={returnTooltipColor(exercise.status)} data-border-color="#9bad11" data-border={true} data-arrow-color={returnTooltipArrowColor(exercise.status)} data-text-color="black" data-effect="solid" style={{width: calculateBarLength(exercise.estimatedHours), height: "100%", cursor: "pointer", margin: "0", padding: "0", borderRadius: "0", border: "#a0a863 solid 1px", backgroundColor: checkExerciseStatus(exercise)}}>
                {exercise.status === "completed" && <Check style={{fontSize: "12px", color: "white"}}></Check>}
                {exercise.status === "failed" && <Clear style={{fontSize: "12px", color: "white"}}></Clear>}
                </button>
                <ReactTooltip/>
              </React.Fragment>
            )})}
            {course.projects && course.projects.map(project => {
              return (
              <React.Fragment key={project.projectNumber}>
                <button onClick={() => handleNavigate(`${course.id}/projects`)} data-html={true} data-tip={ReactDOMServer.renderToString(
                  <div style={{textAlign: "left"}}>
                    <div style={{marginBottom: "20px"}}>{project.projectTitle} {project.projectNumber}</div>
                    <div style={{marginBottom: "5px"}}>{project.deadline}</div>
                  </div>
                )} data-class="my-tooltip" data-place="bottom" data-background-color={returnTooltipColor(project.status)} data-border-color="#9bad11" data-border={true} data-arrow-color={returnTooltipArrowColor(project.status)} data-text-color="black" data-effect="solid" style={{width: calculateBarLength(project.estimatedHours), height: "100%", cursor: "pointer", margin: "0", padding: "0", borderRadius: "0", border: "#a0a863 solid 1px", backgroundColor: checkProjectStatus(project)}}>
                {project.status === "completed" && <Check style={{fontSize: "12px", color: "white"}}></Check>}
                {project.status === "failed" && <Clear style={{fontSize: "12px", color: "white"}}></Clear>}
                </button>
                <ReactTooltip/>
              </React.Fragment>
            )})}
            {course.exams && course.exams.map(exam => {
              return (
              <React.Fragment key={exam.examNumber}>
                <button onClick={() => handleNavigate(`${course.id}/exams`)} data-html={true} data-tip={ReactDOMServer.renderToString(
                  <div style={{textAlign: "left"}}>
                    <div style={{marginBottom: "20px"}}>{exam.examTitle} {exam.examNumber}</div>
                    <div style={{marginBottom: "5px"}}>{exam.deadline}</div>
                  </div>
                )} data-class="my-tooltip" data-place="bottom" data-background-color={returnTooltipColor(exam.status)} data-border-color="#9bad11" data-border={true} data-arrow-color={returnTooltipArrowColor(exam.status)} data-text-color="black" data-effect="solid" style={{width: calculateBarLength(exam.estimatedHours), height: "100%", cursor: "pointer", margin: "0", padding: "0", borderRadius: "0", border: "#a0a863 solid 1px", backgroundColor: checkExamStatus(exam)}}>
                {exam.status === "completed" && <Check style={{fontSize: "12px", color: "white"}}></Check>}
                {exam.status === "failed" && <Clear style={{fontSize: "12px", color: "white"}}></Clear>}
                </button>
                <ReactTooltip/>
              </React.Fragment>
            )})}
        </div>
    </div>
  )
}

export default MiniProgressBar