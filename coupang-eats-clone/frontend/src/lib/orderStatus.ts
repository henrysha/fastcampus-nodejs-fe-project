import { DeliveryStatus } from '@/constants/deliveryStatus'

const orderStatusMap: Record<DeliveryStatus, string> = {
  [DeliveryStatus.PREPARING]: '배달 준비중',
  [DeliveryStatus.DELIVERING]: '배달중',
  [DeliveryStatus.COMPLETED]: '배달 완료',
}

export const getOrderStatus = (status: DeliveryStatus) => orderStatusMap[status]
