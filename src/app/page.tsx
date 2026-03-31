export default function Home() {
  return (
    <div style={{background: "red", height: "100vh"}}>
      <h1>TEST PAGE</h1>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-5xl font-bold mb-6">Wanky</h1>

      <p className="text-xl mb-10">
        Building modern software products and digital infrastructure.
      </p>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">What We Do</h2>
        <p>
          We design and build modern web applications, platforms, and digital tools
          for businesses and individuals.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">Projects</h2>
        <p>ERS – Errand Runner Platform (In Development)</p>
      </section>

      <section>
        <h2 className="text-3xl font-semibold mb-4">Contact</h2>
        <p>hello@wankysoftware.com</p>
      </section>
    </main>
  );
} 