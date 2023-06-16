import { v4 as uuidv4 } from 'uuid';
import Item from './items';
import Shop from './shop';

class User {
  private id: string;
  private name: string;
  private cart: Item[];

  constructor(name: string) {
    this.id = uuidv4();
    this.name = name;
    this.cart = [];
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getCart(): Item[] {
    return this.cart;
  }

  public addToCart(item: Item): void {
    console.log(`Item ${item.getName()} added to cart`);
    this.cart.push(item);
  }

  public removeFromCart(item: Item): void {
    this.cart = this.cart.filter((cartItem) => cartItem.getId() !== item.getId());
  }

  public removeQuantityFromCart(item: Item, quantity: number): void {
    let count = 0;
    this.cart = this.cart.filter((cartItem) => {
      if (cartItem.getId() === item.getId()) {
        count++;
        return count > quantity;
      }
      return true;
    });
  }

  public cartTotal(): number {
    return this.cart.reduce((total, item) => total + item.getPrice(), 0);
  }

  public printCart(): void {
    console.log(`User: ${this.name}'s Cart`);
    this.cart.forEach((item) => {
      console.log(`- ${item.getName()} ($${item.getPrice()})`);
    });
  }
  public static loginUser(): User | null {
    const nameInput = document.getElementById('name-input') as HTMLInputElement;
    const name = nameInput.value.trim();

    if (name) {
      return new User(name);
    } else {
      return null;
    }
  }

  public cartHTMLElement(): HTMLDivElement {
    console.log('Generating cart HTML element');
    const cartDiv = document.createElement('div');
    cartDiv.id = 'cart-items';

    this.cart.forEach((cartItem) => {
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('cart-item');

      const itemName = document.createElement('span');
      itemName.textContent = cartItem.getName();
      itemDiv.appendChild(itemName);

      const itemPrice = document.createElement('span');
      itemPrice.textContent = `Price: $${cartItem.getPrice()}`;
      itemDiv.appendChild(itemPrice);

      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.id = `remove-${cartItem.getId()}`;
      itemDiv.appendChild(removeButton);

      cartDiv.appendChild(itemDiv);
    });

    return cartDiv;
  }
  public addRemoveEventListeners(): void {
    console.log('Adding remove event listeners to cart items');
    this.cart.forEach((item) => {
      const removeButton = document.getElementById(`remove-${item.getId()}`);
      if (removeButton) {
        removeButton.addEventListener('click', () => {
            this.removeFromCart(item);
            const shopInstance = new Shop();
            shopInstance.updateCart();
        });
      }
    });
  }
}
export default User;