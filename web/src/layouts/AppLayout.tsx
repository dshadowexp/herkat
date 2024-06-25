import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import Loading from "../components/Loading";

export default function AppLayout() {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <Container style={{ height: "100vh" }}>
          <Outlet />
        </Container>
      </Suspense> 
    </div>
  )
}
