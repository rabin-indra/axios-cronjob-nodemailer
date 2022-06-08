// const fs = require("fs");
const axios = require("axios");
const nodemailer = require("nodemailer");
const cron = require("node-cron");
const express = require("express");
const app = express();
const router = express.Router();
const PORT = 8080;

app.get("/", (req, res) => {
    const getRandomJokes = async () => {
        let { data } = await axios.get("https://api.kanye.rest/", {
          headers: {
            accept: "application/json"
        
          }
         
        });
        res.json({
             Quote:
            data.quote
        });
        console.log(data.quote);
        var mailContent = data.quote;

        cron.schedule('* * * * *', async () => {
        let transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          auth: {
            user: 'viratcomputer8@gmail.com',
            pass: 'Rs9860907300'
          }
        });
        
        var mailOptions = {
          from: 'viratcomputer8@gmail.com',
          to: 'rabindra.sapkota321@gmail.com',
          subject: 'Sending Email using Node.js',
          text: 'Yo boy this mail is send using node.js. Hope you like it boy.',
          attachments:
          {
              filename: 'nodemail.txt',
              content: mailContent
          }

        };
        
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent successfully');
          }
        });
      })


      }
      getRandomJokes();
      
})
// cron.schedule('* * * * *', async () => {
//   console.log('---------------');
//   console.log('Running cron job');
// })
app.listen(PORT, ()=> {
    console.log(`Server is ligtening at http://localhost:${PORT}`);
})
