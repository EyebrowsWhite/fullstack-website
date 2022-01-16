import nodemailer from 'nodemailer';
import config from '../config';

const sendVerifyCode = async (email:string) => {
    const randomCode = (Math.random() * 100000000).toString().slice(0, 6);
    const mailTemplate = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                .box {
                    margin: 20px;
                }
                .content {
                    font-size: 18px;
                }
                .action {
                    font-size: 24px;
                    color: chocolate;
                }
                .verify-code {
                    font-size: 24px;
                    color: dodgerblue;
                    letter-spacing: 3px;
                }
                .addition p {
                    font-size: 10px;
                }
                .help {
                    font-size: 8px;
                }
                .website {
                    text-decoration: none;
                    font-size: 10px;
                    color: blue;
                }
            </style>
        </head>
        <body>
            <main>
                <div class="box">
                    <p class="content">
                        您好: 您正在进行
                        <span class="action">
                            注册用户
                        </span>
                        操作，您的验证码是
                        <span class="verify-code">
                            ${randomCode}
                        </span>
                        ，请在收到邮件后半小时内输入。
                    </p>
                    <br>
                    <div class="addition">
                        <p>如非本人操作，请忽略，请注意保护个人信息。</p>
                        <br>
                        <p>此邮件为系统自动发送，请勿回复</p>
                        <br>
                        <a class="website" href="https://www.eyebrow.top">白眉居</a>
                        <br>
                        <p class="help">如有疑问请联系 eyebrowkang@qq.com</p>
                    </div>
                </div>
            </main>
        </body>
        </html>`;
    const transporter = nodemailer.createTransport({
        service: 'qq',
        port: 465,
        secure: true,
        auth: {
            user: config.mail.user,
            pass: config.mail.pass
        }
    });

    try {
        const res = await transporter.sendMail({
            from: config.mail.from,
            to: email,
            subject: '白眉居验证码',
            html: mailTemplate
        });
        if (res.messageId) {
            return randomCode;
        } else {
            return 'error';
        }
    } catch (e) {
        return 'error';
    }
};

export {
    sendVerifyCode,
};