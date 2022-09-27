//import logo from "./logo.svg";
import React from "react";
export interface IGaeb {
  position: string;
  type: string;
  unitPrice: number;
  quantity: number;
  unitTag: string;
  shortText: string;
  longText: string;
  totalPrice: number;
  totalTime: number;
}

export interface IParserResult {
  entity_type_id: string;
  entity_type_name: string;
  entity_type_name_acad_proxy_class_with_id: string;
  amount: number;
  Artikelnummer?: string;
  Artieklbezeichnung?: string;
}

const boqEntries: IGaeb[] = [
  {
    position: "01.01.",
    type: "POSITION",
    unitPrice: 0,
    quantity: 2,
    unitTag: "St",
    shortText: "Einspeisungsfeld mit Kompaktleistungsschaltern (630A)",
    longText:
      "Einspeisungsfeld mit Kompaktleistungsschaltern (630A)\n\n0,4kV-Einspeisefeld mit Lasttrennschalter in\nMCCB-Bauform (Kompaktleistungsschalter-Bauform),\n3-polig\nFeldbreite:                    400 mm\nForm der inneren Unterteilung: 4b\nKabeleinführung von:           oben\n\nDas Lasttrennschalterfeld ist komplett mit allen Feld-\nund Sammelschienenanteilen, sowie folgender\nBestückung anzubieten:\n\n1 Stück\nLasttrennschalter in MCCB-Bauform für Wechselstrom\nin Festeinbautechnik, 3-polig, Type: 3VA14\nBemessungsnennstrom:        In= 630 A\nBemessungsbetriebsstrom:    Ib= 630 A\nBemessungsbetriebskurzschlussausschaltvermögen\nbei 400 V AC: Ics = 50kA = Icu\nAntrieb ausgeführt als Handantrieb\nIm Übrigen gemäß den Vorbemerkungen\n\n1 Stück\nMultifunktionsmessinstrument, Type 3220\nIm Übrigen gemäß den Vorbemerkungen\n\n1 Stück\nKompakt-Leistungsschalter, In= 1,6 ... 10 A,\n3pol., Ics = 100 kA = Icu\neinschl. Betriebszustandsmeldungen als potentialfreie\nKontakte: Ausgelöst (1S)\n\n2 Stück\n2pol. Leitungsschutzschalter, 0,5 ... 6A,\nC-Charakteristik\nzur Absicherung der Steuerspannung\neinschl. Betriebszustandsmeldungen als potentialfreie\nKontakte: Ausgelöst (1S)\n\n3 Stück\nAufsteck-Stromwandler für Verbrauchsmessung\nPrim.-Strom: angepasst auf 3VA-Bemessungsnennstrom\nIm Übrigen gemäß den Vorbemerkungen\n\n1 Stück\nBlitz- und Überspannungsschutz, 4-polig,\nals Kombiableiter, Anforderungsklasse I (B) und II (C)\ngeeignet für den Einsatz im TN Netz\neinschl. Fernmeldekontakt auf Klemmleiste verdrahtet\neinschl. notwendiger Vorsicherung\n\n1 Stück\nKnieschutz gegen zufälliges Berühren\nim Bereich des Kabel- bzw. Schienenanschlussraum\ndurch Abschrankung mittels einer transparenten\nMakrolon-Scheibe\n\npauschal\nDiverses Kleinmaterial (Verdrahtungskanäle, Klemmen,\nMesstrennklemme etc.)\neinschließlich aller feldinternen Steuerleitungen und\nnotwendigem Zubehör\n\nAnschlussraum für ankommendes 5-poliges Parallel-\nKabelsystem\n\nkomplett liefern, einbringen, montieren und betriebsfertig anschließen",
    totalPrice: 0,
    totalTime: 0,
  },
];

const parserResult: IParserResult[] = [
  {
    entity_type_id: "89147931F042CEFA6713EEA9393BFF147760D0AE47AC0BB20F6739D6",
    entity_type_name: "BMA Melder Multisensor",
    entity_type_name_acad_proxy_class_with_id: "BMA Melder Multisensor",
    amount: 102,
  },
  {
    entity_type_id: "AAD88487BE21E13D45C87C21E6DB9B161A1E53775EA0D39BA3B8383A",
    entity_type_name: "Sicherheitsleuchte",
    entity_type_name_acad_proxy_class_with_id: "Sicherheitsleuchte",
    amount: 45,
  },
];

function BOQBlock({ content }: { content: IGaeb[] }) {
  return (
    <div className="border-2 bg-blue-50">
      <table className="w-full">
        <thead className="bg-blue-300 font-bold">
          <tr>
            <td>Beschreibung Short</td>
            <td>Long</td>
            <td>Menge</td>
          </tr>
        </thead>
        <tbody>
          {content.map((element) => (
            <tr className="hover:bg-blue-100 max-h-12 w-10">
              <td>{element.shortText}</td>
              <td className="">{"?"}</td>
              <td>{`${element.quantity} ${element.unitTag}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DxfBlock({ content }: { content: IParserResult[] }) {
  return (
    <div className="border-2 bg-blue-50">
      <table className="w-full">
        <thead className="bg-blue-300 font-bold">
          <tr>
            <td>Beschreibung</td>
            <td>Beschreibung 2</td>
            <td>Menge</td>
          </tr>
        </thead>
        <tbody>
          {content.map((element) => (
            <tr className="hover:bg-blue-100 h-10 w-10">
              <td>{element.entity_type_name}</td>
              <td className="">
                {element.entity_type_name_acad_proxy_class_with_id}
              </td>
              <td>{element.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Block({ content }: { content: IParserResult[] | IGaeb[] }) {
  return (
    <div className="border-2 bg-blue-50">
      <table className="w-full">
        <thead className="bg-blue-300 font-bold">
          <tr>
            <td>Beschreibung</td>
            <td>Menge</td>
          </tr>
        </thead>
        <tbody>{}</tbody>
      </table>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline m-2">
        Leistungsverzeichnis & DXF
      </h1>
      <div className="grid grid-cols-3 gap-4">
        <BOQBlock content={boqEntries} />
        <DxfBlock content={parserResult} />
        <Block content={[]} />
      </div>
    </div>
  );
}

export default App;
