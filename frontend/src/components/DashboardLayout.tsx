import React from 'react';
import DashboardSidebar from './DashboardSidebar';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    return (
        <div className="flex min-h-screen bg-[#F8FAFC]">
            <DashboardSidebar />
            <main className="flex-1 p-12 max-w-7xl mx-auto">
                {children}
            </main>
        </div>
    );
};

export default DashboardLayout;
