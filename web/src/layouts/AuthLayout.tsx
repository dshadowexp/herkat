import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div className="w-100 d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <Outlet />
    </div>
  )
}
