'use client';

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ChevronRightIcon, Dot, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { appClient } from "@/lib/axios";
import * as React from 'react';
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area"

export type Message = {
  content: string;
  role: 'user' | 'assistant';
}

export async function makeRequest(message: string) {
const response = await appClient.post<{response: string}, { data: { response: string }} >('/api/chatbot', {
    message,
  })

  return response
}

export function Chatbot() {
  const [messages, setMessages] = React.useState<Message[]>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [inputValue, setInputValue] = React.useState('');

  const formRef = React.useRef<HTMLFormElement>(null)

  const addMessage = (newMessage: Message) => {
    setMessages((prev) => [...prev, newMessage].slice(-20));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

  event.preventDefault()

  if (!inputValue.trim()) {
    return
  }


  addMessage({ content: inputValue, role: 'user' });

  setInputValue('');
  setIsLoading(true)

  const response = await makeRequest(inputValue)

  addMessage({ content: response.data.response, role: 'assistant' });

  setIsLoading(false)
}

const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  };


  return (
    <Card className={cn(
  "w-full",
  "bg-transparent",
  "flex",
  "flex-col",
  "h-11/12 lg:h-screen",
)}>
    <div className="flex-1 overflow-hidden">
    <ScrollArea className="h-full w-full">
    <CardContent className="flex flex-col gap-4">
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
    {
      isLoading ?
      <div className="bg-secondary border-none rounded-lg p-4 w-fit flex items-end">
        <Dot className="animate-bounce [animation-delay:-0.3s]"/>
        <Dot className="animate-bounce [animation-delay:-0.15s]"/>
        <Dot className="animate-bounce"/>
      </div>
        : null
    }
    </CardContent>
    </ScrollArea>
    </div>

    <CardFooter className="w-full">
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
    </CardFooter>
    </Card>
  )
}
