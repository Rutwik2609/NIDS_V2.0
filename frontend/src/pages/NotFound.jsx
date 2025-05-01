import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4">
            <div className="text-center max-w-2xl mx-auto">
                <h1 className="text-6xl md:text-8xl font-bold text-red-500 mb-4">404</h1>
                <h2 className="text-2xl md:text-3xl font-semibold text-blue-400 mb-6">Page Not Found</h2>
                <p className="text-gray-300 text-lg mb-8">
                    Oops! The page you're looking for seems to have vanished into the digital void.
                </p>
                <div className="space-y-4 md:space-y-0 md:space-x-4">
                    <Link
                        to="/"
                        className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-transform hover:scale-105 shadow-lg"
                    >
                        Go Home
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="inline-block bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-transform hover:scale-105 shadow-lg md:ml-4"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotFound; 