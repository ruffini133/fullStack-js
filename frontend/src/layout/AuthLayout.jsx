import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
      <main className="container mx-auto items-center gap-10 p-5 md:grid md:grid-cols-2">
        <Outlet />
      </main>
    </>
  );
};

export default AuthLayout;
