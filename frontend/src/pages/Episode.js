import Description from "../components/Description";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Transcript from "../components/Transcript";

export default function Episode() {
  return (
    <>
      <main className="bg-yellow-500 h-screen">
        <Navbar />
        <Description />
        <Transcript />
        <Footer />
      </main>
    </>
  );
}
