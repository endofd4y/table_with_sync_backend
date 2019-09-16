import React, { Component } from 'react';
import 'c:/js/node_modules/react-bootstrap-table/css/react-bootstrap-table.css'
import Form from './Form'


const editRow = () => {

}

export default props => (

  <table className="table">
      <thead>
          <tr>
              <th>_id</th>
              <th>FIO</th>
              <th>Age</th>
              <th>Experience</th>
              <th>Position</th>
              <th>__v</th>
          </tr>
      </thead>
      <tbody>
          { props.data.map(value =>(
              <tr>
                  <td>{value._id}</td>
                  <td>{value.data.fio}</td>
                  <td>{value.data.age}</td>
                  <td>{value.data.experience}</td>
                  <td>{value.data.position}</td>
                  <td>{value.__v}</td>
                  <td><button>Edit</button></td>
              </tr>
          ))}
      </tbody>
  </table>
)
