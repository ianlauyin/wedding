import { DisplayUtil } from "@utils/DisplayUtil";
import { createSignal } from "solid-js";
import { GuestInfoView } from "wedding-interface";

export interface Props {
  list: Array<GuestInfoView>;
  setList: (list: Array<GuestInfoView>) => void;
}

type Filter = "ALL" | "BRIDE" | "GROOM" | "CONFIRMED" | "UNCONFIRMED";

export const Filter = (props: Props) => {
  const [filter, setFilter] = createSignal<Filter>("ALL");

  const handleFilter = (filter: Filter) => {
    setFilter(filter);
    switch (filter) {
      case "ALL":
        props.setList(props.list);
        break;
      case "BRIDE":
        props.setList(props.list.filter((guest) => guest.side === "BRIDE"));
        break;
      case "GROOM":
        props.setList(props.list.filter((guest) => guest.side === "GROOM"));
        break;
      case "CONFIRMED":
        props.setList(
          props.list.filter((guest) => guest.confirmedCount !== null)
        );
        break;
      case "UNCONFIRMED":
        props.setList(
          props.list.filter((guest) => guest.confirmedCount === null)
        );
        break;
    }
  };

  return (
    <div class="relative h-0 m-0 w-full">
      <select
        class="w-24 select select-bordered select-sm absolute -top-12 left-0"
        value={filter()}
        onChange={(e) => handleFilter(e.currentTarget.value as Filter)}
      >
        <option value="ALL">全部</option>
        <option value="BRIDE">{DisplayUtil.side("BRIDE")}</option>
        <option value="GROOM">{DisplayUtil.side("GROOM")}</option>
        <option value="CONFIRMED">已確認</option>
        <option value="UNCONFIRMED">未確認</option>
      </select>
    </div>
  );
};
