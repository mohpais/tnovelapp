<div align="center">
    <h1>Hidayah app</h1>
</div>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

# About this app

The Hidayah App is a comprehensive and user-friendly platform designed to assist Muslims in their daily spiritual routines and enhance their connection with Islam. 

This application offers many features that aim to enrich a Muslim's spiritual journey, such as:

#### 1. Quran Reading and Study Tools:
- Access to the full Quran with translations in multiple languages.
- User-friendly interface for reading, studying, and understanding the Quranic verses.
- Bookmarking and note-taking functionalities for personalized study sessions.

#### 2. Prayer Times and Qibla Direction:
- Real-time prayer timings based on the user's location.
- Notifications and reminders for each prayer time.
- Accurate Qibla direction indicator for ease in performing prayers.

#### 3. Islamic Calendar and Events:
- Islamic calendar with important dates, holidays, and Islamic events.
- Information about significant Islamic occasions and their significance.

#### 4. Community Engagement:
- Integration with social features allowing users to connect with other members of the community.
- Discussion forums, sharing of knowledge, and support networks for mutual encouragement and learning.

#### 5. Personalization and Customization:
- User profiles to track personal progress and engagement.
- Customizable settings for prayer time alerts, preferred translations, and display preferences.

#### 6. Educational Resources:
- Access to a range of Islamic educational resources, including articles, lectures, and videos.
- Learning modules for beginners to advanced learners, catering to various levels of understanding.

#### 7. Offline Access and Accessibility:
- Ability to download Quranic verses, translations, and resources for offline access.
- Accessibility features ensuring usability for a diverse user base, including visually impaired users.

#### 8. Additional Features:
- Tasbih counter for easy dhikr and remembrance of Allah.
- Duas (supplications) collection for various occasions and needs.

Laravel is accessible, powerful, and provides tools required for large, robust applications.

## Purposes

The Hidayah App aims to serve as a comprehensive digital companion for Muslims worldwide, assisting them in practicing their faith with ease and convenience. It endeavors to bring the beauty and wisdom of Islamic teachings closer to the users, fostering a stronger connection to spirituality and community.

By amalgamating technology with religious guidance, the app strives to empower individuals to strengthen their Islamic knowledge, perform their religious obligations diligently, and foster a sense of unity within the global Muslim community.

## Technology Stack:
- <b>Backend Service API:</b> Developed using **[Laravel](https://laravel.com/)**
- <b>Frontend Framework:</b> Built with **[Vue.js](https://vuejs.org/)**
- <b>Database Management:</b> Utilizing 
**[MySQL](https://www.mysql.com/)**

# Setup Environment

1. Clone project on Github [Hidayah Website](https://github.com/mohpais/hidayah-website) using this command
```
git clone https://github.com/mohpais/hidayah-website
```
2. Copy .env.example using command 
```
cp .env.exampe .env
```
3. Connect Database by updating .env like this:
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=YOUR_DB_NAME
DB_USERNAME=YOUR_DB_USERNAME
DB_PASSWORD=YOUR_DB_PASSWORD
```
4. Migrate the database using this command:
```
php artisan migrate
```
5. Then generate JWT secret key like:
```
php artisan jwt:secret
```
6. Running 
```
php artisan serve
```