export default function ItemLedgerPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Item Ledger</h1>

      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">
              <span className="text-red-600">*</span> Brand
            </label>
            <div className="relative">
              <select className="w-full border rounded-md p-2 pr-10 appearance-none" defaultValue="">
                <option value="" disabled>
                  Brand
                </option>
                <option value="Brand A">Brand A</option>
                <option value="Brand B">Brand B</option>
              </select>
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">▾</span>
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">
              <span className="text-red-600">*</span> Frame
            </label>
            <div className="relative">
              <select className="w-full border rounded-md p-2 pr-10 appearance-none" defaultValue="">
                <option value="" disabled>
                  Frame
                </option>
                <option value="Frame A">Frame A</option>
                <option value="Frame B">Frame B</option>
              </select>
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">▾</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div>
            <label className="block text-sm mb-1">From Date</label>
            <div className="relative">
              <input type="date" className="w-full border rounded-md p-2 pr-10" />
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">📅</span>
            </div>
          </div>
          <div>
            <label className="block text-sm mb-1">To Date</label>
            <div className="relative">
              <input type="date" className="w-full border rounded-md p-2 pr-10" />
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">📅</span>
            </div>
          </div>
          <div>
            <label className="block text-sm mb-1">
              <span className="text-red-600">*</span> Branch
            </label>
            <div className="relative">
              <select className="w-full border rounded-md p-2 pr-10 appearance-none" defaultValue="Main Branch">
                <option>Main Branch</option>
                <option>Branch 2</option>
              </select>
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">▾</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-5">
          <button className="bg-green-600 hover:bg-green-700 text-white font-medium px-8 py-2 rounded-md">
            Search
          </button>
        </div>

        <div className="mt-6">
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-md">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left px-4 py-3 border">#</th>
                  <th className="text-left px-4 py-3 border">Date</th>
                  <th className="text-left px-4 py-3 border">Client</th>
                  <th className="text-left px-4 py-3 border">Branch</th>
                  <th className="text-left px-4 py-3 border">In</th>
                  <th className="text-left px-4 py-3 border">Out</th>
                  <th className="text-left px-4 py-3 border">Balance</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-16 text-center border" colSpan={7}>
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 7h18" />
                        <path d="M5 7l1.5-3h11L19 7" />
                        <rect x="3" y="7" width="18" height="10" rx="2" />
                        <path d="M8 11h8" />
                      </svg>
                      <div className="text-sm">No data</div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}


