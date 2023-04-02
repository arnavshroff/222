const express = require("express");
const app = express();
const server = require("http").Server(app);
app.use(express.json())

var nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: 'arnavshroff3@gmail.com',
        pass: 'wleiodvoivauxyme',
    },
    secure: true,
});

app.post("/send-mail", (req, res) => {
    const to = req.body.to;
    const name = req.body.name;
    const amount = req.body.amount;
    const date = req.body.date;
    const mailData = {
        from: "arnavshroff3@gmail.com",
        to: to,
        subject: "Your payment is due!",
        html: ` <p>
                    Hello ${name},
                </p>
                <p>
                    This is a reminder that your payment of amount - ${amount} is due on date - ${date}
                </p>
                <p>
                    Please complete your dues before the due date to avoid any inconvenience.
                </p>
                <p>
                    Thanks and Regards,
                </p>`
    };
    transporter.sendMail(mailData, (error, info) => {
        if (error) {
            return console.log(error);
        }
        res.status(200).send({ message: "Sent...", message_id: info.messageId });
    });
})

server.listen(process.env.PORT || 3030);
