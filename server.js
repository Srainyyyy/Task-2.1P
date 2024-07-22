
require('dotenv').config();


const express = require('express');
const mailgun = require('mailgun-js');


const mg = mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN });

// Express
const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());

// 定义欢迎邮件发送的POST路由
app.post('/welcome', (req, res) => {
    const { email } = req.body; 

    // 配置邮件内容
    const data = {
        from: 'no-reply@deakin.edu.au', 
        to: email, 
        subject: 'Welcome to DEV@Deakin!', 
        text: 'Thank you for joining DEV@Deakin!', 
        html: '<strong>Thank you for joining DEV@Deakin!</strong>' 
    };

    // 发送邮件
    mg.messages().send(data, (error, body) => {
        if (error) {
            console.error(error.toString());
            res.status(500).send('Failed to send email.'); // 失败
        } else {
            console.log(body);
            res.status(200).send('Welcome email sent!'); // 成功
        }
    });
});

// 启动服务器/监听
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
