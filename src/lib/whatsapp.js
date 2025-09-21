/**
 * WhatsApp utility functions for contact integration
 */

/**
 * Get WhatsApp number from environment variables
 * @returns {string} WhatsApp number
 */
export function getWhatsAppNumber() {
  // For client-side, we need NEXT_PUBLIC_ prefix
  return (
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ||
    process.env.WHATSAPP_NUMBER ||
    "+919515364654"
  );
}

/**
 * Create WhatsApp contact URL with pre-filled message
 * @param {string} message - The message to pre-fill
 * @returns {string} WhatsApp URL
 */
export function createWhatsAppUrl(message) {
  const whatsappNumber = getWhatsAppNumber();
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
}

/**
 * Open WhatsApp with pre-filled message
 * @param {string} message - The message to pre-fill
 */
export function openWhatsApp(message) {
  const url = createWhatsAppUrl(message);
  window.open(url, "_blank");
}

/**
 * Create project inquiry message
 * @param {Object} project - Project object
 * @param {string} type - Type of inquiry ('purchase', 'custom', 'general')
 * @returns {string} Formatted message
 */
export function createProjectMessage(project, type = "purchase") {
  const projectTitle = project?.title || "Project";
  const projectPrice = project?.pricing?.basePrice || "N/A";
  const projectCurrency = project?.pricing?.currency || "USD";

  switch (type) {
    case "purchase":
      return `Hi! I'm interested in purchasing access to "${projectTitle}" (${projectCurrency} ${projectPrice}). Could you please provide payment details and process my request?`;

    case "custom":
      return `Hi! I'm looking for a custom project similar to "${projectTitle}" or something in the ${
        project?.category || "same category"
      }. Could you please help me with this? I'd like to discuss the requirements and pricing.`;

    case "general":
    default:
      return `Hi! I have a question about "${projectTitle}". Could you please provide more information?`;
  }
}

/**
 * Create general inquiry message
 * @param {string} subject - Subject of inquiry
 * @returns {string} Formatted message
 */
export function createGeneralMessage(subject = "General Inquiry") {
  return `Hi! I have a question about ${subject}. Could you please help me?`;
}
