import { DisplayUtil } from "@utils/display";
import { GuestInfoView } from "wedding-interface";

export interface Props {
  guest: GuestInfoView;
  bg: string;
}

export const Detail = (props: Props) => {
  return (
    <tr class={`border-t-0 ${props.bg}`}>
      <td class="px-4 pt-0 " colSpan={4}>
        <div>
          <div class="text-xs">
            <p>
              Created at {DisplayUtil.time(props.guest.createdAt)} by{" "}
              {props.guest.createdBy}
            </p>
            <p>
              Updated at {DisplayUtil.time(props.guest.updatedAt)} by{" "}
              {props.guest.updatedBy}
            </p>
          </div>
          <div class="flex justify-end gap-6 py-2">
            <button class="btn btn-sm btn-error">Delete</button>
            <button class="btn btn-sm btn-accent">Edit</button>
          </div>
        </div>
      </td>
    </tr>
  );
};
