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

// 使用JSON中间件解析请求体
app.use(express.json());

// 设置静态文件夹
app.use(express.static(path.join(__dirname, 'public')));

// 定义欢迎邮件发送的POST路由
app.post('/welcome', (req, res) => {
    const { email } = req.body; // 从请求体中获取email

    // 配置邮件内容
    const data = {
        from: 'no-reply@sandbox75b59d6609e1417aab93b15fffd4b0cf.mailgun.org', // 发送方邮箱
        to: email, // 接收方邮箱
        subject: 'Welcome to DEV@Deakin!', // 邮件主题
        text: 'Thank you for joining DEV@Deakin!', // 邮件正文（纯文本）
        html: '<strong>Thank you for joining DEV@Deakin!</strong>' // 邮件正文（HTML）
    };

    // 发送邮件
    mg.messages().send(data, (error, body) => {
        if (error) {
            console.error('Error:', error);
            res.status(500).send(`Failed to send email. Error: ${error.message}`); // 邮件发送失败响应
        } else {
            console.log('Body:', body);
            res.status(200).send('Welcome email sent!'); // 邮件发送成功响应
        }
    });
});

// 启动服务器，监听指定端口
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
