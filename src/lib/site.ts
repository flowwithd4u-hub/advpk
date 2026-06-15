export const SITE = {
  name: "ADV Prabhat Kaushik",
  shortName: "Prabhat Kaushik",
  role: "Advocate-on-Record, Supreme Court of India",
  location: "Faridabad, Haryana",
  phone: "+91 99585 60041",
  phoneHref: "tel:+919958560041",
  whatsapp: "919958560041",
  email: "prabhatkaushikadv@gmail.com",
  address: "Chamber No. 197 (First Floor), District Court, Sector 12, Faridabad, Haryana",
  tagline: "Counsel of consequence. Advocacy with integrity.",
} as const;

export const whatsappLink = (msg = "Hello, I would like to book a consultation.") =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`;
