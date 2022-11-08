import { useState } from "react";
import { saveCombination } from "./App";
import { CombinedData } from "./combinedData.interface";
import { IGaeb } from "./gaeb.interface";
import { IParserResult } from "./parser-result.interface";

export default function BOQTable({
  content,
  selectedBoq,
  setSelectedBoq,
  selectedDxf,
  setSelectedDxf,
  combinedData,
  setCombinedData,
  selectedProject,
}: {
  content: IGaeb[];
  selectedBoq: IGaeb | null;
  setSelectedBoq: React.Dispatch<React.SetStateAction<IGaeb | null>>;
  selectedDxf: IParserResult | null;
  setSelectedDxf: React.Dispatch<React.SetStateAction<IParserResult | null>>;
  combinedData: CombinedData[];
  setCombinedData: React.Dispatch<React.SetStateAction<CombinedData[]>>;
  selectedProject: string;
}) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  //const filters = filter.split(",");
  const filteredContent = content
    .filter((element) =>
      element.longText.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    )
    .filter((element) =>
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
          <tr className="text-left">
            <th className="">Beschreibung Short</th>
            <th className="">Long</th>
            <th className="">
              Menge (
              {filteredContent.reduce((prev, curr) => prev + curr.quantity, 0)})
            </th>
          </tr>
        </thead>
        <tbody className="overflow-y-auto overflow-x-hidden">
          {filteredContent.map((element) => {
            const amountNotCombined = combinedData
              .flatMap((x) => x.bill_of_quantity)
              .reduce(
                (prev, curr) =>
                  curr.position === element.position
                    ? prev - curr.quantity
                    : prev,
                element.quantity
              );
            return (
              <tr
                key={element.position}
                className={` max-h-12 w-10 ${
                  selectedBoq?.position === element.position
                    ? "bg-blue-100"
                    : ""
                } ${
                  amountNotCombined === 0
                    ? " text-gray-300"
                    : "hover:bg-blue-100"
                }`}
                onClick={(e) => {
                  console.log("set " + element.position);
                  element.quantity = amountNotCombined;
                  if (amountNotCombined !== 0)
                    if (selectedDxf) {
                      saveCombination(
                        [element],
                        selectedDxf,
                        selectedProject
                      ).then((res) => {
                        setCombinedData(res);
                      });
                      setSelectedDxf(null);
                      setSelectedBoq(null);
                    } else {
                      console.log("set " + element.position);
                      setSelectedBoq(element);
                    }
                }}
              >
                <td className="">{element.shortText}</td>
                <td className="">{"?"}</td>
                <td className="">{`${amountNotCombined} ${element.unitTag}`}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
