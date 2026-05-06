"use client";

import { useQuery } from "@tanstack/react-query";
import { getClientsWithProjects } from "@/lib/actions/clients";

export const clientKeys = {
  all: ["clients"] as const,
  list: (search: string) => [...clientKeys.all, "list", search] as const,
};

export function useClients(search: string = "") {
  return useQuery({
    queryKey: clientKeys.list(search),
    queryFn: () => getClientsWithProjects(search),
  });
}
