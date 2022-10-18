import { useState } from "react";
import { saveCombination } from "./App";
import { IGaeb } from "./gaeb.interface";
import { IParserResult } from "./parser-result.interface";

export default function DxfTable({
  content,
  selectedDxf,
  setSelectedDxf,
  selectedBoq,
  setSelectedBoq,
  setCombinedData,
}: {
  content: IParserResult[];
  selectedDxf: IParserResult | null;
  setSelectedDxf: React.Dispatch<React.SetStateAction<IParserResult | null>>;
  selectedBoq: IGaeb | null;
  setSelectedBoq: React.Dispatch<React.SetStateAction<IGaeb | null>>;
  setCombinedData: React.Dispatch<React.SetStateAction<[]>>;
}) {
  const [search, setSearch] = useState("");

  const filteredContent = content.filter((element) =>
    element.entity_type_name_acad_proxy_class_with_id
      .toLocaleLowerCase()
      .includes(search.toLocaleLowerCase())
  );
  return (
    <div className="border-2 bg-blue-50">
      <input
        placeholder="DXF-Element"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <table className="w-full">
        <thead className="bg-blue-300 font-bold text-left">
          <tr>
            <th>Beschreibung</th>
            <th>Beschreibung 2</th>
            <th>
              Menge (
              {filteredContent.reduce((prev, curr) => prev + curr.amount, 0)})
            </th>
          </tr>
        </thead>
        <tbody className="overflow-y-auto overflow-x-hidden">
          {filteredContent.map((element) => (
            <tr
              key={element.entity_type_name_acad_proxy_class_with_id}
              className={`hover:bg-blue-100 max-h-12 w-10 ${
                selectedDxf?.entity_type_name_acad_proxy_class_with_id ===
                element.entity_type_name_acad_proxy_class_with_id
                  ? "bg-blue-100"
                  : ""
              }`}
              onClick={async (e) => {
                if (selectedBoq) {
                  saveCombination(selectedBoq, element).then((res) => {
                    setCombinedData(res);
                  });
                  setSelectedDxf(null);
                  setSelectedBoq(null);
                } else {
                  console.log(
                    "set " + element.entity_type_name_acad_proxy_class_with_id
                  );
                  setSelectedDxf(element);
                }
              }}
            >
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
