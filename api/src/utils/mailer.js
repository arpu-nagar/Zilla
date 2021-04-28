import aws from 'aws-sdk';
import mailer from 'nodemailer';

const config = new aws.Config({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

aws.config = config;

const transporter = mailer.createTransport({
    SES: new aws.SES(),
});

const sendEmail = async obj => {
    const to = obj.email;
    const from = 'Zilla <arpunagar@gmail.com>';
    transporter.sendMail({
        from,
        to,
        html: obj.html,
        subject: obj.subject,
    });
};

export default sendEmail;
