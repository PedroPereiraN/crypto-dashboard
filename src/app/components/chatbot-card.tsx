'use client'

import { ChatbotContent } from "./chatbot-content";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";
import * as React from 'react';
import { X } from 'lucide-react'
import { cn } from "@/lib/utils";

export function ChatbotCard() {
  const [isVisible, setIsVisible] = React.useState(false)

  return (
    <>
      {/* Botão só aparece no mobile */}
      <Button
        className="w-full lg:hidden font-bold cursor-pointer"
        onClick={() => setIsVisible(!isVisible)}
      >
        Start chating
      </Button>

      {/*  mobile */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            key="chatbot-mobile"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed lg:hidden inset-0 z-40 bg-background p-4 h-screen flex flex-col"
          >
            <div className="w-full mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                Assistant
              </h2>
              <Button className="cursor-pointer" variant="ghost" onClick={() => setIsVisible(false)}>
                <X />
            </Button>
            </div>
            <Card className="flex-1 w-full bg-transparent">
              <ChatbotContent />
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* desktop */}
        <Card className={cn("flex-1", "bg-transparent", "w-full", "p-4", "hidden", "lg:flex", "flex-col", "justify-end", "items-end")}>
          <ChatbotContent />
        </Card>
    </>
  )
}
