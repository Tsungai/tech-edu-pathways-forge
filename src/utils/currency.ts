
export const convertPrice = (priceInZAR: string, targetCurrency: string): string => {
  // Remove 'R' and any commas from the price string
  const numericPrice = parseFloat(priceInZAR.replace('R', '').replace(',', ''));
  
  if (targetCurrency === 'USD') {
    // Convert ZAR to USD at rate of 1 USD = 17 ZAR
    const usdPrice = numericPrice / 17;
    return `$${Math.round(usdPrice)}`;
  }
  
  return priceInZAR; // Return original ZAR price
};

export const getCurrencySymbol = (currency: string): string => {
  return currency === 'USD' ? '$' : 'R';
};
