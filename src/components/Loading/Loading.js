import React from 'react'
import './Loading.css'

const Loading = () => {

    return (
        <div style={{display: "flex", width: "40px", justifyContent: "space-evenly", marginTop: "auto", marginBottom: "auto", marginLeft: "10px"}}>
            <div className="first-ball"></div>
            <div className="second-ball"></div>
            <div className="third-ball"></div>
        </div>
    )

}

export default Loading