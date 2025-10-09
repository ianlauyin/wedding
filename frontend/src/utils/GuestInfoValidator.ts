import { GuestInfoView } from "wedding-interface";

export class GuestInfoValidator {
  private originalGuest: GuestInfoView | null;

  constructor(originalGuest?: GuestInfoView) {
    this.originalGuest = originalGuest || null;
  }

  checkName(name: string): GuestInfoValidator {
    if (name.length === 0) throw new Error("Name is required");
    return this;
  }

  checkRelationship(relationship: string): GuestInfoValidator {
    if (relationship.length === 0) throw new Error("Relationship is required");
    return this;
  }

  checkEstimatedCount(estimatedCount: number): GuestInfoValidator {
    if (estimatedCount === 0)
      throw new Error("Estimated count should be greater than 0");
    return this;
  }

  checkConfirmedCount(confirmedCount: number | null): GuestInfoValidator {
    if (
      this.originalGuest &&
      confirmedCount &&
      confirmedCount > this.originalGuest.estimatedCount
    )
      throw new Error("Confirmed count cannot be greater than estimated count");
    if (this.originalGuest?.confirmedCount && confirmedCount === null)
      throw new Error("Confirmed count cannot be unset");
    return this;
  }
}
