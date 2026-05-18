function toMinutes(t: string): number {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

export function checkBranchOpen(workHours: string): boolean {
  const parts = workHours.split(" - ");
  if (parts.length !== 2) return false;
  const now = new Date();
  const cur = now.getHours() * 60 + now.getMinutes();
  return cur >= toMinutes(parts[0]) && cur < toMinutes(parts[1]);
}

export function getOpenTime(workHours: string): string {
  return workHours.split(" - ")[0] ?? "";
}

export function getCloseTime(workHours: string): string {
  return workHours.split(" - ")[1] ?? "";
}
