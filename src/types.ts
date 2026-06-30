export type LanguageCode = 'en' | 'am' | 'om';

export interface FoodTranslation {
  name: string;
  description: string;
}

export interface FoodItem {
  id: string;
  category: 'breakfast' | 'mainCourse' | 'traditional' | 'drinks' | 'desserts';
  image: string;
  translations: Record<LanguageCode, FoodTranslation>;
  prepTime: number; // in minutes
  price: number; // in ETB
  isBestseller?: boolean;
}

export interface CartItem {
  foodItem: FoodItem;
  quantity: number;
}

export interface LanguageStrings {
  headerTitle: string;
  tableNum: string;
  searchPlaceholder: string;
  goodMorning: string;
  freshlyPrepared: string;
  chefsSpecialBtn: string;
  bestseller: string;
  prepTime: string;
  addToCart: string;
  added: string;
  cartTitle: string;
  cartEmpty: string;
  subtotal: string;
  vatInfo: string;
  placeOrder: string;
  orderSuccess: string;
  orderSuccessDesc: string;
  closeBtn: string;
  addToOrder: string;
  backToMenu: string;
  vatLabel: string;
  serviceChargeLabel: string;
  totalLabel: string;
  removeLabel: string;
  thankYou: string;
  orderReceived: string;
  estPrepTime: string;
  trackOrder: string;
  orderNumLabel: string;
  statusReceived: string;
  statusConfirmed: string;
  statusPreparing: string;
  statusReady: string;
  statusDelivered: string;
  callWaiterBtn: string;
  cancelBtn: string;
  waiterAssistedMsg: string;
  callingWaiterTitle: string;
  waiterOnWayMsg: string;
  requestWaiterBtn: string;
  categories: {
    breakfast: string;
    mainCourse: string;
    traditional: string;
    drinks: string;
    desserts: string;
  };
}
