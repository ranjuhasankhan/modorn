// models/index.js - Additional Database Models and Utilities

const mongoose = require('mongoose');

// Blog Post Schema
const blogPostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    content: {
        type: String,
        required: true
    },
    excerpt: {
        type: String,
        maxlength: 500
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tags: [{
        type: String,
        trim: true
    }],
    category: {
        type: String,
        required: true
    },
    featuredImage: String,
    status: {
        type: String,
        enum: ['draft', 'published', 'archived'],
        default: 'draft'
    },
    views: {
        type: Number,
        default: 0
    },
    likes: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    comments: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        content: {
            type: String,
            required: true,
            maxlength: 1000
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        replies: [{
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            content: {
                type: String,
                required: true,
                maxlength: 500
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }]
    }],
    seo: {
        metaTitle: String,
        metaDescription: String,
        keywords: [String]
    },
    publishedAt: Date,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Product Schema (for e-commerce features)
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    comparePrice: {
        type: Number,
        min: 0
    },
    sku: {
        type: String,
        unique: true,
        sparse: true
    },
    inventory: {
        quantity: {
            type: Number,
            default: 0,
            min: 0
        },
        trackQuantity: {
            type: Boolean,
            default: true
        }
    },
    images: [{
        url: String,
        alt: String,
        position: Number
    }],
    category: {
        type: String,
        required: true
    },
    tags: [String],
    variants: [{
        name: String,
        options: [String]
    }],
    specifications: [{
        name: String,
        value: String
    }],
    status: {
        type: String,
        enum: ['active', 'draft', 'archived'],
        default: 'draft'
    },
    featured: {
        type: Boolean,
        default: false
    },
    ratings: {
        average: {
            type: Number,
            default: 0,
            min: 0,
            max: 5
        },
        count: {
            type: Number,
            default: 0
        }
    },
    reviews: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        comment: String,
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    seo: {
        title: String,
        description: String,
        keywords: [String]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Order Schema
const orderSchema = new mongoose.Schema({
    orderNumber: {
        type: String,
        unique: true,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        },
        price: {
            type: Number,
            required: true
        },
        variant: String
    }],
    subtotal: {
        type: Number,
        required: true
    },
    tax: {
        type: Number,
        default: 0
    },
    shipping: {
        type: Number,
        default: 0
    },
    total: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        default: 'USD'
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'],
        default: 'pending'
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'failed', 'refunded'],
        default: 'pending'
    },
    paymentMethod: String,
    paymentId: String,
    shippingAddress: {
        firstName: String,
        lastName: String,
        company: String,
        address1: String,
        address2: String,
        city: String,
        state: String,
        zipCode: String,
        country: String,
        phone: String
    },
    billingAddress: {
        firstName: String,
        lastName: String,
        company: String,
        address1: String,
        address2: String,
        city: String,
        state: String,
        zipCode: String,
        country: String,
        phone: String
    },
    notes: String,
    trackingNumber: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Newsletter Subscription Schema
const newsletterSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    status: {
        type: String,
        enum: ['subscribed', 'unsubscribed', 'pending'],
        default: 'subscribed'
    },
    source: String,
    tags: [String],
    subscriptionDate: {
        type: Date,
        default: Date.now
    },
    unsubscriptionDate: Date,
    lastEmailSent: Date
});

// Settings Schema
const settingsSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true,
        unique: true
    },
    value: mongoose.Schema.Types.Mixed,
    type: {
        type: String,
        enum: ['string', 'number', 'boolean', 'object', 'array'],
        default: 'string'
    },
    description: String,
    category: String,
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Create Models
const BlogPost = mongoose.model('BlogPost', blogPostSchema);
const Product = mongoose.model('Product', productSchema);
const Order = mongoose.model('Order', orderSchema);
const Newsletter = mongoose.model('Newsletter', newsletterSchema);
const Settings = mongoose.model('Settings', settingsSchema);

// Utility Functions
const generateOrderNumber = () => {
    const prefix = 'ORD';
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substr(2, 5).toUpperCase();
    return `