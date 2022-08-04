import React, { Fragment } from "react";

import EventHeader from "../../components/event/EventHeader";
import { useRouter } from "next/dist/client/router";

export default function EventPage(props) {
  let router = useRouter();
  let eventId = router.query.eventId;

  return (
    <Fragment>
      <EventHeader />
    </Fragment>
  );
}
