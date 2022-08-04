import { Fragment } from "react";

// let db = require("../Util/db");

// let _db;

import Header from "../components/index/Header/Header";
import Section1 from "../components/index/section1/Section1.js";
import Section2 from "../components/index/section2/Section2.js";
import Section3 from "../components/index/section3/Section3.js";

export default function Home(props) {
  return (
    <Fragment>
      <Header />
      <Section1 />
      <Section2 />
      <Section3 />
    </Fragment>
  );
}

// export async function getStaticProps() {
//   if (!_db) {
//     try {
//       _db = db.getDb();
//     } catch {
//       db.initDb((err, res) => {
//         if (err) console.log(err);
//         else _db = res;
//         console.log("db : ", _db);
//       });
//     }
//   }
//   return {
//     props: {
//       test: "",
//     },
//   };
// }

// // export async function getServerSideProps() {}
