export interface DxfElementDto {
  id: string;
  entity_type_name: string;
  entity_type_id: string;
  entity_type_name_acad_proxy_class_with_id: string;
  Artikelnummer?: string;
  Artikelbezeichnung?: string;
  billOfQuantities: CreateBillOfQuantity[];
}

export interface CreateBillOfQuantity {
  position: string;
  type: string;
  shortText: string;
  longText: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  totalTime: number;
  unitTag: string;
}

export interface CreateDxfElementWithBoq {
  projectId: string;
  entity_type_name: string;
  entity_type_id: string;
  entity_type_name_acad_proxy_class_with_id: string;
  Artikelnummer?: string;
  Artikelbezeichnung?: string;
  amount: number;
  billOfQuantities: CreateBillOfQuantity[];
}
