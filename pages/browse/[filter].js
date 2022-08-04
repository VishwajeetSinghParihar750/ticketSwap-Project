import Index from "./index";
import { Fragment } from "react";
import { useRouter } from "next/router";

export default function FilteredEventsPage() {
  let router = useRouter();
  let { filter } = router.query;

  if (filter !== "today" && filter !== "this-weekend") {
    filter = null;
  }
  return (
    <Fragment>
      <Index filter={filter} />
    </Fragment>
  );
}
