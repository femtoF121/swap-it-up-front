import { RouterProvider } from "react-router-dom";

import { router } from "./router";
import { Suspense } from "react";
import { Loader } from "./components";

const App = () => {
  return (
    <Suspense
      fallback={
        <div className='flex justify-center items-center min-h-screen w-full'>
          <Loader />
        </div>
      }>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default App;
