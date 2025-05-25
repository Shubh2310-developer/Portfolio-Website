import emailjs from '@emailjs/browser'

export interface EmailData extends Record<string, unknown> {
  from_name: string
  from_email: string
  message: string
}

export const emailConfig = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
}

export const sendEmail = async (data: EmailData): Promise<{ success: boolean; error?: string }> => {
  try {
    await emailjs.send(
      emailConfig.serviceId,
      emailConfig.templateId,
      data,
      emailConfig.publicKey
    )
    return { success: true }
  } catch (error) {
    console.error('Error sending email:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send email',
    }
  }
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validateMessage = (message: string): boolean => {
  return message.trim().length >= 10
}

export const validateName = (name: string): boolean => {
  return name.trim().length >= 2
}
