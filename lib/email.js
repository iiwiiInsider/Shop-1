import nodemailer from 'nodemailer'

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }
  return String(text || '').replace(/[&<>"']/g, c => map[c])
}

export async function sendWelcomeEmail(toEmail, userName, businessName){
  const user = process.env.GMAIL_USER
  const pass = process.env.GMAIL_APP_PASSWORD
  if(!user || !pass) {
    console.warn('Gmail credentials not configured. Skipping email.')
    return
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user,
      pass
    }
  })

  const safeName = escapeHtml(userName || 'there')
  const safeBusiness = escapeHtml(businessName || 'Business')
  const html = `
    <div>
      <h2>Welcome to ${safeBusiness}</h2>
      <p>Hello ${safeName},</p>
      <p>Thanks for signing in to ${safeBusiness}. You can now explore and list properties in Cape Town.</p>
      <p>— ${safeBusiness} team</p>
    </div>
  `

  try{
    const info = await transporter.sendMail({
      from: user,
      to: toEmail,
      subject: `Welcome to ${businessName}`,
      html
    })
    console.info('Welcome email sent', { to: toEmail, messageId: info.messageId })
  }catch(err){
    console.error('Error sending welcome email', err)
    throw err
  }
}
