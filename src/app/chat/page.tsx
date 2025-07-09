'use client'

import { useState } from 'react'
import axios from 'axios'

export default function ChatPage() {
  const [messages, setMessages] = useState<{ sender: 'user' | 'bot'; text: string }[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage = { sender: 'user', text: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || '',
        { message: userMessage.text }
      )

      const reply = response.data?.message || 'پاسخی دریافت نشد.'
      const botMessage = { sender: 'bot', text: reply }

      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      setMessages(prev => [...prev, { sender: 'bot', text: '❌ خطا در ارتباط با سرور' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">🤖 چت با ایجنت هوشمند</h1>

      <div className="w-full max-w-md bg-white shadow rounded-xl p-4 space-y-2 overflow-y-auto max-h-[60vh]">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`text-${msg.sender === 'user' ? 'right' : 'left'} flex ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`px-4 py-2 rounded-lg ${
                msg.sender === 'user' ? 'bg-blue-100' : 'bg-green-100'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && <div className="text-center text-gray-400">در حال دریافت پاسخ...</div>}
      </div>

      <div className="w-full max-w-md mt-4 flex">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none"
          placeholder="پیام خود را بنویسید..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
        >
          ارسال
        </button>
      </div>
    </div>
  )
}
