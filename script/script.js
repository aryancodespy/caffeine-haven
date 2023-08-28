document.addEventListener('DOMContentLoaded', function () {
    function calculateTotalPrice() {
      const itemPrices = {
        "Chocolate Hazelnut Iced Coffee": 4.00,
        "French Vanilla Iced Coffee": 3.00,
        "Iced Mocha": 4.50,
        "Iced Caramel Macchiato": 3.75,
        "Pumpkin Spice Latte": 3.50,
        "Frozen Coconut Caramel Frappe": 4.50,
      };
  
      let total = 0;
      const selectedItems = document.querySelectorAll('input[type="checkbox"]:checked');
      selectedItems.forEach(item => {
        const itemName = item.value;
        const quantityInput = item.parentElement.nextElementSibling.querySelector('input[type="number"]');
        const quantity = parseInt(quantityInput.value);
  
        if (!isNaN(quantity) && quantity > 0 && itemPrices[itemName]) {
          total += itemPrices[itemName] * quantity;
        }
      });
  
      return total.toFixed(2);
    }
  
    function displayOrderSummary() {
        const orderSummary = document.getElementById('order-summary');
        const total = calculateTotalPrice();
        const items = [];
      
        const selectedItems = document.querySelectorAll('input[type="checkbox"]:checked');
        selectedItems.forEach(item => {
          const itemName = item.value;
          const quantityInput = item.parentElement.nextElementSibling.querySelector('input[type="number"]');
          const quantity = parseInt(quantityInput.value);
          const itemPrice = parseFloat(item.parentElement.textContent.match(/[\d.]+/));
          const totalPriceForItem = itemPrice * quantity;
          items.push({
            name: itemName,
            quantity: quantity,
            price: itemPrice.toFixed(2),
            total: totalPriceForItem.toFixed(2),
          });
        });
      
        const customerName = document.getElementById('customer-name').value;
        const customerEmail = document.getElementById('customer-email').value;
        const customerPhone = document.getElementById('customer-phone').value;
        const customerAddress = document.getElementById('customer-address').value;
      
        const itemsTableRows = items.map(item => `
          <tr>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>&pound;${item.price}</td>
            <td>&pound;${item.total}</td>
          </tr>
        `).join('');
      
        orderSummary.innerHTML = `
          <h3>${customerName}'s Order Has Been Received!</h3>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price Each</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${itemsTableRows}
              <tr>
                <td colspan="3"><strong>Total Price:</strong></td>
                <td>&pound;${total}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="4">Customer Details:</td>
              </tr>
              <tr>
                <td colspan="2"><strong>Name:</strong></td>
                <td colspan="2">${customerName}</td>
              </tr>
              <tr>
                <td colspan="2"><strong>Email:</strong></td>
                <td colspan="2">${customerEmail}</td>
              </tr>
              <tr>
                <td colspan="2"><strong>Phone:</strong></td>
                <td colspan="2">${customerPhone}</td>
              </tr>
              <tr>
                <td colspan="2"><strong>Address:</strong></td>
                <td colspan="2">${customerAddress}</td>
              </tr>
            </tfoot>
          </table>
          <p>
                Thank You For Your Order, ${customerName}!
                <br>
                Have A Nice Day!
           </p>
        `;
      }
      
      
  
    const orderForm = document.getElementById('order-form');
    orderForm.addEventListener('submit', function (event) {
      event.preventDefault();
      displayOrderSummary();
    });
  });
  