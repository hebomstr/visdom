import React, { useState } from 'react'
import { useParams, useNavigate } from "react-router-dom"
import Check from '@material-ui/icons/Check'

const Exercise = ({ course }) => {

    const params = useParams()
    const navigate = useNavigate()

    const exercise  = course.exercises.find(e => e.exerciseId === params.eid)

    const handleNavigate = (string) => {
        navigate(`/course/${params.cid}/${string}`)
    }

    return (
        <div>
            <h2>{exercise.exerciseNumber}. {exercise.exerciseTitle}</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi iaculis, nunc sit amet rhoncus gravida, sem erat luctus ante, non vestibulum lorem odio ac mi. Phasellus fermentum urna non hendrerit facilisis. Mauris suscipit scelerisque magna id venenatis. Integer mollis velit quis fermentum congue. Duis ac mauris id tortor vulputate gravida ultricies id felis. Pellentesque interdum libero eu malesuada finibus. Phasellus quis metus arcu. Suspendisse eget purus dui. Curabitur est ex, pharetra vel lorem nec, tincidunt malesuada nulla. Interdum et malesuada fames ac ante ipsum primis in faucibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi iaculis, nunc sit amet rhoncus gravida, sem erat luctus ante, non vestibulum lorem odio ac mi. Phasellus fermentum urna non hendrerit facilisis. Mauris suscipit scelerisque magna id venenatis. Integer mollis velit quis fermentum congue. Duis ac mauris id tortor vulputate gravida ultricies id felis. Pellentesque interdum libero eu malesuada finibus. Phasellus quis metus arcu. Suspendisse eget purus dui. Curabitur est ex, pharetra vel lorem nec, tincidunt malesuada nulla. Interdum et malesuada fames ac ante ipsum primis in faucibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi iaculis, nunc sit amet rhoncus gravida, sem erat luctus ante, non vestibulum lorem odio ac mi. Phasellus fermentum urna non hendrerit facilisis. Mauris suscipit scelerisque magna id venenatis. Integer mollis velit quis fermentum congue. Duis ac mauris id tortor vulputate gravida ultricies id felis.</p>
            
            {params.cid === "EC" &&
                <div>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi iaculis, nunc sit amet rhoncus gravida, sem erat luctus ante, non vestibulum lorem odio ac mi. Phasellus fermentum urna non hendrerit facilisis. Mauris suscipit scelerisque magna id venenatis. Integer mollis velit quis fermentum congue. Duis ac mauris id tortor vulputate gravida ultricies id felis. Pellentesque interdum libero eu malesuada finibus. Phasellus quis metus arcu. Suspendisse eget purus dui. Curabitur est ex, pharetra vel lorem nec, tincidunt malesuada nulla. Interdum et malesuada fames ac ante ipsum primis in faucibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi iaculis, nunc sit amet rhoncus gravida, sem erat luctus ante, non vestibulum lorem odio ac mi. Phasellus fermentum urna non hendrerit facilisis. Mauris suscipit scelerisque magna id venenatis. Integer mollis velit quis fermentum congue. Duis ac mauris id tortor vulputate gravida ultricies id felis.</p>
                <input style={{width: "100%", height: "40px", marginTop: "20px", marginBottom: "20px"}}></input>
                <h2>FAQ and Common Errors</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi iaculis, nunc sit amet rhoncus gravida, sem erat luctus ante, non vestibulum lorem odio ac mi. Phasellus fermentum urna non hendrerit facilisis. Mauris suscipit scelerisque magna id venenatis. Integer mollis velit quis fermentum congue. Duis ac mauris id tortor vulputate gravida ultricies id felis. Pellentesque interdum libero eu malesuada finibus. Phasellus quis metus arcu. Suspendisse eget purus dui. Curabitur est ex, pharetra vel lorem nec, tincidunt malesuada nulla. Interdum et malesuada fames ac ante ipsum primis in faucibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi iaculis, nunc sit amet rhoncus gravida, sem erat luctus ante, non vestibulum lorem odio ac mi. Phasellus fermentum urna non hendrerit facilisis. Mauris suscipit scelerisque magna id venenatis. Integer mollis velit quis fermentum congue. Duis ac mauris id tortor vulputate gravida ultricies id felis.</p>
                <h4>Test1</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi iaculis, nunc sit amet rhoncus gravida, sem erat luctus ante, non vestibulum lorem odio ac mi. Phasellus fermentum urna non hendrerit facilisis. Mauris suscipit scelerisque magna id venenatis. Integer mollis velit quis fermentum congue. Duis ac mauris id tortor vulputate gravida ultricies id felis. Pellentesque interdum libero eu malesuada finibus.</p>
                <h4>Test2</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi iaculis, nunc sit amet rhoncus gravida, sem erat luctus ante, non vestibulum lorem odio ac mi. Phasellus fermentum urna non hendrerit facilisis. Mauris suscipit scelerisque magna id venenatis. Integer mollis velit quis fermentum congue. Duis ac mauris id tortor vulputate gravida ultricies id felis. Pellentesque interdum libero eu malesuada finibus.</p>
                <h4>Test3</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi iaculis, nunc sit amet rhoncus gravida, sem erat luctus ante, non vestibulum lorem odio ac mi. Phasellus fermentum urna non hendrerit facilisis. Mauris suscipit scelerisque magna id venenatis. Integer mollis velit quis fermentum congue. Duis ac mauris id tortor vulputate gravida ultricies id felis. Pellentesque interdum libero eu malesuada finibus.</p>
                <h4>Test4</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi iaculis, nunc sit amet rhoncus gravida, sem erat luctus ante, non vestibulum lorem odio ac mi. Phasellus fermentum urna non hendrerit facilisis. Mauris suscipit scelerisque magna id venenatis. Integer mollis velit quis fermentum congue. Duis ac mauris id tortor vulputate gravida ultricies id felis. Pellentesque interdum libero eu malesuada finibus.</p>
                <h4>Test5</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi iaculis, nunc sit amet rhoncus gravida, sem erat luctus ante, non vestibulum lorem odio ac mi. Phasellus fermentum urna non hendrerit facilisis. Mauris suscipit scelerisque magna id venenatis. Integer mollis velit quis fermentum congue. Duis ac mauris id tortor vulputate gravida ultricies id felis. Pellentesque interdum libero eu malesuada finibus.</p>
                </div>
            }
        </div>
    )

}

export default Exercise