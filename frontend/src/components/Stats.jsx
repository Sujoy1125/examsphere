export default function Stats() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
      <div className="rounded-2xl p-6 bg-white shadow text-center">
        <p className="text-primary/50 text-xs font-bold">Tests Attempted</p>
        <p className="text-primary text-4xl font-black">24</p>
      </div>

      <div className="rounded-2xl p-6 bg-white shadow text-center">
        <p className="text-primary/50 text-xs font-bold">Highest Score</p>
        <p className="text-primary text-4xl font-black">98%</p>
      </div>

      <div className="rounded-2xl p-6 bg-primary text-white shadow text-center">
        <p className="text-xs font-bold">Global Rank</p>
        <p className="text-4xl font-black">#42</p>
      </div>
    </section>
  );
}
