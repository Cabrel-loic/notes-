"# Notes API Backend

A Django REST Framework backend for the Notes application, providing secure user authentication and note management endpoints.

## 🚀 Features

- **JWT Authentication**: Secure token-based authentication with access and refresh tokens
- **User Management**: User registration and login functionality
- **Note CRUD Operations**: Create, read, and delete personal notes
- **User Isolation**: Each user can only access their own notes
- **CORS Support**: Configured for cross-origin requests from React frontend
- **SQLite Database**: Default database for development (PostgreSQL ready for production)

## 📋 Requirements

- Python 3.8+
- pip package manager
- Virtual environment (recommended)

## 🛠️ Installation & Setup

### 1. Create Virtual Environment

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Environment Configuration

Create a `.env` file in the backend directory:

```env
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
```

### 4. Database Setup

```bash
# Apply database migrations
python manage.py migrate

# Create superuser (optional, for admin access)
python manage.py createsuperuser
```

### 5. Start Development Server

```bash
python manage.py runserver
```

The API will be available at `http://127.0.0.1:8000`

## 📡 API Endpoints

### Authentication Endpoints

- `POST /api/token/` - Login (username, password) → Returns access & refresh tokens
- `POST /api/token/refresh/` - Refresh access token using refresh token
- `POST /api/user/register/` - Register new user (username, password, email)

### Notes Endpoints (Protected)

- `GET /api/notes/` - List all notes for authenticated user
- `POST /api/notes/` - Create new note (title, content)
- `DELETE /api/notes/delete/<id>/` - Delete specific note

### Admin Panel

- `/admin/` - Django admin interface (requires superuser credentials)

## 🔐 Authentication

The API uses JWT (JSON Web Token) authentication:

1. **Login**: Send POST request to `/api/token/` with username and password
2. **Receive Tokens**: Get access token (60 min) and refresh token (1 day)
3. **Access Protected Routes**: Include `Authorization: Bearer <access_token>` header
4. **Token Refresh**: Use refresh token to get new access token when expired

## 📊 Database Models

### User Model
Uses Django's built-in User model with:
- `id`, `username`, `email`, `password`

### Note Model
```python
class Note(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField(blank=True, default="")
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notes')
```

## 🔧 Configuration

### JWT Settings
- Access Token Lifetime: 60 minutes
- Refresh Token Lifetime: 1 day

### CORS Settings
- All origins allowed in development (`CORS_ALLOW_ALL_ORIGINS = True`)
- Credentials supported (`CORS_ALLOW_CREDENTIALS = True`)

### Database
- Default: SQLite (`db.sqlite3`)
- Production ready: PostgreSQL (psycopg2-binary included)

## 📦 Dependencies

- **Django** - Web framework
- **djangorestframework** - REST API framework
- **djangorestframework-simplejwt** - JWT authentication
- **django-cors-headers** - CORS support
- **python-dotenv** - Environment variable management
- **psycopg2-binary** - PostgreSQL adapter
- **PyJWT** - JWT token handling

## 🧪 Testing

```bash
# Run all tests
python manage.py test

# Run specific app tests
python manage.py test api
```

## 🚀 Deployment Considerations

### Security
- Move SECRET_KEY to environment variables
- Set `DEBUG = False` in production
- Configure specific `ALLOWED_HOSTS`
- Use HTTPS in production
- Set appropriate CORS origins for production

### Database
- Switch from SQLite to PostgreSQL for production
- Configure database connection in settings.py

### Performance
- Configure Django settings for production
- Set up proper logging
- Consider caching strategies

## 🐛 Troubleshooting

### Common Issues

**"Forbidden (403) CSRF token missing"**
- Ensure you're sending the Authorization header with Bearer token

**"Invalid token" or "Token is blacklisted"**
- Clear localStorage tokens and re-authenticate
- Check token expiration

**CORS errors**
- Verify CORS settings in `settings.py`
- Ensure frontend URL is properly configured

**Database migration errors**
- Delete `db.sqlite3` and re-run migrations
- Check for conflicting migration files

### Development Tips

- Use `python manage.py shell` for debugging
- Check Django admin at `/admin/` for data inspection
- Enable debug mode for detailed error messages
- Use browser DevTools to inspect API requests

## 📝 API Usage Examples

### Login
```bash
curl -X POST http://127.0.0.1:8000/api/token/ \
  -H "Content-Type: application/json" \
  -d '{"username": "yourusername", "password": "yourpassword"}'
```

### Create Note
```bash
curl -X POST http://127.0.0.1:8000/api/notes/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <access_token>" \
  -d '{"title": "My Note", "content": "Note content"}'
```

### Get Notes
```bash
curl -X GET http://127.0.0.1:8000/api/notes/ \
  -H "Authorization: Bearer <access_token>"
```

## 🔄 Version Control

Remember to add these files to `.gitignore`:
```
.env
venv/
__pycache__/
*.pyc
db.sqlite3
```

---

**Happy coding!** 🎉" 
