# URL Shortener

A modern URL shortening service built with React, Spring Boot, and PostgreSQL. This application allows users to create custom short URLs and track their click statistics.

🌐 **Live Demo:** [https://url-shortener-frontend-phi.vercel.app](https://url-shortener-frontend-phi.vercel.app)

![URL Shortener Demo](demo-screenshot.png)

## Features

- 🔗 Create custom short URLs
- 📊 Track click statistics
- 🔍 Search existing short URLs
- 🌐 Multi-language support (English/Turkish)
- 📱 Responsive design
- 🎨 Modern UI with Material Design

## Tech Stack

### Frontend

- React 18
- TypeScript
- Material-UI (MUI)
- i18next for internationalization
- Vite as build tool
- React Router DOM

### Backend

- Spring Boot
- PostgreSQL
- JPA/Hibernate
- Spring Security

## Deployment

The application is deployed on:

- Frontend: [Vercel](https://url-shortener-frontend-phi.vercel.app)
- Backend: [Koyeb](https://sour-caitrin-yusufpeksen-e967d44c.koyeb.app)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Java 21
- PostgreSQL

### Installation

1. Clone the repository

```bash
git clone https://github.com/yusufpeksen/url-shortener.git
cd url-shortener
```

2. Install frontend dependencies

```bash
cd frontend
npm install
```

3. Set up environment variables

```bash
cp .env.example .env
```

4. Start the development server

```bash
npm run dev
```

## Environment Variables

```env
VITE_API_BASE_URL=https://sour-caitrin-yusufpeksen-e967d44c.koyeb.app
```

## API Endpoints

| Method | Endpoint              | Description              |
| ------ | --------------------- | ------------------------ |
| POST   | `/shorten`            | Create a new short URL   |
| GET    | `/{shortCode}`        | Redirect to original URL |
| GET    | `/url/{shortCode}`    | Get URL information      |
| GET    | `/{shortCode}/clicks` | Get click statistics     |

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Yusuf Peksen - [@yusufpeksen](https://github.com/yusufpeksen)

Project Link: [https://github.com/yusufpeksen/url-shortener](https://github.com/yusufpeksen/url-shortener)

## Acknowledgments

- [Material-UI](https://mui.com/)
- [React](https://reactjs.org/)
- [Spring Boot](https://spring.io/projects/spring-boot)
- [i18next](https://www.i18next.com/)
