import { Dispatch, FC, Fragment, SetStateAction } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { timeConverHandler } from '@/core/utils';

type DropdownBoxProps = {
  durationOptions: number[];
  duration: number;
  setDuration: Dispatch<SetStateAction<number>>;
}

const DropdownBox:FC <DropdownBoxProps>= ({
  durationOptions,
  duration,
  setDuration
}) =>  {

  return (
    <Listbox value={duration} onChange={setDuration}>
      <div className="relative mt-1 text-base bg-gray-900 p-2 rounded-lg">
        <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-gray-800 py-2 px-4 text-left shadow-md font-medium focus:outline-none hover:opacity-70 sm:text-sm">
          <span className="block truncate text-primary-normal">
            {/* {`${duration} ${duration > 1 ? "Months" : "Month"}`} */}
            {timeConverHandler(duration)}
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              className="h-5 w-5 text-accent"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="z-50 absolute left-0 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white/30 py-1 text-base backdrop-blur-md ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {durationOptions.map((option, optionIdx) => (
              // <Listbox.Option
              //   key={optionIdx}
              //   className={({ active }) =>
              //     `relative cursor-default select-none py-2 pl-10 font-semibold ${
              //       active ? 'bg-accent/50 text-secondary-normal' : 'text-info-white'
              //     }`
              //   }
              //   value={option}
              // >
              //   {({ selected }) => (
              //     <>
              //       <span
              //         className={`block truncate ${
              //           selected ? 'font-medium' : 'font-normal'
              //         }`}
              //       >
              //         {`${option} ${option > 1 ? "Months" : "Month"}`}
              //       </span>
              //       {selected ? (
              //         <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-accent">
              //           <CheckIcon className="h-5 w-5" aria-hidden="true" />
              //         </span>
              //       ) : null}
              //     </>
              //   )}
              // </Listbox.Option>

              <Listbox.Option
                key={optionIdx}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 font-semibold ${
                    active ? 'bg-accent/50 text-secondary-normal' : 'text-info-white'
                  }`
                }
                value={option}
                >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {timeConverHandler(option)}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-accent">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
};

export default DropdownBox;
