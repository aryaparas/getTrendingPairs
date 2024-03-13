import nodemailer from 'nodemailer';

export async function sendEmail(errorMessage) {
 let transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service provider
    auth: {
      user: 'your-email@example.com', // Your email address
      pass: 'your-password' // Your email password
    }
 });

 let mailOptions = {
    from: 'your-email@example.com',
    to: 'recipient-email@example.com',
    subject: 'Error in Node.js Application',
    text: errorMessage
 };

 try {
    let info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
 } catch (error) {
    console.error('Error sending email: ', error);
 }
}