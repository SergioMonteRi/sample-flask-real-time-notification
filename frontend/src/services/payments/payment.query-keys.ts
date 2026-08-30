export const paymentQueryKeys = {
  all: ['payments'] as const,
  pix: () => [...paymentQueryKeys.all, 'pix'] as const,
  pixDetail: (paymentId: string) =>
    [...paymentQueryKeys.pix(), paymentId] as const,
}
