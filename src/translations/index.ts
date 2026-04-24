// src/translations/index.ts
export const translations = {
  en: {
    nav: {
      home: 'Home',
      shop: 'Shop',
      about: 'About',
      contact: 'Contact',
      login: 'Login',
      signup: 'Sign Up',
      admin: 'Dashboard',
    },
    hero: {
      tagline: 'Crafted in India. Worn in London.',
      sub: 'Minimalist essentials rooted in Indian heritage',
      cta: 'Explore Collection',
      cta2: 'Our Story',
    },
    home: {
      newCollection: 'New Collection',
      featuredTitle: 'The Essentials',
      featuredSub: 'Each piece made by hand. Each fabric chosen with intention.',
      craftTitle: 'Made With Intention',
      craftSub: 'Every ZINOV garment begins as raw fibre in the hands of an Indian artisan. We source directly — linen from Kutch, silk from Varanasi, cotton from Rajasthan.',
      instagramTitle: 'Wear It. Share It.',
      instagramSub: 'Tag @zinov.official and become part of the story.',
    },
    shop: {
      title: 'The Collection',
      sub: 'Timeless pieces, made to last',
      allCategories: 'All',
      addToCart: 'Add to Cart',
      viewDetails: 'View Details',
    },
    about: {
      title: 'Two Countries. One Vision.',
      sub: 'ZINOV was born from a simple idea — that India\'s extraordinary craft tradition deserves a place in modern London wardrobes.',
      story: 'Founded by two cousins, one based in Ahmedabad and one in London, ZINOV bridges the gap between heritage craft and contemporary minimalist style.',
      values: ['Handcrafted Quality', 'Ethical Sourcing', 'Zero Compromise', 'Direct from Artisan'],
    },
    contact: {
      title: 'Get in Touch',
      sub: 'Questions about sizing, shipping, or wholesale? We\'d love to hear from you.',
      namePlaceholder: 'Your Name',
      emailPlaceholder: 'Your Email',
      messagePlaceholder: 'Your Message',
      send: 'Send Message',
      ukTitle: 'UK Office',
      inTitle: 'India Studio',
    },
    footer: {
      tagline: 'Crafted in India. Worn in London.',
      rights: '© 2024 ZINOV. All rights reserved.',
    },
  },
  hi: {
    nav: {
      home: 'होम',
      shop: 'शॉप',
      about: 'हमारे बारे में',
      contact: 'संपर्क',
      login: 'लॉग इन',
      signup: 'साइन अप',
      admin: 'डैशबोर्ड',
    },
    hero: {
      tagline: 'भारत में बनाया। लंदन में पहना।',
      sub: 'भारतीय विरासत में निहित न्यूनतम आवश्यकताएं',
      cta: 'कलेक्शन देखें',
      cta2: 'हमारी कहानी',
    },
    home: {
      newCollection: 'नया कलेक्शन',
      featuredTitle: 'द एसेंशियल्स',
      featuredSub: 'हर टुकड़ा हाथ से बनाया गया। हर कपड़ा सोच-समझकर चुना गया।',
      craftTitle: 'इरादे के साथ बनाया गया',
      craftSub: 'हर ZINOV परिधान भारतीय कारीगर के हाथों में कच्चे रेशे के रूप में शुरू होता है। हम सीधे स्रोत करते हैं — कच्छ से लिनन, वाराणसी से रेशम, राजस्थान से कपास।',
      instagramTitle: 'पहनें। शेयर करें।',
      instagramSub: '@zinov.official टैग करें और कहानी का हिस्सा बनें।',
    },
    shop: {
      title: 'द कलेक्शन',
      sub: 'कालातीत टुकड़े, लंबे समय तक चलने के लिए',
      allCategories: 'सभी',
      addToCart: 'कार्ट में जोड़ें',
      viewDetails: 'विवरण देखें',
    },
    about: {
      title: 'दो देश। एक दृष्टि।',
      sub: 'ZINOV एक सरल विचार से जन्मा — कि भारत की असाधारण शिल्प परंपरा आधुनिक लंदन की अलमारियों में जगह की हकदार है।',
      story: 'दो चचेरे भाइयों द्वारा स्थापित, एक अहमदाबाद और एक लंदन में, ZINOV विरासत शिल्प और समकालीन न्यूनतम शैली के बीच की खाई को पाटता है।',
      values: ['हस्तनिर्मित गुणवत्ता', 'नैतिक सोर्सिंग', 'शून्य समझौता', 'कारीगर से सीधे'],
    },
    contact: {
      title: 'संपर्क करें',
      sub: 'साइज़, शिपिंग या थोक के बारे में प्रश्न? हम आपसे सुनना पसंद करेंगे।',
      namePlaceholder: 'आपका नाम',
      emailPlaceholder: 'आपका ईमेल',
      messagePlaceholder: 'आपका संदेश',
      send: 'संदेश भेजें',
      ukTitle: 'UK कार्यालय',
      inTitle: 'भारत स्टूडियो',
    },
    footer: {
      tagline: 'भारत में बनाया। लंदन में पहना।',
      rights: '© 2024 ZINOV. सर्वाधिकार सुरक्षित।',
    },
  },
}

export type Lang = 'en' | 'hi'
export type Translations = typeof translations.en
