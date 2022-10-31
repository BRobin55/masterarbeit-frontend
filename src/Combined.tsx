import { useState } from "react";
import { MinusCircleIcon } from "@heroicons/react/24/solid";

import { IGaeb } from "./gaeb.interface";
import { deleteBoq, deleteDxf, updateBoq, updateCombination } from "./App";
import { CombinedData } from "./combinedData.interface";

export default function CombinedTable({
  content,
  setCombinedData,
  selectedBoq,
  setSelectedBoq,
}: {
  content: CombinedData[];
  setCombinedData: React.Dispatch<React.SetStateAction<CombinedData[]>>;
  selectedBoq: IGaeb | null;
  setSelectedBoq: React.Dispatch<React.SetStateAction<IGaeb | null>>;
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

  const addToDxfButton = (elementId: string) => {
    if (selectedBoq)
      updateCombination(elementId, null, selectedBoq).then((res) => {
        setCombinedData(res);
        setSelectedBoq(null);
      });
  };

  const updateDxfQuantity = (elementId: string, amount: number | null) => {
    updateCombination(elementId, amount, null).then((res) => {
      setCombinedData(res);
    });
  };

  const changeCombinationDxfAmount = (elementId: string, value: string) => {
    setCombinedData((state) => {
      state.find((x) => x.id === elementId)!.amount = parseInt(value);
      return state.filter((x) => x);
    });
  };

  const changeCombinationBoqAmount = (
    elementId: string,
    billOfQuantityId: string,
    value: string
  ) => {
    setCombinedData((state) => {
      state
        .find((x) => x.id === elementId)!
        .bill_of_quantity.find((x) => x.id === billOfQuantityId)!.quantity =
        parseInt(value);
      return state.filter((x) => x);
    });
  };

  const deleteBoqButton = (billOfQuantityId: string) => {
    deleteBoq(billOfQuantityId).then((res) => {
      setCombinedData(res);
    });
  };

  const deleteDxfButton = (elementId: string) =>
    deleteDxf(elementId).then((res) => {
      setCombinedData(res);
    });

  return (
    <div className="border-2 bg-blue-50">
      <input
        className="w-1/2"
        placeholder="DXF-Name & BOQ-Short-Text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <table className="w-full">
        <thead className=" bg-blue-300 font-bold text-left">
          <tr>
            <th>Beschreibung</th>
            <th>Menge</th>
            <th className=""></th>
          </tr>
        </thead>
        <tbody className=" overflow-y-auto overflow-x-hidden">
          {filteredContent.map((element) => (
            <tr
              className="h-10 w-10"
              key={element.entity_type_id}
              onClick={(e) => {
                addToDxfButton(element.id);
              }}
            >
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
                        deleteBoqButton(billOfQuantity.id);
                      }}
                    >
                      <MinusCircleIcon className="w-6" />
                    </button>
                    <input
                      className="w-14 text-right float-right"
                      type={"number"}
                      onChange={(e) => {
                        changeCombinationBoqAmount(
                          element.id,
                          billOfQuantity.id,
                          e.target.value
                        );
                        updateBoq(billOfQuantity.id, parseInt(e.target.value));
                      }}
                      value={billOfQuantity.quantity}
                    />
                  </div>
                ))}
              </td>
              <td className="align-top">
                <input
                  className="w-14 text-right"
                  type={"number"}
                  onChange={(e) => {
                    changeCombinationDxfAmount(element.id, e.target.value);
                    updateDxfQuantity(element.id, parseInt(e.target.value));
                  }}
                  value={element.amount}
                />
              </td>
              <td
                className="w-10 p-2 text-red-600 hover:bg-red-400 hover:text-red-900 transition duration-300 ease-in-out"
                onClick={(e) => {
                  deleteDxfButton(element.id);
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
