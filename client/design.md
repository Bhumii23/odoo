# TransitOps Design System

## Objective

Build a premium SaaS-style Transport Operations Dashboard.

The application should NOT feel like a college project or ERP system.

The UI should feel similar to:

- Linear
- Stripe Dashboard
- Vercel Dashboard
- Notion
- Clerk Dashboard
- Uber Fleet

Focus on:

- Clean
- Spacious
- Modern
- Fast
- Minimal
- Professional
- Easy to use

---

# Tech Stack

Use:

- React
- Vite
- TailwindCSS
- shadcn/ui
- Lucide React Icons
- Recharts
- Framer Motion

Never use Bootstrap.

Never use Material UI.

---

# Theme

Default theme:

Dark

Background:
Slate/Gray

Cards:
Slightly lighter than background

Rounded corners:
16px

Soft shadows

Minimal borders

Glassmorphism only where appropriate.

---

# Typography

Use Inter font.

Font hierarchy:

Page Title

Section Title

Card Title

Body

Caption

Large KPIs should be bold.

Avoid long paragraphs.

---

# Layout

Desktop:

Left Sidebar

Top Navbar

Main Content

The layout should never feel crowded.

Maintain generous spacing.

Padding:

24px

Gap:

20px

Cards should align perfectly.

---

# Sidebar

Collapsed width:

80px

Expanded:

260px

Items:

Dashboard

Fleet

Drivers

Trips

Maintenance

Fuel & Expenses

Analytics

Settings

Icons from Lucide.

Active page should have:

- Colored background
- Left indicator
- Smooth transition

Sidebar should be sticky.

---

# Navbar

Contains:

Search

Notifications

Profile

Dark Mode Toggle

Current User

Breadcrumb

Sticky on scroll.

---

# Dashboard

Hero Section

Display welcome message.

Example:

Good Morning, Raven 👋

Fleet status looks healthy today.

---

# KPI Cards

Create beautiful cards.

Each card contains:

Icon

Title

Value

Trend

Mini chart (optional)

Cards:

Active Vehicles

Available Vehicles

Trips Today

Drivers On Duty

Vehicles in Maintenance

Fleet Utilization

Fuel Cost Today

Monthly Expenses

Use gradients subtly.

Hover animation.

---

# Charts

Use Recharts.

Dashboard should contain:

Fleet Utilization

Trip Status Distribution

Fuel Consumption

Maintenance Trend

Expense Breakdown

Monthly Trips

Charts should be interactive.

Rounded.

Responsive.

---

# Tables

Recent Trips

Columns:

Vehicle

Driver

Status

ETA

Destination

Progress

Actions

Status should be colored badges.

Actions:

View

Edit

Delete

Table should support:

Search

Sort

Pagination

---

# Vehicle Status

Available

Green

On Trip

Blue

Maintenance

Orange

Retired

Red

Use shadcn Badge component.

---

# Forms

Use shadcn components.

Input

Select

Textarea

Date Picker

Dialog

Sheet

Drawer

Validation messages below fields.

---

# Animations

Use Framer Motion.

Animate:

Cards

Sidebar

Tables

Charts

Dialogs

Hover

Loading

Page transitions

Animations should be subtle.

No flashy effects.

---

# Empty States

Every page should have meaningful empty states.

Example:

No trips scheduled today.

Show illustration.

Show Create Trip button.

---

# Loading States

Use Skeleton components.

Never show blank screens.

---

# Responsive

Desktop

Tablet

Mobile

Sidebar becomes Drawer on mobile.

Cards become grid.

Charts stack vertically.

---

# Accessibility

Keyboard navigation.

Proper focus states.

ARIA labels.

High contrast.

---

# Design Language

Every page should follow the same design language.

Never mix different styles.

Avoid clutter.

Whitespace is important.

Consistency over decoration.

---

# Components

Prefer shadcn components wherever possible.

Use:

Card

Badge

Button

Dialog

Alert

Dropdown Menu

Popover

Calendar

Avatar

Tooltip

Hover Card

Tabs

Accordion

Command

Navigation Menu

Breadcrumb

Separator

Skeleton

Toast

Data Table

Sheet

Drawer

Scroll Area

---

# Icons

Only use Lucide icons.

No emoji icons.

Icons should always have consistent size.

---

# Color Palette

Background

#0F172A

Card

#1E293B

Primary

#2563EB

Success

#22C55E

Warning

#F59E0B

Danger

#EF4444

Text

#F8FAFC

Muted

#94A3B8

---

# UX Principles

Every action should require minimal clicks.

Forms should be intuitive.

Buttons should be easy to discover.

No unnecessary modals.

Users should understand every page within 5 seconds.

The interface should look polished enough to demo to investors.
