import DashboardTodo from "@/components/DashboardTodo";
import "./globals.css";

export default function Home() {
  return (
    <main style={{ padding: "40px", maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "20px", color: "#333", fontSize: "24px" }}>
        Dashboard Todo - React Migration
      </h1>
      <p style={{ marginBottom: "20px", color: "#666", fontSize: "14px" }}>
        This component has been migrated from Angular 1.x to React with Next.js 15.
      </p>
      <DashboardTodo />
    </main>
  );
}
