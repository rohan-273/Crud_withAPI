import React, { useEffect, useState } from "react";
import "./CreateList.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const EditForm = () => {
  const [name, setName] = useState();
  const [mobileNo, setMobileNo] = useState();
  const [email, setEmail] = useState();
  const [gender, setGender] = useState();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  function formSubmit(e) {
    e.preventDefault();

    let data = {
      name: name,
      phoneNo: mobileNo,
      email: email,
      gender: gender,
    };
setLoading(true);
    axios
      .put(
        `https://rgl003-5000.csb.app/api/courses/${location?.state?.id}`,
        data
      )
      .then((res) => {
        
        if (res?.status === 200) {
          navigate("/");
          setLoading(false);
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  console.log(location?.state);

  useEffect(() => {
    if (location?.state) {
      setName(location?.state?.name);
      setMobileNo(location?.state?.phoneNo);
      setEmail(location?.state?.email);
      setGender(location?.state?.gender);
    }
  }, [location?.state]);

  if(loading) {
    return (
        <div>
            <h2>Loading .............</h2>
        </div>
    )
  }
  return (
    <div>
      <h2>Edit Page</h2>
      <form onSubmit={formSubmit}>
        <div className="list">
          <div>
            <label>Fullname:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="enter your name"
            />
          </div>
          <div>
            <label>Mobile No:</label>
            <input
              type="number"
              value={mobileNo}
              onChange={(e) => setMobileNo(e.target.value)}
              placeholder="enter your number"
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="enter your email"
            />
          </div>
          <div>
            <label>Gender:</label>
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value={"Male"}>Male</option>
              <option value={"Female"}> Female</option>
            </select>
          </div>
        </div>
        <div className="submit">
          <button type="submit">Update</button>
        </div>
      </form>
    </div>
  );
};

export default EditForm;
