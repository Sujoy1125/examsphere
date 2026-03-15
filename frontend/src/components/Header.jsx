export default function Header({ setOpen }) {
  return (
    <header className="sticky top-0 z-30 bg-background-light px-4 md:px-8 py-4 flex justify-between border-b">
      <div className="flex items-center gap-4">
        <button
          className="md:hidden size-10 rounded-xl bg-white border"
          onClick={() => setOpen(true)}
        >
          ☰
        </button>

        <h2 className="text-primary text-lg font-bold">Dashboard</h2>
      </div>

      <div className="flex items-center gap-3">
        <button className="size-10 rounded-xl bg-white border">🔔</button>
      </div>
    </header>
  );
}
