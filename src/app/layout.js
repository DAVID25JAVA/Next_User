import Navbar from "@/components/Navbar";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "react-hot-toast";


export const metadata = {
  title: "Next Users",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="h-screen flex flex-col">
      <Toaster/>
        <Navbar />

        <div className="flex flex-1 overflow-hidden">
          <Sidebar />

          <main className="flex-1 sm:p-6 p-2 overflow-y-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
