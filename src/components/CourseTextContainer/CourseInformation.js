import React from 'react'

const CourseInformation = () => {

    return (
        <div>
        <h2>Course Information</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris turpis urna, efficitur non quam in, luctus venenatis arcu. Sed felis neque, imperdiet eget diam in, pulvinar convallis massa. Nullam elit ipsum, lacinia vel suscipit eu, pellentesque nec ligula. Curabitur pharetra ante mollis aliquet ultrices. Nulla facilisi. Nulla euismod urna velit, eget interdum nisl mollis sit amet. Praesent quis justo dignissim, egestas massa eget, vehicula est. Ut blandit ipsum nec justo porttitor, sed interdum felis venenatis. Duis vitae scelerisque tortor, in gravida urna. Sed tempus justo posuere volutpat blandit. Vivamus interdum, dui quis consequat tempor, augue neque aliquam eros, id pulvinar ante orci non diam. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce pulvinar metus vitae elementum lobortis. Morbi eu nisi dapibus, facilisis elit id, malesuada nibh. Curabitur ac libero a sapien fermentum sodales id eu quam.</p>
          <table style={{width: "auto", backgroundColor: "#eaeaea", marginTop: "30px", boxShadow: "2px 2px 5px 0px #d1d1d1"}}>
            <thead>
            <tr style={{height: "30px"}}>
              <th style={{width: "60px", textAlign: "center"}}>Points</th>
              <th style={{width: "60px", textAlign: "center"}}>Grade</th>
            </tr>
            </thead>
            <tbody>
            <tr style={{height: "44px"}}>
              <td style={{textAlign: "center", backgroundColor: "white"}}>20-24</td>
              <td style={{textAlign: "center", backgroundColor: "white"}}>1</td>
            </tr>
            <tr style={{height: "44px"}}>
              <td style={{textAlign: "center", backgroundColor: "white"}}>25-29</td>
              <td style={{textAlign: "center", backgroundColor: "white"}}>2</td>
            </tr>
            <tr style={{height: "44px"}}>
              <td style={{textAlign: "center", backgroundColor: "white"}}>30-34</td>
              <td style={{textAlign: "center", backgroundColor: "white"}}>3</td>
            </tr>
            <tr style={{height: "44px"}}>
              <td style={{textAlign: "center", backgroundColor: "white"}}>35-39</td>
              <td style={{textAlign: "center", backgroundColor: "white"}}>4</td>
            </tr>
            <tr style={{height: "44px"}}>
              <td style={{textAlign: "center", backgroundColor: "white"}}>40-44</td>
              <td style={{textAlign: "center", backgroundColor: "white"}}>5</td>
            </tr>
            </tbody>
          </table>
        </div>
    )

}

export default CourseInformation