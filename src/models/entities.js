/**
 * Represents a product category.
 */
export class Category {
  /**
   * @param {Object} [props={}]
   * @param {number} props.id - The unique identifier for the category.
   * @param {string} props.name - The name of the category.
   * @param {string} props.image - The URL of the category image.
   */
  constructor({ id, name, image } = {}) {
    this.id = id;
    this.name = name;
    this.image = image;
  }
}

/**
 * Represents a product in the catalog.
 */
export class Product {
  /**
   * @param {Object} [props={}]
   * @param {number} props.id - The unique identifier for the product.
   * @param {string} props.name - The name of the product.
   * @param {number} props.price - The current price of the product.
   * @param {number} props.originalPrice - The original price before discount.
   * @param {string} props.category - The category name.
   * @param {string} props.brand - The brand of the product.
   * @param {number} props.rating - The average rating.
   * @param {number} props.reviews - The number of reviews.
   * @param {string} props.image - The main image URL.
   * @param {string[]} [props.images] - Additional image URLs.
   * @param {string} props.description - Product description.
   * @param {string[]} [props.features] - Key features of the product.
   * @param {number} props.stock - Available stock quantity.
   * @param {boolean} [props.isFlashSale] - Whether the product is on flash sale.
   * @param {boolean} [props.isNew] - Whether the product is a new arrival.
   */
  constructor({
    id,
    name,
    price,
    originalPrice,
    category,
    brand,
    rating,
    reviews,
    image,
    images = [],
    description,
    features = [],
    stock,
    isFlashSale = false,
    isNew = false,
  } = {}) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.originalPrice = originalPrice;
    this.category = category;
    this.brand = brand;
    this.rating = rating;
    this.reviews = reviews;
    this.image = image;
    this.images = images;
    this.description = description;
    this.features = features;
    this.stock = stock;
    this.isFlashSale = isFlashSale;
    this.isNew = isNew;
  }
}

/**
 * Represents a product review.
 */
export class Review {
  /**
   * @param {Object} [props={}]
   * @param {number} props.id - The unique identifier for the review.
   * @param {string} props.userName - The name of the reviewer.
   * @param {number} props.rating - The rating given (1-5).
   * @param {string} props.date - The date of the review (ISO string).
   * @param {string} props.comment - The review comment.
   */
  constructor({ id, userName, rating, date, comment } = {}) {
    this.id = id;
    this.userName = userName;
    this.rating = rating;
    this.date = date;
    this.comment = comment;
  }
}

/**
 * Represents shipping information for an order.
 */
export class ShippingInfo {
  /**
   * @param {Object} [props={}]
   * @param {string} props.fullName - The recipient's full name.
   * @param {string} props.email - The recipient's email address.
   * @param {string} props.phone - The recipient's phone number.
   * @param {string} props.address - The shipping address.
   * @param {string} props.city - The shipping city.
   * @param {string} [props.state] - The shipping state/province.
   * @param {string} props.zipCode - The shipping postal code.
   * @param {string} [props.country] - The shipping country.
   */
  constructor({ fullName, email, phone, address, city, state = '', zipCode, country = '' } = {}) {
    this.fullName = fullName;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.city = city;
    this.state = state;
    this.zipCode = zipCode;
    this.country = country;
  }
}

/**
 * Represents an item within an order.
 */
export class OrderItem {
  /**
   * @param {Object} [props={}]
   * @param {number} props.id - The product identifier.
   * @param {string} props.name - The product name.
   * @param {number} props.price - The price at the time of purchase.
   * @param {number} props.quantity - The quantity purchased.
   * @param {string} props.image - The product image URL.
   */
  constructor({ id, name, price, quantity, image } = {}) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.image = image;
  }
}

/**
 * Represents a customer order.
 */
export class Order {
  /**
   * @param {Object} [props={}]
   * @param {string} props.id - The unique identifier for the order.
   * @param {string} props.date - The order date (ISO string).
   * @param {number} props.total - The total order amount.
   * @param {string} props.status - The current status of the order.
   * @param {Object} props.shippingInfo - The shipping information.
   * @param {string} props.paymentMethod - The payment method used.
   * @param {Object[]} [props.items] - The list of items in the order.
   */
  constructor({ id, date, total, status, shippingInfo, paymentMethod, items = [] } = {}) {
    this.id = id;
    this.date = date;
    this.total = total;
    this.status = status;
    this.shippingInfo = shippingInfo ? new ShippingInfo(shippingInfo) : null;
    this.paymentMethod = paymentMethod;
    this.items = items.map(item => new OrderItem(item));
  }
}

/**
 * Represents a user in the system.
 */
export class User {
  /**
   * @param {Object} [props={}]
   * @param {string} props.id - The unique identifier for the user (Auth0 sub).
   * @param {string} props.email - The user's email address.
   * @param {string} props.name - The user's full name.
   * @param {string} [props.displayName] - The user's display name.
   * @param {string} [props.photoURL] - The URL of the user's profile picture.
   * @param {string[]} [props.roles] - The roles assigned to the user.
   * @param {string[]} [props.permissions] - The permissions assigned to the user.
   */
  constructor({ id, email, name, displayName, photoURL, roles = [], permissions = [] } = {}) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.displayName = displayName || name;
    this.photoURL = photoURL;
    this.roles = roles;
    this.permissions = permissions;
  }
}

/**
 * Represents an item in the shopping cart.
 */
export class CartItem extends Product {
  /**
   * @param {Object} [props={}]
   * @param {Object} props.productData - The product data.
   * @param {number} props.quantity - The quantity in the cart.
   */
  constructor({ productData = {}, quantity = 0 } = {}) {
    super(productData);
    this.quantity = quantity;
  }
}
