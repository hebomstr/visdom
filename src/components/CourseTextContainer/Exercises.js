import React from 'react'
import Check from '@material-ui/icons/Check'
import Clear from '@material-ui/icons/Clear'
import { useParams, useNavigate } from "react-router-dom"

const Exercises = ({ course }) => {

    const params = useParams()
    const navigate = useNavigate()

    const handleNavigate = (string) => {
        navigate(`/course/${params.cid}/${string}`)
    }

    const createTableRows = () => {
        let rows = []

        course.exercises.map((exercise) => {
            let submitted = false
            let passed = null

            if (exercise.status === "completed") {
                submitted = true
                passed = true
            } else if (exercise.status === "returned") {
                submitted = true
            } else if (exercise.status === "failed") {
                submitted = true
                passed = false
            }

            rows.push(
                <tr style={{height: "44px"}} key={exercise.exerciseNumber}>
                    <td style={{backgroundColor: "white", paddingLeft: "6px", cursor: "pointer"}}><div onClick={() => handleNavigate(`exercise/${exercise.exerciseId}`)}>{exercise.exerciseNumber}. {exercise.exerciseTitle}</div></td>
                    <td style={{backgroundColor: "white", textAlign: "center"}}>{submitted && <Check style={{color: "green"}}></Check>}</td>
                    <td style={{backgroundColor: "white", textAlign: "center"}}>{passed && <Check style={{color: "green"}}></Check>}{passed === false && <Clear style={{color: "red"}}></Clear>}</td>
                    <td style={{backgroundColor: "white", textAlign: "center"}}>{exercise.studentPoints}/{exercise.exercisePoints}</td>
                    <td style={{backgroundColor: "white", textAlign: "center"}}>{exercise.deadline}</td>
                    <td style={{backgroundColor: "white", textAlign: "center"}}><a>See feedback</a></td>
                </tr>
            )
        })

        return (
            <tbody>
              {rows}
            </tbody>
        )
    }

    return (
        <div>
        <h2>Exercises</h2>
        <div style={{width: "100%", backgroundColor: "#eaeaea", boxShadow: "2px 2px 5px 0px #d1d1d1"}}>
          <table style={{width: "100%"}}>
          <thead>
            <tr style={{height: "30px"}}>
              <th style={{paddingLeft: "6px"}}>Exercise</th>
              <th style={{width: "90px", textAlign: "center"}}>Submitted</th>
              <th style={{width: "90px", textAlign: "center"}}>Passed</th>
              <th style={{width: "90px", textAlign: "center"}}>Points</th>
              <th style={{width: "110px", textAlign: "center"}}>Deadline</th>
              <th style={{width: "120px", textAlign: "center"}}>Feedback</th>
            </tr>
            </thead>
            {createTableRows()}
          </table>
        </div>
        </div>
    )

}

export default Exercises