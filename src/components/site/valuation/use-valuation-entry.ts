'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from '@/i18n/navigation'
import type { PropertyTypeId } from '@/lib/valuation/types'

/**
 * State for the valuation entry points (card and hero bar): only the first
 * switch (property type) is asked here. The choice travels to the wizard as
 * `?type=`, which then continues at step 2.
 */
export function useValuationEntry() {
  const router = useRouter()
  const [selectedType, setSelectedType] = useState<PropertyTypeId | null>(null)
  const [showError, setShowError] = useState(false)

  function select(id: PropertyTypeId) {
    setSelectedType(id)
    setShowError(false)
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!selectedType) {
      setShowError(true)
      return
    }

    router.push({
      pathname: '/property-valuation',
      query: { type: selectedType },
    })
  }

  return { selectedType, showError, select, submit }
}
