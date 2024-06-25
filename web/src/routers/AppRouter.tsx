import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";
import StylistRoutes from "./StylistRoutes";

import AppLayout from "../layouts/AppLayout";
import AuthLayout from "../layouts/AuthLayout";

const StylistBoard = lazy(() => import('../pages/StylistBoard'));
const Services = lazy(() => import('../components/Services'));
const Availability = lazy(() => import('../pages/Availability'));
const SetupStylist  = lazy(() => import('../pages/SetupStylist'));
const PaymentAccount = lazy(() => import('../pages/PaymentAccount'));

const Pay = lazy(() => import('../pages/Pay'));
const Match = lazy(() => import('../pages/Match'));
const Login = lazy(() => import('../features/auth/Login'));
const Signup = lazy(() => import('../features/auth/Signup'));
const ForgotPassword = lazy(() => import('../features/auth/ForgetPassword'));
const NotFound = lazy(() => import('../pages/NotFound'));

export default function AppRouter() {
  return (
    <Routes>
        <Route element={<AppLayout />}>
          <Route element={<PrivateRoutes />}>
              <Route path="/" element={<Navigate replace to="stylist" />} />
              <Route path="/stylist" element={<StylistRoutes />}>
                <Route path="/stylist" element={<StylistBoard />} />
                <Route path="/stylist/setup" element={<SetupStylist />} />
                <Route path="/stylist/service" element={<Services />} />
                <Route path="/stylist/availability" element={<Availability />} />
                <Route path="/stylist/payment-account" element={<PaymentAccount />} />
              </Route>
              <Route path="/client" element={<Navigate replace to="stylist" />}>
              </Route>
              <Route path="/match" element={<Match />} />
              <Route path="/pay" element={<Pay />} />
          </Route>
          <Route element={<PublicRoutes />}>
              <Route element={<AuthLayout />}>
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
              </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
    </Routes>
  );
}
