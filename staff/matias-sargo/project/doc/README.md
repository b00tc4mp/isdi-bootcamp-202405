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


### Data Model

User 
- Id (auto)
- name (string)
- username (string)
- dni (string)
- role (string, enum: owner | tenant)
- email (string)
- password (string)
- avatar (string)

Property
- id (auto)
- ownerId (user.id)
- adress (string)
- location ([Number, Number])
- description (string)
- documents [(Document.id)]

Point
- type (string)
- coordinates ([Number])

Document
- id (auto)
- property (property.id)
- type (string, enum: contract | invoice | tax)
- url (string)
- date (Date)

Review
- id (auto)
- author (user.id)
- rating (number, 1 - 5)
- comment (string)
- date (Date)

Chat
- id (auto)
- participants ([User.id])
- date (Date)

Message
- id (auto)
- author (User.id)
- message (string)
- date (Date)
- chat (Chat.id)
