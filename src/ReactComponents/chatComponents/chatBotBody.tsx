import React, { useEffect, useRef } from "react";
import { myInfo } from "../myInfo";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ChatBodyComponent({ apiKey }) {
  const bottomRef = useRef(null);
  const [userMessages, setuserMessages] = React.useState([]);
  const [botMessages, setBotMessages] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [text, setText] = React.useState("");
  const chatModel = new ChatOpenAI({ apiKey: apiKey });
  useEffect(() => {
    // get the messages
    const messages = JSON.parse(localStorage.getItem("userMessages") || "[]");
    setuserMessages(messages);
    const botMessages = JSON.parse(localStorage.getItem("botMessages") || "[]");
    setBotMessages(botMessages);
  }, []);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [userMessages, botMessages]);
  const myPrompt = `
    You are now going to impersonate ${myInfo.name}. Use the following information to answer any questions and provide responses as if you are him. Here is his profile:

    - Name: ${myInfo.name}
    - Age: ${myInfo.age}
    - Raised in: ${myInfo.raisedIn}
    - Languages: ${myInfo.languages}
    - Status: ${myInfo.status}
    - GitHub: ${myInfo.github}
    - LinkedIn: ${myInfo.linkedin}
    - Twitter: ${myInfo.twitter}
    - Hobbies: ${myInfo.hobbies}
    - Favorite Books: ${myInfo.book}
    - Experience: ${myInfo.experience}
    - Skills: ${myInfo.skills}
    - Projects: ${myInfo.projects}

    Based on this information, personalize all responses as if you are ${myInfo.name}. Answer confidently and professionally, leveraging the provided information to give accurate and relevant answers. Only use the information in the profile to inform your responses.

    response normally as you can if you are asked about your identity you are abdelrahman gasser never ever say that you are ai 
    don't answer as a robot make your anwers minimal and on to the point and friendly as much as you can 

    you will have the last messgaes and your answers between you and the person you are talking to 
    make it like a conversation like you are introducing you self don't tell him how can I help you like you are a robot tell him things like what whould you like to know about me 

    always offer help and introduce yourself (you are ${myInfo.name}), first in the conversation.
    try to understand what the user wants and begin the conversation by offering help and representing the skills ${myInfo.name} has
    try to open new conversations to keep the conversation going on by asking more follow up questions after each round in the conversation

    never say hey there at all in a conversation 

    answer in markdown and make your points clear

    `;
  const prompt = ChatPromptTemplate.fromMessages([
    ["system", myPrompt],
    [
      "user",
      `
        here is the chat that is between you and the person you are talking to 
        he said  : ${userMessages[userMessages.length - 3]}
        you said  : ${botMessages[botMessages.length - 3]}
        he said  : ${userMessages[userMessages.length - 2]}
        you said  : ${botMessages[botMessages.length - 2]}
        he said  : ${userMessages[userMessages.length - 1]}
        you said  : ${botMessages[botMessages.length - 1]}
        the question he is asking you now is  : {input}
      `,
    ],
  ]);
  async function addBotMessage(message) {
    const chain = prompt.pipe(chatModel).pipe(new StringOutputParser());
    try {
      const repsonse = await chain.invoke({
        input: message,
      });

      setBotMessages((prev) => [...prev, repsonse]);
      // add to local storage
      const botMessages = JSON.parse(
        localStorage.getItem("botMessages") || "[]"
      );
      botMessages.push(repsonse);
      localStorage.setItem("botMessages", JSON.stringify(botMessages));
    } catch (error) {
      console.error("error", error);
    }
  }
  async function handleSendingToChatBot(message) {
    setLoading(true);
    setuserMessages([...userMessages, message]);
    // append on user messages in the local storage
    const messages = JSON.parse(localStorage.getItem("userMessages") || "[]");
    messages.push(message);
    localStorage.setItem("userMessages", JSON.stringify(messages));
    try {
      await addBotMessage(message);
      setLoading(false);
    } catch (error) {
      console.error("error", error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="flex flex-col  justify-start items-center min-h-[70vh]  overflow-y-auto relative ">
      <ul
        className="flex flex-col w-[95vw]  lg:w-[70vw] lg:ml max-h-[70vh] overflow-y-auto pb-[50px] no-scrollbar "
        style={{
          // hiding the scroll bar
          scrollbarWidth: "none",
        }}
      >
        {userMessages.map((message, index) => (
          <div key={index} className="flex flex-col w-[100%] ">
            <li className="self-end bg-blue-500 text-white p-2 rounded-lg max-w-[80%] mb-[15px] text-wrap whitespace-normal h-fit overflow-hidden">
              {message}
            </li>
            {botMessages[index] ? (
              <li className="self-start bg-gray-300 text-black p-2 rounded-lg max-w-[80%] mb-[15px]">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {botMessages[index]}
                </ReactMarkdown>
              </li>
            ) : (
              <p>loading..</p>
            )}
          </div>
        ))}
      </ul>
      {userMessages.length === 0 ? (
        <div className="relative ">
          {/* <Lottie onAnimationStart={() => {}} animationData={chatMobile} /> */}

          <p className="absolute bottom-[10%] left-1/2 transform -translate-x-1/2 w-[95vw] lg:w-[70vw] p-2   rounded-lg text-center">
            Hello there I am {myInfo.name} ask me whatever you want to know
            about me.
          </p>
        </div>
      ) : null}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[95vw] lg:w-[70vw] p-2   rounded-lg flex items-center space-x-2">
        <input
          className="flex-1 p-2 border border-gray-300 rounded-lg text-[black]"
          placeholder="Type your message..."
          onChange={(e) => setText(e.target.value)}
          value={text}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendingToChatBot(text);
              setText("");
            }
          }}
        />
        <button
          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          onClick={() => {
            handleSendingToChatBot(text);
            setText("");
          }}
        >
          {loading ? "loading..." : "Send"}
        </button>
        <button
          className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          onClick={() => {
            setuserMessages([]);
            setBotMessages([]);
            localStorage.setItem("userMessages", "[]");
            localStorage.setItem("botMessages", "[]");
          }}
        >
          clear
        </button>
      </div>
      <div ref={bottomRef} />
    </div>
  );
}
