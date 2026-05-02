// Mock data for AssurPilot AI

export const dashboardStats = {
  clients_count: 44061,
  contracts_count: 92981,
  chunks_count: 20,
  recommended_clients_count: 40864,
  products_count: 92,
  active_contracts_count: 22065,
  clients_by_type: { individual: 43314, company: 747 },
  contracts_by_status: { EXPIRED: 57308, ACTIVE: 22065, CANCELLED: 13595 },
  top_products: {
    AUTOMOBILE: 12632,
    "INDIVIDUAL ACCIDENT": 2332,
    "COMPREHENSIVE HOME": 1987,
    "HEALTH INSURANCE": 1654,
    "PROFESSIONAL LIABILITY": 1423,
  },
  top_recommended: {
    "HOME ASSISTANCE": 3421,
    "TRAVEL INSURANCE": 2876,
    "LIFE INSURANCE": 2345,
    "CYBER RISK": 1890,
    "LEGAL PROTECTION": 1567,
  },
  top_sectors: {
    "SERVICE STATION": 13677,
    COMMERCIAL: 5352,
    "INTELLECTUAL PROFESSIONS": 4210,
    INDUSTRIAL: 3890,
    AGRICULTURAL: 2100,
  },
};

export interface Client {
  REF_PERSONNE: number;
  type_client: string;
  age: number;
  sexe: string;
  situation_familiale: string;
  profession: string;
  secteur: string;
  ville: string;
}

export const clients: Client[] = [
  { REF_PERSONNE: 715, type_client: "individual", age: 61, sexe: "M", situation_familiale: "Married", profession: "GENERAL PRACTITIONER", secteur: "INTELLECTUAL AND SENIOR PROFESSIONS", ville: "Tunis" },
  { REF_PERSONNE: 1024, type_client: "individual", age: 34, sexe: "F", situation_familiale: "Single", profession: "SOFTWARE ENGINEER", secteur: "TECHNOLOGY", ville: "Sousse" },
  { REF_PERSONNE: 2301, type_client: "company", age: 0, sexe: "-", situation_familiale: "-", profession: "IMPORT/EXPORT", secteur: "COMMERCIAL", ville: "Sfax" },
  { REF_PERSONNE: 3456, type_client: "individual", age: 45, sexe: "M", situation_familiale: "Married", profession: "PHARMACIST", secteur: "HEALTH", ville: "Bizerte" },
  { REF_PERSONNE: 4102, type_client: "individual", age: 28, sexe: "F", situation_familiale: "Single", profession: "ARCHITECT", secteur: "INTELLECTUAL AND SENIOR PROFESSIONS", ville: "Tunis" },
  { REF_PERSONNE: 5678, type_client: "company", age: 0, sexe: "-", situation_familiale: "-", profession: "LOGISTICS", secteur: "INDUSTRIAL", ville: "Gabes" },
  { REF_PERSONNE: 6789, type_client: "individual", age: 52, sexe: "M", situation_familiale: "Divorced", profession: "TEACHER", secteur: "EDUCATION", ville: "Nabeul" },
  { REF_PERSONNE: 7890, type_client: "individual", age: 39, sexe: "F", situation_familiale: "Married", profession: "DENTIST", secteur: "HEALTH", ville: "Tunis" },
  { REF_PERSONNE: 8901, type_client: "individual", age: 55, sexe: "M", situation_familiale: "Married", profession: "LAWYER", secteur: "INTELLECTUAL AND SENIOR PROFESSIONS", ville: "Ariana" },
  { REF_PERSONNE: 9012, type_client: "company", age: 0, sexe: "-", situation_familiale: "-", profession: "RESTAURANT CHAIN", secteur: "SERVICE STATION", ville: "Hammamet" },
];

export interface Contract {
  id: string;
  client_id: number;
  product: string;
  status: "ACTIVE" | "EXPIRED" | "CANCELLED";
  start_date: string;
  end_date: string;
  premium: number;
}

export const contracts: Contract[] = [
  { id: "CTR-001", client_id: 715, product: "AUTOMOBILE", status: "ACTIVE", start_date: "2023-01-15", end_date: "2026-01-15", premium: 450 },
  { id: "CTR-002", client_id: 715, product: "COMPREHENSIVE HOME", status: "ACTIVE", start_date: "2022-06-01", end_date: "2025-06-01", premium: 320 },
  { id: "CTR-003", client_id: 715, product: "HEALTH INSURANCE", status: "EXPIRED", start_date: "2020-01-01", end_date: "2023-01-01", premium: 680 },
  { id: "CTR-004", client_id: 1024, product: "AUTOMOBILE", status: "ACTIVE", start_date: "2024-03-10", end_date: "2027-03-10", premium: 380 },
  { id: "CTR-005", client_id: 1024, product: "TRAVEL INSURANCE", status: "ACTIVE", start_date: "2024-06-01", end_date: "2025-06-01", premium: 120 },
  { id: "CTR-006", client_id: 3456, product: "PROFESSIONAL LIABILITY", status: "ACTIVE", start_date: "2023-09-01", end_date: "2026-09-01", premium: 890 },
  { id: "CTR-007", client_id: 4102, product: "AUTOMOBILE", status: "CANCELLED", start_date: "2022-04-01", end_date: "2023-04-01", premium: 290 },
];

export interface Recommendation {
  rank: number;
  product: string;
  already_owned: boolean;
  source: string;
}

export const getRecommendations = (_clientId: number): Recommendation[] => [
  { rank: 1, product: "HOME ASSISTANCE", already_owned: false, source: "item-based collaborative filtering" },
  { rank: 2, product: "LIFE INSURANCE", already_owned: false, source: "collaborative filtering" },
  { rank: 3, product: "LEGAL PROTECTION", already_owned: false, source: "item-based collaborative filtering" },
  { rank: 4, product: "CYBER RISK", already_owned: false, source: "collaborative filtering" },
  { rank: 5, product: "TRAVEL INSURANCE", already_owned: true, source: "item-based collaborative filtering" },
];

export interface Citation {
  pdf: string;
  chunk_id: number;
  score: number;
  text: string;
}

export const ragCitations: Citation[] = [
  { pdf: "general_conditions.pdf", chunk_id: 3, score: 0.92, text: "Home Assistance coverage includes emergency plumbing, locksmith services, and electrical repairs within 24 hours of the reported incident. The policyholder benefits from a network of certified professionals." },
  { pdf: "product_catalog.pdf", chunk_id: 7, score: 0.85, text: "The Home Assistance product is designed for homeowners and tenants. It covers unforeseen domestic incidents that require immediate professional intervention." },
  { pdf: "exclusions_guide.pdf", chunk_id: 12, score: 0.78, text: "Exclusions include pre-existing damage, incidents caused by willful negligence, and claims filed more than 48 hours after the event occurrence." },
];

export interface DocumentChunk {
  id: number;
  pdf: string;
  chunk_id: number;
  text: string;
  pages: string;
}

export const documentChunks: DocumentChunk[] = [
  { id: 1, pdf: "general_conditions.pdf", chunk_id: 1, text: "This insurance policy covers the insured party against risks defined in the special conditions...", pages: "1-3" },
  { id: 2, pdf: "general_conditions.pdf", chunk_id: 2, text: "The insurer undertakes to indemnify the insured for losses arising from covered events...", pages: "3-5" },
  { id: 3, pdf: "general_conditions.pdf", chunk_id: 3, text: "Home Assistance coverage includes emergency plumbing, locksmith services, and electrical repairs...", pages: "5-7" },
  { id: 4, pdf: "product_catalog.pdf", chunk_id: 4, text: "Automobile insurance provides comprehensive coverage including third-party liability...", pages: "1-2" },
  { id: 5, pdf: "product_catalog.pdf", chunk_id: 5, text: "Health insurance covers medical consultations, hospitalization, and prescription medications...", pages: "3-4" },
  { id: 6, pdf: "product_catalog.pdf", chunk_id: 6, text: "Travel insurance protects against trip cancellations, medical emergencies abroad...", pages: "5-6" },
  { id: 7, pdf: "product_catalog.pdf", chunk_id: 7, text: "The Home Assistance product is designed for homeowners and tenants covering domestic incidents...", pages: "7-8" },
  { id: 8, pdf: "exclusions_guide.pdf", chunk_id: 8, text: "General exclusions applicable to all insurance products include fraud, intentional damage...", pages: "1-2" },
  { id: 9, pdf: "exclusions_guide.pdf", chunk_id: 9, text: "Product-specific exclusions for automobile insurance: racing, unlicensed driving...", pages: "3-4" },
  { id: 10, pdf: "exclusions_guide.pdf", chunk_id: 10, text: "Claims must be filed within the timeframe specified in the particular conditions...", pages: "5-6" },
  { id: 11, pdf: "tarification_guide.pdf", chunk_id: 11, text: "Premium calculation is based on risk assessment factors including age, location, and history...", pages: "1-3" },
  { id: 12, pdf: "exclusions_guide.pdf", chunk_id: 12, text: "Exclusions include pre-existing damage, incidents caused by willful negligence...", pages: "6-7" },
  { id: 13, pdf: "tarification_guide.pdf", chunk_id: 13, text: "Discounts may apply for multi-policy holders, loyalty programs, and no-claims bonuses...", pages: "4-5" },
  { id: 14, pdf: "claims_procedure.pdf", chunk_id: 14, text: "In the event of a claim, the insured must notify the insurance company within 5 business days...", pages: "1-2" },
  { id: 15, pdf: "claims_procedure.pdf", chunk_id: 15, text: "Required documents for claim processing: completed claim form, police report if applicable...", pages: "3-4" },
  { id: 16, pdf: "claims_procedure.pdf", chunk_id: 16, text: "The insurance company will appoint an expert to assess the damage within 10 business days...", pages: "5-6" },
  { id: 17, pdf: "legal_framework.pdf", chunk_id: 17, text: "Insurance contracts are governed by the Insurance Code and applicable regulations...", pages: "1-3" },
  { id: 18, pdf: "legal_framework.pdf", chunk_id: 18, text: "The cooling-off period allows the policyholder to cancel within 14 days of subscription...", pages: "4-5" },
  { id: 19, pdf: "reinsurance_policy.pdf", chunk_id: 19, text: "Reinsurance treaties cover catastrophic events exceeding the primary insurer capacity...", pages: "1-2" },
  { id: 20, pdf: "reinsurance_policy.pdf", chunk_id: 20, text: "Proportional reinsurance arrangements distribute risk between the ceding company and reinsurer...", pages: "3-4" },
];

export interface Opportunity {
  id: string;
  client_id: number;
  product: string;
  email_subject: string;
  status: "in_progress" | "accepted" | "refused";
  last_update: string;
  argument: string;
}

export const opportunities: Opportunity[] = [
  { id: "OPP-001", client_id: 715, product: "HOME ASSISTANCE", email_subject: "Personalized offer - Home Assistance", status: "in_progress", last_update: "2026-04-28", argument: "Client owns home, no current assistance coverage" },
  { id: "OPP-002", client_id: 1024, product: "LIFE INSURANCE", email_subject: "Secure your future - Life Insurance", status: "in_progress", last_update: "2026-04-27", argument: "Young professional, no life coverage" },
  { id: "OPP-003", client_id: 3456, product: "CYBER RISK", email_subject: "Protect your practice - Cyber Risk", status: "accepted", last_update: "2026-04-25", argument: "Healthcare professional with digital records" },
  { id: "OPP-004", client_id: 4102, product: "PROFESSIONAL LIABILITY", email_subject: "Professional coverage for architects", status: "accepted", last_update: "2026-04-22", argument: "Mandatory coverage for regulated profession" },
  { id: "OPP-005", client_id: 6789, product: "HEALTH INSURANCE", email_subject: "Comprehensive health coverage", status: "refused", last_update: "2026-04-20", argument: "Client already covered by employer" },
  { id: "OPP-006", client_id: 7890, product: "LEGAL PROTECTION", email_subject: "Legal protection for professionals", status: "in_progress", last_update: "2026-04-30", argument: "Dentist with growing practice, litigation risk" },
  { id: "OPP-007", client_id: 8901, product: "TRAVEL INSURANCE", email_subject: "Travel worry-free", status: "refused", last_update: "2026-04-18", argument: "Client prefers to self-insure for travel" },
  { id: "OPP-008", client_id: 2301, product: "COMPREHENSIVE HOME", email_subject: "Protect your commercial premises", status: "accepted", last_update: "2026-04-29", argument: "Import/export company with warehouse" },
];

export const pitchResponse = {
  produit: "HOME ASSISTANCE",
  benefices: [
    "24/7 emergency intervention for plumbing, locksmith, and electrical issues",
    "Network of certified professionals with guaranteed response times",
    "No deductible for covered domestic emergencies",
  ],
  eligibilite: [
    "Property owner or tenant with valid lease agreement",
    "Residence located within covered geographic zones",
  ],
  exclusions: [
    "Pre-existing damage prior to policy inception",
    "Incidents caused by willful negligence or lack of maintenance",
    "Commercial or industrial properties",
  ],
  risques: [
    "Coverage limits apply per incident and per year",
    "Waiting period of 30 days from policy start date",
  ],
  pitch_email: `Subject: Personalized offer - HOME ASSISTANCE\n\nDear Client,\n\nFollowing our analysis of your insurance portfolio, we have identified an opportunity that perfectly matches your profile and needs.\n\nAs a homeowner, the HOME ASSISTANCE product offers you comprehensive protection against unforeseen domestic emergencies:\n\n• 24/7 emergency plumbing, locksmith, and electrical services\n• Certified professional network with rapid response\n• Zero deductible on covered incidents\n\nThis coverage complements your existing policies and provides peace of mind for your home.\n\nI would be happy to discuss this offer at your convenience.\n\nBest regards,\nYour Insurance Advisor`,
  pitch_whatsapp: `Hello! We identified a relevant offer for your profile: HOME ASSISTANCE - 24/7 emergency coverage for your home (plumbing, locksmith, electrical). Zero deductible, certified professionals. Would you like to learn more? 📋🏠`,
  citations: [
    { pdf: "general_conditions.pdf", chunk_id: 3, extrait: "Home Assistance coverage includes emergency plumbing, locksmith services, and electrical repairs within 24 hours..." },
    { pdf: "product_catalog.pdf", chunk_id: 7, extrait: "The Home Assistance product is designed for homeowners and tenants covering domestic incidents..." },
  ],
};