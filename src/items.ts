import { v4 as uuidv4 } from 'uuid';
import Shop from './shop'

class Item {
    private id: string;
    private name: string;
    private price: number;
    private description: string;

    constructor(name: string, price: number, description: string) {
        this.id = uuidv4();
        this.name = name;
        this.price = price;
        this.description = description;
    }

    public getId(): string {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getPrice(): number {
        return this.price;
    }

    public getDescription(): string {
        return this.description;
    }
    public itemElement(): HTMLDivElement {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item');

        const itemName = document.createElement('h3');
        itemName.textContent = this.name;
        itemDiv.appendChild(itemName);

        const itemDescription = document.createElement('p');
        itemDescription.textContent = this.description;
        itemDiv.appendChild(itemDescription);

        const itemPrice = document.createElement('span');
        itemPrice.textContent = `Price: $${this.price}`;
        itemDiv.appendChild(itemPrice);

        const addButton = document.createElement('button');
        addButton.textContent = 'Add to Cart';
        addButton.addEventListener('click', () => {
            if (Shop.myUser) {
                Shop.myUser.addToCart(this);
                const shopInstance = new Shop();
                shopInstance.updateCart();
            }
        });
        itemDiv.appendChild(addButton);

        return itemDiv;
    }

}

export default Item;

