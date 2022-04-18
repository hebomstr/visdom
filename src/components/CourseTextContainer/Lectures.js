import React from 'react'
import Check from '@material-ui/icons/Check'
import { useParams, useNavigate } from "react-router-dom"

const Lectures = ({ course }) => {

    const params = useParams()
    const navigate = useNavigate()

    const handleNavigate = (string) => {
        navigate(`/course/${params.cid}/${string}`)
    }

    const createTableRows = () => {
        let rows = []

        course.lectures.map((lecture) => {

            rows.push(
                <tr style={{height: "44px"}} key={lecture.lectureNumber}>
                    <td style={{backgroundColor: "white", paddingLeft: "6px", cursor: "pointer"}}><div onClick={() => handleNavigate(`lecture/${lecture.lectureId}`)}>{lecture.lectureNumber}. {lecture.lectureTitle}</div></td>
                    <td style={{backgroundColor: "white", textAlign: "center"}}>{lecture.deadline}</td>
                    <td style={{backgroundColor: "white", textAlign: "center"}}>{lecture.status === "completed" && <Check style={{color: "green"}}></Check>}</td>
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
        <h2>Lectures</h2>
        <div style={{width: "100%", backgroundColor: "#eaeaea", boxShadow: "2px 2px 5px 0px #d1d1d1"}}>
          <table style={{width: "100%"}}>
          <thead>
            <tr style={{height: "30px"}}>
              <th style={{paddingLeft: "6px"}}>Lecture</th>
              <th style={{width: "110px", textAlign: "center"}}>Deadline</th>
              <th style={{width: "90px", textAlign: "center"}}>Done</th>
            </tr>
            </thead>
            {createTableRows()}
          </table>
        </div>
        </div>
    )

}

export default Lectures