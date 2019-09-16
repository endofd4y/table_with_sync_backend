import React, { Component } from 'react';
import './App.css';

const Row = { data: { fio: '', position: '', experience: '', age: '' } }
let records = []
let _id = []
let data = []
let fio = []
let age = []
let experience = []
let position = []
let __v = []

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      records: [],
      Edit: 'Edit',
      edit: {},
      isEditing: {},
      isAdd: false,
      isDelete: false,
      fio: '',
      age: '',
      experience: '',
      position: ''
    }
  }

  synсBackend = () => {
      fetch(`http://178.128.196.163:3000/api/records/`, {
      method: 'GET',
      body: undefined,
      headers: { 'Content-Type': 'application/json' }})
      .then(response => response.json())
      .then(records => this.setState({ records }))
    }
 
  convertData = () => {
    this.state.records.map((value, i) => {
      _id[i] = {_id: value._id}
    })
    this.state.records.forEach((value, i) => {
      data[i] = value.data
    })
    data.map((value, i) => {
      if (value !== undefined)
      fio[i] = {fio: value.fio}
      else fio[i] = {fio: " "}
    })
    data.map((value, i) => {
      if (value !== undefined)
      age[i] = {age: value.age}
      else age[i] = {age: " "}
    })
    data.map((value, i) => {
      if (value !== undefined)
      experience[i] = {experience: value.experience}
      else experience[i] = {experience: " "}
    })
    data.map((value, i) => {
      if (value !== undefined)
      position[i] = {position: value.position}
      else position[i] = {position: " "}
    })
    this.state.records.map((value, i) => {
      __v[i] = {__v: value.__v}
    })
    for (let i=0; i<Object.keys(_id).length; i++)
    records[i] = { ..._id[i], ...fio[i], ...age[i], ...experience[i], ...position[i], ...__v[i]}
  }

  addRow = async () => {
      Row.data.fio = this.state.fio
      Row.data.age = this.state.age
      Row.data.experience = this.state.experience
      Row.data.position = this.state.position
      await fetch(`http://178.128.196.163:3000/api/records/`, {
      method: 'PUT',
      body: JSON.stringify(Row),
      headers: { 'Content-Type': 'application/json' }})}

  deleteRow = async (id) => {
      await fetch(`http://178.128.196.163:3000/api/records/${id}`, {
      method: 'DELETE'})
      window.location.reload()
  }

//   deleteAll = () => {
//     _id.map(value => {
//         fetch(`http://178.128.196.163:3000/api/records/${Object.values(value)}`, {
//         method: 'DELETE'
//       })
//     })
//  }

  handleAddRow = () => {
    return (
      <tr>
        <td></td>
        <td><input placeholder='FIO' onChange={(e) => {this.setState({fio: e.target.value})}}></input></td>
        <td><input placeholder='Age' onChange={(e) => {this.setState({age: e.target.value})}}></input></td>
        <td><input placeholder='Experience' onChange={(e) => {this.setState({experience: e.target.value})}}></input></td>
        <td><input placeholder='Position' onChange={(e) => {this.setState({position: e.target.value})}}></input></td>
        <td></td>
        <td><button onClick={this.addRow}>Add</button></td>
        <td><button onClick={async () => window.location.reload()}>Delete</button></td>
      </tr>
    )
  }
  
  updateRow =  (i, _id) => {
    this.state.Edit === 'Edit' ? this.setState({ Edit: 'Apply' }) : this.setState({ Edit: 'Edit' })
    this.setState(state => {
      let new_isEditing = { ...state.isEditing }
      new_isEditing[i] = !new_isEditing[i]
      return {
        isEditing: new_isEditing
      }
    })
    if (this.state.Edit !== 'Edit')
      {Row.data.fio = this.state.edit
      fetch(`http://178.128.196.163:3000/api/records/${_id}`, {
        method: 'POST',
        body: Row,
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' }
      })
      alert('Запрос на Бэкэнд отправлен')}
  }

  renderTableData = () => {
    return records.map((row, i) => {
      return (
          <tr>
          <td>{row._id}</td>
          <td>{!this.state.isEditing[i] ? <span>{row.fio}</span> : <input onChange={
            (e) => this.setState({ edit: e.target.value })} defaultValue={row.fio}></input>}</td>
          <td>{!this.state.isEditing[i] ? <span>{row.age}</span> : <input onChange={
            (e) => this.setState({ edit: e.target.value })} defaultValue={row.age}></input>}</td>
          <td>{!this.state.isEditing[i] ? <span>{row.experience}</span> : <input onChange={
            (e) => this.setState({ edit: e.target.value })} defaultValue={row.experience}></input>}</td>
          <td>{!this.state.isEditing[i] ? <span>{row.position}</span> : <input onChange={
            (e) => this.setState({ edit: e.target.value })} defaultValue={row.position}></input>}</td>
          <td>{row.__v}</td>
          <td><button onClick={() => this.updateRow(i, row._id)}>{this.state.Edit}</button></td>
          <td><button onClick={() => this.deleteRow(row._id)}>Delete</button></td>
        </tr>
      )
    }
    )
  }

  renderThead = () => {
    return (
        <tr>
          <th>_id</th>
          <th>FIO</th>
          <th>Age</th>
          <th>Experience</th>
          <th>Position</th>
          <th>__v</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
    )
  }

  render() {
        return (
          <div>
            <table className='table'>
              <tbody>
                <button onClick={() => this.setState({ isAdd: true })}>AddRow</button>
                {/* <button onClick={this.deleteAll}>Delete ALL</button> */}
                <this.renderThead />
                {this.synсBackend()}
                {this.convertData()}
                {this.renderTableData()}
                {!this.state.isAdd ? <span></span> : <this.handleAddRow />}
              </tbody>
            </table>
          </div>
        )
      }
}

export default App;
