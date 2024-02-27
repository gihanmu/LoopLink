import { Outlet, Navigate } from "react-router-dom";
const AuthLayout = () => {
  const isAuthenticated = false;
  return isAuthenticated ? (
    <Navigate to={"/"} />
  ) : (
    <>
      <section className="flex flex-col flex-1 justify-center items-center py-10">
        <Outlet />
      </section>
      <img
        src="/assets/images/side-img.png"
        alt="Logo"
        className="hidden xl:block  bg-no-repeat object-contain"
      />
    </>
  );
};

export default AuthLayout;
