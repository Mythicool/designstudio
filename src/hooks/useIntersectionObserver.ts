import { useEffect, useState, RefObject } from 'react'

interface UseIntersectionObserverOptions {
  threshold?: number | number[]
  root?: Element | null
  rootMargin?: string
  freezeOnceVisible?: boolean
}

export function useIntersectionObserver(
  elementRef: RefObject<Element>,
  options: UseIntersectionObserverOptions = {}
): boolean {
  const {
    threshold = 0,
    root = null,
    rootMargin = '0%',
    freezeOnceVisible = false
  } = options

  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = elementRef.current

    if (!element) return

    // If already visible and freeze is enabled, don't create observer
    if (freezeOnceVisible && isVisible) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementVisible = entry.isIntersecting
        setIsVisible(isElementVisible)

        // If freeze is enabled and element becomes visible, disconnect observer
        if (freezeOnceVisible && isElementVisible) {
          observer.disconnect()
        }
      },
      {
        threshold,
        root,
        rootMargin
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [elementRef, threshold, root, rootMargin, freezeOnceVisible, isVisible])

  return isVisible
}

// Hook for multiple elements
export function useIntersectionObserverMultiple(
  elementRefs: RefObject<Element>[],
  options: UseIntersectionObserverOptions = {}
): boolean[] {
  const {
    threshold = 0,
    root = null,
    rootMargin = '0%',
    freezeOnceVisible = false
  } = options

  const [visibilityStates, setVisibilityStates] = useState<boolean[]>(
    new Array(elementRefs.length).fill(false)
  )

  useEffect(() => {
    const elements = elementRefs.map(ref => ref.current).filter(Boolean)
    
    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const elementIndex = elements.indexOf(entry.target as Element)
          if (elementIndex !== -1) {
            setVisibilityStates(prev => {
              const newStates = [...prev]
              newStates[elementIndex] = entry.isIntersecting
              return newStates
            })

            // If freeze is enabled and element becomes visible, unobserve it
            if (freezeOnceVisible && entry.isIntersecting) {
              observer.unobserve(entry.target)
            }
          }
        })
      },
      {
        threshold,
        root,
        rootMargin
      }
    )

    elements.forEach(element => {
      if (element) observer.observe(element)
    })

    return () => {
      observer.disconnect()
    }
  }, [elementRefs, threshold, root, rootMargin, freezeOnceVisible])

  return visibilityStates
}