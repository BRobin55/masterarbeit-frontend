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

  function sortWithSelectedBoq(content: IGaeb[]) {
    if (selectedDxf) {
      const splitComponent = selectedDxf.entity_type_name.split(/[-_\s]+/);

      const contentWithOrder = content.map((c) => {
        let occurrence = 0;
        splitComponent.forEach(
          (sp) =>
            (occurrence +=
              c.longText.toLocaleLowerCase().split(sp.toLocaleLowerCase())
                .length - 1)
        );
        return { ...c, occurrence };
      });

      contentWithOrder.sort((a, b) => b.occurrence - a.occurrence);
      console.log(contentWithOrder);
      return contentWithOrder.map((boq) => {
        const { occurrence, ...response } = boq;
        return { ...response } as IGaeb;
      });
    }
    return content;
  }

  //const filters = filter.split(",");
  const filteredContent = sortWithSelectedBoq(
    content
      .filter((element) =>
        element.longText
          .toLocaleLowerCase()
          .includes(search.toLocaleLowerCase())
      )
      .filter((element) =>
        filter !== ""
          ? !element.longText
              .toLocaleLowerCase()
              .includes(filter.toLocaleLowerCase())
          : true
      )
  );

  console.log(filteredContent.length);
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
        <thead className="bg-blue-300  font-bold">
          <tr className="text-left">
            <th className="">Positions-nummer</th>
            <th className="">Kurz-Text</th>
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
                        [{ ...element, quantity: 1 }],
                        { ...selectedDxf, amount: 1 },
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
                <td className="">{element.position}</td>
                <td className="">{element.shortText}</td>
                <td className="">{`${amountNotCombined} ${element.unitTag}`}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
