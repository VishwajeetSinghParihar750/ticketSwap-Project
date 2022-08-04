import BrowseNavbar from "./BrowseNavbar";

function BrowseHeader(props) {
  return (
    <div className="text-white bg-[#1a2129]  pt-4 pb-10 px-5 h-[280px] relative">
      <BrowseNavbar />

      <div className="max-w-2xl mx-auto relative ">
        <div className="flex flex-col mt-[10%]">
          <h1 className="font-bold text-6xl mb-2">Browse events</h1>
          <p>Find music and more, on a day that works for you</p>
        </div>
      </div>
    </div>
  );
}

export default BrowseHeader;
