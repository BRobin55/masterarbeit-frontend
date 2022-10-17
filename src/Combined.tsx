import { useState } from "react";
import { deleteBoq, deleteDxf } from "./App";
import { MinusCircleIcon } from "@heroicons/react/24/solid";

export default function CombinedTable({
  content,
  setCombinedData,
}: {
  content: any[];
  setCombinedData: React.Dispatch<React.SetStateAction<[]>>;
}) {
  const [search, setSearch] = useState("");

  const filteredContent = content.filter(
    (element) =>
      element.entity_type_name_acad_proxy_class_with_id
        .toLocaleLowerCase()
        .includes(search.toLocaleLowerCase()) ||
      (element.bill_of_quantity as any[]).find((x) =>
        x.shortText.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      )
  );

  return (
    <div className="border-2 bg-blue-50">
      <input
        className="w-1/2"
        placeholder="DXF-Name & BOQ-Short-Text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <table className="w-full">
        <thead className="bg-blue-300 font-bold">
          <tr>
            <th>Beschreibung</th>
            <th>Menge</th>
            <th className=""></th>
          </tr>
        </thead>
        <tbody>
          {filteredContent.map((element) => (
            <tr className="h-10 w-10" key={element.entity_type_id}>
              <td>
                <div className="hover:bg-blue-100 ">
                  {element.entity_type_name_acad_proxy_class_with_id}
                </div>
                {element.bill_of_quantity.map((billOfQuantity: any) => (
                  <div className="" key={billOfQuantity.position}>
                    <span className="ml-4 text-xs">
                      {billOfQuantity.shortText}
                    </span>

                    <button
                      className="float-right mr-4 text-red-600 pr-2 pl-2 hover:bg-red-400 hover:text-red-900 transition duration-300 ease-in-out"
                      onClick={(e) => {
                        deleteBoq(billOfQuantity.id).then((res) => {
                          setCombinedData(res);
                        });
                      }}
                    >
                      <MinusCircleIcon className="w-6" />
                    </button>
                    <span className="ml-4 text-xs float-right mr-4">
                      {billOfQuantity.quantity}
                    </span>
                  </div>
                ))}
              </td>
              <td className="align-top">{element.amount}</td>
              <td
                className="w-10 p-2 text-red-600 hover:bg-red-400 hover:text-red-900 transition duration-300 ease-in-out"
                onClick={(e) => {
                  deleteDxf(element.id).then((res) => {
                    setCombinedData(res);
                  });
                }}
              >
                <MinusCircleIcon className="w-8" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
