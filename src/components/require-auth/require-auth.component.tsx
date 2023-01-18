import { Navigate, Outlet, useLocation } from "react-router-dom";
import { RoutePath } from "navigation";
import { useStores } from "store";

export function RequireAuth() {
  const location = useLocation();
  const { accountStore } = useStores();

  const isMock: boolean = true;

  const isSignedIn: boolean = accountStore.userSignedIn;

  return isSignedIn ? (
    <Outlet />
  ) : (
    <Navigate to={RoutePath.login} state={{ from: location }} replace />
  );
}
