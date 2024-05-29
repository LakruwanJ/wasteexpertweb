import React from 'react'

function Card1({ side1, side2 }) {
  return (
    <>
      {/*<!-- Component: Four and Eight uneven columns layout --> */}
      <section>
        <div className="container m-auto">
          <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
            <div className="col-span-4">{side1}</div>
            <div className="col-span-4 lg:col-span-8">{side2}</div>
          </div>
        </div>
      </section>
      {/*<!-- End Four and Eight uneven columns layout --> */}
    </>
  )

}

export default Card1

