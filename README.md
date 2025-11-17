# Notes App – Full Stack React + Django

A full-stack web application for creating, reading, and deleting personal notes. Users register, log in with JWT authentication, and manage their notes securely.

## 🎯 What This Site Does

- **User Authentication**: Register new accounts and log in with secure JWT (JSON Web Token) authentication.
- **Create Notes**: Add notes with a title and content after logging in.
- **View Notes**: See all your personal notes displayed on the home page.
- **Delete Notes**: Remove notes you no longer need.
- **Protected Routes**: Unauthenticated users are automatically redirected to the login page.

## 🏗️ Architecture

### Frontend (React + Vite)
- **Framework**: React with Vite build tool
- **Routing**: React Router for page navigation
- **API Client**: Axios with JWT token management
- **Pages**: Login, Register, Home (notes list), 404 Not Found
- **Components**: Protected Route, Loading Indicator, Form, Note Card

### Backend (Django + Django REST Framework)
- **Framework**: Django with Django REST Framework (DRF)
- **Authentication**: JWT via `djangorestframework-simplejwt`
- **Database**: SQLite (development)
- **API Endpoints**:
  - `POST /api/user/register/` – Create new user
  - `POST /api/token/` – Login (get access & refresh tokens)
  - `POST /api/token/refresh/` – Refresh access token
  - `GET /api/notes/` – List user's notes
  - `POST /api/notes/` – Create a new note
  - `DELETE /api/notes/delete/<id>/` – Delete a note

## 🚀 Getting Started

### Prerequisites
- Python 3.8+ (for backend)
- Node.js 16+ (for frontend)
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/worlldboy/notes.git
cd notes
```

### 2. Set Up Backend (Django)

Navigate to the backend folder:
```bash
cd backend
```

Create and activate a virtual environment:
```bash
python -m venv venv
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
```

Install dependencies:
```bash
pip install -r requirements.txt
```

Apply database migrations:
```bash
python manage.py migrate
```

Start the Django development server:
```bash
python manage.py runserver
```

The backend will run on `http://127.0.0.1:8000`

### 3. Set Up Frontend (React + Vite)

In a new terminal, navigate to the frontend folder:
```bash
cd frontend
```

Install dependencies:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173` (or another port if 5173 is busy).

### 4. Open the App

Open your browser and go to the frontend URL (e.g., `http://localhost:5173`).

## 📝 How to Use

1. **Register**: Click "Register" to create a new account with a username and password.
2. **Login**: Use your credentials to log in.
3. **Create a Note**: On the home page, fill in the title and content, then click "Submit".
4. **View Notes**: Your notes appear on the home page after creation.
5. **Delete a Note**: Click the delete button on a note to remove it.
6. **Logout**: Click "Logout" to return to the login page.

## 🛠️ Project Structure

```
React_django/
├── backend/
│   ├── api/
│   │   ├── models.py          # Note model
│   │   ├── serializers.py     # API serializers
│   │   ├── views.py           # API views (CRUD)
│   │   ├── urls.py            # API endpoints
│   │   └── migrations/        # Database migrations
│   ├── backend/
│   │   ├── settings.py        # Django settings
│   │   ├── urls.py            # Root URL config
│   │   └── wsgi.py            # WSGI app
│   ├── manage.py              # Django CLI
│   └── requirements.txt       # Python dependencies
│
├── frontend/
│   ├── src/
│   │   ├── pages/             # Page components (Login, Register, Home, NotFound)
│   │   ├── components/        # Reusable components (Form, ProtectedRoute, etc.)
│   │   ├── styles/            # CSS files
│   │   ├── api.js             # Axios API client
│   │   ├── constants.js       # Token key constants
│   │   └── App.jsx            # Main app component
│   ├── index.html
│   ├── package.json           # Node dependencies
│   └── vite.config.js         # Vite configuration
```

## 🔐 Authentication Flow

1. User registers with username and password → Backend creates user
2. User logs in → Backend returns `access` token and `refresh` token (stored in localStorage)
3. Frontend adds `Authorization: Bearer <access_token>` header to all API requests
4. If token expires, the app automatically refreshes it using the refresh token
5. If refresh fails, user is redirected to login

### Common Tasks

**Add a new note field** (e.g., tags):
1. Update `backend/api/models.py` – add field to `Note` model
2. Run `python manage.py makemigrations api && python manage.py migrate`
3. Update `backend/api/serializers.py` – add field to `NoteSerializer.Meta.fields`
4. Update `frontend/src/pages/home.jsx` – add input for the new field
5. Update `frontend/src/components/Note.jsx` – display the new field

**Change API URL**:
- Update `frontend/.env` – change `VITE_API_URL` to your backend URL

## 📦 Dependencies

### Backend
- Django
- djangorestframework
- djangorestframework-simplejwt
- django-cors-headers
- python-dotenv

### Frontend
- React
- React Router
- Axios
- Vite

## 🐛 Troubleshooting

**"Forbidden (403)" on API requests**:
- Ensure you're logged in and have a valid access token in localStorage
- Check that the `Authorization` header is being sent (DevTools → Network)

**CORS errors**:
- Verify `CORS_ALLOW_ALL_ORIGINS = True` in `backend/backend/settings.py` (for development only)

**Blank home page**:
- Check browser console for errors
- Verify the backend is running and accessible

**Port already in use**:
- Backend: `python manage.py runserver 8001` (use different port)
- Frontend: `npm run dev -- --port 5174` (use different port)

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add YourFeature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

---

**Happy coding!** 🎉
