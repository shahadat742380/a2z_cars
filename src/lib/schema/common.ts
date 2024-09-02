import { pgEnum } from "drizzle-orm/pg-core"


export const notificationStatusEnum = pgEnum(`tbl_notification_status`, [
  "Sent",
  "Read"
])

export const customerOrderStatus = pgEnum("tbl_customerOrderStatus", [
    "ORDER_PLACED",
    "CAR_RECEIVED_AT_CENTRE",
    "SERVICE_IN_PROGRESS",
    "QUALITY_CHECK",
    "SERVICE_COMPLETED",
    "CAR_READY_FOR_PICKUP",
    "COMPLETED",
]);

export const OrderStatus = pgEnum("tbl_OrderStatus", [
  "Requested",
  "Ongoing",
  "Completed",
  "Cancelled"
]);


export const internalOrderStatus = pgEnum("tbl_internalOrderStatus", [
  "REQUESTED",
  "ACCEPTED",
  "CAR_RECEIVED_AT_CENTRE",
  "SERVICE_IN_PROGRESS",
  "QUALITY_CHECK",
  "SERVICE_COMPLETED",
  "CAR_READY_FOR_PICKUP",
  "COMPLETED",
  "SEND_NOTIFICATION"
]);



export const genderEnum = pgEnum(`tbl_gender`, [
  "Male",
  "Female",
  "Other",
])
