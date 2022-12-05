import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  ExclamationTriangleIcon,
  MinusCircleIcon,
} from "@heroicons/react/24/outline";
import { CombinedData } from "./combinedData.interface";
import { findAll, saveCombination } from "./App";

export default function AcceptCombinationModal({
  modalOpen,
  setModalOpen,
  selectedProject,
}: {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedProject: string;
}) {
  const cancelButtonRef = useRef(null);
  const [combinedDataSuggestion, setCombinedDataSuggestion] = useState(
    [] as CombinedData[]
  );

  // useEffect(() => {
  //   findAll().then((res) => {
  //     setCombinedDataSuggestion(res);
  //   });
  // }, []);

  if (modalOpen && !combinedDataSuggestion.length) {
    console.log("a");

    findAll().then((res) => {
      const filteredByKomponent = res.filter((component) => component);
      setCombinedDataSuggestion(res);
    });
  }

  return (
    <Transition.Root show={modalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setModalOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="max-w-5xl m-auto mt-24 min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all my-8 w-full max-w-lg">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="flex sm:items-start">
                    <div className="mx-0 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationTriangleIcon
                        className="h-6 w-6 text-red-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        Verknüpfungen von anderen Projekten übernehmen
                      </Dialog.Title>
                      <div className="mt-2 w-full">
                        <table className="w-full">
                          <thead>
                            <tr>
                              <th>Beschreibung</th>
                              <th>Menge</th>
                              <th className=""></th>
                            </tr>
                          </thead>
                          <tbody className=" overflow-y-auto overflow-x-hidden">
                            {combinedDataSuggestion.map((element) => (
                              <tr
                                className="h-10 w-10 border-4 hover:bg-blue-100"
                                key={element.id}
                                onClick={(e) => {}}
                              >
                                <td className=" ">
                                  <div>{element.entity_type_name}</div>
                                  {element.bill_of_quantity.map(
                                    (billOfQuantity: any) => (
                                      <div
                                        className="w-full"
                                        key={billOfQuantity.position}
                                      >
                                        <span className="ml-4 text-xs">
                                          {billOfQuantity.shortText}
                                        </span>

                                        <input
                                          className="w-14 text-right float-right"
                                          type={"number"}
                                          onChange={(e) => {}}
                                          disabled
                                          value={billOfQuantity.quantity}
                                        />
                                      </div>
                                    )
                                  )}
                                </td>
                                <td className="align-top">
                                  <input
                                    className="w-14 text-right"
                                    type={"number"}
                                    onChange={(e) => {}}
                                    disabled
                                    value={element.amount}
                                  />
                                </td>
                                <td
                                  className="w-10 p-2 text-red-600 hover:bg-red-400 hover:text-red-900 transition duration-300 ease-in-out"
                                  onClick={(e) => {
                                    setCombinedDataSuggestion((state) => {
                                      const newState = state.filter(
                                        (x) => x.id !== element.id
                                      );
                                      return newState;
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
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                      Promise.all(
                        combinedDataSuggestion.map((data) => {
                          const { id, ...restData } = data;
                          return saveCombination(
                            restData.bill_of_quantity.map((boq) => {
                              const { id, dxfElementId, ...rest } = boq;
                              return { ...rest };
                            }),
                            restData,
                            selectedProject
                          );
                        })
                      ).then((combinations) => {
                        console.log(combinations[combinations.length - 1]);
                        setCombinedDataSuggestion(
                          combinations[combinations.length - 1]
                        );
                      });
                      setModalOpen(false);
                    }}
                  >
                    Übernehmen
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setModalOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Abbrechen
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
