import { TrashIcon, ExclamationIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { IFacebookPage } from "../../utils/types";
import { selectUser } from "../../utils/redux/userSlice";
import {
  deleteFacebookPageAccess,
  validateFacebookPageAccess,
} from "../../utils/redux/userAsyncActions";

function PagesList() {
  const [open, setOpen] = useState(false);
  const { user } = useSelector(selectUser);
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
      <h2 className="text-lg font-bold">Facebook pages</h2>
      <div className="mx-1 flex text-xs md:text-base">
        <div className="w-10 text-center font-bold border-r border-black border-b bg-gray-200 dark:bg-gray-800 overflow-hidden">
          d
        </div>
        <div className="w-52 text-center font-bold border-r border-black border-b bg-gray-200 dark:bg-gray-800 overflow-hidden">
          Page name
        </div>
        <div className="w-96 text-center font-bold border-r border-black border-b bg-gray-200 dark:bg-gray-800 overflow-hidden">
          Page URL
        </div>
        <div className="w-52 text-center font-bold border-r border-black border-b bg-gray-200 dark:bg-gray-800 overflow-hidden">
          Access status
        </div>
      </div>
      {user && user.facebookPages && user.facebookPages.length > 0 ? (
        user.facebookPages.map((page: IFacebookPage) => (
          <div key={page.page_id} className="mx-1 flex text-xs md:text-base">
            <DangerDialog
              open={open}
              setOpen={setOpen}
              deletePageAccess={deletePageAccess}
              id={page.page_id}
            />
            <div
              onClick={() => setOpen(true)}
              className="w-10 flex justify-center items-center border-r border-b border-gray-400 bg-white dark:bg-black overflow-hidden cursor-pointer text-red-500"
            >
              <TrashIcon className="h-5 w-5 inline" aria-hidden="true" />
            </div>
            <div className="w-52 flex justify-center items-center border-r border-b border-gray-400 bg-white dark:bg-black overflow-hidden">
              {page.page_name}
            </div>
            <div className="w-96 flex justify-center items-center border-r border-b border-gray-400 bg-white dark:bg-black overflow-hidden">
              {page.page_url}
            </div>
            <div className="w-52 text-center border-r border-b border-gray-400 bg-white dark:bg-black overflow-hidden">
              <span className="font-semibold">{page.access_status}</span>
              {page.access_status === "access_granted" && (
                <>
                  <button
                    onClick={() =>
                      router.push(`/meta-ads/pages/${page.page_id}`)
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
                    An email of an access request was sent to your page&apos;s
                    email address. Please check your inbox.
                    <br />
                    After you have accepted the access request, please click on
                    &quot;validated access&quot;.
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
            </div>
          </div>
        ))
      ) : (
        <div className="mb-20 text-center bg-white">
          No Facebook Pages added.
        </div>
      )}
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
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
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
                      className="text-lg leading-6 font-medium text-gray-900"
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
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
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