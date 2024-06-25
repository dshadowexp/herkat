
import { AuthProvider } from "./contexts/auth"
import { BrowserRouter as Router } from "react-router-dom"
import AppRouter from "./routers/AppRouter"

function App() {
  return (
    <Router basename="/">
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </Router>
  )
}

export default App
