import type { FormData } from "@/types/eventTypes"

export async function changeEventHelper(FormInfo:FormData) {
    const res = await fetch('/api/v1/changeEvent', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ FormInfo })
      // POST request to prevent CSRF in combination with SameSite LAX cookies, see
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite
    })
    const data = (await res.json()) as { error?: string }
  
    if (data.error) {
      throw new Error(data.error)
    }
  }