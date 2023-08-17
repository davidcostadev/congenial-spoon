import { useEffect } from "react";
import { useRouter } from "next/router";

import { useUserAuth } from "hooks/useUserAuth";

const Tasks = () => {
  console.log("Tasks");

  const { user, loading, initialCheck } = useUserAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user && initialCheck) {
      router.push("/auth/login");
    }
  }, [user, loading, router, initialCheck]);

  if (loading || !user || !initialCheck) {
    return (
      <div className="mx-auto mt-10 max-w-lg rounded-lg bg-slate-800 p-10">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-10 max-w-lg rounded-lg bg-slate-800 p-10">
      <div>
        <h1 className="mb-8 text-3xl font-semibold text-gray-700 dark:text-gray-200">Tasks</h1>
      </div>
    </div>
  );
};

export default Tasks;
