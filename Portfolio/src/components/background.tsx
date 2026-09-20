export function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="dot-grid absolute inset-0" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 15% 0%, rgba(225,6,0,0.10) 0%, transparent 60%)," +
            "radial-gradient(ellipse 50% 40% at 85% 90%, rgba(225,6,0,0.06) 0%, transparent 60%)," +
            "linear-gradient(180deg, #060606 0%, #0a0a0a 50%, #060606 100%)",
        }}
      />
    </div>
  );
}
