# Form Fitness

Form Fitness is an all-in-one fitness app for improving exercise form, tracking workouts, and getting coaching guidance. It uses a live camera feed and pose estimation to give feedback during home workouts.

[Demo and project story ↗](https://devpost.com/software/form-fitness-pya478)

## Project timeline

The original Form Fitness prototype was built as a team project for LA Hacks in April 2025. I worked on a later iteration in early 2026, building on that prototype. The linked Devpost page documents the original hackathon project and its team.

## What it does

- Tracks body landmarks from a live video feed to evaluate exercise form.
- Supports exercise tracking for push-ups, leg raises, and shoulder presses.
- Lets users log workouts and review their workout history.
- Includes account authentication and an AI coaching interface.

## How it was built

The frontend uses React, TypeScript, and Vite. The backend uses Python and Flask for authentication and API routes, MongoDB for user and workout data, and TensorFlow's MoveNet for pose estimation. The Devpost write-up also describes the team's work connecting the live camera feed to the backend and building an AI coach.

## What we learned and what is next

The original team worked through the challenges of connecting a live camera feed, Flask, and React. Future directions described on Devpost include supporting more exercises, such as bench press, and making the coach more adaptable to different lifestyles.

Environment files may contain credentials and are intentionally excluded from Git history. Keep local `.env` files out of commits.
