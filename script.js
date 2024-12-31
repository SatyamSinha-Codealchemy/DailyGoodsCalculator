function parseQuantity(input) {
    const regex = /(\d+\.?\d*)\s*(kg|g|l|ml|m|cm|mm)/gi;
    let totalInBaseUnit = 0;
    let match;
  
    while ((match = regex.exec(input)) !== null) {
      const value = parseFloat(match[1]);
      const unit = match[2];
  
      switch (unit) {
        case "kg":
        case "l":
        case "m":
          totalInBaseUnit += value;
          break;
        case "g":
        case "ml":
        case "cm":
          totalInBaseUnit += value / 1000;
          break;
        case "mm":
          totalInBaseUnit += value / 1000000;
          break;
        default:
          console.error("Unsupported unit detected:", unit);
          break;
      }
    }
  
    console.log("Parsed quantity:", totalInBaseUnit);
    return totalInBaseUnit;
  }
  
  function calculatePrice() {
    const priceInput = document.getElementById("priceInput").value.trim();
    const quantityInput = document.getElementById("quantityInput").value.trim();
  
    if (!priceInput || !quantityInput) {
      alert("Please fill in both fields.");
      return;
    }
  
    const priceRegex = /(.*?)=\s*(\d+\.?\d*)/;
    const priceMatch = priceInput.match(priceRegex);
  
    if (!priceMatch) {
      alert("Invalid price input format. Use '1 kg 500 g = 100' or similar.");
      console.error("Price input error:", priceInput);
      return;
    }
  
    const baseQuantityInput = priceMatch[1];
    const price = parseFloat(priceMatch[2]);
  
    const baseQuantity = parseQuantity(baseQuantityInput);
    const desiredQuantity = parseQuantity(quantityInput);
  
    if (baseQuantity === 0) {
      alert("Base quantity cannot be zero.");
      console.error("Base quantity is zero:", baseQuantityInput);
      return;
    }
  
    const unitPrice = price / baseQuantity;
    const totalPrice = (unitPrice * desiredQuantity).toFixed(2);
  
    document.getElementById("totalPrice").textContent = totalPrice;
    console.log("Calculation successful:", {
      baseQuantity,
      desiredQuantity,
      unitPrice,
      totalPrice,
    });
  }
  