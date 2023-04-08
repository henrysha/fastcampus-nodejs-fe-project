export const MenuTitle = ({
  title,
  description,
}: {
  title: string
  description?: string
}) => {
  if (!title) return null

  return (
    <div className="border-b border-b-gray-100 p-4 pb-8">
      <h1 className="text-2xl font-bold">{title}</h1>
      {description && <p className="text-sm text-gray-700">{description}</p>}
    </div>
  )
}
