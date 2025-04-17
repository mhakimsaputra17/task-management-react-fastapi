import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="text-9xl font-bold text-gray-300">404</div>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">
        Page not found
      </h1>
      <p className="mt-2 text-base text-gray-500">
        Sorry, we couldn't find the page you're looking for.
      </p>
      <Link
        to="/"
        className="mt-8 px-5 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
      >
        Go back home
      </Link>
    </div>
  );
};

export default NotFound;
