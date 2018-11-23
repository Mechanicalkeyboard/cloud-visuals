import React from 'react'
import ReactTable, { ReactTableDefaults } from 'react-table'

class jimberly extends React.Component {
    render (){
        return(

    <div>

<ReactTable 
// pivotBy = {
//   ['cluster']
// }
pageSizeOptions = {
  [5, 10, 15, 20, 100]
}
defaultPageSize = {
  15
}
data = {
    this.props.data
}
columns = {
    this.props.columns
}
getTdProps = {

  (state, rowInfo, column, instance) => {
    // There is a bug here, if you expand the pivot, it registers a click and performs the code below when it really shouldn't
    let object = {};
    if (rowInfo) {
      object = {
        style: {
          background: rowInfo.row.desired_count === 0 || rowInfo.row.desired_count > rowInfo.row.running_count ? '#F5B7B1' : 'white'
        }
      }
    }
    return object
  }
}
// getTrProps = {

//   (state, rowInfo, column, instance) => {
//     // There is a bug here, if you expand the pivot, it registers a click and performs the code below when it really shouldn't
//     let object = {};
//     // console.log(rowInfo)
//     if (rowInfo) {
//       return{

//         onClick: (e, handleOriginal) => {
//         //   console.log("Jonathan")
//           if(handleOriginal) {
//             handleOriginal()
//           }
//         //   console.log('shit')
//           this.background = '#00e0ff8f'             
//         }

//     }
//   }
//     else {
//       return object
//     }
    
//   }
// }

  />
  </div>
)}
}
export default jimberly