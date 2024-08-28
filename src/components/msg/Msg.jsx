import React from 'react'

export default function Msg() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 max-w-sm mx-auto bg-white shadow-lg rounded-lg text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Please Log In First</h1>
        <p className="text-gray-700 mb-4">You need to be logged in to access this page.</p>
        <a href="/login" className="inline-block px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition">
          Go to Login
        </a>
      </div>
    </div>
  )
}
