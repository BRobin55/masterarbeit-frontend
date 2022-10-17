import { useState } from "react";
import { IGaeb } from "./gaeb.interface";
import { IParserResult } from "./parser-result.interface";

export default function BOQTable({
  content,
  selectedBoq,
  setSelectedBoq,
}: {
  content: IGaeb[];
  selectedBoq: IGaeb | null;
  setSelectedBoq: React.Dispatch<React.SetStateAction<IGaeb | null>>;
  selectedDxf: IParserResult | null;
}) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  //const filters = filter.split(",");
  const filteredContent = content.filter((element) =>
    element.longText.toLocaleLowerCase().includes(search.toLocaleLowerCase()) &&
    filter !== ""
      ? !element.shortText.toLocaleLowerCase().includes(filter)
      : true
  );
  return (
    <div className="border-2 bg-blue-50">
      <input
        placeholder="LV-Long-Position"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <input
        placeholder="LV-Long-Position-Filter"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <table className="w-full">
        <thead className="bg-blue-300 font-bold">
          <tr>
            <td>Beschreibung Short</td>
            <td>Long</td>
            <td>
              Menge (
              {filteredContent.reduce((prev, curr) => prev + curr.quantity, 0)})
            </td>
          </tr>
        </thead>
        <tbody>
          {filteredContent.map((element) => (
            <tr
              key={element.position}
              className={`hover:bg-blue-100 max-h-12 w-10 ${
                selectedBoq?.position === element.position ? "bg-blue-100" : ""
              }`}
              onClick={(e) => {
                console.log("set " + element.position);
                setSelectedBoq(element);
              }}
            >
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
