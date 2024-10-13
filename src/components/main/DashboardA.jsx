import React from 'react';
import SearchWithCategory from '../Basic/smallcomponents/SearchWithCategory';
import MapS from '../main/MapSchedules'
import Card1 from '../Basic/Card1'

function DashboardA() {

  function Side1() {
    return (
      <div class="items-center md:mt-8 flex">
        <div className="col-span-1 md:col-span-2 lg:col-span-1">
          <SearchWithCategory />
        </div>
      </div>
    )
  }

  function Side2() {
    return (
<>
      <section>
      <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
        <MapS />
        </div>
        </section>

      </>







    )
  }

  return (



    <div>
      <Card1 side1={<Side1 />} side2={<Side2 />} />
    </div>
















  );
}

export default DashboardA;
