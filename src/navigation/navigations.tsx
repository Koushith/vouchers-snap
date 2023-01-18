import { Routes, Route } from "react-router";
import { CallBackScreen } from "screens/auth/callback.screen";
import { RequireAuth, NotFound } from "../components";
import {
  LoginScreen,
  ProfileScreen,
  VouchersScreen,
  VoucherDetailsScreen,
  CreateVoucherScreen,
  LandingScreen,
  TeamsScreen,
  RegisterScreen,
  RedeemVoucherScreen,
} from "../screens";
import { GlobalStyle } from "../utils";
import { RoutePath } from "./route-path";

export const Navigation = () => {
  return (
    <Routes>
      <Route path={RoutePath.login} element={<LoginScreen />} />
      <Route path={RoutePath.register} element={<RegisterScreen />} />
      <Route path={RoutePath.vouchers} element={<VouchersScreen />} />

      <Route
        path={`${RoutePath.vouchers}/:code`}
        element={<RedeemVoucherScreen />}
      />

      <Route path={RoutePath.notFound} element={<NotFound />} />
      <Route path={RoutePath.callback} element={<CallBackScreen />} />
      <Route
        path={RoutePath.voucherDetails}
        element={<VoucherDetailsScreen />}
      />

      <Route element={<RequireAuth />}>
        <Route path={RoutePath.account} element={<ProfileScreen />} />
        <Route
          path={RoutePath.createVoucher}
          element={<CreateVoucherScreen />}
        />
      </Route>
    </Routes>
  );
};

export const LandingPageNavigation = () => {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path={RoutePath.home} element={<LandingScreen />} />
        <Route path={RoutePath.teams} element={<TeamsScreen />} />
      </Routes>
    </>
  );
};
