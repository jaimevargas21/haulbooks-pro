const when = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
  timeZone: "America/Chicago",
});

export function formatWhen(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return when.format(date);
}

export function fleetLabel(count: number) {
  return count === 1 ? "1 truck" : `${count} trucks`;
}

export function placeLabel(city: string, state: string) {
  return `${city}, ${state}`;
}
