# Airtable Database Schema

This document describes the complete database schema for The Fitness Priest application.

## Overview

The application uses **8 interconnected Airtable tables** to manage all aspects of the fitness coaching platform.

## Tables

### 1. Users

**Purpose**: Store all user accounts (both clients and trainers)

| Field Name | Type | Description | Options |
|------------|------|-------------|---------|
| userId | Single Line Text | Unique user identifier | Primary key |
| email | Email | User email address | - |
| name | Single Line Text | Full name | - |
| role | Single Select | User role in system | client, trainer, admin |
| authProvider | Single Select | Authentication provider | google, email |
| phone | Phone Number | Contact phone number | - |
| dateJoined | Date | Account creation date | ISO format |
| isActive | Checkbox | Account active status | ✓ |
| profileImage | URL | Profile picture URL | - |
| stripeCustomerId | Single Line Text | Stripe customer ID | - |

**Relationships**:
- One user → Many subscriptions
- One user → Many sessions (as client)
- One user → Many workout plans
- One user → Many workout logs
- One user → Many body metrics

---

### 2. Subscriptions

**Purpose**: Track active subscription plans and payments

| Field Name | Type | Description | Options |
|------------|------|-------------|---------|
| subscriptionId | Single Line Text | Unique subscription ID | Primary key |
| userId | Single Line Text | Reference to user | Will be linked record |
| planType | Single Select | Subscription tier | starter, pro, elite |
| status | Single Select | Current status | active, cancelled, past_due, trialing |
| stripeSubscriptionId | Single Line Text | Stripe subscription ID | - |
| startDate | Date | Subscription start date | ISO format |
| endDate | Date | Subscription end date | ISO format |
| sessionsIncluded | Number | Total sessions in plan | Integer |
| sessionsRemaining | Number | Remaining sessions | Integer |
| monthlyPrice | Currency | Monthly price | USD, 2 decimals |
| autoRenew | Checkbox | Auto-renewal enabled | ✓ |

**Business Logic**:
- Starter: 4 sessions/month
- Pro: 8 sessions/month
- Elite: 12 sessions/month

**Relationships**:
- One subscription → One user
- One subscription → Many sessions

---

### 3. Consultations

**Purpose**: Free consultation booking requests

| Field Name | Type | Description | Options |
|------------|------|-------------|---------|
| consultationId | Single Line Text | Unique consultation ID | Primary key |
| name | Single Line Text | Client name | - |
| email | Email | Client email | - |
| phone | Phone Number | Client phone | - |
| preferredDate | Date | Preferred date | ISO format |
| preferredTime | Single Line Text | Preferred time | HH:mm format |
| status | Single Select | Booking status | pending, confirmed, completed, cancelled |
| notes | Long Text | Additional notes/goals | - |
| googleMeetLink | URL | Meet link for virtual | - |
| googleCalendarEventId | Single Line Text | Calendar event ID | - |
| createdAt | Date | Request created | ISO format |
| confirmedAt | Date | Confirmation timestamp | ISO format |

**Workflow**:
1. Client submits form → Record created with status "pending"
2. System creates Google Calendar event → Updates googleCalendarEventId & googleMeetLink
3. Email sent → Status changes to "confirmed"
4. After consultation → Status changes to "completed"

---

### 4. TrainerAvailability

**Purpose**: Define trainer's weekly availability schedule

| Field Name | Type | Description | Options |
|------------|------|-------------|---------|
| availabilityId | Single Line Text | Unique availability ID | Primary key |
| dayOfWeek | Single Select | Day of week | monday, tuesday, ..., sunday |
| startTime | Single Line Text | Start time | HH:mm format (e.g., "09:00") |
| endTime | Single Line Text | End time | HH:mm format (e.g., "17:00") |
| isAvailable | Checkbox | Currently available | ✓ |
| sessionDuration | Number | Session length in mins | Integer (e.g., 60) |
| maxSessionsPerDay | Number | Max sessions per day | Integer |

**Example**:
```
dayOfWeek: "monday"
startTime: "09:00"
endTime: "17:00"
sessionDuration: 60
maxSessionsPerDay: 6
```
This allows 6 one-hour sessions on Mondays between 9 AM and 5 PM.

---

### 5. Sessions

**Purpose**: All booked training sessions

| Field Name | Type | Description | Options |
|------------|------|-------------|---------|
| sessionId | Single Line Text | Unique session ID | Primary key |
| clientId | Single Line Text | Reference to client | Will be linked record |
| subscriptionId | Single Line Text | Reference to subscription | Will be linked record |
| sessionDate | Date | Date of session | ISO format |
| sessionTime | Single Line Text | Time of session | HH:mm format |
| duration | Number | Session duration (mins) | Integer |
| status | Single Select | Session status | scheduled, completed, cancelled, no_show |
| sessionType | Single Select | Type of session | in_person, virtual |
| googleMeetLink | URL | Meet link for virtual | - |
| googleCalendarEventId | Single Line Text | Calendar event ID | - |
| notes | Long Text | Session notes | - |
| completedAt | Date | Completion timestamp | ISO format |

**Relationships**:
- One session → One client (user)
- One session → One subscription
- One session → Many workout plans

**Lifecycle**:
1. Client books → status: "scheduled"
2. Session happens → Trainer logs notes
3. Marked complete → status: "completed", completedAt set
4. Subscription.sessionsRemaining decremented

---

### 6. WorkoutPlans

**Purpose**: Trainer-defined workout programs for clients

| Field Name | Type | Description | Options |
|------------|------|-------------|---------|
| workoutPlanId | Single Line Text | Unique plan ID | Primary key |
| clientId | Single Line Text | Reference to client | Will be linked record |
| sessionId | Single Line Text | Optional session link | Will be linked record |
| planName | Single Line Text | Name of plan | e.g., "Upper Body Strength" |
| planDate | Date | Date assigned for | ISO format |
| focusArea | Multiple Selects | Focus areas | strength, cardio, flexibility, endurance |
| exercises | Long Text | Exercise details (JSON) | JSON array |
| totalEstimatedTime | Number | Estimated time (mins) | Integer |
| notes | Long Text | Instructions | - |
| status | Single Select | Plan status | draft, assigned, in_progress, completed |

**Exercise JSON Format**:
```json
[
  {
    "name": "Bench Press",
    "sets": 4,
    "reps": 8,
    "restSeconds": 90,
    "notes": "Focus on form"
  },
  {
    "name": "Squats",
    "sets": 3,
    "reps": 10,
    "restSeconds": 120
  }
]
```

**Relationships**:
- One workout plan → One client
- One workout plan → One session (optional)
- One workout plan → Many workout logs

---

### 7. WorkoutLogs

**Purpose**: Client-logged workout performance data

| Field Name | Type | Description | Options |
|------------|------|-------------|---------|
| workoutLogId | Single Line Text | Unique log ID | Primary key |
| clientId | Single Line Text | Reference to client | Will be linked record |
| workoutPlanId | Single Line Text | Optional plan reference | Will be linked record |
| workoutDate | Date | Date performed | ISO format |
| exerciseName | Single Line Text | Exercise name | - |
| sets | Number | Number of sets | Integer |
| reps | Number | Reps per set | Integer |
| weight | Number | Weight used | Decimal |
| unit | Single Select | Weight unit | kg, lbs |
| duration | Number | Exercise duration (mins) | Integer |
| notes | Long Text | Performance notes | - |
| perceivedDifficulty | Number | Difficulty 1-10 | Integer |
| createdAt | Date | Log creation time | ISO format |

**Analytics Use**:
- Track volume over time: `sets × reps × weight`
- Identify personal records (PRs)
- Monitor difficulty trends
- Visualize progress charts

**Relationships**:
- One workout log → One client
- One workout log → One workout plan (optional)

---

### 8. BodyMetrics

**Purpose**: Track client body measurements and progress

| Field Name | Type | Description | Options |
|------------|------|-------------|---------|
| metricId | Single Line Text | Unique metric ID | Primary key |
| clientId | Single Line Text | Reference to client | Will be linked record |
| recordDate | Date | Measurement date | ISO format |
| weight | Number | Body weight | Decimal |
| weightUnit | Single Select | Weight unit | kg, lbs |
| bodyFatPercentage | Number | Body fat % | Decimal |
| muscleMass | Number | Muscle mass | Decimal |
| chest | Number | Chest circumference | Decimal |
| waist | Number | Waist circumference | Decimal |
| hips | Number | Hip circumference | Decimal |
| biceps | Number | Bicep circumference | Decimal |
| thighs | Number | Thigh circumference | Decimal |
| measurementUnit | Single Select | Body measurement unit | cm, inches |
| notes | Long Text | Additional notes | - |

**Analytics Use**:
- Weight trend charts
- Body composition changes
- Measurement comparisons
- Progress photos timeline

**Relationships**:
- One body metric → One client

---

## Data Flow Examples

### User Signs Up
1. User authenticates via Google/Email
2. Record created in **Users** table
3. `userId` generated, `dateJoined` set
4. User redirected to plans page

### User Purchases Subscription
1. Stripe Checkout completed
2. Webhook received
3. Record created in **Subscriptions** table
4. Linked to user via `userId`
5. `sessionsRemaining` = `sessionsIncluded`

### Client Books Session
1. Client selects date/time from **TrainerAvailability**
2. Record created in **Sessions** table
3. Google Calendar event created
4. `googleMeetLink` & `googleCalendarEventId` stored
5. `sessionsRemaining` decremented in **Subscriptions**
6. Confirmation email sent

### Trainer Creates Workout Plan
1. Trainer creates plan in **WorkoutPlans** table
2. Linked to client and session
3. Status: "assigned"
4. Client sees plan in dashboard

### Client Logs Workout
1. Client completes exercises
2. Multiple records created in **WorkoutLogs** table
3. Each exercise logged separately
4. Analytics updated in real-time

### Client Tracks Body Metrics
1. Client enters measurements
2. Record created in **BodyMetrics** table
3. Charts updated with new data point
4. Progress trends recalculated

---

## Security & Access Control

### Client Access
- **Read**: Own user record, own subscriptions, own sessions, own workout plans, own logs, own metrics
- **Write**: Own workout logs, own body metrics
- **No Access**: Other users' data, trainer availability (read-only)

### Trainer Access
- **Read**: All clients' data, all sessions, all workout plans, all logs, all metrics
- **Write**: Workout plans, session notes, trainer availability
- **No Access**: Subscription payment details (read-only)

### Admin Access
- **Full Access**: All tables

---

## Rate Limits & Optimization

**Airtable Rate Limits**:
- 5 requests/second per base
- Implement request queuing
- Use React Query for caching

**Optimization Strategies**:
1. Batch reads when possible
2. Cache frequently accessed data
3. Use webhooks for real-time updates (future)
4. Implement optimistic UI updates

---

## Backup Strategy

**Recommended**:
1. Airtable's built-in version history (30 days)
2. Weekly exports to JSON/CSV
3. Critical data replicated to secondary store (future)

---

## Future Enhancements

**Potential Additions**:
- **Notifications** table for in-app notifications
- **Messages** table for client-trainer chat
- **Documents** table for PDFs, meal plans, etc.
- **Reviews** table for client testimonials
- **Payments** table for detailed payment history

---

**Last Updated**: January 2025
**Schema Version**: 1.0.0
