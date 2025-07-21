'use client'

import { Chatbot } from "./chatbot";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import * as React from 'react';
import { X } from 'lucide-react'

export function ChatbotContent() {
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
            className="fixed lg:hidden inset-0 z-40 bg-background p-4 flex flex-col"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                Assistant
              </h2>
              <Button className="cursor-pointer" variant="ghost" onClick={() => setIsVisible(false)}>
                <X />
            </Button>
            </div>
              <Chatbot />
          </motion.div>
        )}
      </AnimatePresence>

      {/* desktop */}
      <div className="hidden lg:block">
        <Chatbot />
      </div>
    </>
  )
}
