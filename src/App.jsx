import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { NewsProvider } from './context/NewsContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Pages
import { Home } from './pages/Home';
import { Curriculum } from './pages/Curriculum';
import { FacilitiesPage } from './pages/FacilitiesPage';
import { ActivitiesPage } from './pages/ActivitiesPage';
import { ActivityDetailPage } from './pages/ActivityDetailPage';
import { ServicesPage } from './pages/ServicesPage';
import { Contact } from './pages/Contact';
import FacultyPage from './pages/FacultyPage';
import { NewsPage } from './pages/NewsPage';
import { DiplomaPage } from './pages/DiplomaPage';
import { NewsPost } from './pages/NewsPost';
import { LoginPage } from './pages/LoginPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';

import { AlumniProvider } from './context/AlumniContext';
import { AlumniPage } from './pages/AlumniPage';
import { AlumniDetailPage } from './pages/AlumniDetailPage';

function App() {
  return (
    <AuthProvider>
      <NewsProvider>
        <AlumniProvider>
          <Router>
            <div className="min-h-screen bg-slate-900 font-sans text-white overflow-x-hidden flex flex-col">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/bachelor" element={<Curriculum />} />
                  <Route path="/diploma" element={<DiplomaPage />} />
                  <Route path="/facilities" element={<FacilitiesPage />} />
                  <Route path="/faculty" element={<FacultyPage />} />
                  <Route path="/news" element={<NewsPage />} />
                  <Route path="/news/:id" element={<NewsPost />} />
                  <Route path="/alumni" element={<AlumniPage />} />
                  <Route path="/alumni/:id" element={<AlumniDetailPage />} />
                  <Route path="/activities" element={<ActivitiesPage />} />
                  <Route path="/activity/:id" element={<ActivityDetailPage />} />
                  <Route path="/services" element={<ServicesPage />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </AlumniProvider>
      </NewsProvider>
    </AuthProvider>
  );
}

export default App;
