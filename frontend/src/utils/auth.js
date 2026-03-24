import { jwtDecode } from "jwt-decode"
import { ACCESS_TOKEN } from "../constants"

export function isTokenValid() {
  const token = localStorage.getItem(ACCESS_TOKEN)
  if (!token) return false

  try {
    const decoded = jwtDecode(token)
    const now = Date.now() / 1000
    return decoded.exp > now
  } catch {
    return false
  }
}

export function clearTokens() {
  localStorage.removeItem(ACCESS_TOKEN)
  localStorage.removeItem("refresh_token")
}