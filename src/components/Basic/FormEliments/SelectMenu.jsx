import React from 'react'

function SelectMenu({ Items, Title, NameVar, ValueVar, OnChangeVar }) {
    return (
        <>
            {/*<!-- Component: Rounded base basic select --> */}
            <div className="relative my-6 md:w-60">
                <select
                    id={NameVar}
                    name={NameVar}                  
                    value={ValueVar}
                    onChange={OnChangeVar}
                    required
                    className="peer relative h-10 w-full appearance-none rounded border border-slate-200 bg-white px-4 text-sm text-slate-500 outline-none transition-all autofill:bg-white focus:border-emerald-500 focus-visible:outline-none focus:focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                >
                    <option value="" disabled selected></option>
                    {Items.map((item) => (
                        <option key={item.value} value={item.value}>
                            {item.vehicalNo ? item.name + ' (' + item.vehicalNo + ')': item.name}
                        </option>
                    ))}
                </select>
                <label
                    for="id-04"
                    className="pointer-events-none absolute top-2.5 left-2 z-[1] px-2 text-sm text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-valid:-top-2 peer-valid:text-xs peer-focus:-top-2 peer-focus:text-xs peer-focus:text-emerald-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
                >
                    {Title}
                </label>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="pointer-events-none absolute top-2.5 right-2 h-5 w-5 fill-slate-400 transition-all peer-focus:fill-emerald-500 peer-disabled:cursor-not-allowed"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-labelledby="title-04 description-04"
                    role="graphics-symbol"
                >
                    <title id="title-04">Arrow Icon</title>
                    <desc id="description-04">Arrow icon of the select list.</desc>
                    <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            </div>
            {/*<!-- End Rounded base basic select --> */}
        </>
    )
}

export default SelectMenu
