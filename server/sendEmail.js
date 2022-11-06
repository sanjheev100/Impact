const nodemailer = require('nodemailer')

module.exports = async (email, subject, text) => {
  try {
    const transport = nodemailer.createTransport({
      host: process.env.EMAILHOST,
      // service: process.env.EMAILSERVICE,
      // port: Number(process.env.EMAILPORT),
      secure: Boolean(process.env.EMAILSECURE),
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    })

    await transport.sendMail({
      from: process.env.NODEMAILER_EMAIL,
      to: process.env.OWNER_EMAIL,
      subject: subject,
      html: text,
    })

    console.log('email sent succesfully')
  } catch (error) {
    console.log('email error')
    console.log(error)
  }
}
