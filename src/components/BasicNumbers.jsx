import "simple-table-core/styles.css";


const TableBase = ({ data })  =>{
  console.log(data, "nyt ond adaa")
  const TableRows = () =>{
    data.map((k,v)=>{
      return(<tbody><td>{k.key}</td><td>{k.value}</td></tbody>)
    })

  }


  return(
 <table>
    <thead>
      <th>Heuristic</th>
      <th>Count</th>
    </thead>
    <TableRows />
  </table>
  )
}


const BasicNumbers = ( props ) => {
  console.log(props, "nyt on prost")
  return(
    <TableBase data={props} />
  )
}

export default BasicNumbers;