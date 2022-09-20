import './App.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import UsersForm from './components/UsersForm'
import UsersList from './components/UsersList'

function App() {
  const [users, setUsers] = useState([]);
  const [userSelected, setUserSelected] = useState(null);

  useEffect(() => {
    axios
      .get("https://users-crud1.herokuapp.com/users/")
      .then((res) => setUsers(res.data))
      .catch(error => console.log(error.response));
  }, [])

  const getUsers = () => {
    axios
      .get("https://users-crud1.herokuapp.com/users/")
      .then((res) => setUsers(res.data))
      .catch(error => console.log(error.response));
  }

  const selectUser = (user) => {setUserSelected(user);}
  const deselectUser = () => setUserSelected(null);

  return (
    <div className="App">
      <h2>CRUD with axios, react hook form and API</h2>
      <UsersForm
        getUsers={getUsers}
        userSelected={userSelected}
        deselectUser={deselectUser}
      />
      <UsersList
        getUsers={getUsers}
        users={users}
        selectUser={selectUser}
      />
    </div>
  );
}

export default App