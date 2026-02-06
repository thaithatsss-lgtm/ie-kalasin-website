import React, { createContext, useContext, useState, useEffect } from 'react';

const NewsContext = createContext();

const initialNews = [
    {
        id: 1,
        title: "Industrial Engineering Open House 2026",
        date: "JAN 15, 2026",
        img: "/images/activities/openhouse.jpg", // Placeholder - ensure this exists or use a generic one
        summary: "Join us for an immersive experience into the world of Industrial Engineering. Workshop stations, lab tours, and meet the faculty.",
        content: "<p>We invite all high school students and interested parents to our annual Open House. Experience our state-of-the-art laboratories including the CNC Machining Center, Robotics Lab, and Smart Logistics Simulation.</p><ul><li>Date: January 15, 2026</li><li>Time: 09:00 - 16:00</li><li>Location: Faculty of Engineering, Kalasin University</li></ul>"
    },
    {
        id: 2,
        title: "New Partnership with Leading EV Manufacturer",
        date: "DEC 20, 2025",
        img: "/images/activities/mou.jpg",
        summary: "IE Kalasin signs MOU with major Electric Vehicle parts manufacturer to provide internship and co-op opportunities.",
        content: "<p>The Department of Industrial Engineering is proud to announce a new strategic partnership. This collaboration will give our students exclusive access to internship positions and senior project sponsorships in the booming EV sector.</p>"
    },
    {
        id: 3,
        title: "Student Awards: National Innovation Contest",
        date: "NOV 05, 2025",
        img: "/images/activities/award.jpg",
        summary: "IE students win 1st runner-up in the National Industrial Innovation Contest with their 'Smart Waste Management' project.",
        content: "<p>Congratulations to our senior year team for their outstanding performance at the national stage. Their project uses IoT sensors to optimize waste collection routes in industrial estates, reducing fuel consumption by 30%.</p>"
    }
];

export function NewsProvider({ children }) {
    const [news, setNews] = useState([]);

    useEffect(() => {
        const storedNews = JSON.parse(localStorage.getItem('news_data') || '[]');
        if (storedNews.length > 0) {
            setNews(storedNews);
        } else {
            setNews(initialNews);
            localStorage.setItem('news_data', JSON.stringify(initialNews));
        }
    }, []);

    const addNews = (item) => {
        const id = Math.max(0, ...news.map(n => n.id)) + 1;
        const newItem = { ...item, id };
        const updated = [newItem, ...news]; // Newest first
        setNews(updated);
        localStorage.setItem('news_data', JSON.stringify(updated));
    };

    const updateNews = (id, updatedItem) => {
        const updated = news.map(n => (n.id === id ? { ...updatedItem, id } : n));
        setNews(updated);
        localStorage.setItem('news_data', JSON.stringify(updated));
    };

    const deleteNews = (id) => {
        const updated = news.filter(n => n.id !== id);
        setNews(updated);
        localStorage.setItem('news_data', JSON.stringify(updated));
    };

    const getNewsById = (id) => {
        return news.find(n => n.id === parseInt(id));
    };

    return (
        <NewsContext.Provider value={{ news, addNews, updateNews, deleteNews, getNewsById }}>
            {children}
        </NewsContext.Provider>
    );
}

export function useNews() {
    return useContext(NewsContext);
}
