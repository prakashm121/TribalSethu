export interface JagoResponse {
  reply: string;
  quickActions?: { label: string; action: string }[];
  category?: 'status' | 'deficiency' | 'payment' | 'documents' | 'general';
}

export const chatbotService = {
  async askJago(query: string, language: string = 'en'): Promise<JagoResponse> {
    await new Promise((res) => setTimeout(res, 350));
    const q = query.toLowerCase();

    // Multilingual greetings / support
    if (language === 'hi') {
      if (q.includes('status') || q.includes('स्थिति') || q.includes('आवेदन')) {
        return {
          reply: 'आपका टॉप क्लास छात्रवृत्ति आवेदन (TS-2026-004821) वर्तमान में केंद्रीय जांच (Central Scrutiny) चरण पर है। आय प्रमाण पत्र के नवीनीकरण की आवश्यकता है। कृपया डिजीलॉकर से इसे तुरंत सत्यापित करें।',
          quickActions: [
            { label: 'दस्तावेज़ वॉलेट देखें', action: 'documents' },
            { label: 'कमी (Deficiency) दूर करें', action: 'deficiency' }
          ]
        };
      }
      if (q.includes('payment') || q.includes('पैसा') || q.includes('रुपये')) {
        return {
          reply: 'आपकी ₹58,000 की स्वीकृत छात्रवृत्ति में से 3 किस्तें (कुल ₹48,000) आपके SBI खाते (••••8392) में जमा कर दी गई हैं। अंतिम किस्त ₹24,000 की प्रक्रिया में है।',
          quickActions: [{ label: 'डीबीटी ट्रैकर देखें', action: 'payment' }]
        };
      }
    }

    if (language === 'or') {
      return {
        reply: 'ଜୋହାର! ଆପଣଙ୍କର ଟପ୍ କ୍ଲାସ୍ ବୃତ୍ତି ଆବେଦନ (TS-2026-004821) ବର୍ତ୍ତମାନ କେନ୍ଦ୍ରୀୟ ଯାଞ୍ଚ ପର୍ଯ୍ୟାୟରେ ଅଛି। ଆୟ ପ୍ରମାଣପତ୍ରକୁ DigiLocker ମାଧ୍ୟମରେ ନବୀକରଣ କରନ୍ତୁ।',
        quickActions: [{ label: 'ଡକ୍ୟୁମେଣ୍ଟ ଯାଞ୍ଚ କରନ୍ତୁ', action: 'documents' }]
      };
    }

    // Contextual response based on active application & deficiency
    if (q.includes('status') || q.includes('track') || q.includes('where is')) {
      return {
        reply: 'Your Top Class Scholarship application (ID: TS-2026-004821) has successfully passed Institute Verification at NIT Rourkela and State Welfare Verification. It is currently at the Ministry Central Scrutiny stage with 1 pending document update required.',
        quickActions: [
          { label: 'View Application Timeline', action: 'application_detail' },
          { label: 'Resolve Income Certificate', action: 'deficiency' }
        ],
        category: 'status'
      };
    }

    if (q.includes('pending') || q.includes('deficiency') || q.includes('why') || q.includes('attention')) {
      return {
        reply: 'Your application is paused at Central Scrutiny because your submitted Family Income Certificate expired on 31 March 2026. You just need to pull your FY 2026-27 certificate via DigiLocker or upload the fresh Tehsildar certificate to release the final approval.',
        quickActions: [
          { label: 'Fix with DigiLocker (1-Click)', action: 'deficiency' },
          { label: 'Open Document Wallet', action: 'documents' }
        ],
        category: 'deficiency'
      };
    }

    if (q.includes('payment') || q.includes('money') || q.includes('dbt') || q.includes('disburse') || q.includes('credited')) {
      return {
        reply: 'Great news! You have already received ₹48,000 in your Aadhaar-seeded State Bank of India account (••••8392) in 3 equal tranches of ₹16,000. Your remaining balance of ₹24,000 is queued for release right after your income certificate renewal is acknowledged.',
        quickActions: [
          { label: 'View DBT Payment History', action: 'payment' },
          { label: 'Check Aadhaar Bank Seeding', action: 'profile' }
        ],
        category: 'payment'
      };
    }

    if (q.includes('document') || q.includes('wallet') || q.includes('need') || q.includes('certificate')) {
      return {
        reply: 'Under the Unified Portal, you only upload documents once to your Digital Wallet! For your ST Scholarship you need: 1) Aadhaar, 2) ST Tribe Certificate, 3) Income Certificate, 4) Bonafide/Marksheet, and 5) Bank Details. 13 of your 14 credentials are already verified.',
        quickActions: [
          { label: 'Sync DigiLocker Docs', action: 'digilocker' },
          { label: 'Open Digital Wallet', action: 'documents' }
        ],
        category: 'documents'
      };
    }

    return {
      reply: `I can help you with anything regarding your ST Scholarships. Would you like to check your application progress, clear the pending income certificate note, or track your direct DBT payment to SBI?`,
      quickActions: [
        { label: 'Check Application Status', action: 'status' },
        { label: 'Clear Pending Deficiency', action: 'deficiency' },
        { label: 'Track DBT Disbursements', action: 'payment' }
      ],
      category: 'general'
    };
  }
};
