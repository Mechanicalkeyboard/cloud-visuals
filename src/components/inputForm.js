import React from 'react'
import 'react-table/react-table.css'
import ReactTable, {
  ReactTableDefaults
} from 'react-table'

class resultTable extends React.Component {
    render() {
        return (
<div>
<ReactTable 
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
/>
</div>
)}
}
export default resultTable