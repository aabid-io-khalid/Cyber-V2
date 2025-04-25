type WindowWithGA = Window & {
  gtag: (
    command: string,
    action: string,
    params?: {
      page_path?: string
      page_title?: string
      page_location?: string
      event_category?: string
      event_label?: string
      value?: number
      [key: string]: any
    },
  ) => void
}

// Initialize Google Analytics
export const initGA = (measurementId: string) => {
  if (typeof window === "undefined") return

  const win = window as WindowWithGA

  if (win.gtag) return

  const script1 = document.createElement("script")
  script1.async = true
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`

  const script2 = document.createElement("script")
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${measurementId}', {
      page_path: window.location.pathname,
    });
  `

  document.head.appendChild(script1)
  document.head.appendChild(script2)
}

export const pageview = (url: string, title?: string) => {
  if (typeof window === "undefined") return

  const win = window as WindowWithGA

  if (!win.gtag) return

  win.gtag("config", process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "", {
    page_path: url,
    page_title: title,
    page_location: window.location.href,
  })
}

export const event = ({
  action,
  category,
  label,
  value,
  ...otherProps
}: {
  action: string
  category?: string
  label?: string
  value?: number
  [key: string]: any
}) => {
  if (typeof window === "undefined") return

  const win = window as WindowWithGA

  if (!win.gtag) return

  win.gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
    ...otherProps,
  })
}
