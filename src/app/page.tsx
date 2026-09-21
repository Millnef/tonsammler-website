import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Releases from "@/components/Releases";
import Sets from "@/components/Sets";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Releases />
        <Sets />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
