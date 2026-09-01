export const parseISO = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
};

export const todayISO = () => {
  const n = new Date();
  return `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, "0")}-${String(n.getDate()).padStart(2, "0")}`;
};

export const isToday = (iso: string) => iso === todayISO();
export const isPast = (iso: string) => iso < todayISO();

export const formatShort = (iso: string) =>
  parseISO(iso).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
