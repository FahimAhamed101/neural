export const siteConfig = {
  name: "Neural IT Limited",
  tagline: "Software company for websites, mobile apps, and business systems",
  description:
    "Neural IT Limited designs and develops trustworthy websites, mobile apps, and software systems for businesses that want reliable delivery and clear communication.",
  url: "https://neuralitlimited.com",
  whatsappNumber: "8801706617723",
  whatsappDefaultMessage: "Hi I need a website or mobile app.",
  email: "fahimahamedweb@gmail.com",
  locale: "en_US",
  themeColor: "#F7F8FA",
};

export function getWhatsAppLink(message?: string) {
  const text = encodeURIComponent(message ?? siteConfig.whatsappDefaultMessage);
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${text}`;
}
