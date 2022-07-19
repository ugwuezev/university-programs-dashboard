
import "./table.css";

const Table = ({ data, title}) => {
  //console.log(data, "Table");

    return (
      <table>
        <tbody>
          <tr>
            <th>S/N</th>
            <th>{title}</th>
          </tr>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default Table;