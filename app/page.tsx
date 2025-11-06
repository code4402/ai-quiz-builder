'use client' // ✅ needed for hooks in Next.js App Router

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function Home() {
  const [time, setTime] = useState<string>('Loading...')

  useEffect(() => {
    const getTime = async () => {
      const { data, error } = await supabase
        .from('quizzes')
        .select('*')
        .limit(1)

      if (error) {
        console.error(error)
        setTime('Error fetching data')
      } else {
        setTime(JSON.stringify(data, null, 2))
      }
    }

    getTime()
  }, [])

  return (
    <div>
      <h1>🧠 AI Quiz Builder</h1>
      <h2>Supabase Test — Server Time:</h2>
      <pre>{time}</pre>
    </div>
  )
}
