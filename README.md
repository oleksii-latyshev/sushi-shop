## Tech Stack

- [TypeScript](https://www.typescriptlang.org/)
- [SCSS](https://sass-lang.com/)
- [React](https://react.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [NodeJS](https://nodejs.org/en)
- [ExpressJS](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose ODM](https://mongoosejs.com/)
- [PassportJS](https://www.passportjs.org/)

## Implemented features

- [Catalog and work with it](#catalog-and-work-with-it)
- [Product specific page](#product-specific-page)
- [A wish list](#a-wish-list)
- [Cart and working with it](#cart-and-working-with-it)
- [Profile and work with orders](#profile-and-work-with-orders)
- [Authorization and registration](#authorization-and-registration)

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/EDMIGHT/sushi-shop
```

### 2. Install dependencies to server folder (relative to root)

```bash
cd server
yarn / npm install
```

### 3. Install dependencies in the client folder (relative to root)

```bash
cd client
yarn / npm install
```

### 4. Create a `.env` file in the server folder

Create a `.env` file in the root directory and add the environment variables as shown in the `.env.example` file.

### 5. Run the server (relative to root)

```bash
cd server
yarn dev / npm run dev
```

### 6. Run the client (relative to root)

```bash
cd client
yarn dev / npm run dev
```

## Project demo

### Catalog and work with it

The catalog consists of 8 sushi, the list of which can be scrolled using the pagination below

#### Catalog sorting 

Sorting such as rating is based on the average rating among the reviews of this sushi.

Price sorting is based on the minimum price of the sushi variation

![catalog-sort](./resources/screenshots/catalog%201.jpg)

#### Filter by category
![catalog-filter](./resources/screenshots/catalog%202.jpg)

#### Mobile adaptation
![catalog-mobileAdaptation](./resources/screenshots/catalog%20mobile%201.jpg)
![catalog-mobileAdaptation](./resources/screenshots/catalog%20mobile%202.jpg)

#### Light theme
![light-theme](./resources/screenshots/catalog%20light%20theme.jpg)

[Back to contents ⬆](#implemented-features)

### Product specific page

A special sushi page provides exactly the same functionality as in the catalog, namely: adding a certain amount of a certain variation of sushi to the basket, adding it to the wishlist (if the user is authorized) and is complemented by the functionality of viewing reviews and creating a review (if the user is authorized)

#### With an authorized user
![product-page](./resources/screenshots/specific%20page%20auth.jpg)

#### With an unauthorized user
![product-page](./resources/screenshots/specific%20page%20unauth.jpg)

#### Mobile adaptation
![product-page-mobile-auth](./resources/screenshots/specific%20page%20mobile%20auth.jpg)
![product-page-mobile-unauth](./resources/screenshots/specific%20page%20mobile%20unauth.jpg)

#### Light theme
![light-theme](./resources/screenshots/specific%20page%20light%20theme.jpg)

[Back to contents ⬆](#implemented-features)

### A wish list

Adding to the wishlist is possible only for authorized users, namely by hovering the cursor over a product in the catalog or on the personal page of the product, and there are such states where a filled heart means the presence of a wishlist in the wishlist, and not a filled-in absence:

![in-wishlist-product](./resources/screenshots/in%20wishlist.jpg)
![not-in-wishlist-product](./resources/screenshots/not%20in%20wishlist.jpg)

[Back to contents ⬆](#implemented-features)

### Cart and working with it

Adding is a local state, therefore this operation can be performed by both an authorized and unauthorized user, this state is also saved at the Local Storage level and therefore will be relevant even after a reboot.

#### Add to cart

The number of items added is displayed next to the cart icon in the menu and depends on the number of sushi added, and not on the number of different types of sushi added
![adding-to-cart](./resources/screenshots/adding%20to%20cart.jpg)

#### Cart Page

On this page, you can see the total cost of the order, clear it, and also change the amount of sushi of those options that we have already added to the basket (the total price is only a visual part and on the server side it will be calculated as the final one)

![cart-page](./resources/screenshots/cart.jpg)

#### Mobile adaptation

![cart-mobile](./resources/screenshots/cart-mobile.jpg)

#### Light theme

![cart-light-theme](./resources/screenshots/cart-light-theme.jpg)

[Back to contents ⬆](#implemented-features)

### Profile and work with orders

This page is a private route and if an unauthorized user tries to access it, it will be redirected to the main one. On this page, the user can log out of the account, see their orders, and interact with them

#### Profile Page

![profile-page](./resources/screenshots/profile.jpg)

#### Order interaction

We can also expand the order by clicking the arrow at the end of it to see the contents of this order, as well as the buttons for managing it. An order has 2 statuses, namely as accepted and as completed. 

When creating an order, the status automatically becomes accepted and the user in the list of orders can either mark it as completed or cancel it, which will be tantamount to deleting it. Interaction ceases to be available after the order becomes Confirmed, that is, it is no longer possible to cancel after its execution

Unconfirmed order:

![order-details](./resources/screenshots/order-detalis.jpg)

Confirmed order:

![order-confirmed](./resources/screenshots/order-confirmed.jpg)

#### Mobile adaptation

![profile-mobile](./resources/screenshots/profile-mobile.jpg)

#### Light theme

![profile-light-theme](./resources/screenshots/profile-light.jpg)

[Back to contents ⬆](#implemented-features)

### Authorization and registration

Authorization occurs with the help of PassportJS technology, namely its local strategy using sessions. And during registration, the Bcrypt technology was used to encrypt passwords, as well as verify them during authorization

#### Pages

In the menu above, an unauthorized user must press the Sign In or Sign Up button, after which he will be redirected to the appropriate page from where he can return to the main or alternative option for the selected action (in case of authorization, the alternative is registration)

![signIn-page](./resources/screenshots/signIn.jpg)
![signUp-page](./resources/screenshots/signUp.jpg)

#### Validation

Form validation occurs both using standard React Hook Form tools and on the server side using express validators.
The validation itself consists of checking for an empty field, as well as for the minimum number of characters, for the login it is 2 characters, and for the password 5 and for the name it is also 2 characters

![signIn-validation](./resources/screenshots/signIn-validation.jpg)
![signUp-validation](./resources/screenshots/signUp-validation.jpg)

#### Mobile adaptation

![signIn-mobile](./resources/screenshots/signIn-mobile.jpg)
![signUp-mobile](./resources/screenshots/signUp-mobile.jpg)

#### Light theme

![signIn-light-theme](./resources/screenshots/signIn-light.jpg)
![signUp-light-theme](./resources/screenshots/signup-light.jpg)

[Back to contents ⬆](#implemented-features)