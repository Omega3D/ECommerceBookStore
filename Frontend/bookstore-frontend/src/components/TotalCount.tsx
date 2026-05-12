export const TotalCount = ({ totalCount }: { totalCount: number }) => {
    return (
        <div className="bg-gray-50 p-4 rounded-lg sticky top-6">
            <h1 className="font-bold text-3xl mb-2">{totalCount}</h1>
            <h3 className="text-gray-400">Books Found</h3>
        </div>
    )
}