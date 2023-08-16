import { useUserAuth } from "hooks/useUserAuth";

const Tasks = () => {
  const { user, loading } = useUserAuth();

  if (!user && !loading)
    return (
      <div className="mx-auto mt-10 max-w-lg rounded-lg bg-slate-800 p-10">
        <h1>User not logged</h1>
      </div>
    );

  if (loading) {
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
