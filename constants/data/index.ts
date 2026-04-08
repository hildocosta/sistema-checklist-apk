import { ACESSORIOSADE } from "./acessoriosade";
import { ARMAS } from "./armamentos";
import { COMUNICACAO } from "./comunicacao";
import { EQUIPAMENTOS } from "./equipamentos";
import { MUNICOES } from "./municoes";
import { SADE } from "./sade";
import { TASER } from "./taser";
import { VEICULOS } from "./veiculos";

// Você precisa exportar a interface aqui para que outros arquivos a vejam
export interface InventarioItem {
  id: number;
  cat: string;
  desc: string;
  serie: string;
  qtd: number;
  pmpr?: string;
  status: "ok" | "pendente";
  cautela?: string;
  pagLivro?: string;
}

export const DATABASE_INICIAL: InventarioItem[] = [
  ...(ARMAS as InventarioItem[]),
  ...(ACESSORIOSADE as InventarioItem[]),
  ...(COMUNICACAO as InventarioItem[]),
  ...(EQUIPAMENTOS as InventarioItem[]),
  ...(MUNICOES as InventarioItem[]),
  ...(SADE as InventarioItem[]),
  ...(TASER as InventarioItem[]),
  ...(VEICULOS as InventarioItem[])
];