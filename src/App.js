import { Routes, Route } from "react-router-dom";
import { Suspense, lazy, useEffect } from 'react';
import './App.css';
import './Styles/ContentPages.css';
import ProtectedRoute from './Components/ProtectedRoute';
import ScrollToTop from './Components/ScrollToTop';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

// Lazy loading pages for better performance
const Home = lazy(() => import('./Pages/Home'));
const Games = lazy(() => import('./Pages/Games'));
const GameDetails = lazy(() => import('./Pages/GameDetails'));
const About = lazy(() => import('./Pages/About'));
const FAQs = lazy(() => import('./Pages/FAQs'));
const ContactUs = lazy(() => import('./Pages/ContactUs'));
const PrivacyPolicy = lazy(() => import('./Pages/PrivacyPolicy'));
const TermsConditions = lazy(() => import('./Pages/Terms&Conditions'));
const AdminLogin = lazy(() => import('./Pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./Pages/AdminDashboard'));

// Loading component
const PageLoader = () => (
    <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh', 
        backgroundColor: '#4e0000',
        color: 'white',
        fontSize: '1.5rem'
    }}>
        <div className="loader">Loading...</div>
    </div>
);

function App() {
    useEffect(() => {
        // We can just execute this if needed or drop the state
        localStorage.getItem('isAuthenticated');

        fetch('/api/settings')
            .then(res => res.json())
            .then(data => {
                if (data && data.faviconUrl) {
                    let link = document.querySelector("link[rel~='icon']");
                    if (!link) {
                        link = document.createElement('link');
                        link.rel = 'icon';
                        document.head.appendChild(link);
                    }
                    link.href = data.faviconUrl;
                }
            })
            .catch(err => console.error("Error setting favicon:", err));
    }, []);

    return(
        <>
            <Suspense fallback={<PageLoader />}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/games" element={<Games />} />
                    <Route path="/games/:id" element={<GameDetails />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/faqs" element={<FAQs />} />
                    <Route path="/contact" element={<ContactUs />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="/terms-conditions" element={<TermsConditions />} />
                    <Route path="/admin" element={<AdminLogin />} />
                    <Route path="/admin/dashboard/*" element={
                        <ProtectedRoute>
                            <AdminDashboard />
                        </ProtectedRoute>
                    } />
                </Routes>
            </Suspense>
            <ScrollToTop />
            <Analytics />
            <SpeedInsights />
        </>
    )
}

export default App;