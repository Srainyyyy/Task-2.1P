// 加载环境变量
require('dotenv').config();

// 引入Express框架和Mailgun邮件库
const express = require('express');
const mailgun = require('mailgun-js');
const path = require('path');

// 创建Mailgun实例
const mg = mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN });

// 创建Express应用
const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());


app.use(express.static(path.join(__dirname, 'public')));

// POST路由
app.post('/welcome', (req, res) => {
    const { email } = req.body; // 从请求体中获取email

  
    const data = {
        from: 'no-reply@deakin.edu.au', // 发送方邮箱
        to: email, // 接收方邮箱
        subject: 'Welcome to DEV@Deakin!', // 邮件主题
        text: 'Thank you for joining DEV@Deakin!', // 邮件正文（纯文本）
        html: '<strong>Thank you for joining DEV@Deakin!</strong>' // 邮件正文（HTML）
    };

    // 发送邮件
    mg.messages().send(data, (error, body) => {
        if (error) {
            console.error('Error:', error);
            res.status(500).send(`Failed to send email. Error: ${error.message}`); // 发送失败
        } else {
            console.log('Body:', body);
            res.status(200).send('Welcome email sent!'); // 发送成功
        }
    });
});

// 启动服务器，监听指定端口
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
