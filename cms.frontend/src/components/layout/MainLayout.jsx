import Header from "../Header";
import Footer from "../Footer";

function MainLayout({ children }) {
    return (
        <div className="flex flex-col min-h-screen">

            {/* HEADER */}
            <Header />

            {/* CONTENT */}
            <main className="flex-1 bg-slate-50">
                {children}
            </main>

            {/* FOOTER */}
            <Footer />

        </div>
    );
}

export default MainLayout;