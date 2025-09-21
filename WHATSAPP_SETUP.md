# WhatsApp Integration Setup

## Quick Setup

1. **Create `.env.local` file** in your project root:

   ```bash
   # WhatsApp Configuration
   WHATSAPP_NUMBER=your_whatsapp_number_here
   ```

2. **Replace `your_whatsapp_number_here`** with your actual WhatsApp number:

   - Include country code
   - No + sign
   - No spaces or special characters

   **Examples:**

   - US: `1234567890`
   - India: `919876543210`
   - UK: `447123456789`

3. **Restart your development server** after adding the environment variable:
   ```bash
   npm run dev
   ```

## How It Works

- ✅ **Environment Variable**: WhatsApp number is loaded from `WHATSAPP_NUMBER`
- ✅ **Reusable Component**: `WhatsAppButton` component handles all WhatsApp interactions
- ✅ **Smart Messages**: Pre-filled messages based on context (project purchase, custom requests, etc.)
- ✅ **No Hardcoded Numbers**: All WhatsApp numbers come from environment variables

## Usage

The WhatsApp integration is now active on:

- **Project Detail Pages**: "Contact Admin on WhatsApp" buttons
- **Projects Listing Page**: Custom project request buttons
- **Access Request System**: WhatsApp contact for faster processing

## Security

- WhatsApp number is stored in environment variables (not in code)
- `.env.local` is git-ignored for security
- No sensitive data exposed in the frontend

