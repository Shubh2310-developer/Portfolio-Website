import { useState, useEffect } from 'react'

interface UseScrollSpyProps {
  sectionIds: string[]
  offset?: number
}

export function useScrollSpy({ sectionIds, offset = 0 }: UseScrollSpyProps) {
  const [activeSection, setActiveSection] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        rootMargin: `-${offset}px 0px -${offset}px 0px`,
        threshold: 0.2,
      }
    )

    // Observe all sections
    sectionIds.forEach((id) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    // Cleanup
    return () => {
      sectionIds.forEach((id) => {
        const element = document.getElementById(id)
        if (element) observer.unobserve(element)
      })
    }
  }, [sectionIds, offset])

  return activeSection
}

// Helper function to scroll to a section
export function scrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId)
  if (element) {
    const offset = 80 // Adjust based on your header height
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    })
  }
}

// Helper function to check if a section is in viewport
export function isSectionInViewport(sectionId: string, offset = 0): boolean {
  const element = document.getElementById(sectionId)
  if (!element) return false

  const rect = element.getBoundingClientRect()
  return (
    rect.top >= -offset &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}
