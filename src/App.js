import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { Table } from 'react-bootstrap';

function App() {

  const [userData, setUserData] = useState([]);
  const [refreshCount, setRefreshCount] = useState(0);

  useEffect(() => {
    const getInfo = async() => {
      const response = await axios.get("https://randomuser.me/api");
      return response;
    }
    getInfo()
      .then((res) => {
        if(res.status === 200) {
          let { results } = res.data;
          if(localStorage.getItem("userinfo")) {
            let ls = JSON.parse(localStorage.getItem("userinfo"));
            ls = [...ls, ...results];
            setUserData(ls);
            localStorage.setItem("userinfo", JSON.stringify(ls));
          } else {
            setUserData(results);
            localStorage.setItem("userinfo", JSON.stringify(results));
          }
        } else {
          setUserData([]);
        }
      })
      .catch((err) => {
        setUserData([]);
        console.log(err);
      });
  }, [refreshCount]);

  const handleClearLocalStorage = () => {
    localStorage.removeItem("userinfo");
    setUserData([]);
  };

  return (
    <div className="App">
      <h1>
        User Information&nbsp;&nbsp;
        <button
          onClick={() => setRefreshCount( refreshCount + 1)}
        >Refresh&nbsp;
          <img 
            src="https://img.icons8.com/external-dreamstale-lineal-dreamstale/344/external-refresh-arrows-dreamstale-lineal-dreamstale.png" 
            width="20" 
            height="20"
            alt=""
          />
        </button>
      </h1>
      <h5>
        {`Refreshed ${refreshCount} times`}&nbsp;
        <button
          onClick={handleClearLocalStorage}
        >Clear LStorage</button>
      </h5>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {userData && 
            userData.length > 0 &&
            userData.map((user,index) => (
              <tr key={index}>
                <td>
                  {`${user.name.title} ${user.name.first} ${user.name.last}`}
                </td>
                <td>{user.email}</td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </div>
  );
}

export default App;
