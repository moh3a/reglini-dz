import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon, CogIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import Link from "next/link";

const languages = [
  {
    id: 1,
    name: "English",
    locale: "en",
  },
  {
    id: 2,
    name: "Français",
    locale: "fr",
  },
  {
    id: 3,
    name: "عربية",
    locale: "ar",
  },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function SelectLanguage() {
  const router = useRouter();
  let lang = "";
  if (router.locale === "fr") {
    lang = languages[1].name;
  } else if (router.locale === "ar") {
    lang = languages[2].name;
  } else {
    lang = languages[0].name;
  }
  const [selected, setSelected] = useState(lang);

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <div className="mt-1 relative">
            <Listbox.Button className="relative w-50 bg-white dark:bg-grim border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-yellow-300 focus:border-yellow-300 sm:text-sm">
              <span className="flex items-center">
                <CogIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                <span className="ml-3 block truncate">{selected}</span>
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
              <Listbox.Options className="absolute z-10 mt-1 w-40 bg-white dark:bg-grim border-yellow-200 shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {languages.map((language) => (
                  <Listbox.Option
                    key={language.id}
                    className={({ active }) =>
                      classNames(
                        active
                          ? "text-white bg-indigo-600 dark:bg-yellow-200 dark:text-black"
                          : "text-black dark:text-yellow-200",
                        "cursor-default select-none relative py-2 pl-3 pr-9"
                      )
                    }
                    value={language.name}
                  >
                    {({ selected, active }) => (
                      <>
                        <Link
                          href={router.asPath}
                          locale={language.locale}
                          passHref
                        >
                          <div className="flex items-center">
                            <span
                              className={classNames(
                                selected ? "font-semibold" : "font-normal",
                                "ml-3 block truncate"
                              )}
                            >
                              {language.name}
                            </span>
                            {selected ? (
                              <span
                                className={classNames(
                                  active ? "hidden" : "",
                                  "absolute inset-y-0 right-0 flex items-center pr-4"
                                )}
                              >
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </div>
                        </Link>
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
