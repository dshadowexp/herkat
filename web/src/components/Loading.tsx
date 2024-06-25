import { Spinner } from 'react-bootstrap'

export default function Loading() {
  return (
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
        <Spinner animation="border" variant="primary" />
    </div>
  )
}
