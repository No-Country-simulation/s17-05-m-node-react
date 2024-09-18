"use cliente";

import { Loader } from "@/components/Loader";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface TypeProps {
  children?: React.ReactNode;
}

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
  const Wrapper = (props: any) => {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
      if (typeof window !== "undefined") {
        const getToken = JSON.parse(localStorage.getItem("userStore") || "{}");
        getToken?.state?.user?.token ? setIsLogin(true) : router.push("/login");
      }
    }, [router]);

    return isLogin ? <WrappedComponent {...props} /> : <Loader/>;
  };

  return Wrapper;
};

export default withAuth;
