'use client';

import { CardContent } from "@/components/ui/card"
import { ChevronRightIcon, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { appClient } from "@/lib/axios";
import * as React from 'react';

export type Message = {
  content: string;
  role: 'user' | 'assistant';
}

const systemPrompt = `
You are Alfred, a cryptocurrency expert assistant. Follow these rules strictly:
1. Speak ONLY about cryptocurrencies (Bitcoin, Ethereum, altcoins, NFTs, blockchain technology, etc.)
2. If asked about other topics, politely explain you specialize in cryptocurrencies
3. When natural in conversation, reveal your name is Alfred (e.g., "As your crypto assistant Alfred, I recommend...")
4. Never break character - if pressed about other topics, respond: "I specialize in cryptocurrency analysis. Would you like insights about Bitcoin or Ethereum markets?"
5. Maintain a professional yet friendly tone

Example responses:
- "The current Bitcoin trend shows..."
- "I'm Alfred, your crypto assistant. That topic is outside my expertise, but I can explain how blockchain works!"
- "As Alfred, I must decline - but I'm happy to discuss crypto wallets or DeFi protocols."
- "Interesting question! While I focus on cryptocurrencies, I can tell you how NFT technology relates to that... "
`;


export async function makeRequest(message: string) {
const response = await appClient.post<{response: string}, { data: { response: string }} >('/api/chatbot', {
    message,
  })

  return response
}


export function ChatbotContent() {
  const [messages, setMessages] = React.useState<Message[]>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [inputValue, setInputValue] = React.useState('');

  const formRef = React.useRef<HTMLFormElement>(null)

  React.useEffect(() => {
    makeRequest(systemPrompt)
  }, [])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

  event.preventDefault()

  if (!inputValue.trim()) {
    return
  }


  setMessages((prev: Message[]) => [
    ...prev,
    {
      content: inputValue,
      role: 'user'
    }
  ])

  setInputValue('');
  setIsLoading(true)

  const response = await makeRequest(inputValue)

  setMessages((prev: Message[]) => [
    ...prev,
    {
      content: response.data.response,
      role: 'assistant'
    }
  ])

  setIsLoading(false)
}

const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  };


  return (
    <CardContent className="flex flex-col gap-6 justify-end h-full">
    {
      messages.map((message: Message, index) => (
        message.role == 'user' ? (
          <div className="bg-primary border-none rounded-lg p-4 w-full text-black" key={index}>
            <p>{ message.content }</p>
          </div>
        ) : (
          <div className="bg-secondary border-none rounded-lg p-4 w-full" key={index}>
          { message.content }
      </div>
        )
      ))
    }

      <form onSubmit={handleSubmit} className="relative w-full" ref={formRef}>
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="
            min-h-10
            w-full
            rounded-md
            border
            border-input
            bg-background
            pl-3
            pr-12
            py-2
            text-sm
            ring-offset-background
            placeholder:text-muted-foreground
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-ring
            focus-visible:ring-offset-2
            disabled:cursor-not-allowed
            disabled:opacity-50
            resize-none
            overflow-hidden
          "
          rows={1}
          placeholder="Ask our assistant about crypto..."
          onKeyDown={handleKeyDown}
        />
            <Button
              type="submit"
              variant="secondary"
              size="icon"
              className="size-6 absolute right-4 top-2 cursor-pointer"
            >
            { isLoading ? <Loader className="animate-spin" /> : <ChevronRightIcon /> }
            </Button>
            </form>
    </CardContent>
  )
}
