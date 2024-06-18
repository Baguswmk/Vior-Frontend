import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight, AiOutlineSend } from "react-icons/ai";
import { TfiGallery } from "react-icons/tfi";
import styles from "../../styles/styles";
import socketIO from "socket.io-client";
import axios from "axios";
import TimeAgo from "javascript-time-ago";
import Header from "../../components/Layout/Header";
import { server } from "../../server";
const ENDPOINT = import.meta.env.VITE_ENDPOINT_URL;
const socket = socketIO(ENDPOINT, { transports: ["websocket"] });
import id from "javascript-time-ago/locale/id";
TimeAgo.addLocale(id);
const timeAgo = new TimeAgo("id-ID");

const UserInbox = () => {
  const { user, loading } = useSelector((state) => state.user);
  const [conversations, setConversations] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentChat, setCurrentChat] = useState();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [userData, setUserData] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [images, setImages] = useState();
  const [activeStatus, setActiveStatus] = useState(false);
  const [open, setOpen] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    socket.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage && currentChat.members.includes(arrivalMessage.sender) && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    const getConversation = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(`${server}/conversation/get-all-conversation-user/${user._id}`, config);
        setConversations(response.data.conversations);
      } catch (error) {
        console.log(error);
      }
    };
    getConversation();
  }, [user, messages]);

  useEffect(() => {
    if (user) {
      const userId = user._id;
      socket.emit("addUser", userId);
      socket.on("getUsers", (data) => {
        setOnlineUsers(data);
      });
    }
  }, [user]);

  const onlineCheck = (chat) => {
    const chatMembers = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMembers);
    return online ? true : false;
  };

  useEffect(() => {
    const getMessage = async () => {
      try {
        const response = await axios.get(`${server}/message/get-all-messages/${currentChat._id}`);
        setMessages(response.data.messages);
      } catch (error) {
        console.log(error);
      }
    };
    getMessage();
  }, [currentChat]);

  const sendMessageHandler = async (e) => {
    e.preventDefault();

    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };
    const receiverId = currentChat.members.find((member) => member !== user._id);

    socket.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      if (newMessage !== "") {
        await axios
          .post(`${server}/message/create-new-message`, message)
          .then((res) => {
            setMessages([...messages, res.data.message]);
            updateLastMessage();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateLastMessage = async () => {
    socket.emit("updateLastMessage", {
      lastMessage: newMessage,
      lastMessageId: user._id,
    });

    await axios
      .put(`${server}/conversation/update-last-message/${currentChat._id}`, {
        lastMessage: newMessage,
        lastMessageId: user._id,
      })
      .then(() => {
        setNewMessage("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleImageUpload = async (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImages(reader.result);
        imageSendingHandler(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const imageSendingHandler = async (image) => {
    const receiverId = currentChat.members.find((member) => member !== user._id);
    socket.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      images: image,
    });

    try {
      await axios
        .post(`${server}/message/create-new-message`, {
          images: image,
          sender: user._id,
          text: newMessage,
          conversationId: currentChat._id,
        })
        .then((res) => {
          setImages(null);
          setMessages([...messages, res.data.message]);
          updateLastMessageForImage();
        });
    } catch (error) {
      console.log(error);
    }
  };

  const updateLastMessageForImage = async () => {
    await axios.put(`${server}/conversation/update-last-message/${currentChat._id}`, {
      lastMessage: "Photo",
      lastMessageId: user._id,
    });
  };

  useEffect(() => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="w-full">
      {!open && (
        <>
          <Header activeHeading={9} />
          <h1 className="text-center text-[30px] py-3 font-Poppins">All Messages</h1>
          {conversations.map((item, index) => (
            <MessageList
              key={index}
              data={item}
              index={index}
              setOpen={setOpen}
              setCurrentChat={setCurrentChat}
              me={user._id}
              setUserData={setUserData}
              userData={userData}
              online={onlineCheck(item)}
              setActiveStatus={setActiveStatus}
              loading={loading}
            />
          ))}
        </>
      )}
      {open && (
        <DesainerInbox
          setOpen={setOpen}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          sendMessageHandler={sendMessageHandler}
          messages={messages}
          desainerId={user._id}
          userData={userData}
          activeStatus={activeStatus}
          scrollRef={scrollRef}
          handleImageUpload={handleImageUpload}
        />
      )}
    </div>
  );
};

const MessageList = ({ data, index, setOpen, setCurrentChat, me, setUserData, userData, online, setActiveStatus, loading }) => {
  const [active, setActive] = useState(0);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    setActiveStatus(online);
    const userId = data.members.find((user) => user !== me);
    const getUser = async () => {
      try {
        const res = await axios.get(`${server}/user/get-user-info/${userId}`);
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [me, data, setActiveStatus, online]);

  return (
    <div
      className={`w-full flex p-3 px-3 ${active === index ? "bg-[#00000010]" : "bg-transparent"} cursor-pointer`}
      onClick={() => {
        setActive(index);
        setOpen(true);
        setCurrentChat(data);
        setUserData(user);
        setActiveStatus(online);
        navigate(`/message?${data._id}`);
      }}
    >
      <div className="relative">
        <img loading="lazy" src={user.avatar.url} alt="" className="w-[50px] h-[50px] rounded-full" />
        <div className={`w-[12px] h-[12px] ${online ? "bg-green-400" : "bg-[#c7b9b9]"} rounded-full absolute top-[2px] right-[2px]`} />
      </div>
      <div className="pl-3">
        <h1 className="text-[18px]">{user.name}</h1>
        <p className="text-[16px] text-[#000c]">
          {!loading && data.lastMessageId !== userData._id ? "You:" : userData.name.split(" ")[0] + ": "} {data.lastMessage}
        </p>
      </div>
    </div>
  );
};

const DesainerInbox = ({ setOpen, newMessage, setNewMessage, sendMessageHandler, messages, sellerId, userData, activeStatus, scrollRef, handleImageUpload }) => {
  return (
    <div className="w-full min-h-full flex flex-col justify-between p-5">
      <div className="w-full flex p-3 items-center justify-between bg-slate-200">
        <div className="flex">
          <img loading="lazy" src={userData.avatar.url} alt="" className="w-[60px] h-[60px] rounded-full" />
          <div className="pl-3">
            <h1 className="text-[18px] font-[600]">{userData.name}</h1>
            <h1>{activeStatus ? "Active Now" : ""}</h1>
          </div>
        </div>
        <AiOutlineArrowRight size={20} className="cursor-pointer" onClick={() => setOpen(false)} />
      </div>
      <div className="px-3 h-[75vh] py-3 overflow-y-scroll">
        {messages.map((item, index) => {
          // Konversi createdAt menjadi objek Date
          const createdAtDate = new Date(item.createdAt);
          return (
            <div key={index} className={`flex w-full my-2 ${item.sender === sellerId ? "justify-end" : "justify-start"}`} ref={scrollRef}>
              {item.sender !== sellerId && <img loading="lazy" src={userData.avatar.url} className="w-[40px] h-[40px] rounded-full mr-3" alt="" />}
              {item.images && <img loading="lazy" src={item.images.url} className="w-[300px] h-[300px] object-cover rounded-[10px] ml-2 mb-2" />}
              {item.text && (
                <div>
                  <div className={`w-max p-2 rounded ${item.sender === sellerId ? "bg-[#000]" : "bg-[#38c776]"} text-[#fff]`}>
                    <p>{item.text}</p>
                  </div>
                  <p className="text-[12px] text-[#000000d3] pt-1">{timeAgo.format(createdAtDate)}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <form className="p-3 relative w-full flex justify-between items-center" onSubmit={sendMessageHandler}>
        <div className="w-[30px]">
          <input type="file" id="image" className="hidden" onChange={handleImageUpload} />
          <label htmlFor="image">
            <TfiGallery className="cursor-pointer" size={20} />
          </label>
        </div>
        <div className="w-full">
          <input type="text" required placeholder="Enter your message..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} className={styles.input} />
          <input type="submit" value="Send" className="hidden" id="send" />
          <label htmlFor="send">
            <AiOutlineSend size={20} className="absolute right-4 top-5 cursor-pointer" />
          </label>
        </div>
      </form>
    </div>
  );
};

export default UserInbox;
