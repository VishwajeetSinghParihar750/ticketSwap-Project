import SearchArea from "./SearchArea";
import Navbar from "./Navbar";

export default function Header(props) {
  return (
    <header className="relative">
      <div className="absolute right-[-20px] top-1/2 rotate-90 text-slate-400 text-base translate-y-[-50%]">
        <p>sahil $ingh</p>
      </div>
      <div className="text-white bg-black  pt-4 pb-10 px-5 h-[360px]">
        <Navbar />
        <div>
          <SearchArea />
        </div>
      </div>
    </header>
  );
}
