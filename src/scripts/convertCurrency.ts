 export function convertCurrencyValue(originalPrice) {
  const targetedCurrency = localStorage.getItem('selectedCurrency') || 'usd';

  if (targetedCurrency === 'bgn') {  
    const adjustedPrice = originalPrice * 1.80507;
    return ` ${adjustedPrice.toFixed(0)} лв`;
  } else if (targetedCurrency === 'eur') {  
    const adjustedPrice = originalPrice * 0.9222300935;
    return ` ${adjustedPrice.toFixed(0)} €`;
  } else {
    return ` ${originalPrice} $`; 
  }
}
document.addEventListener("astro:page-load",convertCurrencyValue);