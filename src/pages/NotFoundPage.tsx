import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home, FileQuestion } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4 bg-white text-slate-900">
      <div className="max-w-md w-full bg-white border border-slate-200 rounded-3xl p-8 text-center shadow-xl">
        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center border border-teal-100">
          <FileQuestion className="w-8 h-8" />
        </div>
        <span className="text-4xl font-black text-teal-700 font-heading block mb-2 font-mono">
          404
        </span>
        <h1 className="text-xl font-bold text-[#0B1F3A] font-heading mb-3">
          Page Not Found
        </h1>
        <p className="text-xs text-slate-600 leading-relaxed mb-6">
          The requested page could not be located. It may have moved or been archived.
        </p>

        <div className="flex flex-col sm:flex-row gap-2 justify-center">
          <Link
            to="/"
            className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition shadow-xs"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return Home</span>
          </Link>
          <Link
            to="/services"
            className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition border border-slate-200"
          >
            <span>View Services</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
