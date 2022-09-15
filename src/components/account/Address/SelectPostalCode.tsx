import { Fragment, useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function SelectPostalCode({ commune, setPostalCode }: any) {
  const t = useTranslations("Profile");
  const [otherPosts, setOtherPosts] = useState<any>();
  const [selected, setSelected] = useState<any>();

  useEffect(() => {
    let all = [{ name: commune.name, postalCode: commune.postalCode }];
    commune.otherPosts.map((post: any) => {
      all.push({ name: post.name, postalCode: post.postalCode });
    });
    setOtherPosts(all);
  }, [commune]);

  useEffect(() => {
    if (selected) setPostalCode(selected.postalCode);
  }, [selected, setPostalCode]);

  return (
    <>
      <p>
        {commune.name} {t("multiplePosts")}:
      </p>
      {otherPosts && (
        <Listbox value={selected} onChange={setSelected}>
          {({ open }) => (
            <div className="mt-1 relative">
              <Listbox.Button className="relative w-full bg-white  border rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1  sm:text-sm border-yellow-200 text-black dark:text-yellow-100 dark:bg-black focus:border-yellow-200 focus:ring-yellow-200">
                <span className="flex items-center">
                  <span className="ml-3 block truncate">
                    {selected ? selected.name : "Select.."}
                  </span>
                </span>
                <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <SelectorIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 w-full shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm  border-yellow-200 text-black dark:text-yellow-100 bg-white dark:bg-black focus:border-yellow-200 focus:ring-yellow-200">
                  {otherPosts.map((post: any) => (
                    <Listbox.Option
                      key={post.postalCode}
                      className={({ active }) =>
                        classNames(
                          active
                            ? "text-black bg-yellow-200"
                            : "text-gray-900 dark:text-yellow-100",
                          "cursor-default select-none relative py-2 pl-3 pr-9"
                        )
                      }
                      value={post}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex items-center">
                            <span
                              className={classNames(
                                selected ? "font-semibold" : "font-normal",
                                "ml-3 block truncate"
                              )}
                            >
                              {post.postalCode} - {post.name}
                            </span>
                          </div>

                          {selected ? (
                            <span
                              className={classNames(
                                active ? "text-white" : "text-indigo-600",
                                "absolute inset-y-0 right-0 flex items-center pr-4"
                              )}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          )}
        </Listbox>
      )}
    </>
  );
}
