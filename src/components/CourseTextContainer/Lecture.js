import React, { useState } from 'react'
import { useParams, useNavigate } from "react-router-dom"
import Check from '@material-ui/icons/Check'

const Lecture = ({ course }) => {

    const params = useParams()
    const navigate = useNavigate()

    const lecture  = course.lectures.find(e => e.lectureId === params.lid)

    const handleNavigate = (string) => {
        navigate(`/course/${params.cid}/${string}`)
    }

    return (
        <div>
            <h2>{lecture.lectureNumber}. {lecture.lectureTitle}</h2>
            <div style={{backgroundColor: "lightblue", opacity:"0.2", width: "100%", height: "500px", marginBottom:"30px"}}>

            </div>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi iaculis, nunc sit amet rhoncus gravida, sem erat luctus ante, non vestibulum lorem odio ac mi. Phasellus fermentum urna non hendrerit facilisis. Mauris suscipit scelerisque magna id venenatis. Integer mollis velit quis fermentum congue. Duis ac mauris id tortor vulputate gravida ultricies id felis. Pellentesque interdum libero eu malesuada finibus. Phasellus quis metus arcu. Suspendisse eget purus dui. Curabitur est ex, pharetra vel lorem nec, tincidunt malesuada nulla. Interdum et malesuada fames ac ante ipsum primis in faucibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi iaculis, nunc sit amet rhoncus gravida, sem erat luctus ante, non vestibulum lorem odio ac mi. Phasellus fermentum urna non hendrerit facilisis. Mauris suscipit scelerisque magna id venenatis. Integer mollis velit quis fermentum congue. Duis ac mauris id tortor vulputate gravida ultricies id felis. Pellentesque interdum libero eu malesuada finibus. Phasellus quis metus arcu. Suspendisse eget purus dui. Curabitur est ex, pharetra vel lorem nec, tincidunt malesuada nulla. Interdum et malesuada fames ac ante ipsum primis in faucibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi iaculis, nunc sit amet rhoncus gravida, sem erat luctus ante, non vestibulum lorem odio ac mi. Phasellus fermentum urna non hendrerit facilisis. Mauris suscipit scelerisque magna id venenatis. Integer mollis velit quis fermentum congue. Duis ac mauris id tortor vulputate gravida ultricies id felis.</p>
        </div>
    )

}

export default Lecture