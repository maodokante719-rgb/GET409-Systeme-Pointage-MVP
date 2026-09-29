export type Status = "present" | "late" | "absent" | "mission";

export type Employee = {
  id: string;
  name: string;
  initials: string;
  site: string;
  siteKey: "plateau" | "pikine" | "diamniadio" | "terrain";
  arrival: string;
  method: string;
  status: Status;
  note?: string;
};

export const date = "Mardi 22 septembre 2026";

export const employees: Employee[] = [
  { id: "EMP-001", name: "Awa Diop", initials: "AD", site: "Plateau — siège, Av. Léopold Sédar Senghor", siteKey: "plateau", arrival: "07:58", method: "QR code", status: "present" },
  { id: "EMP-004", name: "Moussa Fall", initials: "MF", site: "Agence de Pikine — Rue 10", siteKey: "pikine", arrival: "08:31", method: "Position vérifiée", status: "late", note: "+31 min" },
  { id: "EMP-005", name: "Aïssatou Ba", initials: "AB", site: "Agence de Pikine — Rue 10", siteKey: "pikine", arrival: "07:55", method: "QR code", status: "present" },
  { id: "EMP-006", name: "Ibrahima Sarr", initials: "IS", site: "Agence de Pikine — Rue 10", siteKey: "pikine", arrival: "—", method: "—", status: "absent" },
  { id: "EMP-009", name: "Cheikh Ndiaye", initials: "CN", site: "Terrain — client à Mermoz", siteKey: "terrain", arrival: "08:05", method: "Mission validée", status: "mission" },
  { id: "EMP-007", name: "Fatou Gueye", initials: "FG", site: "Dépôt de Diamniadio — zone industrielle", siteKey: "diamniadio", arrival: "08:04", method: "Position vérifiée", status: "present" },
];

export const statusStyle: Record<Status, { label: string; dot: string; text: string }> = {
  present: { label: "Présent", dot: "bg-status-present", text: "text-status-present" },
  late: { label: "En retard", dot: "bg-status-late", text: "text-status-late" },
  absent: { label: "Absent", dot: "bg-status-absent", text: "text-status-absent" },
  mission: { label: "Mission validée", dot: "bg-status-mission", text: "text-status-mission" },
};
