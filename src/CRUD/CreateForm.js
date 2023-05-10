import React, { useState } from "react";
import "./CreateList.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateForm = () => {
  const [name, setName] = useState();
  const [mobileNo, setMobileNo] = useState();
  const [email, setEmail] = useState();
  const [gender, setGender] = useState("Male");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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
      .post("https://rgl003-5000.csb.app/api/courses", data)
      .then((res) => {
        if (res.status === 200) {
          navigate("/");
          setLoading(false);
        }
        console.log(res);
        console.log(res.data);
      })

      .catch((err) => {
        console.log(err);
      });
  }

  if (loading) {
    return (
      <div>
        <h3>Loading .................</h3>
      </div>
    );
  }
  return (
    <div>
      <h2>Create Page</h2>
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
              <option value={"Female"}>Female</option>
            </select>
          </div>
        </div>
        <div className="submit">
          <button type="submit"> Submit </button>
        </div>
      </form>
    </div>
  );
};

export default CreateForm;
