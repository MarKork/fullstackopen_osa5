import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
   handleSubmit,
   handleUsernameChange,
   handlePasswordChange,
   username,
   password,
   usernameInLogin,
   passwordInLogin
  }) => {
  
  return (
    <form method="post" onSubmit={handleSubmit}>
      <div>
        username
        <input
        name='username'
        type='text' 
        {...usernameInLogin}
        />
      </div>
      <div>
        password
        <input
        name='password'
        type='password'
        {...passwordInLogin}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}
LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
}

export default LoginForm