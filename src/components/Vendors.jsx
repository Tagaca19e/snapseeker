export default function Vendors() {
  const vendors = [
    {
      name: 'Walmart',
      source: '/vendors/walmart.svg',
    },
    {
      name: 'Target',
      source: '/vendors/target.svg',
    },
    {
      name: 'Amazon',
      source: '/vendors/amazon.svg',
    },
    {
      name: 'Bestbuy',
      source: '/vendors/bestbuy.svg',
    },
    {
      name: 'Wayfair',
      source: '/vendors/wayfair.svg',
    },
  ];
  return (
    <div className="bg-white py-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-2xl font-bold leading-8 text-gray-700">
          Supported Vendors
        </h2>
        <div className="mt-10 flex flex-wrap justify-center gap-8">
          {vendors.map((vendor) => (
            <img
              className="col-span-2 object-contain lg:col-span-1"
              src={vendor.source}
              alt={vendor.name}
              width={200}
              height={100}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
