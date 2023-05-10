import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ListView = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  
//   const [item, setItem] = useState([]); 
//   const [products, setProducts] = useState(item);

//   function handleSearchClick() {
//     if (searchVal === "") { setProducts(productList);
//        return; 
//       }
//     const filterBySearch = productList.filter((item) => {
//         if (item.toLowerCase()
//             .includes(searchVal.toLowerCase())) { return item; }
//     })
//     setProducts(filterBySearch);
// }
  useEffect(() => {
    setLoading(true);
    axios
      .get("https://rgl003-5000.csb.app/api/courses")
      .then((res) => {
        if (res.status === 200) {
          setData(res.data);
          setLoading(false);
        }
        console.log(res);
        console.log(res.data);
      })

      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = (id) => {
    console.log("id, ", id);
    setLoading(true);

    axios
      .delete(`https://rgl003-5000.csb.app/api/courses/${id}`)
      .then((res) => {
        console.log(res);

        if (res?.status === 200) {
          axios
            .get("https://rgl003-5000.csb.app/api/courses")
            .then((res) => {
              if (res.status === 200) {
                setData(res.data);
                setLoading(false);
              }
              console.log(res);
              console.log(res.data);
            })

            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (loading) {
    return (
      <div>
        <h2>Loading ..................</h2>
      </div>
    );
  }

  return (
    <div>
      <Link to={"/add"}>Add User</Link>
      <h2>User List</h2>
      <input type="search" placeholder="Search" />
      <div style={{height: 500, overflowY:"scroll"}}>
      <table class="table" >
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Mobile No</th>
          <th scope="col">Email</th>
          <th scope="col">Gender</th>
          <th scope="col">Action</th>
        </tr>
        {data.map((item, id) => (
          <tr key={id}>
            {console.log(item, ">>>>>>>>>>>>>")}
            <td>{item.name}</td>
            <td>{item.phoneNo}</td>
            <td>{item.email}</td>
            <td>{item.gender}</td>
            <td>
              <Link to={"/edit"} state={item} style={{ marginRight: 10 }}>
                Edit
              </Link>
              <button onClick={() => handleDelete(item?.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </table>
      </div>
    </div>
  );
};

export default ListView;
