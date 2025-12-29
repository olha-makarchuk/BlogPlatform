export const comments = [
  {
    id: 1,
    postId: 1,
    authorName: "Марія Петренко",
    authorAvatar: "https://i.pravatar.cc/50?img=5",
    content: "Дуже корисна стаття! Дякую за пояснення.",
    createdAt: "2024-01-16T14:30:00Z",
    parentId: null,
  },
  {
    id: 2,
    postId: 1,
    authorName: "Іван Шевченко",
    authorAvatar: "https://i.pravatar.cc/50?img=12",
    content: "Згоден! Особливо сподобалась частина про nested routes.",
    createdAt: "2024-01-16T15:00:00Z",
    parentId: 1,
  },

  // ===== Post #2 =====
  {
    id: 3,
    postId: 2,
    authorName: "Олег Сидоренко",
    authorAvatar: "https://i.pravatar.cc/50?img=8",
    content: "Чи плануєш окрему статтю про performance?",
    createdAt: "2024-02-03T10:12:00Z",
    parentId: null,
  },
  {
    id: 4,
    postId: 2,
    authorName: "Автор",
    authorAvatar: "https://i.pravatar.cc/50?img=1",
    content: "Так, вже в роботі 👍",
    createdAt: "2024-02-03T10:25:00Z",
    parentId: 3,
  },

  // ===== Post #3 =====
  {
    id: 5,
    postId: 3,
    authorName: "Катерина Романюк",
    authorAvatar: "https://i.pravatar.cc/50?img=6",
    content: "Цікаво було почитати про CSS Grid у такому форматі.",
    createdAt: "2024-02-10T09:40:00Z",
    parentId: null,
  },
  {
    id: 6,
    postId: 3,
    authorName: "Максим Бондар",
    authorAvatar: "https://i.pravatar.cc/50?img=3",
    content: "Grid реально underrated, дякую за приклади.",
    createdAt: "2024-02-10T10:05:00Z",
    parentId: 5,
  },

  // ===== Post #4 =====
  {
    id: 7,
    postId: 4,
    authorName: "Дмитро Лисенко",
    authorAvatar: "https://i.pravatar.cc/50?img=9",
    content: "Було б круто побачити приклади з Docker Compose.",
    createdAt: "2024-03-01T16:20:00Z",
    parentId: null,
  },

  // ===== Post #5 =====
  {
    id: 8,
    postId: 5,
    authorName: "Анна Мельник",
    authorAvatar: "https://i.pravatar.cc/50?img=4",
    content: "Дякую за структурування теми, дуже зрозуміло.",
    createdAt: "2024-03-12T11:55:00Z",
    parentId: null,
  },
  {
    id: 9,
    postId: 5,
    authorName: "Ірина Шевченко",
    authorAvatar: "https://i.pravatar.cc/50?img=2",
    content: "Погоджуюсь, такі гайди реально економлять час.",
    createdAt: "2024-03-12T12:10:00Z",
    parentId: 8,
  },
];
