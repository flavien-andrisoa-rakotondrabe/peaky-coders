import { useEffect } from "react";

export default function GlobalTitle(props: {
  appName?: string;

  unseenCounters?: {
    total: number;
  };
}) {
  useEffect(() => {
    const total = props.unseenCounters?.total ?? 0;

    const appName = props.appName ?? "App";

    /*
        |--------------------------------------------------------------------------
        | UPDATE TITLE
        |--------------------------------------------------------------------------
        */
    if (total > 0) {
      document.title = `(${total}) ${appName}`;

      return;
    }

    document.title = appName;
  }, [props.messageCounters?.total, props.appName]);

  return null;
}
