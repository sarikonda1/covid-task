import React, { Fragment, useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import defaultImage from './images.png';
import editLogo from './edit.png';
import deleteLogo from './delete.png';
import { useForm } from "react-hook-form";
import axios from 'axios';
var BASE_URL = 'http://localhost:8000/api/';

const App = (props) => {
// function App() {
  const { register, handleSubmit, watch, errors, setValue, reset } = useForm();
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [users, setUsers] = useState([]);
  const [formValues, setFormValues] = useState({});

  useEffect(() =>{
     axios.get(BASE_URL+'users')
    .then(res => {
      console.log(res.data);
      setUsers(res.data);
    });
  }, []);


  useEffect(() =>{
    console.log(formValues);
    setValue('_id', formValues._id);  
    setValue('name', formValues.name);  
    setValue('age', formValues.age);  
    setValue('address', formValues.address);  
    setValue('city', formValues.city);  
    setValue('latitude', formValues.latitude);  
    setValue('longitude', formValues.longitude);  
    setValue('status', formValues.status ? 1 : 0);
 }, [formValues]);
  
  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
    console.log(e.target.files[0]);
  };
  function Edit(props){
    return (
      <img height="20" width="20" onClick={() => editUser(props)} src={editLogo}></img>
    );
  }
  
  function Delete(props){
    console.log(props);
    return (
      <img height="20" width="20" className="ml-4" onClick={() => deleteUser(props)} src={deleteLogo}></img>
    );
  }
  function editUser(e){
    console.log(e);
    axios.get(BASE_URL+'users/'+ e._id)
    .then(res => setFormValues(res.data));
  }
  
  function deleteUser(e){
    console.log(e);
    axios.delete(BASE_URL+'delete/'+ e._id)
    .then(res => window.location.reload(false));
  }
  const onSubmit = e => {
    const formData = new FormData();
    formData.append('file', file);
    for (const key in e) {
      if (key !== '_id'){
        console.log(key, e[key]);
        formData.append(key, e[key]);
      }
       
    }
    console.log(formValues._id);
    if (formValues._id){
      axios.put(BASE_URL+'updateUser', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      })
    } else{
      axios.post(BASE_URL+'createUser', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      }).then(res => window.location.reload(false));
    }
  };
  return (<>
    <div className="flex-container">
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row mx-auto default-bg-color">
        <div className="col-3">
          <div className="row custom-header ">
          COVID 19
          </div>
          <div className="row custom-grid">
            <div>
            <img src={defaultImage}></img>
            </div>
            <div> 
              <div className="row custom-changes"> 
                  <div className="col-sm">
                  <span className="btn btn-primary btn-file">
                    Choose File <input ref={register} onChange={onChange} type="file"/>
                  </span>
                  </div>
                  <div className="col-sm">
                  <div className="form-group">
                    {/* <label for="exampleFormControlSelect1">Example select</label> */}
                    <select required ref={register} name="status" className="form-control" id="exampleFormControlSelect1">
                      <option value="1">Positive</option>
                      <option value="0">Negative</option>
                    </select>
                  </div>
                  </div>
              </div>
            </div>    
          </div>
        </div>
        <div className="col-sm">
        <div className="row custom-header">
              Patient Registration Form
        </div>
        <div className="custom-padding">
          <div className="form-group mt-6">
              <div className="row">
                <div className="col-3 custom-label">
                </div>
                <div className="col-6">
                  <input hidden type="text" name="_id" ref={register} className="form-control"   placeholder="" />
                </div>
              </div>
            </div>
            <div className="form-group mt-6">
              <div className="row">
                <div className="col-3 custom-label">
                  <label className="control-label" htmlFor="exampleFormControlInput1">Name</label>
                </div>
                <div className="col-6">
                  <input  type="text" name="name" ref={register} className="form-control" required  placeholder="" />
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-3 custom-label">
                  <label className="control-label" >Age</label>
                </div>
                <div className="col-6">
                  <input required type="text" name="age" ref={register} className="form-control"  placeholder="" />
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-3 custom-label">
                  <label className="control-label" >Address</label>
                </div>
                <div className="col-6">
                <textarea required type="text" name="address" ref={register} className="form-control" id="exampleFormControlTextarea1" rows="2"></textarea>
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-3 custom-label">
                  <label className="control-label" >City</label>
                </div>
                <div className="col-6">
                  <input required type="text" name="city" ref={register} className="form-control"  placeholder="" />
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-3 custom-label">
                  <label className="control-label" >Latitude</label>
                </div>
                <div className="col-6">
                  <input required type="text" name="latitude" ref={register} className="form-control"  placeholder="" />
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-3 custom-label">
                  <label className="control-label" >Longitude</label>
                </div>
                <div className="col-6">
                  <input required type="text" name="longitude" ref={register} className="form-control"  />
                </div>
              </div>
            </div>
            </div>
          <div className="row justify-content-center">
            <div className="col-1">
            <button type="submit" className="btn btn-primary px-2">{formValues._id ? 'Update': 'Submit'}</button>
            </div>
            <div className="col-2">
            <button type="reset" onClick={() => setFormValues({})} className="btn btn-warning px-2">Reset</button>
            </div>
          </div>
        </div>
      </div>
      </form>
    </div>
    <table className="table table-bordered mt-2 default-bg-color">
  <thead>
    <tr>
      <th scope="col">Patient name</th>
      <th scope="col">Age</th>
      <th scope="col">Address</th>
      <th scope="col">City</th>
      <th scope="col">Latitude</th>
      <th scope="col">Longitude</th>
      <th scope="col">Status</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
    <tbody>
      { users && users.length && users.map(e => ( 
        <tr>
          <th >{e.name}</th>
          <th >{e.age}</th>
          <th >{e.address}</th>
          <th >{e.city}</th>
          <th >{e.latitude}</th>
          <th >{e.longitude}</th>
          <th >{e.status ? 'Positive': 'Negative'}</th>
          <td><Edit {...e}></Edit>  <Delete {...e}></Delete>
          </td>
        </tr>
      )) }
    </tbody>
</table>
  </>);
}

// export default App;
export default React.memo(App)
