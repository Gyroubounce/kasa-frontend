import { UserPublic } from "@/types/user";
import { Thread, Message } from "@/types/message";

export const mockUsers: UserPublic[] = [
  {
    id: "3",
    name: "Franck Maher",
    picture: "https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/profile-picture-2.jpg",
    role: "host",
  },
  {
    id: "u1",
    name: "Alex Dupont",
    picture: "/img/alex.png",
    role: "user",
  },
  {
    id: "u2",
    name: "Marie Leroy",
    picture: "/img/marie.png",
    role: "user",
  },
];

// Maher = user connecté
const me = mockUsers[0];

export const mockThreads: Thread[] = [
  {
    id: "t1",
    otherUser: mockUsers[1], // Alex
    lastMessage: "On confirme pour demain ?",
    unread: 1,
  },
  {
    id: "t2",
    otherUser: mockUsers[2], // Marie
    lastMessage: "Merci pour votre retour !",
    unread: 0,
  },
];

export const mockMessages: Message[] = [
  // Thread 1 (Alex ↔ Maher)
  {
    id: "m1",
    threadId: "t1",
    sender: mockUsers[1], // Alex
    content: "Salut ! Tu es dispo demain pour la visite ?",
    createdAt: "2024-01-01T10:00:00Z",
    read: false,
  },
  {
    id: "m2",
    threadId: "t1",
    sender: me, // Maher
    content: "Oui, ça marche pour moi.",
    createdAt: "2024-01-01T10:02:00Z",
    read: true,
  },

  // Thread 2 (Marie ↔ Maher)
  {
    id: "m3",
    threadId: "t2",
    sender: mockUsers[2], // Marie
    content: "Merci pour votre retour !",
    createdAt: "2024-01-02T09:00:00Z",
    read: true,
  },
  {
    id: "m4",
    threadId: "t2",
    sender: me, // Maher
    content: "Avec plaisir, n’hésitez pas si vous avez d’autres questions.",
    createdAt: "2024-01-02T09:05:00Z",
    read: true,
  },
];
