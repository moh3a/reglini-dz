/* eslint-disable @next/next/no-img-element */
import { TrashIcon, ExclamationIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { IFacebookPage, IUserRedux } from "../../types";
import { selectUser } from "../../utils/redux/userSlice";
import {
  deleteFacebookPageAccess,
  validateFacebookPageAccess,
} from "../../utils/redux/userAsyncActions";

function PagesList() {
  const [open, setOpen] = useState(false);
  const { user }: { user: IUserRedux } = useSelector(selectUser);
  const dispatch = useDispatch();
  const router = useRouter();

  const deletePageAccess = (id: string) => {
    dispatch(deleteFacebookPageAccess({ pageId: id }));
  };

  const validatePageAccess = (id: string) => {
    dispatch(validateFacebookPageAccess({ pageId: id }));
  };

  return (
    <div>
      <h2 className="text-xl text-center font-bold mb-4 mt-8">
        Facebook pages
      </h2>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-grim dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Delete page</span>
              </th>
              <th scope="col" className="px-6 py-3">
                Page name
              </th>
              <th scope="col" className="px-6 py-3">
                Page URL
              </th>
              <th scope="col" className="px-6 py-3">
                Access status
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {user && user.facebookPages && user.facebookPages.length > 0 ? (
              user.facebookPages.map((page, idx) => (
                <tr
                  key={page.page_id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <DangerDialog
                    open={open}
                    setOpen={setOpen}
                    deletePageAccess={deletePageAccess}
                    id={page.page_id}
                  />
                  <th
                    scope="row"
                    onClick={() => setOpen(true)}
                    className="px-6 py-4 cursor-pointer font-medium text-sm text-red-500 whitespace-nowrap"
                  >
                    <TrashIcon className="h-5 w-5 inline" aria-hidden="true" />
                  </th>
                  <td className="px-6 py-4">{page.page_name}</td>
                  <td className="px-6 py-4">
                    <a href={page.page_url} target="_blank" rel="noreferrer">
                      {page.page_url}
                    </a>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`${
                        page.access_status === "processing_deletion" &&
                        "bg-red-100 text-red-800 rounded-full px-3 py-1"
                      } font-semibold`}
                    >
                      {page.access_status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {page.access_status === "access_granted" && (
                      <>
                        <button
                          onClick={() =>
                            router.push(`/meta-ads/fbpage/${page.page_id}`)
                          }
                          className="py-1 px-3 bg-green-500 text-white rounded-lg m-1"
                        >
                          manage
                        </button>
                      </>
                    )}
                    {page.access_status === "access_request_sent" && (
                      <>
                        <br />
                        <p className="text-xs">
                          An email of an access request was sent to your
                          page&apos;s email address. Please check your inbox.
                          <br />
                          After you have accepted the access request, please
                          click on &quot;validated access&quot;.
                        </p>
                        <div>
                          <button
                            onClick={() => deletePageAccess(page.page_id)}
                            className="py-1 px-3 bg-red-500 text-white rounded-lg m-1"
                          >
                            denied access
                          </button>
                          <button
                            onClick={() => validatePageAccess(page.page_id)}
                            className="py-1 px-3 bg-green-500 text-white rounded-lg m-1"
                          >
                            validated access
                          </button>
                        </div>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <div className="w-full text-center bg-white">
                No Facebook Pages added.
              </div>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export const DangerDialog = ({ deletePageAccess, id, open, setOpen }: any) => {
  const cancelButtonRef = useRef(null);
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
          </Transition.Child>
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white dark:bg-grim rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white dark:bg-grim px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationIcon
                      className="h-6 w-6 text-red-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100"
                    >
                      REMOVE ACCESS TO THIS PAGE?
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        By confirming reglini-dz will lose all access to this
                        page.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-grim px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => {
                    deletePageAccess(id);
                    setOpen(false);
                  }}
                  ref={cancelButtonRef}
                >
                  Delete
                </button>

                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-600 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setOpen(false)}
                  ref={cancelButtonRef}
                >
                  Close
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default PagesList;
