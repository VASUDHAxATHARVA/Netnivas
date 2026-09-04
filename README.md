NetNivas 🏘️

Connecting Communities. Serving Together.

NetNivas is a community-first residential society platform designed to make everyday home-maintenance services more affordable, convenient, and organized by bringing residents together.

Instead of treating every service request as an isolated booking, NetNivas creates a shared community layer where residents can discover services, participate in society-level service camps, track bookings, receive notifications, and manage their society profile.

Project Status: Functional UI prototype / demonstration build
Purpose: SIH 2026 prototype and product demonstration

📌 Table of Contents

Overview

Problem Statement

Our Solution

Key Features

How the Prototype Works

Core User Journey

Technology Stack

Project Architecture

Project Structure

Getting Started

Available Scripts

Prototype Data

Design System

AI / Future Intelligence Layer

Roadmap

Production Considerations

Contributing

License

Team

🌐 Overview

Residential societies contain hundreds of households that repeatedly need similar services:

AC servicing

Electrical repairs

Plumbing

Deep cleaning

Pest control

Carpentry

Painting

General home maintenance

Today, residents usually search and book these services independently. This creates fragmented demand and makes it difficult for communities to coordinate service availability, pricing, and scheduling.

NetNivas introduces a community layer around residential services.

The platform is designed around the idea that when many residents need similar services around the same time, the community can organize that demand into a more efficient service opportunity.

Vision

Turn every residential society into a connected service community.

❗ Problem Statement

For Residents

Residents often face:

Multiple platforms and vendors for different services

Difficulty finding reliable service professionals

Individual booking prices

Repeated searching for routine maintenance

Poor visibility into society-wide service opportunities

Lack of centralized service history and notifications

For Service Providers

Independent service providers can face:

Scattered customer demand

Unpredictable schedules

Travel between distant customers

Customer-acquisition costs

Empty travel time

Difficulty accessing concentrated residential demand

The Core Problem

The problem is not simply finding a service provider.

The larger opportunity is:

How can a residential community organize its collective demand to make service delivery more efficient for both residents and service providers?

💡 Our Solution

NetNivas creates a shared platform connecting:

Residents ↔ Residential Societies ↔ Service Providers

The prototype combines:

Service discovery

Society-level service camps

Community participation

Booking management

Technician assignment

Service tracking

Notifications

Society switching

Profile and community information

The long-term product vision extends this foundation with:

Collective demand aggregation

Threshold-based group pricing

Vendor competition / reverse bidding

Optimized society service days

Demand prediction

Collective Annual Maintenance Contracts (AMC)

✨ Key Features

1. 🏠 Home Dashboard

The home screen provides a central overview of the resident's society experience.

It includes:

Current society

Community information

Service shortcuts

Popular services

Active/upcoming community activities

Notifications

Navigation to bookings and services

2. 🔧 Service Marketplace

Residents can browse common home-maintenance services.

Supported Categories

Electrical

Plumbing

Cleaning

AC & Appliance

Carpentry

Painting

Pest Control

Home Maintenance

The service interface provides:

Service title

Category

Estimated duration

Price

Original price where applicable

Rating

Review count

Service description

Service image

Booking action

3. 👥 Community Service Camps

One of NetNivas's most important concepts is the Society Service Camp.

Instead of residents independently arranging the same service, the society can organize a common service opportunity.

Example:

AC Service Camp
₹1,200/unit — Group Price
18 / 25 residents joined

Other prototype examples include:

Deep Cleaning Week

Monsoon Pipe & Drain Inspection

This concept forms the foundation for future collective-demand optimization.

4. 📅 Booking Management

Residents can create service bookings through the booking flow.

A booking can contain:

Booking ID

Service

Category

Scheduled time

Technician

Technician phone number

Technician rating

Verification OTP

Price

Address

Additional notes

Current service status

Supported Booking States

on_the_way
assigned
in_progress
completed
cancelled

5. 🧑‍🔧 Technician Assignment

After confirming a booking, the prototype creates an assigned technician and generates a verification OTP.

The booking interface can display:

Technician name

Rating

Contact information

Profile image

OTP

ETA where applicable

This models the type of trust and verification layer required in a real service platform.

6. 🔔 Smart Notifications

The prototype includes a notification center for:

Service updates

Community requests

Booking confirmations

Payment notifications

Urgent/dispute-related updates

Users can:

View notifications

Mark individual notifications as read

Mark all notifications as read

Navigate directly to the related screen

7. 🏘️ Multiple Society Support

The prototype supports switching between residential societies.

Example prototype societies include:

Basileo Society — Pimple Gurav, Pune

Green Valley Society — Kothrud, Pune

Amanora Park Town — Hadapsar, Pune

Each society includes:

Society name

Location

City

Connected-home count

Society image

This demonstrates how NetNivas can operate across multiple residential communities.

8. 👤 Resident Profile

The profile section provides a centralized location for resident-related information and society context.

The architecture is designed so that additional capabilities such as:

Service history

Saved addresses

Payment methods

Preferences

Support

Account settings

can be added later.

9. 📱 Responsive / Mobile-Oriented Interface

The UI is designed for a residential-service mobile experience while remaining usable on desktop screens.

The application includes:

Responsive layouts

Desktop sidebar navigation

Mobile bottom navigation

Mobile frame preview mode

Touch-friendly controls

Scrollable service cards

Modal interactions

🔄 How the Prototype Works

The current prototype uses React state and predefined demonstration data.

Basic flow

Resident opens NetNivas
        ↓
Selects / views society
        ↓
Browses available services
        ↓
Selects a service
        ↓
Opens booking flow
        ↓
Selects time + address + notes
        ↓
Confirms booking
        ↓
Technician is assigned
        ↓
Verification OTP is generated
        ↓
Booking appears in Bookings
        ↓
Notification is created

🚀 Core Community Flow

The long-term NetNivas model expands the individual booking flow into collective demand.

Resident Request
       ↓
Community Demand Aggregation
       ↓
Similar Requests Grouped
       ↓
Demand Threshold Reached
       ↓
Better Group Price
       ↓
Verified Vendors Compete
       ↓
Community Selects Best Offer
       ↓
Society Service Day
       ↓
Optimized Technician Schedule
       ↓
Service Completion
       ↓
Ratings & Feedback
       ↓
Future Demand Prediction

This is the key product direction that differentiates NetNivas from a conventional one-user/one-booking marketplace.

🧠 AI / Future Intelligence Layer

The current repository is primarily a frontend prototype. The project metadata contains support for a server-side Gemini integration, but the present UI flow does not depend on a live AI model to function.

The planned intelligence layer can eventually support:

Demand Prediction

Predict recurring society requirements based on historical data.

Example:

April / May → AC servicing
June / July → Pest control
July / August → Drain inspection
August / September → Water-tank maintenance

Demand Aggregation

Identify similar requests from nearby residents:

Flat A-101 → AC Service
Flat B-203 → AC Service
Flat C-402 → AC Service
Flat D-605 → AC Service

             ↓

      AC Service Pool

Dynamic Group Pricing

A future pricing engine can provide lower prices as participation increases.

Example concept:

Participants

Example Price

1–4

₹2,000

5–9

₹1,800

10–19

₹1,600

20–49

₹1,350

50+

₹1,200

These values represent the project's proposed demonstration model, not live market pricing.

Vendor Reverse Bidding

Once enough demand is aggregated, verified service providers can submit competing offers.

The platform can evaluate:

Price

Rating

Warranty

Availability

Service quality

Travel distance

Capacity

Collective AMC

The platform can eventually predict recurring maintenance needs and offer society-level Annual Maintenance Contracts.

🛠️ Technology Stack

Frontend

React 19

TypeScript

Vite

Tailwind CSS v4

Lucide React

Motion

Potential AI Integration

Google Gemini API

@google/genai

Runtime / Supporting Packages

Node.js

Express

dotenv

TypeScript

🏗️ Project Architecture

The application follows a component-based React architecture.

                    ┌───────────────────┐
                    │       App.tsx     │
                    │  Application State│
                    └─────────┬─────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
   Navigation            Screens                Modals
        │                     │                     │
        │        ┌────────────┼────────────┐        │
        │        ▼            ▼            ▼        │
        │      Home       Services      Bookings    │
        │        │            │            │        │
        │        └────────────┼────────────┘        │
        │                     │                     │
        ▼                     ▼                     ▼
 Community              Notifications          Society
 Event Detail              Profile             Booking

State handled in App.tsx

The main application currently manages:

Current tab

Navigation history

Selected society

Society modal state

Active booking service

Booking list

Notifications

Booking success toast

Mobile frame mode

📁 Project Structure

Netnivas-main/
│
├── public/
│   ├── assets/
│   │   └── aistudio/
│   ├── favicon.svg
│   ├── logo.jpg
│   ├── logo.png
│   ├── netnivas-logo.png
│   └── netnivas-logo.svg
│
├── src/
│   ├── assets/
│   │   └── images/
│   │       └── netnivas_logo_*.jpg
│   │
│   ├── components/
│   │   ├── BookingModal.tsx
│   │   ├── BookingsScreen.tsx
│   │   ├── CommunityScreen.tsx
│   │   ├── EventDetailScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── Navigation.tsx
│   │   ├── NetNivasLogo.tsx
│   │   ├── NotificationsScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   ├── ServicesScreen.tsx
│   │   └── SocietyModal.tsx
│   │
│   ├── App.tsx
│   ├── data.ts
│   ├── index.css
│   ├── main.tsx
│   └── types.ts
│
├── .env.example
├── .gitignore
├── index.html
├── metadata.json
├── package.json
├── tsconfig.json
└── vite.config.ts

💻 Getting Started

Prerequisites

Install:

Node.js 18+ recommended

npm

Check your versions:

node --version
npm --version

1. Clone the Repository

git clone https://github.com/YOUR_USERNAME/netnivas.git
cd netnivas

Replace YOUR_USERNAME with your GitHub username.

2. Install Dependencies

npm install

3. Start Development Server

npm run dev

The Vite development server will start on:

http://localhost:3000

4. Build for Production

npm run build

The production build will be generated in:

dist/

5. Preview Production Build

npm run preview

📜 Available Scripts

Command

Purpose

npm run dev

Start Vite development server

npm run build

Create production build

npm run preview

Preview production build

npm run lint

Run TypeScript type checking

npm run clean

Remove generated build/server files

🧪 Prototype Data

The current application intentionally uses predefined local data rather than a production database.

Main data definitions are located in:

src/data.ts

The application contains sample data for:

Residential societies

Service categories

Services

Bookings

Service camps

Notifications

Reviews

This makes the prototype usable without requiring authentication, database configuration, or external service integrations.

🎨 Design System

NetNivas uses a clean community-service visual language.

Primary Design Characteristics

White/light surfaces

Deep blue primary actions

Green secondary/community accents

Rounded cards

Soft borders

Compact mobile-friendly layouts

Inter typography

Material Symbols icons

Clear status indicators

Community-oriented visual hierarchy

Main Color Direction

Primary Blue      → #003fb1
Primary Container → #1a56db
Secondary Green   → #006c4a
Surface           → #f8f9fa
Text              → #191c1d

The design is intentionally approachable rather than overly corporate, reflecting the idea of a platform built around communities and shared services.

🔐 Environment Variables

The project includes an .env.example file.

Example:

GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
APP_URL="YOUR_APP_URL"

Important

Never commit real API keys to GitHub.

Use:

.env

for local secrets and ensure it is included in .gitignore.

For a deployed production application, API keys should be handled through secure server-side environment variables or a secrets manager.

🌍 Deployment

Because this is a Vite/React frontend, it can be deployed on platforms that support static frontend hosting.

Suitable options include:

Netlify

Cloudflare Pages

GitHub Pages for appropriate static/project use

Other Vite-compatible static hosting providers

Typical deployment flow:

GitHub Repository
       ↓
Connect Repository
       ↓
Install Dependencies
       ↓
npm run build
       ↓
Deploy dist/
       ↓
Public NetNivas URL

For a prototype that does not require a live backend, static hosting is sufficient.

If live Gemini/server-side functionality is added later, deployment architecture should be updated to securely handle API requests and secrets.

🗺️ Roadmap

Phase 1 — Prototype ✅

Responsive UI

Resident dashboard

Service marketplace

Service categories

Booking flow

Technician assignment simulation

OTP generation

Booking tracking UI

Community service camps

Society switching

Notifications

Resident profile

Mobile-frame presentation mode

Phase 2 — Backend

User authentication

Society registration

Resident profiles

Vendor profiles

Database integration

Real booking persistence

Payment integration

Service history

Complaint/support system

Phase 3 — Collective Demand Engine

Aggregate similar requests

Demand thresholds

Dynamic group pricing

Community participation tracking

Vendor reverse bidding

Vendor comparison

Vendor selection

Cancellation handling

Refund management

Phase 4 — Optimization & AI

Demand forecasting

Service-day generation

Technician capacity planning

Route optimization

Predictive maintenance

Collective AMC recommendations

Personalized recommendations

Phase 5 — Scale

Multi-city deployment

Society-admin dashboard

Vendor dashboard

Vendor verification/KYC

Real-time service tracking

Analytics

Fraud prevention

Ratings and quality scoring

Production monitoring

📈 Future Product Model

NetNivas can evolve into a three-sided platform:

                 NETNIVAS
                    │
       ┌────────────┼────────────┐
       │            │            │
       ▼            ▼            ▼
   RESIDENTS     SOCIETIES     VENDORS
       │            │            │
       │            │            │
       └────── Collective Demand ────┘
                    │
                    ▼
             Better Coordination
                    │
        ┌───────────┼───────────┐
        ▼           ▼           ▼
   Lower Cost   Less Travel   Better Utilization

Resident Value

Better pricing opportunities

Trusted service providers

Easier scheduling

Community convenience

Centralized service history

Vendor Value

Concentrated demand

Reduced customer-acquisition effort

Fewer dead trips

Predictable service-day volume

Better utilization

Society Value

Organized maintenance

Community participation

Better service coordination

Predictive maintenance opportunities

Potential collective savings

🧩 Production Considerations

The current project is a prototype, not a production-ready service marketplace.

Before production deployment, the following would be required:

Security

Authentication

Authorization / role-based access

Secure API endpoints

Server-side secrets

Input validation

Rate limiting

Fraud prevention

Data

A production database would be required for:

Users

Societies

Flats

Vendors

Services

Requests

Demand pools

Bids

Bookings

Payments

Reviews

Notifications

Payments

A real implementation would require a trusted payment provider and:

Payment confirmation

Refunds

Cancellation policies

Transaction records

Vendor settlement

Vendor Verification

A production marketplace should include:

Identity verification

Service-category verification

Ratings

Complaint history

Availability

Service-area coverage

Quality monitoring

🧮 Possible Future Data Model

A scalable backend could use entities similar to:

User
 ├── userId
 ├── name
 ├── phone
 ├── societyId
 └── flatNumber

Society
 ├── societyId
 ├── name
 ├── location
 └── numberOfHomes

Service
 ├── serviceId
 ├── category
 ├── title
 ├── basePrice
 └── duration

DemandPool
 ├── poolId
 ├── societyId
 ├── serviceId
 ├── participantCount
 ├── threshold
 └── targetDate

VendorBid
 ├── bidId
 ├── poolId
 ├── vendorId
 ├── price
 ├── rating
 └── warranty

Booking
 ├── bookingId
 ├── poolId
 ├── residentId
 ├── vendorId
 ├── scheduledTime
 └── status

This structure would allow the platform to evolve from a UI prototype into a real demand-orchestration system.

🏆 Why NetNivas?

Traditional service marketplaces generally optimize:

One customer → One booking → One service visit

NetNivas aims to optimize:

Many residents → Shared demand → Better coordination → Better service economics

The key idea is not simply booking a plumber or AC technician.

It is:

Organizing the demand of an entire residential community.

🎯 SIH 2026 Positioning

For a Smart India Hackathon-style presentation, NetNivas can be positioned as:

A Community Demand Orchestration Platform for Residential Services

The prototype demonstrates the resident-facing experience today, while the planned backend and intelligence layers enable:

Demand aggregation

Collective pricing

Vendor competition

Service-day optimization

Predictive maintenance

This creates a path from a simple service-booking prototype toward a scalable community infrastructure platform.

🤝 Contributing

Contributions are welcome.

Suggested workflow:

git clone <repository-url>
cd netnivas
npm install
npm run dev

Create a feature branch:

git checkout -b feature/your-feature-name

Make your changes, test the application, and submit a pull request.

Contribution Areas

UI/UX

Backend architecture

Database design

Demand aggregation algorithms

Vendor matching

Route optimization

AI/ML

Security

Testing

Documentation

📄 License

This repository is currently intended as an academic/prototype project.

Add an explicit open-source license such as MIT before accepting external contributions or distributing the project as open source.

👥 Team

NetNivas — Community & Services

Built as an SIH 2026 project prototype.

Team

Atharva Kulkarni

Kartik Torambe

Ruchita Menkudle

Pratiksha / Project Team

Update the team section with the final official team list before publishing the repository.

⭐ Final Note

NetNivas is currently a functional prototype demonstrating the product experience and core interaction model.

The next major step is moving from static/local prototype data to a real backend capable of managing:

Residents
    ↓
Community Demand
    ↓
Service Pools
    ↓
Vendor Bids
    ↓
Optimized Scheduling
    ↓
Bookings
    ↓
Feedback
    ↓
Predictive Maintenance

NetNivas — Connecting Communities. Serving Together.
