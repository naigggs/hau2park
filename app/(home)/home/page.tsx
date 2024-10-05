"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send } from "lucide-react";

type Message = {
  id: number;
  content: string;
  sender: "user" | "bot";
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");

  const predefinedCommands = [
    "Tell me a joke",
    "What's the weather?",
    "Recommend a book",
    "Explain AI",
  ];

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: messages.length + 1,
      content,
      sender: "user",
    };
    setMessages([...messages, newMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        content: `Here's a response to: "${content}"`,
        sender: "bot",
      };
      setMessages((prevMessages) => [...prevMessages, botResponse]);
    }, 1000);

    setInputValue("");
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto p-4 bg-background">
      <ScrollArea className="flex-grow mb-4 border rounded-md p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start mb-4 ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {message.sender === "bot" && (
              <Avatar className="mr-2">
                <AvatarImage src="/placeholder-bot.jpg" alt="Bot" />
                <AvatarFallback>Bot</AvatarFallback>
              </Avatar>
            )}
            <div
              className={`px-4 py-2 rounded-lg ${
                message.sender === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              }`}
            >
              {message.content}
            </div>
            {message.sender === "user" && (
              <Avatar className="ml-2">
                <AvatarImage src="/placeholder-user.jpg" alt="User" />
                <AvatarFallback>You</AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
      </ScrollArea>
      <div className="flex flex-wrap gap-2 mb-4">
        {predefinedCommands.map((command, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => handleSendMessage(command)}
          >
            {command}
          </Button>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (inputValue.trim()) {
            handleSendMessage(inputValue.trim());
          }
        }}
        className="flex items-center gap-2"
      >
        <Input
          type="text"
          placeholder="Type your message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-grow"
        />
        <Button type="submit" size="icon">
          <Send className="h-4 w-4" />
          <span className="sr-only">Send</span>
        </Button>
      </form>
    </div>
  );
}
