import nodemailer from 'nodemailer';
import config from '../../config';
import { mailSubject, mailTemplate } from '../../config/template';

export const sendVerifyCode = async (email:string) => {
    const randomCode = (Math.random() * 100000000).toString().slice(0, 6);
    const tpl = mailTemplate(randomCode);
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
            subject: mailSubject,
            html: tpl
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