import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Active, DataRef, Over } from "@dnd-kit/core";
import { ColumnDragData } from "@/components/kanban/board-column";
import { TaskDragData } from "@/components/kanban/task-card";

type DraggableData = ColumnDragData | TaskDragData;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function hasDraggableData<T extends Active | Over>(
  entry: T | null | undefined
): entry is T & {
  data: DataRef<DraggableData>;
} {
  if (!entry) {
    return false;
  }

  const data = entry.data.current;

  if (data?.type === "Column" || data?.type === "Task") {
    return true;
  }

  return false;
}

export function formatBeautifulDate(dateString: Date): string {
  // Create a new Date object using the input string
  const date = new Date(dateString);

  // Get the day, month, and year from the Date object
  const day = date.getDate(); // Get the day as a number (1-31)
  const month = date.getMonth() + 1; // Get the month as a number (0-11) and adjust to (1-12)
  const year = date.getFullYear(); // Get the four-digit year

  // Pad the day and month with zeros if necessary to ensure they are always two digits
  const formattedDay = day.toString().padStart(2, "0");
  const formattedMonth = month.toString().padStart(2, "0");

  // Combine the components into the final string in the `dd-mm-yyyy` format
  return `${formattedDay}-${formattedMonth}-${year}`;
}

// Example usage
