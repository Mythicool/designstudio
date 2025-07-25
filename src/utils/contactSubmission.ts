import { ContactForm, ContactFormSubmission } from '../data/types'

// Mock email service - in a real app, this would integrate with an email service
export async function submitContactForm(formData: ContactForm): Promise<ContactFormSubmission> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  // Create submission record
  const submission: ContactFormSubmission = {
    ...formData,
    id: generateSubmissionId(),
    submittedAt: new Date(),
    status: 'pending'
  }

  // In a real app, this would:
  // 1. Send email notification to business
  // 2. Send confirmation email to user
  // 3. Store submission in database
  // 4. Integrate with CRM system

  console.log('Contact form submitted:', submission)
  
  // Mock email sending
  await sendEmailNotification(submission)
  
  return submission
}

function generateSubmissionId(): string {
  return `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

async function sendEmailNotification(submission: ContactFormSubmission): Promise<void> {
  // Mock email notification
  console.log('Email notification sent for submission:', submission.id)
  
  // In a real implementation, you would use services like:
  // - SendGrid
  // - Mailgun
  // - AWS SES
  // - Nodemailer with SMTP
  
  const emailContent = {
    to: 'hello@designstudio.com', // Business email
    subject: `New Contact Form Submission - ${submission.projectType}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${submission.name}</p>
      <p><strong>Email:</strong> ${submission.email}</p>
      <p><strong>Company:</strong> ${submission.company || 'Not provided'}</p>
      <p><strong>Project Type:</strong> ${submission.projectType}</p>
      <p><strong>Budget:</strong> ${submission.budget}</p>
      <p><strong>Timeline:</strong> ${submission.timeline || 'Not specified'}</p>
      <p><strong>Message:</strong></p>
      <p>${submission.message}</p>
      <p><strong>Submitted:</strong> ${submission.submittedAt.toLocaleString()}</p>
      ${submission.attachments && submission.attachments.length > 0 ? 
        `<p><strong>Attachments:</strong> ${submission.attachments.length} file(s)</p>` : 
        ''
      }
    `
  }

  // Mock confirmation email to user
  const confirmationEmail = {
    to: submission.email,
    subject: 'Thank you for contacting us!',
    html: `
      <h2>Thank you for your inquiry!</h2>
      <p>Hi ${submission.name},</p>
      <p>We've received your message about your ${submission.projectType} project and will get back to you within 24 hours.</p>
      <p>Here's a summary of your submission:</p>
      <ul>
        <li><strong>Project Type:</strong> ${submission.projectType}</li>
        <li><strong>Budget Range:</strong> ${submission.budget}</li>
        <li><strong>Timeline:</strong> ${submission.timeline || 'To be discussed'}</li>
      </ul>
      <p>Best regards,<br>The Design Studio Team</p>
    `
  }

  console.log('Business notification email:', emailContent)
  console.log('User confirmation email:', confirmationEmail)
}

// File upload handling
export async function uploadAttachments(files: File[]): Promise<string[]> {
  // In a real app, this would upload files to cloud storage
  // and return the URLs
  
  const uploadPromises = files.map(async (file) => {
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Mock file URL - in reality, this would be from your cloud storage
    return `https://storage.example.com/uploads/${Date.now()}_${file.name}`
  })

  return Promise.all(uploadPromises)
}