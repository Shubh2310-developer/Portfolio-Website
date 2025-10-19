# EmailJS Setup Guide for Portfolio Contact Form

Your contact form is currently configured to show a helpful error message when EmailJS is not set up. To enable email functionality, follow these steps:

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Add Email Service

1. After logging in, go to **Email Services** in the dashboard
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. For **Gmail**:
   - Click "Connect Account"
   - Sign in with your Gmail account (shahshubh655@gmail.com)
   - Allow EmailJS to send emails on your behalf
5. Give your service a name (e.g., "Portfolio Contact")
6. Click **Create Service**
7. **Copy the Service ID** (you'll need this later)

## Step 3: Create Email Template

1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Use this template structure:

```
Subject: New Contact Form Message from {{name}}

From: {{name}}
Email: {{email}}

Message:
{{message}}

---
This message was sent via your portfolio contact form.
```

4. Configure the template settings:
   - **To Email**: shahshubh655@gmail.com
   - **From Name**: {{name}}
   - **Reply To**: {{email}}
5. Click **Save**
6. **Copy the Template ID** (you'll need this later)

## Step 4: Get Your Public Key

1. Go to **Account** → **General** in the dashboard
2. Find your **Public Key** (also called API Key)
3. **Copy the Public Key**

## Step 5: Update Environment Variables

1. Open the file `.env.local` in your Portfolio-Website directory
2. Replace the placeholder values with your actual EmailJS credentials:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxxxxxx
```

## Step 6: Restart Development Server

1. Stop the current dev server (Ctrl+C)
2. Run `npm run dev` again
3. The contact form will now send emails!

## Testing the Contact Form

1. Go to your portfolio website
2. Scroll to the Contact section
3. Use these commands in the terminal:
   ```
   $ set name Test User
   $ set email test@example.com
   $ set message This is a test message
   $ send
   ```
4. You should see "✓ Message sent successfully!"
5. Check your email (shahshubh655@gmail.com) for the message

## Current Behavior (Without EmailJS Setup)

The contact form will show this message when you try to send:
```
✗ Email service not configured.
✗ Please contact directly via email: shahshubh655@gmail.com
✗ Or LinkedIn: https://linkedin.com/in/shahshubh655
```

This ensures visitors can still contact you even if EmailJS isn't configured yet.

## Free Tier Limits

EmailJS free tier includes:
- 200 emails per month
- 2 email templates
- 1 email service

This should be more than enough for a portfolio contact form!

## Troubleshooting

If emails aren't sending after setup:
1. Check the browser console for errors
2. Verify all three environment variables are set correctly
3. Make sure you restarted the dev server after updating .env.local
4. Check your EmailJS dashboard for any failed email attempts
5. Verify your email service is connected and active

---

**Note**: Never commit the `.env.local` file to Git! It's already in `.gitignore` to keep your credentials secure.
