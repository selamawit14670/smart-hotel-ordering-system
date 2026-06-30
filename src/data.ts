import { FoodItem, LanguageStrings } from './types';

export const FOOD_ITEMS: FoodItem[] = [
  {
    id: 'br-1',
    category: 'breakfast',
    image: '/src/assets/images/dire_breakfast_hero_1782808683687.jpg',
    prepTime: 12,
    price: 850,
    isBestseller: true,
    translations: {
      en: {
        name: 'Dire Classic Breakfast',
        description: 'Two organic poached eggs, smoked salmon, sliced avocado rose, and hollandaise sauce on artisanal toasted sourdough.'
      },
      am: {
        name: 'ዲሬ ክላሲክ ቁርስ',
        description: 'ሁለት የተቀቀለ እንቁላል፣ የጭስ ሳልሞን፣ አቮካዶ እና ሆላንዴዝ ሶስ በተጠበሰ ዳቦ ላይ።'
      },
      om: {
        name: 'Dire Kilaasika Ciree',
        description: 'Kukkuun hanqaaquu lama, salmoonii aaraa, avokaadoo fi soso holandeez misha misha daabboo irratti.'
      }
    }
  },
  {
    id: 'br-2',
    category: 'breakfast',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=600',
    prepTime: 5,
    price: 420,
    translations: {
      en: {
        name: 'Croissant de Luxe',
        description: 'Freshly baked warm flaky croissant infused with premium roasted pistachio butter and dusting of golden sugar.'
      },
      am: {
        name: 'ክሮይሰንት ደ ሉክስ',
        description: 'ትኩስ ጥንቃቄ የተጋገረ ክሮይሰንት በፒስታቺዮ ክሬም እና የወርቅ ስኳር አቧራ የተሞላ።'
      },
      om: {
        name: 'Kirooyisaant de Luuks',
        description: 'Kirooyisaantii ho\'aa misha qophaa\'e, kiriimii pistaashiyoo fi sukkaara warqee qabu.'
      }
    }
  },
  {
    id: 'mc-1',
    category: 'mainCourse',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600',
    prepTime: 22,
    price: 1450,
    isBestseller: true,
    translations: {
      en: {
        name: 'Luxury Tenderloin Mignon',
        description: 'Premium wet-aged beef tenderloin with truffle herb butter, glazed baby carrots, and rich bone marrow jus.'
      },
      am: {
        name: 'የበሬ ሥጋ ተንደርሎይን',
        description: 'ምርጥ የበሬ ሥጋ በተደቆሰ ትረፍል ቅቤ፣ በህጻን ካሮት እና በበሬ መቅኒ ጁስ ተዘጋጅቶ የቀረበ።'
      },
      om: {
        name: 'Loonii Teenderlooyinii',
        description: 'Foon loonii filatamaa, sirnaan qophaa\'e fi soso misha qabu.'
      }
    }
  },
  {
    id: 'mc-2',
    category: 'mainCourse',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=600',
    prepTime: 18,
    price: 1250,
    translations: {
      en: {
        name: 'Royal Sea Bass',
        description: 'Crispy-skin wild sea bass resting on saffron-scented lobster broth, braised baby fennel, and microherbs.'
      },
      am: {
        name: 'ሮያል ሲ ባስ አሳ',
        description: 'ትኩስ የባህር አሳ በሳፍሮን የሎብስተር ሾርባ፣ በፊንል እና በስሱ ቅጠላቅጠል አጌጦ የቀረበ።'
      },
      om: {
        name: 'Qurxummii Seebaas',
        description: 'Qurxummii seebaas bishaan keessaa qophaa\'e, soso saafiroonii fi kkf qabu.'
      }
    }
  },
  {
    id: 'tr-1',
    category: 'traditional',
    image: '/src/assets/images/special_doro_wot_1782808700296.jpg',
    prepTime: 15,
    price: 950,
    isBestseller: true,
    translations: {
      en: {
        name: 'Dire Special Doro Wot',
        description: 'Slow-simmered organic chicken drumstick in rich spicy berbere sauce, served with hard-boiled egg and handmade Injera.'
      },
      am: {
        name: 'ዲሬ ልዩ ዶሮ ወጥ',
        description: 'በቀስታ የተመረተ የሀበሻ ዶሮ ወጥ ከእንቁላል እና ከጥራት እንጀራ ጋር የቀረበ።'
      },
      om: {
        name: 'Diree Kaddoo Koroowot',
        description: 'Koroowot aadaa, foon indaanqoo fi hanqaaquu wajjin biddeenaan kan dhiyaatu.'
      }
    }
  },
  {
    id: 'tr-2',
    category: 'traditional',
    image: '/src/assets/images/gourmet_kitfo_1782808720264.jpg',
    prepTime: 10,
    price: 1100,
    translations: {
      en: {
        name: 'Royal Spiced Kitfo',
        description: 'Melt-in-your-mouth minced prime beef warmed with cardamom-infused clarified butter, served with Ayibe and Gomen.'
      },
      am: {
        name: 'ሮያል ቅመም ኪትፎ',
        description: 'በኮረሪማ ቅቤ የተሞቀ የላቀ የተከተፈ የበሬ ሥጋ፣ ከአይብና ከጎመን ጋር።'
      },
      om: {
        name: 'Kitfoo Aadaa Filatamaa',
        description: 'Kitfoo foon loonii laafaa sirnaan qophaa\'e, ayibii fi gomenii wajjin.'
      }
    }
  },
  {
    id: 'dk-1',
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&q=80&w=600',
    prepTime: 5,
    price: 480,
    translations: {
      en: {
        name: 'Gold Espresso Martini',
        description: 'Premium espresso cold-brewed and shaken with velvet coffee liqueur, topped with delicate edible gold leaf flakes.'
      },
      am: {
        name: 'ወርቅ ኤስፕሬሶ ማርቲኒ',
        description: 'ጥራት ያለው ኤስፕሬሶ ከቡና ሊከር ጋር ተቀላቅሎ በወርቅ ቅጠል ፍንጣሪዎች ያጌጠ።'
      },
      om: {
        name: 'Warqee Espresso Martini',
        description: 'Espresso misha, liikeerii bunaa fi warqee nyaatamuun kan bareede.'
      }
    }
  },
  {
    id: 'dk-2',
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&q=80&w=600',
    prepTime: 4,
    price: 280,
    translations: {
      en: {
        name: 'Hibiscus Mint Cooler',
        description: 'Refreshing chilled organic hibiscus infusion, hand-crushed garden mint leaves, and a touch of wild honey.'
      },
      am: {
        name: 'ሃይቢስከስ ሚንት ማቀዝቀዣ',
        description: 'ቀዝቃዛ የሃይቢስከስ አበባ ፈሳሽ፣ ትኩስ ናና ቅጠል እና የዱር ማር ድብልቅ።'
      },
      om: {
        name: 'Koolerii Habasuka fi Miintii',
        description: 'Dhugaatii ho\'aa qabbaneessu kan habasuka, miintii fi damma daggalaa irraa qophaa\'e.'
      }
    }
  },
  {
    id: 'ds-1',
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1516685018646-549198525c1b?auto=format&fit=crop&q=80&w=600',
    prepTime: 8,
    price: 380,
    isBestseller: true,
    translations: {
      en: {
        name: 'Saffron Crème Brûlée',
        description: 'Velvety farm egg custard steeped with real saffron strands under a perfectly glass-hard caramelized sugar crust.'
      },
      am: {
        name: 'ሳፍሮን ክሬም ብሩሌ',
        description: 'በሳፍሮን ክር የተዘጋጀ ለስላሳ ክሬም በተቃጠለ ስኳር የተሸፈነ ጣፋጭ ምግብ።'
      },
      om: {
        name: 'Saafiroon Kiriim Biruulee',
        description: 'Kiriim misha saafirooniin qophaa\'e, sukkaara gubateen kan bareede.'
      }
    }
  },
  {
    id: 'ds-2',
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&q=80&w=600',
    prepTime: 10,
    price: 450,
    translations: {
      en: {
        name: 'Valrhona Chocolate Dome',
        description: '70% single-origin dark chocolate dome with salted caramel core, melted tableside with hot cream sauce.'
      },
      am: {
        name: 'ቫልሮና ቸኮሌት ዶም',
        description: '70% ጥራት ያለው ጥቁር ቸኮሌት በጨው ካራሚል፣ በትኩስ ክሬም ሶስ የሚቀልጥ።'
      },
      om: {
        name: 'Vaaliroonaa Shokolaata Doom',
        description: 'Shokolaata gurraacha misha misha, soso kaaraameelii fi kkf qabu.'
      }
    }
  }
];

export const TRANSLATIONS: Record<string, LanguageStrings> = {
  en: {
    headerTitle: 'DIRE HOTEL',
    tableNum: 'Table 12',
    searchPlaceholder: 'Search culinary menu...',
    goodMorning: 'Good Morning ☀️',
    freshlyPrepared: 'Freshly prepared for you',
    chefsSpecialBtn: "Chef's Special",
    bestseller: 'Bestseller',
    prepTime: 'mins',
    addToCart: 'Add',
    added: 'Added',
    cartTitle: 'Your Table Order',
    cartEmpty: 'No exquisite items selected yet',
    subtotal: 'Subtotal',
    vatInfo: 'Prices include 15% VAT & 10% Service Charge',
    placeOrder: 'Send Order to Kitchen',
    orderSuccess: 'Order Received',
    orderSuccessDesc: 'Our gourmet chefs have begun preparing your order for Table 12.',
    closeBtn: 'Return to Menu',
    addToOrder: 'Add to Order',
    backToMenu: 'Back to Menu',
    vatLabel: 'VAT (15%)',
    serviceChargeLabel: 'Service Charge (10%)',
    totalLabel: 'Total',
    removeLabel: 'Remove',
    thankYou: 'Thank You!',
    orderReceived: 'Your order has been received.',
    estPrepTime: 'Estimated Preparation Time',
    trackOrder: 'Track Order',
    orderNumLabel: 'Order Number',
    statusReceived: 'Order Received',
    statusConfirmed: 'Confirmed',
    statusPreparing: 'Preparing',
    statusReady: 'Ready',
    statusDelivered: 'Delivered',
    callWaiterBtn: 'Call Waiter',
    cancelBtn: 'Cancel',
    waiterAssistedMsg: "We'll be with you shortly.",
    callingWaiterTitle: 'Summon Butler Service',
    waiterOnWayMsg: 'A premier service representative is being dispatched to Table 12.',
    requestWaiterBtn: 'Confirm Request',
    categories: {
      breakfast: 'Breakfast',
      mainCourse: 'Main Course',
      traditional: 'Traditional',
      drinks: 'Drinks',
      desserts: 'Desserts'
    }
  },
  am: {
    headerTitle: 'ዲሬ ሆቴል',
    tableNum: 'ጠረጴዛ 12',
    searchPlaceholder: 'ምግብ ይፈልጉ...',
    goodMorning: 'እንኳን ደህና አደሩ ☀️',
    freshlyPrepared: 'በጥንቃቄ ለእርስዎ የተዘጋጀ',
    chefsSpecialBtn: 'የሼፉ ምርጫ',
    bestseller: 'ተመራጭ',
    prepTime: 'ደቂቃ',
    addToCart: 'ጨምር',
    added: 'ተጨምሯል',
    cartTitle: 'የጠረጴዛዎ ምርጫ',
    cartEmpty: 'ምንም የተመረጠ ምግብ የለም',
    subtotal: 'ድምር',
    vatInfo: 'ዋጋው 15% ቫት እና 10% የአገልግሎት ክፍያ ያጠቃልላል',
    placeOrder: 'ትዕዛዝ ይላኩ',
    orderSuccess: 'ትዕዛዝዎ ደርሶናል',
    orderSuccessDesc: 'በጥንቃቄ የተዘጋጀው ምግብዎ ወደ ጠረጴዛ 12 እየቀረበ ነው።',
    closeBtn: 'ወደ ማውጫው ተመለስ',
    addToOrder: 'ወደ ትዕዛዝ ጨምር',
    backToMenu: 'ወደ ማውጫው ተመለስ',
    vatLabel: 'ቫት (15%)',
    serviceChargeLabel: 'የአገልግሎት ክፍያ (10%)',
    totalLabel: 'ጠቅላላ ድምር',
    removeLabel: 'አስወግድ',
    thankYou: 'እናመሰግናለን!',
    orderReceived: 'ትዕዛዝዎ በተሳካ ሁኔታ ደርሶናል።',
    estPrepTime: 'የዝግጅት ግምታዊ ጊዜ',
    trackOrder: 'ትዕዛዝ ተከታተል',
    orderNumLabel: 'የትዕዛዝ ቁጥር',
    statusReceived: 'ትዕዛዝ ደርሷል',
    statusConfirmed: 'ተረጋግጧል',
    statusPreparing: 'በመዘጋጀት ላይ',
    statusReady: 'ተዘጋጅቷል',
    statusDelivered: 'ቀርቧል',
    callWaiterBtn: 'አስተናጋጅ ጥራ',
    cancelBtn: 'ሰርዝ',
    waiterAssistedMsg: 'በቅርቡ ወደ እርስዎ እንመጣለን።',
    callingWaiterTitle: 'የአስተናጋጅ አገልግሎት ጥያቄ',
    waiterOnWayMsg: 'የአስተናጋጅ አገልግሎት ተወካይ ወደ ጠረጴዛ 12 እየመጣ ነው።',
    requestWaiterBtn: 'ጥያቄውን አረጋግጥ',
    categories: {
      breakfast: 'ቁርስ',
      mainCourse: 'ዋና ምግብ',
      traditional: 'ባህላዊ ምግብ',
      drinks: 'መጠጦች',
      desserts: 'ጣፋጭ ምግቦች'
    }
  },
  om: {
    headerTitle: 'DIRE HOOTELA',
    tableNum: 'Masaa 12',
    searchPlaceholder: 'Nyaata barbaadi...',
    goodMorning: 'Akkam Bulte ☀️',
    freshlyPrepared: 'Ira addaan isiniif qophaa\'e',
    chefsSpecialBtn: 'Filannoo Sheefii',
    bestseller: 'Filatamaa',
    prepTime: 'daqiiqaa',
    addToCart: 'Dabalii',
    added: 'Dabalameera',
    cartTitle: 'Ajaja Keessan',
    cartEmpty: 'Hanga ammaatti homaa hin filatamne',
    subtotal: 'Waliigala',
    vatInfo: 'Gatiin kun herrega tajaajilaa %10 fi VAT %15 ni dabalata',
    placeOrder: 'Ajaja Ergi',
    orderSuccess: 'Ajajni Keessan Ergameera',
    orderSuccessDesc: 'Nyaatni keessan qophaa\'ee gara Masaa 12tti dhufaa jira.',
    closeBtn: 'Gara Tarree Nyaataatti',
    addToOrder: 'Gara Ajajatti Dabali',
    backToMenu: 'Gara Tarree Nyaataatti',
    vatLabel: 'VAT (%15)',
    serviceChargeLabel: 'Kaffaltii Tajaajilaa (%10)',
    totalLabel: 'Ida\'ama Waliigalaa',
    removeLabel: 'Haqi',
    thankYou: 'Galatoomaa!',
    orderReceived: 'Ajajni keessan fudhatameera.',
    estPrepTime: 'Yeroo Qophii Tilmaamamaa',
    trackOrder: 'Ajaja Hordofi',
    orderNumLabel: 'Lakkoofsa Ajajaa',
    statusReceived: 'Ajajni Fudhatameera',
    statusConfirmed: 'Mirkanaa\'eera',
    statusPreparing: 'Qophaawaa Jira',
    statusReady: 'Qophaa\'eera',
    statusDelivered: 'Dhiyaateera',
    callWaiterBtn: 'Keessummeessaa Waami',
    cancelBtn: 'Haqi',
    waiterAssistedMsg: 'Dhiyootti isiniif dhihaanna.',
    callingWaiterTitle: 'Tajaajila Keessummeessaa Waamuu',
    waiterOnWayMsg: 'Tajaajilaan keenya gara Masaa 12tti dhufaa jira.',
    requestWaiterBtn: 'Gaaffii Mirkaneessi',
    categories: {
      breakfast: 'Ciree',
      mainCourse: 'Nyaata Guddaa',
      traditional: 'Nyaata Aadaa',
      drinks: 'Dhugaatii',
      desserts: 'Dhadhamtuu'
    }
  }
};
