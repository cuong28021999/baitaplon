# baitaplon

install nodejs v10

Set up a React app with a Node.js server proxy in 1 project: https://www.twilio.com/blog/react-app-with-node-js-server-proxy

use terminal / command line
client: 
  - create-react-project: npx create-react-app <name>
  - install dependencies:
      + npm install --save @hapi/joi
      + npm install --save axios
      + npm install --save bootstrap
      + npm install --save reactstrap
      + npm install --save jsonwebtoken
      + npm install --save js-cookie
  
server:
  - install dependencies:
    + npm install --save @hapi/joi 
    + npm install --save bcryptjs
    + npm install --save cors
    + npm install --save dotenv
    + npm install --save express
    + npm install --save jsonwebtoken
    + npm install --save mongoose
    + npm install --save shortid
    + npm install --save-dev nodemon
      
   - create file .env in root folder of project, copy: 
    MONGO_URL=mongodb://localhost/test-awesome
    TOKEN_SECRET=qweqweqwasczcas
