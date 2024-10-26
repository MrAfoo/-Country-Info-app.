
import Link from 'next/link';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-4xl font-bold mb-4 text-blue-800">Welcome to the Country Info App</h1>
      <Link href="/countries" className="text-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300 px-4 py-2 rounded">
        Go to Country Information
      </Link>
    </div>
  );
};

export default HomePage;
