import React from 'react'
import NavBar from '../components/commen/NavBar'
import Form from '../components/commen/Form'

const CreateUser = () => {
  return (
    <>
        <NavBar />
        <div>
            <Form url="/" role='create' />
        </div>
    </>
  )
}

export default CreateUser
