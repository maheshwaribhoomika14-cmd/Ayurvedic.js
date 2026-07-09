// 🚀 🔥 BHOOMIKA GLOBAL MULTI-ROUTE ADD-TO-CART ENGINE
export const addToCartGlobal = (product, selectedQuantity = 1) => {
  if (!product) return;

  // 1. LocalStorage se purani cart items array load karein
  let currentCart = JSON.parse(localStorage.getItem('ayurkart_cart')) || [];
  
  // 2. Strict ID matching scan verification
  const itemIndex = currentCart.findIndex(item => String(item._id) === String(product._id));
  
  // Input counter value ko secure integer mein parse karein
  const qtyToAdd = Number(selectedQuantity) || 1;

  if (itemIndex > -1) {
    // Agar product cart mein pehle se hai, toh sirf uski quantity badha do
    currentCart[itemIndex].quantity += qtyToAdd;
  } else {
    // Agar bilkul naya product hai, toh poora structure cart array mein push karo
    currentCart.push({
      _id: product._id,
      name: product.name,
      price: product.price,
      // Single main image block fallback sequence mapping
      image: product.image || (product.images && product.images[0]) || "",
      vendor: product.vendor || "Kottakkal Arya Vaidya Sala",
      quantity: qtyToAdd
    });
  }
  
  // 3. Poori cart list ko local storage mein update karke save karein
  localStorage.setItem('ayurkart_cart', JSON.stringify(currentCart));
  
  // 4. Custom window event trigger jo pure Header component counter ko bina page refresh ke dynamic barhayega
  window.dispatchEvent(new Event('cartUpdated'));
};