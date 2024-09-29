const { authClient } = require('../services/GrpcService');
const axios = require('axios');
const { registerUserSchema, loginUserSchema } = require('../schemas/UserSchema');

const registerUser = async (req, res) => {
  const { first_name, username, email, password } = req.body;

   const { error } = registerUserSchema.validate({ first_name, username, email, password });

   if (error) {
     return res.status(400).send(`Error de validación: ${error.details[0].message}`);
   }
   try {
     const endpointURL = `${process.env.WORKER_URL}/auth/register`;
     const request = {
      first_name: first_name,
      username: username,
      email: email,
      password: password
      };
     const response = await axios.post(endpointURL, request)
  
     res.send(response.data)
   } catch (err) {
      res.status(500).send('Error: ' + err.message);
    }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body; 
  const { error } = loginUserSchema.validate({ username, password });

  if (error) {
    return res.status(400).send(`Error de validación: ${error.details[0].message}`);
  }
  try {
    const endpointURL = `${process.env.WORKER_URL}/auth/login`;

    const request = {
        username: username,
        password: password
    };

    const response = await axios.post(endpointURL, request);
    
    res.send(response.data);
  } catch (err) {
    res.status(500).send('Error: ' + err.message);
  }
};


module.exports = { registerUser, loginUser };