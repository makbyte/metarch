import Tabs from '@/components/Tabs'
import { Suspense } from 'react'

export default function TabsPage() {
  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      content: <p>This is overview content</p>,
    },
    {
      id: 'reviews',
      label: 'Reviews',
      content: <p>This is reviews content</p>,
    },
    {
      id: 'specs',
      label: 'Specs',
      content: <p>This is specs content</p>,
    },
  ]

  return (
    <main className="p-6">
      <Suspense fallback={<p>Loading tabs...</p>}>
        <Tabs tabs={tabs} />
      </Suspense>
    </main>
  )
}
