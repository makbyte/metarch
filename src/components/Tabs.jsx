'use client'
import { useSearchParams, useRouter } from 'next/navigation'

const Tabs = ({ tabs }) => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const activeTab = searchParams.get('tab') || tabs[0].id

  const handleTabClick = (id) => {
    router.push(`?tab=${id}`)
  }

  return (
    <div>
      <div className="flex gap-4 border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`pb-2 ${
              activeTab === tab.id
                ? 'border-b-2 border-blue-500 font-bold'
                : 'text-gray-500'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {tabs.map(
          (tab) =>
            tab.id === activeTab && <div key={tab.id}>{tab.content}</div>,
        )}
      </div>
    </div>
  )
}

export default Tabs
