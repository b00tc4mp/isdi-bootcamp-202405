# Propthy

## Description

**Propthy** is a web application designed to streamline the management of long-term rentals. It provides landlords and tenants with access to essential documents such as invoices, contracts, and tax forms. Additionally, it includes a rating system to evaluate the quality of tenants and landlords, enhancing the search and management of properties.

## Our Mission

At **Propthy**, our mission is to simplify and optimize rental management by providing a reliable and user-friendly platform. We focus on creating an excellent user experience that allows landlords and tenants to interact efficiently and securely.

## Features

- **Document Access**: Landlords and tenants can upload and access contracts, invoices, and tax documents.
- **Rating System**: Allows users to review and rate both tenants and landlords, improving the quality of interactions.
- **Profile Management**: Configuration and customization of user profiles.
- **Dashboard**: Intuitive interface to navigate and manage properties and rentals.

## Use Cases

1. **Landlord**: Registers properties, uploads rental contracts, and accesses tenant reviews.
2. **Tenant**: Reviews available properties, downloads contracts, and rates their rental experience.
3. **Administrator**: Oversees platform activities and ensures data quality.

## UI/UX Design

The user interface design has been created using [Figma](https://www.figma.com/), ensuring a smooth and intuitive user experience. The focus is on ease of use, with a clean and modern design using Tailwind CSS for responsive and attractive styling.

## Technical Overview

**Architecture by Blocks:**

- **App (User)**: User interface developed with React, facilitating interaction with the system.
- **API (Core Logic)**: Core logic managed by Node.js and Express, ensuring efficient request handling.
- **Database (Data Storage)**: Data storage in MongoDB, guaranteeing data integrity and security.

**Packages:**

- **api**: Management of routes and controllers for user interactions.
- **core**: Implementation of business logic and rules.
- **com**: Common components and shared utilities.
- **app**: User interfaces and frontend components.
- **doc**: Documentation and user guides.

## Technologies Used

- **HTML/CSS/JavaScript**: Basis for frontend development.
- **Node.js**: Runtime environment for the backend server.
- **Express**: Framework for creating the API and handling HTTP requests.
- **React**: Library for building interactive user interfaces.
- **MongoDB**: NoSQL database for flexible data storage.
- **Tailwind CSS**: CSS framework for fast and responsive design.

## Data Model

Below is an example of how the data model might be structured in MongoDB:

### Data Model

```json
{
  "User": {
    "userId": "String",
    "name": "String",
    "email": "String",
    "password": "String",
    "role": "String",  // 'owner' or 'tenant'
    "profile": {
      "bio": "String",
      "rating": "Number",
      "reviews": ["Review"]
    }
  },
  "Property": {
    "propertyId": "String",
    "ownerId": "String",
    "address": "String",
    "description": "String",
    "documents": ["Document"]
  },
  "Document": {
    "documentId": "String",
    "propertyId": "String",
    "type": "String",  // 'contract', 'invoice', 'tax'
    "url": "String",
    "date": "Date"
  },
  "Review": {
    "reviewId": "String",
    "userId": "String",
    "rating": "Number",
    "comment": "String",
    "date": "Date"
  }
}