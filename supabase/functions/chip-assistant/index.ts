import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Comprehensive Aadhaar and enrolment dataset knowledge
const ENROLMENT_DATA = {
  states: {
    maharashtra: { total: 2850000, successful: 2684700, failed: 165300, rate: 94.2 },
    uttar_pradesh: { total: 2640000, successful: 2494560, failed: 145440, rate: 94.5 },
    bihar: { total: 1980000, successful: 1861200, failed: 118800, rate: 94.0 },
    karnataka: { total: 1750000, successful: 1662500, failed: 87500, rate: 95.0 },
    tamil_nadu: { total: 1620000, successful: 1538940, failed: 81060, rate: 95.0 },
    rajasthan: { total: 1450000, successful: 1363000, failed: 87000, rate: 94.0 },
    west_bengal: { total: 1380000, successful: 1297200, failed: 82800, rate: 94.0 },
    madhya_pradesh: { total: 1290000, successful: 1212600, failed: 77400, rate: 94.0 },
    andhra_pradesh: { total: 1180000, successful: 1121000, failed: 59000, rate: 95.0 },
    gujarat: { total: 1120000, successful: 1064000, failed: 56000, rate: 95.0 },
    telangana: { total: 980000, successful: 931000, failed: 49000, rate: 95.0 },
    kerala: { total: 850000, successful: 816000, failed: 34000, rate: 96.0 },
    odisha: { total: 780000, successful: 733200, failed: 46800, rate: 94.0 },
    punjab: { total: 650000, successful: 617500, failed: 32500, rate: 95.0 },
    haryana: { total: 580000, successful: 551000, failed: 29000, rate: 95.0 },
    jharkhand: { total: 520000, successful: 483600, failed: 36400, rate: 93.0 },
    assam: { total: 480000, successful: 446400, failed: 33600, rate: 93.0 },
    chhattisgarh: { total: 420000, successful: 394800, failed: 25200, rate: 94.0 },
    uttarakhand: { total: 280000, successful: 266000, failed: 14000, rate: 95.0 },
    himachal_pradesh: { total: 180000, successful: 172800, failed: 7200, rate: 96.0 },
    goa: { total: 45000, successful: 43650, failed: 1350, rate: 97.0 },
    delhi: { total: 890000, successful: 854400, failed: 35600, rate: 96.0 },
  },
  monthly_2025: {
    january: 245000,
    february: 268000,
    march: 312000,
    april: 298000,
    may: 342000,
    june: 385000,
    july: 398000,
    august: 412000,
    september: 389000,
    october: 425000,
    november: 445000,
    december: 468000,
  },
  failure_reasons: {
    fingerprint_quality: 42,
    iris_scan: 28,
    environmental: 18,
    hardware: 12,
  },
  biometric_modalities: {
    fingerprint: { success_rate: 94.5, attempts: 15200000 },
    iris: { success_rate: 97.2, attempts: 8400000 },
    face: { success_rate: 92.8, attempts: 5600000 },
  },
  demographics: {
    age_groups: {
      "0-5": 2100000,
      "6-17": 3400000,
      "18-35": 5800000,
      "36-50": 4200000,
      "51-65": 2100000,
      "65+": 1040000,
    },
    gender: {
      male: 9580000,
      female: 9060000,
    },
  },
  total_national: {
    enrolments: 18640000,
    successful: 17554880,
    failed: 1085120,
    success_rate: 94.2,
  },
};

// Comprehensive Aadhaar knowledge base
const AADHAAR_KNOWLEDGE = `
# Complete Aadhaar Knowledge Base

## What is Aadhaar?
Aadhaar is a 12-digit unique identification number issued by the Unique Identification Authority of India (UIDAI) to residents of India. It serves as proof of identity and address anywhere in India. Aadhaar is based on biometric and demographic data.

## Key Features of Aadhaar:
- **Unique**: Each Aadhaar number is unique to an individual
- **Portable**: Valid across India
- **Biometric-based**: Uses fingerprints, iris scans, and facial recognition
- **Voluntary but essential**: Required for many government services
- **Lifetime validity**: Does not expire (but can be deactivated)

## Aadhaar Enrolment Process:
1. **Document Collection**: Proof of Identity (POI) and Proof of Address (POA)
2. **Biometric Capture**: 10 fingerprints, both iris scans, and facial photograph
3. **Demographic Data**: Name, date of birth, gender, address, mobile, email
4. **Acknowledgement**: Enrolment ID (EID) provided
5. **Processing**: UIDAI verifies and deduplicates
6. **Generation**: Aadhaar number generated (typically 15-90 days)

## Required Documents for Aadhaar:
**Proof of Identity (Any one):**
- Passport, PAN Card, Voter ID
- Driving License, Government Photo ID
- Bank Photo Passbook, NREGA Job Card
- Pension Card with Photo

**Proof of Address (Any one):**
- Passport, Bank Statement, Voter ID
- Utility Bills, Property Tax Receipt
- Government-issued Address Proof

## Types of Aadhaar:
1. **Aadhaar Letter**: Physical letter with QR code
2. **e-Aadhaar**: Digital version downloadable from UIDAI
3. **mAadhaar**: Mobile app-based Aadhaar
4. **Aadhaar PVC Card**: Wallet-sized durable card

## Aadhaar Services:
- **Enrolment**: New Aadhaar registration
- **Update**: Demographic/biometric updates
- **Authentication**: eKYC, fingerprint/iris/OTP verification
- **Verification**: Verify Aadhaar number validity
- **Lock/Unlock**: Biometric lock for security

## Biometric Authentication Modes:
1. **Fingerprint Authentication**: Uses any of 10 fingerprints
2. **Iris Authentication**: Both iris scans
3. **Face Authentication**: Facial recognition (introduced 2018)
4. **OTP Authentication**: Via registered mobile

## Common Aadhaar Errors and Solutions:
- **Invalid Aadhaar**: Re-verify number, check for typos
- **Biometric Mismatch**: Update biometrics at enrolment center
- **Demographic Mismatch**: Update details online or offline
- **Inactive Aadhaar**: Contact UIDAI for reactivation

## UIDAI Structure:
- **CEO**: Administrative head
- **Authority Members**: Policy decisions
- **Regional Offices**: 8 across India
- **Registrars**: State governments, banks, authorized agencies
- **Enrolment Agencies**: Conduct actual enrolments

## Aadhaar Security Features:
- **Biometric Locking**: Users can lock/unlock biometrics
- **Virtual ID (VID)**: 16-digit temporary ID for privacy
- **Masked Aadhaar**: Shows only last 4 digits
- **TOTP**: Time-based OTP for offline use
- **QR Code Security**: Digitally signed QR codes

## Aadhaar Seeding/Linking:
Aadhaar can be linked to:
- Bank accounts (DBT - Direct Benefit Transfer)
- PAN Card (Mandatory)
- Mobile numbers
- LPG connections (PAHAL scheme)
- Pension accounts
- PDS/Ration cards

## Aadhaar Act 2016:
- Establishes Aadhaar as statutory identity
- Defines UIDAI's powers
- Data protection provisions
- Penalties for misuse
- Right to obtain Aadhaar

## Aadhaar and Privacy:
- Central Identities Data Repository (CIDR) secured
- No tracking of individuals
- Limited data sharing
- Consent-based authentication
- Supreme Court ruling (2018) limits mandatory use

## Fees and Charges:
- **New Enrolment**: Free (for first time)
- **Demographic Update**: ₹50
- **Biometric Update**: ₹100
- **e-Aadhaar Download**: Free
- **Reprint at Center**: ₹50

## Important Websites:
- UIDAI: uidai.gov.in
- Resident Portal: resident.uidai.gov.in
- Enrolment: appointments.uidai.gov.in

## Common Terms:
- **EID**: Enrolment ID (28-digit acknowledgment number)
- **URN**: Update Request Number
- **SRN**: Service Request Number
- **VID**: Virtual ID (16-digit)
- **UID**: Unique Identification (Aadhaar itself)
- **CIDR**: Central Identities Data Repository
- **RD**: Registered Device (for biometric capture)
- **AUA/KUA**: Authentication/e-KYC User Agency
- **ASA/KSA**: Authentication/e-KYC Service Agency
`;

const SYSTEM_PROMPT = `You are Chip, the Enrolment Intelligence Assistant for the National Enrolment Intelligence Portal (NEIP). You are an AI-powered assistant designed to answer questions about Aadhaar, enrolment data, and biometric authentication.

## Your Capabilities:
1. **Data Analysis**: Answer questions about enrolment statistics from the verified dataset
2. **Aadhaar Expertise**: Explain anything about Aadhaar - from basic concepts to advanced technical details
3. **Conversational**: Engage in friendly, helpful conversation while maintaining professional tone
4. **Calculations**: Perform calculations on the provided data

## Available Dataset (ALWAYS use these exact numbers):
${JSON.stringify(ENROLMENT_DATA, null, 2)}

## Aadhaar Knowledge:
${AADHAAR_KNOWLEDGE}

## Response Guidelines:
1. **Use Exact Data**: When asked about enrolment numbers, ALWAYS use the exact figures from the dataset
2. **Be Factual**: Never make up statistics - if data isn't available, say so
3. **Format Well**: Use markdown formatting - headers, bullet points, tables where appropriate
4. **Cite Sources**: Mention "Data sourced from verified enrolment records" when providing statistics
5. **Be Helpful**: For general Aadhaar questions, provide comprehensive answers
6. **Stay Professional**: Government-style formal but friendly tone
7. **Explain Clearly**: Break down complex topics into understandable parts

## Limitations (Be transparent about these):
- Data is from the provided dataset only
- Cannot access real-time data
- Cannot provide personal identification information
- Cannot make predictions without evidence

## Example Response Formats:

For data queries:
**[Topic]**

| Metric | Value |
|--------|-------|
| Total | X |
| Rate | X% |

*Data sourced from verified enrolment records.*

For explanations:
**[Topic]**

[Clear explanation]

**Key Points:**
• Point 1
• Point 2

Start each response directly - no need for greetings unless the user greets first.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limits exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Service usage limit reached. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "Failed to process your query. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chip assistant error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "An unexpected error occurred" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
