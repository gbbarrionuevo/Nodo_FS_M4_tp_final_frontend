import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

export default function PrivateLayout({ children }) {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="container mx-auto p-4 flex-1">
          {children}
        </main>

        <Footer />
      </div>
    </>
  );
}