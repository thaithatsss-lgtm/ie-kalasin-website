import React, { createContext, useContext, useState, useEffect } from 'react';

const AlumniContext = createContext();

const initialAlumni = [
    {
        id: 1,
        name: "Somsak Engineer",
        nickname: "Sak",
        batch: "IE KU 1",
        email: "somsak@example.com",
        image: null, // Placeholder or URL
        position: "Production Manager",
        company: "Toyota Motor Thailand",
        companyLogo: null,
        skills: "Lean Manufacturing, Six Sigma, Man Management",
        testimonial: "The curriculum at Kalasin University prepared me well for the real world.",
        message: "Always keep learning and never give up."
    },
    {
        id: 2,
        name: "Jane Doe",
        nickname: "Jane",
        batch: "IE KU 2",
        email: "jane@example.com",
        image: null,
        position: "Supply Chain Analyst",
        company: "SCG Logistics",
        companyLogo: null,
        skills: "SAP, Data Analysis, Supply Chain Optimization",
        testimonial: "I loved the hands-on experience in the labs.",
        message: "Data is the future of engineering."
    }
];

export function AlumniProvider({ children }) {
    const [alumni, setAlumni] = useState([]);

    useEffect(() => {
        try {
            const storedData = localStorage.getItem('alumni_data');
            let storedAlumni = storedData ? JSON.parse(storedData) : [];

            if (!Array.isArray(storedAlumni) || storedAlumni.length === 0) {
                setAlumni(initialAlumni);
                localStorage.setItem('alumni_data', JSON.stringify(initialAlumni));
            } else {
                setAlumni(storedAlumni);
            }
        } catch (error) {
            console.error("Failed to load alumni from localStorage:", error);
            setAlumni(initialAlumni);
            localStorage.setItem('alumni_data', JSON.stringify(initialAlumni));
        }
    }, []);

    const addAlumni = (item) => {
        const id = Math.max(0, ...alumni.map(n => n.id)) + 1;
        const newItem = { ...item, id };
        const updated = [newItem, ...alumni]; // Newest first
        setAlumni(updated);
        localStorage.setItem('alumni_data', JSON.stringify(updated));
    };

    const updateAlumni = (id, updatedItem) => {
        const updated = alumni.map(n => (n.id === id ? { ...updatedItem, id } : n));
        setAlumni(updated);
        localStorage.setItem('alumni_data', JSON.stringify(updated));
    };

    const deleteAlumni = (id) => {
        const updated = alumni.filter(n => n.id !== id);
        setAlumni(updated);
        localStorage.setItem('alumni_data', JSON.stringify(updated));
    };

    const getAlumniById = (id) => {
        return alumni.find(n => n.id === parseInt(id));
    };

    return (
        <AlumniContext.Provider value={{ alumni, addAlumni, updateAlumni, deleteAlumni, getAlumniById }}>
            {children}
        </AlumniContext.Provider>
    );
}

export function useAlumni() {
    return useContext(AlumniContext);
}
