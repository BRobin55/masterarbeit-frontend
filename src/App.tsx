//import logo from "./logo.svg";
import axios from "axios";
import { useEffect, useState } from "react";
import AcceptCombinationModal from "./AcceptCombinations";
import BOQTable from "./Boq";
import CombinedTable from "./Combined";
import { CombinedData } from "./combinedData.interface";
import DxfTable from "./Dxf";
import { IGaeb } from "./gaeb.interface";
import { CreateBillOfQuantity, CreateDxfElementWithBoq } from "./interfaces";
import { IParserResult } from "./parser-result.interface";

/*const boqEntries: IGaeb[] = [
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
];*/

export const saveCombination = async (
  boq: IGaeb[],
  dxfElement: IParserResult,
  projectId: string
) => {
  return axios
    .post("http://localhost:4001/dxf-element", {
      ...dxfElement,
      projectId,
      billOfQuantities: boq,
    } as CreateDxfElementWithBoq)
    .then((res) => res.data as CombinedData[]);
};

export const updateCombination = async (
  dxfId: string,
  dxfAmount: number | null,
  boq: IGaeb | null
) => {
  return axios
    .patch("http://localhost:4001/dxf-element/" + dxfId, {
      ...(dxfAmount && { amount: dxfAmount }),
      ...(boq && { billOfQuantities: [boq] }),
    } as CreateDxfElementWithBoq)
    .then((res) => res.data as CombinedData[]);
};

export const updateBoq = async (boqId: string, quantity: number) => {
  return axios
    .patch("http://localhost:4001/dxf-element/boq/" + boqId, {
      quantity: quantity,
    } as CreateBillOfQuantity)
    .then((res) => res.data as CombinedData[]);
};

export const deleteBoq = async (boqId: string) => {
  return axios
    .delete(`http://localhost:4001/dxf-element/boq/${boqId}`)
    .then((res) => res.data as CombinedData[]);
};

export const deleteDxf = async (dxfId: string) => {
  return axios
    .delete(`http://localhost:4001/dxf-element/${dxfId}`)
    .then((res) => res.data as CombinedData[]);
};

export const findAll = async () => {
  return axios
    .get("http://localhost:4001/dxf-element/")
    .then((res) => res.data as CombinedData[]);
};

function App() {
  const [lvData, setLvData] = useState([] as IGaeb[]);
  const [dxfData, setDxfData] = useState([] as IParserResult[]);
  const [combinedData, setCombinedData] = useState([] as CombinedData[]);

  const [selectedBoq, setSelectedBoq] = useState(null as IGaeb | null);
  const [selectedDxf, setSelectedDxf] = useState(null as IParserResult | null);
  const [selectedProject, setSelectedProject] = useState("p1");

  const [modalOpen, setModalOpen] = useState(false);

  const fetchCombined = async (projectId: string) => {
    const combined = await axios.get(
      "http://localhost:4001/dxf-element/" + projectId
    );
    setCombinedData(combined.data);

    if (!combined.data.length) setModalOpen(true);
  };

  useEffect(() => {
    const fetchGaeb = async () => {
      const gaeb = axios.get("http://localhost:4001/gaeb");
      setLvData((await gaeb).data);
    };
    const fetchDxf = async () => {
      const dxf = await axios.get("http://localhost:4001/groupeDxf");
      setDxfData(dxf.data);
    };

    fetchDxf();
    fetchGaeb();
    fetchCombined(selectedProject);
  }, []);
  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline m-2">
        Leistungsverzeichnis & DXF
      </h1>
      <select
        onChange={(e) => {
          setSelectedProject(e.target.value);
          fetchCombined(e.target.value);
        }}
      >
        <option value="p1">Project 1</option>
        <option value="p2">Project 2</option>
      </select>
      <AcceptCombinationModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        selectedProject={selectedProject}
      />
      <div className="grid grid-cols-3 gap-4 max-h-[36rem]">
        <DxfTable
          content={dxfData}
          selectedDxf={selectedDxf}
          setSelectedDxf={setSelectedDxf}
          selectedBoq={selectedBoq}
          setSelectedBoq={setSelectedBoq}
          combinedData={combinedData}
          setCombinedData={setCombinedData}
          selectedProject={selectedProject}
        />
        <BOQTable
          content={lvData}
          selectedBoq={selectedBoq}
          setSelectedBoq={setSelectedBoq}
          selectedDxf={selectedDxf}
          setSelectedDxf={setSelectedDxf}
          combinedData={combinedData}
          setCombinedData={setCombinedData}
          selectedProject={selectedProject}
        />
        <CombinedTable
          content={combinedData}
          setCombinedData={setCombinedData}
          selectedBoq={selectedBoq}
          setSelectedBoq={setSelectedBoq}
        />
      </div>
    </div>
  );
}

export default App;
