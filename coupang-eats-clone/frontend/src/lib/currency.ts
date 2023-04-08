export const KRW = (price?: number) => {
  if (!price) return null

  const formatter = new Intl.NumberFormat('ko-KR', {
    style: 'decimal',
  })
  return `${formatter.format(price)} 원`
}
