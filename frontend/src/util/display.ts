import { Side } from "wedding-interface";

export class DisplayUtil {
  static side(side: Side) {
    switch (side) {
      case "BRIDE":
        return "女家";
      case "GROOM":
        return "男家";
    }
  }

  static time(timestamp: string) {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }
}
