import React from 'react'

const Profile = () => {
    const auth = localStorage.getItem('user');
  return (
    <div>
        <h1>
            Welcome, {JSON.parse(auth).name}!
            </h1>
            </div>
  )
}

export default Profile