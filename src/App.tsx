import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  ShoppingBag, 
  Clock, 
  Plus, 
  Minus, 
  X, 
  Check, 
  Sparkles, 
  UtensilsCrossed,
  Languages,
  ChevronDown,
  Trash2,
  ChefHat,
  ConciergeBell,
  ShieldCheck,
  CheckCircle2,
  Truck
} from 'lucide-react';
import { FOOD_ITEMS, TRANSLATIONS } from './data';
import { LanguageCode, FoodItem, CartItem } from './types';

export default function App() {
  const [lang, setLang] = useState<LanguageCode>('en');
  const [activeCategory, setActiveCategory] = useState<string>('breakfast');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isOrderSubmitted, setIsOrderSubmitted] = useState<boolean>(false);
  const [isTracking, setIsTracking] = useState<boolean>(false);
  const [activeStatusIndex, setActiveStatusIndex] = useState<number>(2);
  const [orderedItems, setOrderedItems] = useState<CartItem[]>([]);
  const [orderNumber, setOrderNumber] = useState<string>('');
  const [highlightedItemId, setHighlightedItemId] = useState<string | null>(null);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState<boolean>(false);
  const [selectedFoodItem, setSelectedFoodItem] = useState<FoodItem | null>(null);
  const [detailQuantity, setDetailQuantity] = useState<number>(1);
  const [isCallWaiterOpen, setIsCallWaiterOpen] = useState<boolean>(false);
  const [isCallingWaiter, setIsCallingWaiter] = useState<boolean>(false);

  // Get localized system strings
  const t = useMemo(() => TRANSLATIONS[lang], [lang]);

  // Filter food items based on category and search query
  const filteredFoodItems = useMemo(() => {
    return FOOD_ITEMS.filter(item => {
      // If we are searching, ignore the category tab to let them search the entire menu!
      const matchesCategory = searchQuery ? true : item.category === activeCategory;
      const localizedName = item.translations[lang].name.toLowerCase();
      const localizedDesc = item.translations[lang].description.toLowerCase();
      const matchesSearch = localizedName.includes(searchQuery.toLowerCase()) || 
                            localizedDesc.includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery, lang]);

  // Total items in cart
  const cartItemCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  // Total price of items in cart
  const cartSubtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + (item.foodItem.price * item.quantity), 0);
  }, [cart]);

  // Total price of ordered items (for persistent tracking display)
  const orderedSubtotal = useMemo(() => {
    return orderedItems.reduce((sum, item) => sum + (item.foodItem.price * item.quantity), 0);
  }, [orderedItems]);

  const handleAddToCart = (item: FoodItem) => {
    setCart(prevCart => {
      const existing = prevCart.find(ci => ci.foodItem.id === item.id);
      if (existing) {
        return prevCart.map(ci => 
          ci.foodItem.id === item.id 
            ? { ...ci, quantity: ci.quantity + 1 } 
            : ci
        );
      }
      return [...prevCart, { foodItem: item, quantity: 1 }];
    });
  };

  const handleRemoveOne = (itemId: string) => {
    setCart(prevCart => {
      const existing = prevCart.find(ci => ci.foodItem.id === itemId);
      if (existing && existing.quantity > 1) {
        return prevCart.map(ci => 
          ci.foodItem.id === itemId 
            ? { ...ci, quantity: ci.quantity - 1 } 
            : ci
        );
      }
      return prevCart.filter(ci => ci.foodItem.id !== itemId);
    });
  };

  const handleQuantityChange = (itemId: string, delta: number) => {
    setCart(prevCart => {
      return prevCart
        .map(ci => {
          if (ci.foodItem.id === itemId) {
            return { ...ci, quantity: ci.quantity + delta };
          }
          return ci;
        })
        .filter(ci => ci.quantity > 0);
    });
  };

  const handleChefsSpecialClick = () => {
    // Highlight the "Dire Special Doro Wot" (tr-1) or "Classic Breakfast" (br-1)
    // We'll switch to 'traditional' category, clear search, and scroll/highlight Special Doro Wot
    setSearchQuery('');
    setActiveCategory('traditional');
    setHighlightedItemId('tr-1');
    
    // Smooth scroll down to the food section
    const element = document.getElementById('food-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Clear highlight after 3 seconds
    setTimeout(() => {
      setHighlightedItemId(null);
    }, 3000);
  };

  const handlePlaceOrder = () => {
    const randomNum = 'DIR-' + (Math.floor(Math.random() * 9000) + 1000);
    setOrderNumber(randomNum);
    setOrderedItems([...cart]);
    setIsOrderSubmitted(true);
    setIsCartOpen(false);
    setIsTracking(false);
    setActiveStatusIndex(2); // Start at Preparing status (Index 2 of 0-4)
  };

  const handleCloseOrderSuccess = () => {
    setIsOrderSubmitted(false);
    setIsTracking(false);
    setCart([]); // Clear cart after successful order
  };

  const handleAddDetailToCart = () => {
    if (selectedFoodItem) {
      setCart(prevCart => {
        const existing = prevCart.find(ci => ci.foodItem.id === selectedFoodItem.id);
        if (existing) {
          return prevCart.map(ci => 
            ci.foodItem.id === selectedFoodItem.id 
              ? { ...ci, quantity: ci.quantity + detailQuantity } 
              : ci
          );
        }
        return [...prevCart, { foodItem: selectedFoodItem, quantity: detailQuantity }];
      });
      setSelectedFoodItem(null);
    }
  };

  const languages = [
    { code: 'en' as LanguageCode, label: 'English', flag: '🇬🇧', subtitle: 'English' },
    { code: 'am' as LanguageCode, label: 'አማርኛ', flag: '🇪🇹', subtitle: 'Amharic' },
    { code: 'om' as LanguageCode, label: 'Afaan Oromoo', flag: '🇪🇹', subtitle: 'Oromo' }
  ];

  return (
    <div className="min-h-screen bg-[#071912] font-sans antialiased text-gray-800 flex justify-center items-stretch relative overflow-x-hidden">
      
      {/* Luxury Background Overlay for Desktop Viewports */}
      <div className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none hidden md:block"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1200')" }}
      />
      
      {/* Golden accent lines across background on desktop */}
      <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 z-50" />

      {/* Main Container - Framed as a premium mobile device centered on desktop */}
      <div className="w-full max-w-md bg-cream-50 flex flex-col min-h-screen shadow-2xl relative z-10 border-x border-gold-300/30">
        
        {/* ================= HEADER ================= */}
        <header className="sticky top-0 z-40 bg-green-900 text-cream-100 shadow-md border-b border-gold-400/20 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {/* Elegant Monogram Logo */}
            <div className="w-10 h-10 rounded-full border border-gold-400 flex items-center justify-center bg-green-950 shadow-inner">
              <span className="font-serif text-lg font-bold text-gold-400 tracking-wide">D</span>
            </div>
            <div>
              <h1 className="font-serif text-base font-bold tracking-widest text-gold-200 leading-none">
                {t.headerTitle}
              </h1>
              <p className="font-mono text-[9px] text-gold-400 tracking-widest uppercase mt-0.5">
                Luxury Dining
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Table Number Badge */}
            <div className="bg-green-950/80 border border-gold-500/30 rounded-full px-3 py-1 flex items-center space-x-1 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
              <span className="font-mono text-xs text-gold-300 font-medium tracking-wide">
                {t.tableNum}
              </span>
            </div>

            {/* Language Selector Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-green-950/90 border border-gold-400/35 hover:bg-green-800/80 transition-all text-gold-300 hover:text-gold-100 shadow-md cursor-pointer text-xs font-semibold tracking-wide font-sans"
              >
                <span className="text-sm select-none leading-none">
                  {languages.find(l => l.code === lang)?.flag}
                </span>
                <span className="uppercase text-[10px] font-bold tracking-widest">
                  {lang}
                </span>
                <ChevronDown className={`w-3 h-3 text-gold-500 transition-transform duration-200 ${showLanguageDropdown ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {showLanguageDropdown && (
                  <>
                    <div className="fixed inset-0 z-45" onClick={() => setShowLanguageDropdown(false)} />
                    <motion.div 
                      initial={{ opacity: 0, y: 12, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 12, scale: 0.95 }}
                      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                      className="absolute right-0 mt-2.5 w-48 bg-green-950 border border-gold-400/40 rounded-2xl shadow-2xl overflow-hidden z-50 p-1.5"
                    >
                      {/* Premium Header inside Dropdown */}
                      <div className="px-3 py-2 border-b border-gold-400/10 mb-1">
                        <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-gold-500/80 block font-bold">
                          Select Language / ቋንቋ
                        </span>
                      </div>

                      <div className="space-y-1">
                        {languages.map((l) => {
                          const isActive = lang === l.code;
                          return (
                            <button
                              key={l.code}
                              onClick={() => {
                                setLang(l.code);
                                setShowLanguageDropdown(false);
                              }}
                              className={`w-full text-left px-3 py-2 rounded-xl text-xs tracking-wide transition-all flex items-center justify-between ${
                                isActive 
                                  ? 'bg-gold-500/15 text-gold-300 border border-gold-500/20 font-bold' 
                                  : 'text-cream-200 hover:bg-green-900/60 hover:text-white border border-transparent'
                              }`}
                            >
                              <div className="flex items-center space-x-3">
                                <span className="text-base select-none leading-none">{l.flag}</span>
                                <div className="text-left">
                                  <span className="block font-medium">{l.label}</span>
                                  <span className="block text-[9px] text-gold-500/60 font-light tracking-wide">
                                    {l.subtitle}
                                  </span>
                                </div>
                              </div>
                              {isActive && (
                                <motion.div 
                                  layoutId="active-lang-check"
                                  className="w-5 h-5 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-400 border border-gold-500/20"
                                >
                                  <Check className="w-3 h-3 stroke-[2.5]" />
                                </motion.div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Shopping Cart Button */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative w-9 h-9 rounded-full bg-gold-500 text-green-950 flex items-center justify-center hover:bg-gold-400 transition-colors shadow-md"
            >
              <ShoppingBag className="w-4.5 h-4.5 stroke-[2.2]" />
              {cartItemCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#D32F2F] text-white text-[10px] font-bold flex items-center justify-center border border-cream-100 shadow-sm"
                >
                  {cartItemCount}
                </motion.span>
              )}
            </button>
          </div>
        </header>

        {/* Search Bar Block - Compact, sits neatly at top */}
        <div className="bg-green-900 px-4 pb-3 pt-1 border-b border-gold-400/10">
          <div className="relative">
            <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-gold-400/60" />
            <input 
              type="text" 
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-2 bg-green-950/70 text-cream-100 border border-gold-400/20 rounded-full text-xs focus:outline-none focus:border-gold-400/60 placeholder-gold-400/40 font-sans tracking-wide transition-colors"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2 w-5 h-5 flex items-center justify-center text-gold-400/60 hover:text-gold-200"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Scrollable Content Container */}
        <div className="flex-1 overflow-y-auto bg-cream-100 pb-20">

          {/* ================= HERO BANNER ================= */}
          {!searchQuery && (
            <div className="relative overflow-hidden mx-4 mt-3 rounded-2xl border border-gold-400/20 shadow-md">
              <div className="h-44 relative w-full overflow-hidden">
                <img 
                  src="/src/assets/images/dire_breakfast_hero_1782808683687.jpg" 
                  alt="Five star breakfast plating"
                  className="w-full h-full object-cover transform scale-105 hover:scale-100 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                {/* Visual rich gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-green-950 via-green-950/45 to-transparent" />
              </div>
              
              {/* Text overlays */}
              <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col justify-end text-cream-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-serif text-xl font-bold tracking-wide text-gold-100">
                      {t.goodMorning}
                    </h2>
                    <p className="text-xs text-gold-200/90 font-light tracking-wide mt-0.5">
                      {t.freshlyPrepared}
                    </p>
                  </div>
                  
                  {/* Chef's Special Button */}
                  <motion.button 
                    whileTap={{ scale: 0.95 }}
                    onClick={handleChefsSpecialClick}
                    className="bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-300 text-green-950 px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-lg flex items-center space-x-1 border border-gold-300/30"
                  >
                    <Sparkles className="w-3 h-3 text-green-950 animate-pulse fill-current" />
                    <span>{t.chefsSpecialBtn}</span>
                  </motion.button>
                </div>
              </div>
            </div>
          )}

          {/* ================= STICKY CATEGORY NAVIGATION ================= */}
          <div className="sticky top-[61px] z-30 bg-cream-100/95 backdrop-blur-md border-y border-gold-300/20 py-2.5 px-4 shadow-sm">
            <div className="flex space-x-1.5 overflow-x-auto pb-1 scrollbar-none scroll-smooth">
              {Object.keys(t.categories).map((catKey) => {
                const isActive = activeCategory === catKey && !searchQuery;
                return (
                  <button
                    key={catKey}
                    onClick={() => {
                      setActiveCategory(catKey);
                      setSearchQuery(''); // Clear search on category tap for clean view
                      // Smooth scroll to the top of food section
                      const element = document.getElementById('food-section');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                    className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all ${
                      isActive 
                        ? 'bg-green-800 text-gold-200 font-semibold shadow-sm border border-gold-400/40' 
                        : 'bg-cream-200 text-green-800 hover:bg-cream-300 border border-transparent'
                    }`}
                  >
                    {t.categories[catKey as keyof typeof t.categories]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ================= FOOD CARDS SECTION ================= */}
          <div id="food-section" className="px-4 pt-3 space-y-4">
            
            {/* Dynamic section title */}
            <div className="flex items-center justify-between border-b border-gold-300/20 pb-1">
              <span className="font-serif text-sm font-semibold tracking-wide text-green-800 uppercase">
                {searchQuery 
                  ? `Search Results (${filteredFoodItems.length})` 
                  : t.categories[activeCategory as keyof typeof t.categories]
                }
              </span>
              <span className="font-mono text-[10px] text-gold-600">
                ⭐ Five-Star Curation
              </span>
            </div>

            <AnimatePresence mode="popLayout">
              {filteredFoodItems.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="py-12 text-center text-gray-500 flex flex-col items-center justify-center space-y-3"
                >
                  <UtensilsCrossed className="w-8 h-8 text-gold-400/60 stroke-1" />
                  <p className="text-xs italic">No exceptional dishes match your current criteria.</p>
                </motion.div>
              ) : (
                filteredFoodItems.map((item) => {
                  const cartItem = cart.find(ci => ci.foodItem.id === item.id);
                  const isHighlighted = highlightedItemId === item.id;

                  return (
                    <motion.div
                      key={item.id}
                      layoutId={`food-card-${item.id}`}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0,
                        scale: isHighlighted ? 1.02 : 1,
                        borderColor: isHighlighted ? 'rgba(197, 168, 92, 1)' : 'rgba(197, 168, 92, 0.15)',
                        boxShadow: isHighlighted ? '0 10px 25px -5px rgba(197, 168, 92, 0.25)' : '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
                      }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                      onClick={() => {
                        setSelectedFoodItem(item);
                        setDetailQuantity(1);
                      }}
                      className={`bg-cream-50 border rounded-2xl overflow-hidden flex relative cursor-pointer hover:border-gold-400/40 active:bg-cream-200/50 transition-colors ${
                        isHighlighted ? 'ring-2 ring-gold-400 ring-offset-1' : ''
                      }`}
                    >
                      {/* Bestseller Badge */}
                      {item.isBestseller && (
                        <div className="absolute top-2 left-2 bg-gradient-to-r from-gold-500 to-gold-400 text-green-950 font-sans font-extrabold text-[9px] tracking-wider uppercase px-2 py-0.5 rounded-full shadow-md z-10 flex items-center space-x-0.5 border border-gold-300/30">
                          <Sparkles className="w-2.5 h-2.5 animate-pulse text-green-950 fill-current" />
                          <span>{t.bestseller}</span>
                        </div>
                      )}

                      {/* Left: Food Image */}
                      <div className="w-28 h-28 relative flex-shrink-0 bg-cream-200">
                        <img 
                          src={item.image} 
                          alt={item.translations[lang].name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Right: Food Details */}
                      <div className="p-3 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start space-x-1">
                            <h3 className="font-serif text-sm font-semibold text-green-900 tracking-wide leading-tight">
                              {item.translations[lang].name}
                            </h3>
                          </div>
                          
                          <p className="text-[11px] text-gray-500 font-light line-clamp-2 mt-1 leading-snug">
                            {item.translations[lang].description}
                          </p>
                        </div>

                        <div className="flex items-end justify-between mt-2 pt-1 border-t border-gold-300/10">
                          <div className="flex flex-col">
                            {/* Prep Time */}
                            <div className="flex items-center text-gold-600 space-x-1">
                              <Clock className="w-3 h-3 text-gold-500" />
                              <span className="font-mono text-[10px] tracking-wide">
                                {item.prepTime} {t.prepTime}
                              </span>
                            </div>
                            
                            {/* Price */}
                            <span className="font-mono text-xs font-bold text-green-800 tracking-wide mt-0.5">
                              {item.price.toLocaleString()} <span className="text-[10px] text-gold-500 font-semibold font-sans">ETB</span>
                            </span>
                          </div>

                          {/* Beautiful Interactive Add (+) Button */}
                          <div className="flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                            {cartItem ? (
                              <motion.div 
                                layout
                                className="bg-green-800 text-gold-200 rounded-full flex items-center shadow-md p-0.5 border border-gold-400/30"
                              >
                                <button 
                                  onClick={() => handleRemoveOne(item.id)}
                                  className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors"
                                >
                                  <Minus className="w-3.5 h-3.5" />
                                </button>
                                <span className="font-mono text-xs font-semibold px-2.5 text-center min-w-[20px]">
                                  {cartItem.quantity}
                                </span>
                                <button 
                                  onClick={() => handleAddToCart(item)}
                                  className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                              </motion.div>
                            ) : (
                              <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleAddToCart(item)}
                                className="bg-cream-100 border border-gold-400/40 text-gold-600 hover:bg-gold-500 hover:text-green-950 px-3.5 py-1 rounded-full text-[11px] font-semibold tracking-wide shadow-sm flex items-center space-x-1.5 transition-all"
                              >
                                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                                <span>{t.addToCart}</span>
                              </motion.button>
                            )}
                          </div>
                        </div>

                      </div>
                    </motion.div>
                  );
                })
              )}
            </AnimatePresence>

          </div>

          {/* Elegancy disclaimer badge at bottom */}
          <div className="py-8 text-center px-6">
            <div className="w-8 h-px bg-gold-400/40 mx-auto mb-3" />
            <p className="font-serif italic text-[11px] text-gold-600 tracking-wider">
              "Excellence in Hospitality, Heritage, and Flavour"
            </p>
            <p className="font-mono text-[9px] text-gray-400 uppercase tracking-widest mt-1">
              Dire Hotel Restaurant • 5 Star Luxury
            </p>
          </div>

        </div>

        {/* ================= STICKY ORDER BOTTOM BAR ================= */}
        {cartItemCount > 0 && (
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="absolute bottom-0 left-0 right-0 z-35 bg-green-950 text-cream-100 px-5 py-3.5 border-t border-gold-400/40 shadow-xl flex items-center justify-between"
          >
            <div>
              <p className="font-mono text-[9px] text-gold-400 tracking-wider uppercase">
                {cartItemCount} {cartItemCount === 1 ? 'Exquisite Selection' : 'Exquisite Selections'}
              </p>
              <p className="font-mono text-base font-bold text-gold-300 mt-0.5">
                {cartSubtotal.toLocaleString()} <span className="text-[10px] text-gold-400 font-sans">ETB</span>
              </p>
            </div>

            <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCartOpen(true)}
              className="bg-gradient-to-r from-gold-500 to-gold-400 text-green-950 px-6 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase shadow-lg flex items-center space-x-2 border border-gold-300/30 hover:from-gold-400 hover:to-gold-300 transition-colors"
            >
              <span>{t.cartTitle}</span>
              <ShoppingBag className="w-4 h-4" />
            </motion.button>
          </motion.div>
        )}

        {/* ================= SHOPPING CART DRAWER ================= */}
        <AnimatePresence>
          {isCartOpen && (
            <>
              {/* Drawer Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsCartOpen(false)}
                className="absolute inset-0 bg-black z-45"
              />

              {/* Drawer Content */}
              <motion.div 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 220 }}
                className="absolute bottom-0 left-0 right-0 max-h-[85vh] bg-cream-50 rounded-t-3xl border-t border-gold-400/40 shadow-2xl z-50 flex flex-col"
              >
                {/* Drag handle decoration */}
                <div className="w-12 h-1 bg-gold-400/30 rounded-full mx-auto my-3" />

                {/* Header */}
                <div className="px-5 pb-3 border-b border-gold-300/20 flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-green-900 tracking-wide">
                      {t.cartTitle}
                    </h3>
                    <p className="font-mono text-[10px] text-gold-600 mt-0.5 uppercase tracking-wide">
                      Table 12 • Gourmet Dining
                    </p>
                  </div>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="w-8 h-8 rounded-full bg-cream-200 flex items-center justify-center hover:bg-gold-500/20 text-green-900 hover:text-gold-600 transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Items list */}
                <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3.5">
                  {cart.length === 0 ? (
                    <div className="py-16 text-center text-gray-500 flex flex-col items-center space-y-3">
                      <ShoppingBag className="w-12 h-12 text-gold-300 stroke-1" />
                      <p className="text-xs italic">{t.cartEmpty}</p>
                    </div>
                  ) : (
                    cart.map((item) => (
                      <div 
                        key={item.foodItem.id} 
                        className="bg-cream-100 border border-gold-400/10 rounded-xl p-3 flex items-center space-x-3 shadow-sm relative"
                      >
                        {/* Food Image */}
                        <img 
                          src={item.foodItem.image} 
                          alt={item.foodItem.translations[lang].name}
                          className="w-16 h-16 rounded-lg object-cover bg-cream-200 flex-shrink-0 border border-gold-400/15"
                          referrerPolicy="no-referrer"
                        />

                        {/* Food Details */}
                        <div className="flex-1 min-w-0 pr-8">
                          <h4 className="font-serif text-xs font-bold text-green-900 truncate tracking-wide">
                            {item.foodItem.translations[lang].name}
                          </h4>
                          <p className="font-mono text-[11px] text-gold-600 font-medium mt-0.5">
                            {item.foodItem.price.toLocaleString()} ETB
                          </p>

                          {/* Interactive Quantity Selector inside cart */}
                          <div className="flex items-center space-x-2 mt-2">
                            <button 
                              onClick={() => handleQuantityChange(item.foodItem.id, -1)}
                              className="w-6 h-6 rounded-full bg-cream-200 hover:bg-gold-500 hover:text-green-950 flex items-center justify-center text-green-900 transition-all shadow-sm"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-mono text-xs font-bold text-green-950 min-w-[16px] text-center">
                              {item.quantity}
                            </span>
                            <button 
                              onClick={() => handleQuantityChange(item.foodItem.id, 1)}
                              className="w-6 h-6 rounded-full bg-cream-200 hover:bg-gold-500 hover:text-green-950 flex items-center justify-center text-green-900 transition-all shadow-sm"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        {/* Calculated item price (qty * unit price) */}
                        <div className="text-right flex flex-col justify-between h-14">
                          {/* Elegant Trash Can to Remove Item completely */}
                          <button 
                            onClick={() => setCart(prev => prev.filter(ci => ci.foodItem.id !== item.foodItem.id))}
                            className="text-gray-400 hover:text-red-600 transition-colors self-end p-1 rounded-full hover:bg-cream-200/50"
                            title={t.removeLabel}
                          >
                            <Trash2 className="w-4 h-4 stroke-[1.8]" />
                          </button>

                          <span className="font-mono text-xs font-bold text-green-850">
                            {(item.foodItem.price * item.quantity).toLocaleString()} <span className="text-[9px] font-sans text-gold-500">ETB</span>
                          </span>
                        </div>

                      </div>
                    ))
                  )}
                </div>

                {/* Checkout pricing details & action button */}
                {cart.length > 0 && (
                  <div className="bg-cream-200 p-5 border-t border-gold-400/25 space-y-4">
                    
                    {/* Exquisite Bill Receipt Layout */}
                    <div className="space-y-2.5 bg-cream-50 border border-gold-300/30 rounded-xl p-3.5 shadow-inner">
                      <div className="font-serif text-[11px] font-bold text-green-900 tracking-wider uppercase border-b border-gold-300/20 pb-1.5 mb-1.5 flex justify-between">
                        <span>Order Summary</span>
                        <span className="font-mono text-[9px] text-gold-600 font-normal">DIRE-RECEIPT</span>
                      </div>
                      
                      {/* Subtotal */}
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-500 font-light">{t.subtotal}</span>
                        <span className="font-mono font-semibold text-green-900">
                          {cartSubtotal.toLocaleString()} ETB
                        </span>
                      </div>

                      {/* VAT (15%) */}
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-500 font-light">{t.vatLabel}</span>
                        <span className="font-mono text-gray-700">
                          {Math.round(cartSubtotal * 0.15).toLocaleString()} ETB
                        </span>
                      </div>

                      {/* Service Charge (10%) */}
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-500 font-light">{t.serviceChargeLabel}</span>
                        <span className="font-mono text-gray-700">
                          {Math.round(cartSubtotal * 0.10).toLocaleString()} ETB
                        </span>
                      </div>

                      {/* Elegant dotted divider */}
                      <div className="border-t border-dashed border-gold-400/30 my-2" />

                      {/* Total */}
                      <div className="flex justify-between items-center text-sm font-bold">
                        <span className="text-green-900 font-serif tracking-wide">{t.totalLabel}</span>
                        <span className="font-mono text-green-800 text-base">
                          {Math.round(cartSubtotal * 1.25).toLocaleString()} ETB
                        </span>
                      </div>
                      
                      <p className="text-[9px] text-gray-400 leading-tight italic text-center pt-1 border-t border-gold-300/10">
                        * High-quality ingredients hand-picked by our chef
                      </p>
                    </div>

                    {/* Checkout Button */}
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={handlePlaceOrder}
                      className="w-full bg-green-900 text-gold-200 py-3.5 rounded-full text-xs font-bold tracking-widest uppercase shadow-xl flex items-center justify-center space-x-2 border border-gold-400/40 hover:bg-green-850 transition-colors"
                    >
                      <Check className="w-4.5 h-4.5 text-gold-400" />
                      <span>{t.placeOrder}</span>
                    </motion.button>
                  </div>
                )}
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* ================= PREMIUM FOOD DETAIL POPUP ================= */}
        <AnimatePresence>
          {selectedFoodItem && (
            <div className="absolute inset-0 z-50 flex items-end justify-center">
              {/* Dark luxury backdrop */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedFoodItem(null)}
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              />

              {/* Popup Content Sheet */}
              <motion.div 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 220 }}
                className="w-full max-w-md bg-cream-50 rounded-t-[32px] border-t border-gold-400/40 shadow-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh]"
              >
                {/* Drag / Decorative Indicator bar */}
                <div className="w-12 h-1 bg-gold-400/30 rounded-full mx-auto my-3 flex-shrink-0" />

                {/* Absolute Close Button at Top-Right over the content/image */}
                <button 
                  onClick={() => setSelectedFoodItem(null)}
                  className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-all backdrop-blur-md border border-white/20"
                >
                  <X className="w-5 h-5 stroke-[2.2]" />
                </button>

                {/* Main scrollable body */}
                <div className="overflow-y-auto pb-6 px-6">
                  {/* Large Rounded Premium Food Image */}
                  <div className="w-full h-56 rounded-2xl overflow-hidden shadow-lg border border-gold-400/10 bg-cream-200 relative">
                    <img 
                      src={selectedFoodItem.image} 
                      alt={selectedFoodItem.translations[lang].name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    {selectedFoodItem.isBestseller && (
                      <div className="absolute top-3 left-3 bg-gradient-to-r from-gold-500 to-gold-400 text-green-950 font-sans font-extrabold text-[10px] tracking-wider uppercase px-3 py-1 rounded-full shadow-md border border-gold-300/30 flex items-center space-x-1">
                        <Sparkles className="w-3 h-3 text-green-950 animate-pulse fill-current" />
                        <span>{t.bestseller}</span>
                      </div>
                    )}
                  </div>

                  {/* Header/Names */}
                  <div className="mt-5">
                    <div className="flex justify-between items-start">
                      <h2 className="font-serif text-xl font-bold text-green-900 tracking-wide leading-tight">
                        {selectedFoodItem.translations[lang].name}
                      </h2>
                    </div>
                    
                    {/* Price & Prep time in elegant row */}
                    <div className="flex items-center space-x-4 mt-3 py-2 border-y border-gold-300/15">
                      <div className="flex items-center text-gold-600 space-x-1.5">
                        <Clock className="w-4 h-4 text-gold-500" />
                        <span className="font-mono text-xs tracking-wide font-medium">
                          {selectedFoodItem.prepTime} {t.prepTime}
                        </span>
                      </div>
                      <div className="w-1.5 h-1.5 rounded-full bg-gold-400/50" />
                      <span className="font-mono text-base font-bold text-green-800 tracking-wide">
                        {selectedFoodItem.price.toLocaleString()} <span className="text-xs text-gold-500 font-semibold font-sans">ETB</span>
                      </span>
                    </div>

                    {/* Short Description */}
                    <p className="text-xs text-gray-500 font-light leading-relaxed mt-4">
                      {selectedFoodItem.translations[lang].description}
                    </p>
                  </div>

                  {/* Quantity and CTA Block */}
                  <div className="mt-8 pt-4 border-t border-gold-300/10 flex flex-col space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-green-900 tracking-wide uppercase">
                        Select Quantity
                      </span>
                      
                      {/* Premium Quantity Selector */}
                      <div className="bg-cream-200 border border-gold-400/20 rounded-full p-1 flex items-center shadow-inner">
                        <motion.button 
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setDetailQuantity(q => Math.max(1, q - 1))}
                          className="w-8 h-8 rounded-full bg-cream-50 hover:bg-gold-500/10 flex items-center justify-center text-green-900 transition-colors shadow-sm"
                        >
                          <Minus className="w-4 h-4" />
                        </motion.button>
                        <span className="font-mono text-sm font-bold text-green-950 px-4 min-w-[28px] text-center">
                          {detailQuantity}
                        </span>
                        <motion.button 
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setDetailQuantity(q => q + 1)}
                          className="w-8 h-8 rounded-full bg-cream-50 hover:bg-gold-500/10 flex items-center justify-center text-green-900 transition-colors shadow-sm"
                        >
                          <Plus className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>

                    {/* Subtotal calculation for popup */}
                    <div className="flex justify-between items-center bg-cream-100 p-3 rounded-xl border border-gold-300/10">
                      <span className="text-xs text-gray-400">Selected Subtotal</span>
                      <span className="font-mono text-sm font-bold text-green-950">
                        {(selectedFoodItem.price * detailQuantity).toLocaleString()} ETB
                      </span>
                    </div>

                    {/* Large "Add to Order" Button */}
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={handleAddDetailToCart}
                      className="w-full bg-green-900 text-gold-200 py-3.5 rounded-full text-xs font-bold tracking-widest uppercase shadow-xl flex items-center justify-center space-x-2.5 border border-gold-400/40 hover:bg-green-850 transition-colors"
                    >
                      <ShoppingBag className="w-4.5 h-4.5 text-gold-400" />
                      <span>{t.addToOrder}</span>
                    </motion.button>
                  </div>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* ================= ORDER SUCCESS & LUXURY TRACKING DIALOG ================= */}
        <AnimatePresence>
          {isOrderSubmitted && (
            <div className="absolute inset-0 z-50 flex flex-col justify-end sm:items-center sm:justify-center p-0 sm:p-4 overflow-hidden">
              {/* Luxury dark backdrop */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                exit={{ opacity: 0 }}
                onClick={handleCloseOrderSuccess}
                className="absolute inset-0 bg-green-950/95 backdrop-blur-md"
              />

              {!isTracking ? (
                /* ================= RECEIPT TICKET VIEW ================= */
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 30 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                  className="w-full max-w-sm bg-cream-50 border border-gold-400/40 rounded-[32px] overflow-hidden shadow-2xl relative z-10 p-6 flex flex-col items-center text-center mx-auto"
                >
                  {/* Large Success Icon Container */}
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                    className="w-20 h-20 rounded-full bg-green-900 border-2 border-gold-400/60 flex items-center justify-center text-gold-400 shadow-xl mb-5"
                  >
                    <Check className="w-10 h-10 stroke-[2.5] drop-shadow-md" />
                  </motion.div>

                  {/* Thank You! */}
                  <h3 className="font-serif text-2xl font-bold text-green-900 tracking-wide">
                    {t.thankYou}
                  </h3>

                  {/* Your order has been received. */}
                  <p className="text-xs text-gray-500 font-light mt-1.5 leading-relaxed max-w-[240px]">
                    {t.orderReceived}
                  </p>

                  {/* Ticket dotted separator */}
                  <div className="w-full flex items-center justify-between my-4">
                    <div className="w-3 h-6 bg-green-950/90 rounded-r-full -ml-6 border-y border-r border-gold-400/20" />
                    <div className="flex-1 border-t border-dashed border-gold-400/30 mx-2" />
                    <div className="w-3 h-6 bg-green-950/90 rounded-l-full -mr-6 border-y border-l border-gold-400/20" />
                  </div>

                  {/* Estimated Preparation Time Block */}
                  <div className="w-full space-y-4">
                    <div className="bg-cream-100 border border-gold-400/10 rounded-2xl p-4 shadow-sm flex flex-col items-center">
                      <span className="text-[10px] uppercase text-gold-600 tracking-widest font-semibold">
                        {t.estPrepTime}
                      </span>
                      
                      {/* Time details */}
                      <div className="flex items-center space-x-2 mt-2">
                        <Clock className="w-5 h-5 text-green-800 animate-pulse" />
                        <span className="font-serif text-xl font-bold text-green-900">
                          20 {t.prepTime}
                        </span>
                      </div>
                    </div>

                    {/* Order Number Block */}
                    <div className="bg-cream-200/50 border border-gold-400/10 rounded-2xl p-3 shadow-sm flex justify-between items-center px-4">
                      <span className="text-[10px] uppercase text-gray-500 tracking-wider">
                        {t.orderNumLabel}
                      </span>
                      <span className="font-mono text-xs font-bold text-green-950 tracking-wider">
                        {orderNumber}
                      </span>
                    </div>
                  </div>

                  {/* Divider lines before CTAs */}
                  <div className="w-full border-t border-gold-300/10 my-5" />

                  {/* Action Buttons */}
                  <div className="w-full space-y-3">
                    {/* Track Order Button */}
                    <motion.button
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setIsTracking(true)}
                      className="w-full bg-green-900 hover:bg-green-850 text-gold-200 py-3.5 rounded-full text-xs font-bold tracking-widest uppercase shadow-lg border border-gold-400/30 flex items-center justify-center space-x-2 transition-all"
                    >
                      <Sparkles className="w-4 h-4 text-gold-400 animate-spin-slow" style={{ animationDuration: '4s' }} />
                      <span>{t.trackOrder}</span>
                    </motion.button>

                    {/* Back to Menu / Close Button */}
                    <motion.button
                      whileTap={{ scale: 0.96 }}
                      onClick={handleCloseOrderSuccess}
                      className="w-full bg-cream-200 hover:bg-gold-500 hover:text-green-950 text-green-900 py-3.5 rounded-full text-xs font-bold tracking-widest uppercase shadow-sm border border-gold-400/20 transition-all"
                    >
                      {t.backToMenu}
                    </motion.button>
                  </div>
                </motion.div>
              ) : (
                /* ================= PREMIUM FULL-SCALE ORDER TRACKING SCREEN ================= */
                <motion.div 
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "100%", opacity: 0 }}
                  transition={{ type: 'spring', damping: 28, stiffness: 180 }}
                  className="w-full max-w-md h-full sm:h-[90vh] bg-cream-50 border-t sm:border border-gold-400/40 rounded-t-[36px] sm:rounded-[36px] shadow-2xl relative z-10 overflow-hidden flex flex-col"
                >
                  {/* Luxury Hotel Brand Header */}
                  <div className="bg-green-950 px-6 py-5 text-center border-b border-gold-400/30 flex-shrink-0 relative">
                    <div className="flex justify-center mb-1 text-gold-400">
                      <UtensilsCrossed className="w-5 h-5 animate-pulse" />
                    </div>
                    <span className="font-sans text-[9px] tracking-[0.25em] font-extrabold text-gold-300 uppercase block">
                      DIRE PALACE HOTEL
                    </span>
                    <h2 className="font-serif text-base font-bold text-cream-50 mt-1 tracking-wider uppercase">
                      Culinary Room Service Tracker
                    </h2>
                    
                    <div className="mt-3 flex items-center justify-center space-x-2">
                      <span className="font-mono text-[11px] text-gold-400 font-medium px-3 py-1 rounded-full bg-green-900/60 border border-gold-400/15">
                        {t.orderNumLabel}: {orderNumber}
                      </span>
                      <span className="font-sans text-[10px] font-bold text-cream-100 px-2.5 py-1 rounded-full bg-gold-500/10 border border-gold-400/10">
                        {t.tableNum}
                      </span>
                    </div>

                    {/* Absolute Close X */}
                    <button 
                      onClick={() => setIsTracking(false)}
                      className="absolute top-4 right-4 text-cream-200/60 hover:text-white transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Main Scrollable Journey */}
                  <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
                    
                    {/* Est. Culinary Prep focal card */}
                    <div className="bg-gradient-to-br from-green-900 to-green-950 text-gold-200 rounded-2xl p-4.5 border border-gold-400/35 shadow-lg relative overflow-hidden flex items-center space-x-4">
                      <div className="absolute -right-8 -bottom-8 w-24 h-24 rounded-full bg-gold-400/5 filter blur-xl" />
                      
                      <div className="w-12 h-12 rounded-full bg-gold-400/15 border border-gold-400/30 flex items-center justify-center text-gold-400 flex-shrink-0 relative">
                        <Clock className="w-6 h-6 animate-spin-slow" style={{ animationDuration: '10s' }} />
                        <span className="absolute inset-0 rounded-full border border-gold-400/20 animate-ping" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-[9px] uppercase tracking-[0.15em] text-gold-400/80 font-semibold">{t.estPrepTime}</p>
                        <h4 className="font-serif text-xl font-bold text-cream-50 mt-0.5 tracking-wide">
                          {activeStatusIndex === 0 && `25 ${t.prepTime}`}
                          {activeStatusIndex === 1 && `22 ${t.prepTime}`}
                          {activeStatusIndex === 2 && `18 ${t.prepTime}`}
                          {activeStatusIndex === 3 && `3 ${t.prepTime}`}
                          {activeStatusIndex === 4 && `Delivered • Enjoy`}
                        </h4>
                        <p className="text-[10px] text-cream-200/70 font-light mt-1 leading-normal">
                          {activeStatusIndex === 0 && "Your request has been received in our gourmet kitchen."}
                          {activeStatusIndex === 1 && "Validated by our Chef de Cuisine; prep is starting."}
                          {activeStatusIndex === 2 && "Our world-class chefs are craftily preparing your selections."}
                          {activeStatusIndex === 3 && "Garnished & plated. Our delivery butler is on their way."}
                          {activeStatusIndex === 4 && "Signature room service arrived. Thank you for choosing Dire Palace."}
                        </p>
                      </div>
                    </div>

                    {/* Timeline Tracker Section */}
                    <div className="bg-cream-100/60 border border-gold-400/10 rounded-2xl p-5 shadow-sm space-y-4">
                      <div className="flex justify-between items-center border-b border-gold-300/15 pb-2">
                        <span className="text-[10px] uppercase text-gold-600 tracking-[0.12em] font-bold">
                          Live Culinary Journey
                        </span>
                        <span className="font-sans text-[9px] text-gray-400 tracking-wide italic">
                          Tap any phase to update status
                        </span>
                      </div>

                      {/* Timeline List */}
                      <div className="space-y-0.5 relative pl-1.5">
                        {[
                          {
                            title: t.statusReceived,
                            desc: lang === 'en' ? 'Kitchen is reviewing your ticket.' : lang === 'am' ? 'ማእድ ቤቱ ትዕዛዝዎን እየገመገመ ነው።' : 'Kushinaan ajaja keessan ilaalaa jira.',
                            icon: CheckCircle2,
                          },
                          {
                            title: t.statusConfirmed,
                            desc: lang === 'en' ? 'Order validated & chef assigned.' : lang === 'am' ? 'ትዕዛዙ ተረጋግጦ ሼፍ ተመድቧል።' : 'Ajajni mirkanaa\'ee sheefiin ramadameera.',
                            icon: ShieldCheck,
                          },
                          {
                            title: t.statusPreparing,
                            desc: lang === 'en' ? 'Ingredients selected and flame active.' : lang === 'am' ? 'ግብዓቶች ተመርጠው በመዘጋጀት ላይ ናቸው።' : 'Mi’a qophii filatamee ibidda irra jira.',
                            icon: ChefHat,
                          },
                          {
                            title: t.statusReady,
                            desc: lang === 'en' ? 'Plated & polished to perfection.' : lang === 'am' ? 'ምግቡ በጥንቃቄ ተዘጋጅቶ ተጠናቋል።' : 'Mi’aan dhihaachuuf qophaa’eera.',
                            icon: ConciergeBell,
                          },
                          {
                            title: t.statusDelivered,
                            desc: lang === 'en' ? 'Delivered fresh to Table 12.' : lang === 'am' ? 'ትኩስ ምግቡ ጠረጴዛ 12 ላይ ቀርቧል።' : 'Gara Masaa 12tti dhiyaateera.',
                            icon: Truck,
                          }
                        ].map((step, idx) => {
                          const isCompleted = idx < activeStatusIndex;
                          const isActive = idx === activeStatusIndex;
                          const isPending = idx > activeStatusIndex;
                          const StepIcon = step.icon;

                          return (
                            <div 
                              key={idx} 
                              onClick={() => setActiveStatusIndex(idx)}
                              className="flex items-start cursor-pointer group relative pb-6 last:pb-2"
                            >
                              {/* Connector line */}
                              {idx < 4 && (
                                <div className={`absolute left-[19px] top-10 w-[2px] h-[calc(100%-16px)] z-0 ${
                                  isCompleted ? 'bg-gold-500' : 'border-l-2 border-dashed border-gold-400/20'
                                }`} />
                              )}

                              {/* Icon container */}
                              <div className="relative z-10 flex-shrink-0 mt-1 mr-4">
                                <motion.div 
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.95 }}
                                  className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all shadow-md ${
                                    isCompleted 
                                      ? 'bg-green-900 border-gold-400 text-gold-300' 
                                      : isActive 
                                        ? 'bg-gold-500 border-gold-300 text-green-950 animate-pulse' 
                                        : 'bg-cream-200 border-gold-400/10 text-gray-400'
                                  }`}
                                >
                                  {isCompleted ? (
                                    <Check className="w-5 h-5 stroke-[2.5]" />
                                  ) : (
                                    <StepIcon className="w-5 h-5 stroke-[1.8]" />
                                  )}
                                </motion.div>
                              </div>

                              {/* Texts */}
                              <div className="flex-1 min-w-0 pt-1.5">
                                <h4 className={`font-serif text-sm font-bold tracking-wide transition-colors ${
                                  isActive 
                                    ? 'text-gold-600' 
                                    : isCompleted 
                                      ? 'text-green-900 font-semibold' 
                                      : 'text-gray-400 font-normal'
                                }`}>
                                  {step.title}
                                </h4>
                                <p className={`text-[11px] leading-normal font-light mt-0.5 transition-colors ${
                                  isActive 
                                    ? 'text-gray-600' 
                                    : isCompleted 
                                      ? 'text-gray-500' 
                                      : 'text-gray-400/70'
                                }`}>
                                  {step.desc}
                                </p>
                              </div>

                              {/* Pulsing indicator for active step */}
                              {isActive && (
                                <div className="absolute right-0 top-4 w-2 h-2 rounded-full bg-gold-500 animate-ping" />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Ordered Items Summary Block */}
                    <div className="bg-cream-100/60 border border-gold-400/10 rounded-2xl p-5 shadow-sm space-y-4">
                      <h3 className="font-serif text-xs font-bold text-green-900 tracking-wider uppercase border-b border-gold-300/15 pb-2">
                        Your Fine Selections ({orderedItems.length})
                      </h3>
                      
                      {/* List */}
                      <div className="max-h-48 overflow-y-auto space-y-3 pr-1 divide-y divide-gold-300/10">
                        {orderedItems.map((item) => (
                          <div key={item.foodItem.id} className="flex items-center justify-between pt-3 first:pt-0">
                            <div className="flex items-center space-x-3 min-w-0 flex-1">
                              <img 
                                src={item.foodItem.image} 
                                alt={item.foodItem.translations[lang].name}
                                className="w-11 h-11 rounded-lg object-cover bg-cream-200 border border-gold-400/10 flex-shrink-0"
                                referrerPolicy="no-referrer"
                              />
                              <div className="min-w-0">
                                <p className="font-serif text-xs font-bold text-green-900 truncate tracking-wide">
                                  {item.foodItem.translations[lang].name}
                                </p>
                                <p className="font-mono text-[10px] text-gold-600 mt-0.5 font-medium">
                                  {item.quantity} × {item.foodItem.price.toLocaleString()} ETB
                                </p>
                              </div>
                            </div>
                            <span className="font-mono text-xs font-bold text-green-850 pl-3">
                              {(item.foodItem.price * item.quantity).toLocaleString()} <span className="text-[9px] font-sans text-gold-500">ETB</span>
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Ledger Price Breakdown */}
                      <div className="border-t border-dashed border-gold-400/25 pt-3.5 space-y-2 text-[11px]">
                        <div className="flex justify-between text-gray-500 font-light">
                          <span>Subtotal</span>
                          <span className="font-mono">{orderedSubtotal.toLocaleString()} ETB</span>
                        </div>
                        <div className="flex justify-between text-gray-500 font-light">
                          <span>{t.vatLabel}</span>
                          <span className="font-mono">{Math.round(orderedSubtotal * 0.15).toLocaleString()} ETB</span>
                        </div>
                        <div className="flex justify-between text-gray-500 font-light">
                          <span>{t.serviceChargeLabel}</span>
                          <span className="font-mono">{Math.round(orderedSubtotal * 0.10).toLocaleString()} ETB</span>
                        </div>
                        
                        <div className="border-t border-gold-400/10 my-2" />
                        
                        <div className="flex justify-between text-xs font-bold text-green-900">
                          <span className="font-serif tracking-wide">Total Charged</span>
                          <span className="font-mono text-sm text-green-850">
                            {Math.round(orderedSubtotal * 1.25).toLocaleString()} ETB
                          </span>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Footer CTAs */}
                  <div className="p-5 bg-cream-200 border-t border-gold-400/20 flex flex-col space-y-2.5 flex-shrink-0">
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setIsTracking(false)}
                      className="w-full bg-cream-50 hover:bg-cream-100 text-green-900 py-3 rounded-full text-xs font-bold tracking-widest uppercase shadow-sm border border-gold-400/20 flex items-center justify-center space-x-2 transition-all"
                    >
                      <Check className="w-4 h-4 text-gold-500" />
                      <span>View Receipt Details</span>
                    </motion.button>
                    
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={handleCloseOrderSuccess}
                      className="w-full bg-green-900 hover:bg-green-850 text-gold-200 py-3.5 rounded-full text-xs font-bold tracking-widest uppercase shadow-md border border-gold-400/30 transition-all"
                    >
                      {t.backToMenu}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </AnimatePresence>
 
        {/* ================= FLOATING CALL WAITER BUTTON ================= */}
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setIsCallWaiterOpen(true);
            setIsCallingWaiter(false);
          }}
          className={`fixed sm:absolute right-6 z-30 w-14 h-14 rounded-full bg-gradient-to-br from-gold-500 to-gold-400 text-green-950 flex items-center justify-center shadow-2xl border border-gold-300/50 cursor-pointer transition-all ${
            cartItemCount > 0 ? 'bottom-24' : 'bottom-8'
          }`}
          id="floating-call-waiter-button"
        >
          {/* Pulsing ring */}
          <span className="absolute inset-0 rounded-full border border-gold-400/40 animate-ping opacity-75" style={{ animationDuration: '3s' }} />
          <ConciergeBell className="w-6 h-6 stroke-[2]" />
        </motion.button>

        {/* ================= CALL WAITER MODAL ================= */}
        <AnimatePresence>
          {isCallWaiterOpen && (
            <div className="absolute inset-0 z-50 flex items-center justify-center p-4 overflow-hidden">
              {/* Luxury dark backdrop with deep blur */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsCallWaiterOpen(false)}
                className="absolute inset-0 bg-green-950/85 backdrop-blur-md"
                id="call-waiter-backdrop"
              />

              {/* Premium Luxury Modal Box */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                className="w-full max-w-sm bg-cream-50 border border-gold-400/40 rounded-[32px] overflow-hidden shadow-2xl relative z-10 p-6 flex flex-col items-center text-center"
                id="call-waiter-modal-container"
              >
                {/* Visual Accent Lines */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-500 via-gold-300 to-gold-500" />

                {/* Table Number Ribbon Badge */}
                <div className="bg-green-900 border border-gold-400/30 text-gold-300 px-4 py-1.5 rounded-full text-[10px] font-mono tracking-widest uppercase mb-6 shadow-sm flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
                  <span>{t.tableNum}</span>
                </div>

                {/* Animated Concierge Bell Circle */}
                <div className="relative mb-6">
                  {isCallingWaiter && (
                    <>
                      <span className="absolute inset-[-12px] rounded-full border border-gold-400/30 animate-ping" style={{ animationDuration: '1.5s' }} />
                      <span className="absolute inset-[-24px] rounded-full border border-gold-400/10 animate-ping" style={{ animationDuration: '2.5s' }} />
                    </>
                  )}
                  <motion.div 
                    animate={isCallingWaiter ? { rotate: [-5, 5, -5, 5, 0] } : {}}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    className={`w-20 h-20 rounded-full border-2 flex items-center justify-center transition-all duration-300 shadow-xl ${
                      isCallingWaiter 
                        ? 'bg-gold-500 border-gold-300 text-green-950 animate-pulse' 
                        : 'bg-green-900 border-gold-400 text-gold-400'
                    }`}
                  >
                    <ConciergeBell className="w-10 h-10 stroke-[1.8]" />
                  </motion.div>
                </div>

                {/* Title & Messages */}
                <h3 className="font-serif text-xl font-bold text-green-900 tracking-wide">
                  {isCallingWaiter ? t.callingWaiterTitle : t.callWaiterBtn}
                </h3>

                <p className="text-xs text-gray-500 font-light mt-2.5 leading-relaxed max-w-[260px]">
                  {isCallingWaiter ? t.waiterOnWayMsg : t.waiterAssistedMsg}
                </p>

                {/* Dotted ticket style separator */}
                <div className="w-full flex items-center justify-between my-5">
                  <div className="w-3 h-6 bg-green-950/85 rounded-r-full -ml-9 border-y border-r border-gold-400/20" />
                  <div className="flex-1 border-t border-dashed border-gold-400/25 mx-2" />
                  <div className="w-3 h-6 bg-green-950/85 rounded-l-full -mr-9 border-y border-l border-gold-400/20" />
                </div>

                {/* Actions */}
                <div className="w-full space-y-2.5">
                  {!isCallingWaiter ? (
                    <motion.button
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setIsCallingWaiter(true)}
                      className="w-full bg-gradient-to-r from-gold-500 to-gold-400 text-green-950 py-3.5 rounded-full text-xs font-bold tracking-widest uppercase shadow-md border border-gold-300/40 flex items-center justify-center space-x-2 transition-all hover:from-gold-400 hover:to-gold-300 cursor-pointer"
                      id="confirm-call-waiter-button"
                    >
                      <ConciergeBell className="w-4 h-4 text-green-950" />
                      <span>{t.requestWaiterBtn}</span>
                    </motion.button>
                  ) : (
                    <div className="bg-green-900/5 border border-gold-500/15 p-3 rounded-2xl mb-2 flex items-center justify-center space-x-2">
                      <Sparkles className="w-4 h-4 text-gold-500" />
                      <span className="text-[10px] uppercase font-bold tracking-wider text-gold-600">
                        Butler is En Route
                      </span>
                    </div>
                  )}

                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setIsCallWaiterOpen(false)}
                    className="w-full bg-cream-200 hover:bg-gold-500/15 text-green-900 hover:text-green-950 py-3 rounded-full text-xs font-bold tracking-widest uppercase shadow-sm border border-gold-400/20 transition-all cursor-pointer"
                    id="cancel-call-waiter-button"
                  >
                    {isCallingWaiter ? t.closeBtn : t.cancelBtn}
                  </motion.button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
